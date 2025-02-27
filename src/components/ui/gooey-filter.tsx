export function GooeyFilter({ id = "conv-filter", strength = 1 }) {
  return (
    <svg style={{ position: "absolute", height: 0 }}>
      <defs>
        <filter id={id}>
          {/* Simple edge enhancement convolution matrix */}
          <feConvolveMatrix
            order="3"
            kernelMatrix="0 -1 0   -1 5 -1   0 -1 0"
            edgeMode="duplicate"
          />
          {/* Subtle brightness adjustment */}
          <feComponentTransfer>
            <feFuncR type="linear" slope="1.2" />
            <feFuncG type="linear" slope="1.2" />
            <feFuncB type="linear" slope="1.2" />
          </feComponentTransfer>
          {/* Light smoothing */}
          <feGaussianBlur stdDeviation={strength * 0.5} />
        </filter>
      </defs>
    </svg>
  )
} 