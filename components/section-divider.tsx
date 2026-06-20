type DividerProps = {
  position: "top" | "bottom"
  color?: string
  bgColor?: string
  height?: number
  flip?: boolean
}

export default function SectionDivider({
  position,
  color = "white",
  bgColor = "blue-50",
  height = 70,
  flip = false,
}: DividerProps) {
  // Generate a unique ID for the wave pattern
  const id = `wave-${position}-${Math.random().toString(36).substr(2, 9)}`

  // Determine the fill color based on the color prop
  const fillColor =
    color === "white"
      ? "#ffffff"
      : color === "blue-50"
        ? "#eff6ff"
        : color === "blue-900"
          ? "#1e3a8a"
          : color === "blue-800"
            ? "#1e40af"
            : "#ffffff"

  // Determine the background color class
  const bgColorClass = `bg-${bgColor}`

  // Determine the transform based on position and flip
  let transform = ""
  if (position === "bottom" && !flip) transform = "rotate(180deg)"
  if (position === "top" && flip) transform = "rotate(180deg)"

  return (
    <div className={`${bgColorClass} overflow-hidden relative`} style={{ height: `${height}px` }}>
      <svg
        className="absolute w-full h-full"
        style={{ transform }}
        preserveAspectRatio="none"
        viewBox="0 0 1440 74"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 74L48 68.7C96 63.3 192 52.7 288 49.5C384 46.3 480 50.7 576 57.2C672 63.7 768 72.3 864 68.7C960 65 1056 49 1152 42.5C1248 36 1344 39.7 1392 41.3L1440 43V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V74Z"
          fill={fillColor}
        />
      </svg>
    </div>
  )
}
