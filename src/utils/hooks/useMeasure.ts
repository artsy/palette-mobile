import { MutableRefObject, useEffect, useState } from "react"

type Position = {
  x: number
  y: number
  width: number
  height: number
  pageX: number
  pageY: number
}

/*
  useMeasure is a hook that measures the position of a ref element
  and returns the x, y, width, height, pageX, pageY of the element
*/
export const useMeasure = ({
  ref,
  extraDeps = [],
}: {
  ref: MutableRefObject<any>
  extraDeps?: Array<string>
}) => {
  const [position, setPosition] = useState<null | Position>(null)

  useEffect(() => {
    ref.current?.measure(
      (x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
        setPosition({
          x,
          y,
          width,
          height,
          pageX,
          pageY,
        })
      },
      () => {
        console.error("measurement failed")
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(position), ref, ...extraDeps])

  return { ...position }
}
