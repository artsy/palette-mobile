import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react"
import { PointerPlacementType } from "./ToolTip"
import { Flex } from "../../Flex"

interface PointerProps extends PropsWithChildren {
  pointerPlacement: PointerPlacementType
  mx?: number
}

type PointerStyles =
  | {
      alignSelf: string
      rotate: "180deg"
      flexDirection: "column-reverse"
    }
  | {
      alignSelf: string
      rotate: "0deg"
      flexDirection: "column"
    }

export const Pointer: FC<PointerProps> = ({ children, mx, pointerPlacement }) => {
  const [styles, setStyles] = useState<PointerStyles>({
    rotate: "0deg",
    flexDirection: "column",
    alignSelf: "center",
  })
  const positionPointer = useCallback(() => {
    const top = {
      rotate: "0deg",
      flexDirection: "column",
    } as const
    const bottom = {
      rotate: "180deg",
      flexDirection: "column-reverse",
    } as const

    switch (pointerPlacement) {
      case "bottom-right":
        return {
          ...bottom,
          alignSelf: "flex-end",
        }
      case "bottom-left":
        return {
          ...bottom,
          alignSelf: "flex-start",
        }
      case "bottom":
        return {
          ...bottom,
          alignSelf: "center",
        }
      case "top-right":
        return {
          ...top,
          alignSelf: "flex-end",
        }
      case "top-left":
        return {
          ...top,
          alignSelf: "flex-start",
        }
      case "top":
      default:
        return {
          ...top,
          alignSelf: "center",
        }
    }
  }, [pointerPlacement])

  useEffect(() => {
    const styles = positionPointer()
    setStyles(styles)
  }, [positionPointer])

  return (
    <Flex flexDirection={styles.flexDirection}>
      <Flex
        width={0}
        height={0}
        backgroundColor="transparent"
        borderStyle="solid"
        alignSelf={styles.alignSelf}
        borderLeftWidth={10}
        borderRightWidth={10}
        borderBottomWidth={12}
        borderLeftColor="transparent"
        borderRightColor="transparent"
        borderBottomColor="black100"
        style={{
          transform: [{ rotate: styles.rotate }],
          marginLeft: mx,
          marginRight: mx,
        }}
      />
      {children}
    </Flex>
  )
}
