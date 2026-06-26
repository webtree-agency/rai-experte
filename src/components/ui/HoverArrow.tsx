/**
 * HoverArrow — zwei übereinanderliegende Pfeil-SVGs, die beim Hover des nächsten
 * `.group`-Vorfahren getauscht werden (ersetzt das alte #downSvg1/#downSvg2-
 * Pattern, ohne duplizierte IDs). Rotation per `rotate`-Prop.
 *
 * Der auslösende Container (Link/Kachel) muss die Tailwind-Klasse `group` tragen.
 */
import { cn } from '@/lib/utils'

type Props = {
  base: string
  hover: string
  rotate?: 0 | 90 | 180 | 270
  size?: number
  className?: string
}

export function HoverArrow({ base, hover, rotate = 0, size = 60, className }: Props) {
  const imgStyle = { transform: `rotate(${rotate}deg)` }
  return (
    <span
      className={cn('relative inline-block', className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={base}
        alt=""
        style={imgStyle}
        className="absolute inset-0 m-auto h-full w-full object-contain transition-opacity duration-300 group-hover:opacity-0"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={hover}
        alt=""
        style={imgStyle}
        className="absolute inset-0 m-auto h-full w-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </span>
  )
}
