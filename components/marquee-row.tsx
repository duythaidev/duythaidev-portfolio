"use client"

interface MarqueeRowProps {
  items: string[]
  direction: "left" | "right"
  isInView: boolean
  delay: number
}

export function MarqueeRow({ items, direction, isInView, delay }: MarqueeRowProps) {
  // Double the items for seamless loop
  const doubledItems = [...items, ...items, ...items, ...items]

  return (
    <div
      className={`relative transition-all duration-700 ${isInView ? "opacity-100" : "opacity-0"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

      <div
        className="flex gap-4 py-4"
        style={{
          animation: `scroll-${direction} 30s linear infinite`,
        }}
      >
        {doubledItems.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex-shrink-0 px-6 py-3 glass rounded-full hover:border-primary/50 transition-colors cursor-default"
          >
            <span className="text-sm font-medium whitespace-nowrap">{item}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes scroll-right {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}
