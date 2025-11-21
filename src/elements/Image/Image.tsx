import FastImage, { FastImageProps } from "@d11/react-native-fast-image"
import { memo, useState } from "react"
import { StyleProp, ViewStyle } from "react-native"
// @ts-expect-error
import { Blurhash } from "react-native-blurhash"
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { scheduleOnRN } from "react-native-worklets"
import { getImageURL } from "./helpers/getImageURL"
import { DEFAULT_ANIMATION_DURATION } from "../../constants"
import { GeminiResizeMode } from "../../utils/createGeminiUrl"
import { useColor } from "../../utils/hooks"
import { useScreenDimensions } from "../../utils/hooks/useScreenDimensions"
import { Flex } from "../Flex"
import { Skeleton, SkeletonBox } from "../Skeleton"

type CustomFastImageProps = Omit<FastImageProps, "onLoadStart" | "onLoadEnd" | "source">

export interface ImageProps extends CustomFastImageProps {
  /** Supplied aspect ratio of image. If none provided, defaults to 1 */
  aspectRatio?: number
  /** BlurHash code */
  blurhash?: string | null | undefined
  /** Gemini resize_to param  */
  geminiResizeMode?: GeminiResizeMode
  /** Resize on the fly using Gemini. Defaults to true */
  performResize?: boolean
  /** Supplied height of image. If none provided, defaults to width / aspectRatio */
  height?: number
  /** Supplied width of image. If none provided, defaults to screen width */
  width?: number
  /** Show loading state  */
  showLoadingState?: boolean
  /** Source url to the image  */
  src: string
}

export const Image: React.FC<ImageProps> = memo(
  ({
    aspectRatio,
    width,
    height,
    performResize = true,
    src,
    style,
    resizeMode,
    geminiResizeMode,
    showLoadingState = false,
    blurhash,
    ...flexProps
  }) => {
    const [isLoading, setIsLoading] = useState(true)
    const dimensions = useImageDimensions({ aspectRatio, width, height })
    const opacity = useSharedValue(1)

    const color = useColor()

    const onLoadEnd = () => {
      opacity.value = withSpring(0, { duration: DEFAULT_ANIMATION_DURATION }, () => {
        scheduleOnRN(setIsLoading, false)
      })
    }

    const skeletonStyle = useAnimatedStyle(() => {
      return {
        opacity: opacity.value,
      }
    })

    if (showLoadingState) {
      // Keep logic as small as possible here to save on performance
      return <Flex backgroundColor="mono10" {...dimensions} style={{ position: "absolute" }} />
    }

    return (
      <Flex position="relative" {...flexProps} style={{ ...dimensions }}>
        <FastImage
          style={[
            dimensions,
            style,
            // If we have a blurhash, we don't want to show a background color
            // That might flash before the image loads
            { backgroundColor: blurhash ? "transparent" : color("mono30") },
          ]}
          resizeMode={resizeMode}
          onLoadEnd={onLoadEnd}
          source={{
            priority: FastImage.priority.normal,
            uri: getImageURL({ src, dimensions, geminiResizeMode, performResize }),
          }}
        />

        {isLoading && (
          <Animated.View style={[dimensions, { position: "absolute" }, skeletonStyle]}>
            <ImageSkeleton
              dimensions={dimensions}
              blurhash={blurhash}
              style={{ position: "absolute" }}
            />
          </Animated.View>
        )}
      </Flex>
    )
  }
)

const useImageDimensions = (props: Pick<ImageProps, "aspectRatio" | "width" | "height">) => {
  const screenDimensions = useScreenDimensions()

  const imageWidth = props.width ?? screenDimensions.width

  let imageHeight

  if (props.height) {
    imageHeight = props.height
  } else {
    if (!props.aspectRatio) {
      console.error("[Image] Error: `aspectRatio` is required if `height` is not provided.")
    }

    const aspectRatio = props.aspectRatio ?? 1
    imageHeight = imageWidth / aspectRatio
  }

  const dimensions = {
    width: imageWidth,
    height: imageHeight,
  }

  return dimensions
}

type ImageSkeletonProps = {
  dimensions: { width: number; height: number }
  blurhash?: string | null | undefined
  style?: StyleProp<ViewStyle>
}

export const ImageSkeleton: React.FC<ImageSkeletonProps> = ({ dimensions, blurhash, style }) => {
  if (!!blurhash) {
    return (
      <Flex backgroundColor="mono10" {...dimensions} style={style}>
        <Blurhash
          blurhash={blurhash}
          style={{ flex: 1 }}
          decodeWidth={16}
          decodeHeight={16}
          decodeAsync
        />
      </Flex>
    )
  }

  return (
    <Flex style={style}>
      <Skeleton>
        <SkeletonBox {...dimensions} />
      </Skeleton>
    </Flex>
  )
}
