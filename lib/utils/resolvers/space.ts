import { get, system, compose, Config, Scale } from "@styled-system/core"
import { isArray, isNumber, isString } from "remeda"

const getMargin = (n: string | number, scale?: Scale) => {
  if (scale === undefined) return n
  if (isArray(scale)) return get(scale, n, n)

  if (isNumber(n)) {
    const isNegative = n < 0
    const absN = isNegative ? -n : n

    const value = scale[absN]
    if (value === undefined) return n
    if (isNumber(value)) return value * (isNegative ? -1 : 1)
    return n
  }

  if (isString(n)) {
    // let `px` and `em` values as they are
    if (n.slice(-2) === "px" || n.slice(-2) === "em") return n

    const isNegative = n[0] === "-"
    const absN = isNegative ? n.slice(1) : n

    const value = scale[absN]
    if (isNumber(value)) return value * (isNegative ? -1 : 1)
    return n
  }

  return get(scale, n, n)
}

const marginConfig: Config = {
  margin: {
    property: "margin",
    scale: "space",
    transform: getMargin,
  },
  marginTop: {
    property: "marginTop",
    scale: "space",
    transform: getMargin,
  },
  marginRight: {
    property: "marginRight",
    scale: "space",
    transform: getMargin,
  },
  marginBottom: {
    property: "marginBottom",
    scale: "space",
    transform: getMargin,
  },
  marginLeft: {
    property: "marginLeft",
    scale: "space",
    transform: getMargin,
  },
  marginX: {
    properties: ["marginLeft", "marginRight"],
    scale: "space",
    transform: getMargin,
  },
  marginY: {
    properties: ["marginTop", "marginBottom"],
    scale: "space",
    transform: getMargin,
  },
}
marginConfig.m = marginConfig.margin
marginConfig.mt = marginConfig.marginTop
marginConfig.mr = marginConfig.marginRight
marginConfig.mb = marginConfig.marginBottom
marginConfig.ml = marginConfig.marginLeft
marginConfig.mx = marginConfig.marginX
marginConfig.my = marginConfig.marginY

const paddingConfig: Config = {
  padding: {
    property: "padding",
    scale: "space",
  },
  paddingTop: {
    property: "paddingTop",
    scale: "space",
  },
  paddingRight: {
    property: "paddingRight",
    scale: "space",
  },
  paddingBottom: {
    property: "paddingBottom",
    scale: "space",
  },
  paddingLeft: {
    property: "paddingLeft",
    scale: "space",
  },
  paddingX: {
    properties: ["paddingLeft", "paddingRight"],
    scale: "space",
  },
  paddingY: {
    properties: ["paddingTop", "paddingBottom"],
    scale: "space",
  },
}
paddingConfig.p = paddingConfig.padding
paddingConfig.pt = paddingConfig.paddingTop
paddingConfig.pr = paddingConfig.paddingRight
paddingConfig.pb = paddingConfig.paddingBottom
paddingConfig.pl = paddingConfig.paddingLeft
paddingConfig.px = paddingConfig.paddingX
paddingConfig.py = paddingConfig.paddingY

const margin = system(marginConfig)
const padding = system(paddingConfig)
export const space = compose(margin, padding)
