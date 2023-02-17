import { PixelRatio } from "react-native"
import Svg, { SvgProps } from "react-native-svg"
import styled from "styled-components/native"
import {
  left,
  LeftProps,
  position,
  PositionProps,
  right,
  RightProps,
  space,
  SpaceProps,
  top,
  TopProps,
} from "styled-system"
import { Color } from "../types"

const DEFAULT_SIZE = 18

export interface IconProps
  extends SvgProps,
    SpaceProps,
    PositionProps,
    TopProps,
    RightProps,
    LeftProps {
  fill?: Color
}

/**
 * Wraps `Svg` and returns a scaled version depending on the font scale of the system.
 * If width and height are specified as strings, the SVG will not be scaled.
 */
const ScaledSvg = ({ width = DEFAULT_SIZE, height = DEFAULT_SIZE, ...restProps }: SvgProps) => {
  const fontScale = PixelRatio.getFontScale()

  // Only scale if the width and height are not specified or provided as numbers
  const scaledWidth = typeof width === "string" ? width : fontScale * width
  const scaledHeight = typeof height === "string" ? height : fontScale * height

  return <Svg width={scaledWidth} height={scaledHeight} {...restProps} />
}

/** Wrapper for icons to include space */
export const Icon = styled(ScaledSvg)<IconProps>`
  position: relative;

  ${space};
  ${top};
  ${right};
  ${left};
  ${position};
`

Icon.defaultProps = {
  // @ts-ignore
  fill: "black",
  height: DEFAULT_SIZE,
  width: DEFAULT_SIZE,
}

export {
  Circle,
  G,
  Mask,
  Path,
  Rect,
  Defs,
  LinearGradient,
  Stop,
  RadialGradient,
} from "react-native-svg"
