import FormInput from "../form/input";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";

interface Props {
  handleGenerate: (text: string) => void;
  loading: boolean;
}

export default function ChatBar({ handleGenerate, loading }: Props) {
  const [text, setText] = useState("");

  return (
    <div className="flex items-center gap-2 w-fit ">
      <FormInput
        className="w-[300px]"
        placeholder="Nhập Tên"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={() => handleGenerate(text)} disabled={loading}>
        {loading ? <Loader2 className="animate-spin" /> : <Send />}
      </Button>
    </div>
  );
}
