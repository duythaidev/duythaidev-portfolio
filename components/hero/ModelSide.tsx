import { Canvas } from "@react-three/fiber";
import ChatBar from "./ChatBar";

import { useEffect, useRef, useState } from "react";

import { LipSyncEngine } from "lip-sync-engine";
import type { MouthCue } from "./My3DModel";
import { Experience } from "./Experience";

async function base64ToArrayBuffer(base64String: string): Promise<ArrayBuffer> {
  // Add data URI prefix if it is missing
  const dataUri = base64String.startsWith("data:")
    ? base64String
    : `data:application/octet-stream;base64,${base64String}`;

  const response = await fetch(dataUri);
  return await response.arrayBuffer();
}

interface AudioChunks {
  audioUrl: string;
  mouthCues: MouthCue[];
}
export default function ModelSide() {
  const [loading, setLoading] = useState(false);

  const [mouthCues, setMouthCues] = useState<MouthCue[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioChunksRef = useRef<AudioChunks[]>([]);
  const isPlayingRef = useRef(false);

  const engineRef = useRef(LipSyncEngine.getInstance());

  // Init WASM 1 lần (load từ CDN mặc định)
  useEffect(() => {
    engineRef.current.init(); // hoặc truyền path tự host nếu muốn
    return () => engineRef.current.destroy();
  }, []);

  // Process và phát âm thanh theo thứ tự
  const continueProcess = () => {
    const audio = audioRef.current;
    // Nếu audio chưa load xong hoặc queue rỗng -> return
    if (!audio || audioChunksRef.current?.length === 0) return;

    if (!isPlayingRef.current) {
      isPlayingRef.current = true;

      const currentVoice = audioChunksRef.current.shift();

      audio.src = currentVoice?.audioUrl || "";
      audio.play();
      setMouthCues(currentVoice?.mouthCues || []);

      audio.onended = () => {
        isPlayingRef.current = false;
        audio.currentTime = 0;

        if (currentVoice) URL.revokeObjectURL(currentVoice.audioUrl); // Giải phóng bộ nhớ
        continueProcess(); // Gọi đệ quy để phát chunk tiếp theo
      };
    }
  };

  /**
   * Luồng:
   * 1. Connect đến api, nhận về từng chunk, đưa push chunk vào sound queue
   * 2. Mỗi lần đưa chunk -> Check xem Queue có ko -> Nếu có thì shift sound từ queue ra và phát âm thanh
   */
  const handleGenerate = async (text: string) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/v1/voice", {
        method: "POST",
        headers: {
          Accept: "text/event-stream",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      console.log("res", res);

      if (!res.ok || !res.body) {
        throw new Error("API returned an error");
      }

      // Server trả về data dạng SSE
      const reader = res.body.getReader(); // dùng getreader để đọc data từng chunk
      const decoder = new TextDecoder(); // dùng để decode chunk (string -> base64)
      let buffer = ""; // biến để lưu giá trị chunk chưa được xử lý xong

      // while loop để đọc data từ SSE
      while (true) {
        const { value, done } = await reader.read(); // đọc data chunk nhận về từ server qua reader
        if (done) break;

        buffer += decoder.decode(value, { stream: true }); // decode data chunk từ string -> base64 (original data mà server gửi)
        let lines = buffer.split("\n\n"); // split data chunk theo \n\n vì từng message được ngăn cách bởi \n\n

        // Giữ lại phần chưa kết thúc đầy đủ ở cuối buffer
        // vì khi stream , có thể server gửi 1 dòng nhưng chưa có \n\n
        buffer = lines.pop() || "";

        // Duyệt qua các dòng
        for (const line of lines) {
          const eventMatch = line.match(/^event:\s*(.+)$/m); // regex trả về data kiểu [fullMatch, captureGroup1] -> ví dụ eventMatch = ["event: sentence", "sentence"]
          const dataMatch = line.match(/^data:\s*(.+)$/m); // ví dụ dataMatch = ["data: sentence", "sentence"]
          const eventName = eventMatch ? eventMatch[1].trim() : "message";

          if (!dataMatch) continue;

          const voiceData = JSON.parse(dataMatch[1]); // base64 wav mà server gửi
          console.log("voiceData", voiceData);
          console.log("eventName", eventName);
          if (eventName === "sentence") {
            // process và đẩy vào queue voice
            await processVoiceData(voiceData);
          } else if (eventName === "done") {
            console.log("done", voiceData);
          }
        }
      }
    } catch (error) {
      console.error("Error generating lip sync:", error);
    } finally {
      setLoading(false);
    }
  };

  // Tạo mouth cues từ audio và đẩy vào queue
  const processVoiceData = async (voiceData: { audio: string }) => {
    try {
      const voiceBuffer = await base64ToArrayBuffer(voiceData.audio);
      console.log("voiceBuffer", voiceBuffer);
      // 1. Tạo blob URL để phát audio
      const blob = new Blob([voiceBuffer], { type: "audio/wav" }); // hoặc audio/mpeg tùy backend

      const audioUrl = URL.createObjectURL(blob);

      const pcm16 = new Int16Array(voiceBuffer.slice(44));

      // 
      const result = await engineRef.current.analyze(pcm16, {
        sampleRate: 16000,
      });

      console.log("audioUrl", audioUrl);
      console.log("result", result);

      audioChunksRef.current.push({
        mouthCues: result.mouthCues as MouthCue[],
        audioUrl,
      });

      if (!isPlayingRef.current) {
        continueProcess();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Canvas
        style={{ height: "90vh" }}
        shadows
        camera={{ position: [3, 3, 3], fov: 30 }}
      >
        <Experience mouthCues={[]} audioRef={audioRef} />
      </Canvas>

      <div className="absolute bottom-0 -translate-x-1/2 left-1/2">
        <ChatBar handleGenerate={handleGenerate} loading={loading} />
      </div>
      <audio hidden ref={audioRef}></audio>
    </>
  );
}
