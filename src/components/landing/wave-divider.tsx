export function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className="wave-divider"
      style={flip ? { transform: "rotate(180deg)" } : undefined}
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
          className="fill-secondary/50"
        />
        <path
          d="M0,50 C320,20 640,70 960,40 C1120,25 1320,55 1440,45 L1440,80 L0,80 Z"
          className="fill-secondary/30"
        />
      </svg>
    </div>
  )
}
