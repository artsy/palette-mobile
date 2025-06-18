import { memo, useCallback } from "react"
import { PixelRatio, StyleProp, View, ViewStyle } from "react-native"
import { Blurhash } from "react-native-blurhash"
import FastImage, { FastImageProps } from "react-native-fast-image"
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { GeminiResizeMode, createGeminiUrl } from "../../utils/createGeminiUrl"
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
    const loading = useSharedValue(true)
    const dimensions = useImageDimensions({ aspectRatio, width, height })

    const color = useColor()

    const animatedStyles = useAnimatedStyle(() => {
      return {
        opacity: withTiming(loading.get() ? 0 : 1, { duration: 200, easing: Easing.sin }),
      }
    }, [])

    const onAnimationEnd = useCallback(() => {
      "worklet"
      loading.set(() => false)
      // No need to get the js thread involved here
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (showLoadingState) {
      return (
        <ImageSkeleton
          dimensions={dimensions}
          blurhash={blurhash}
          style={{ position: "absolute" }}
        />
      )
    }

    let uri = src
    if (performResize) {
      uri = createGeminiUrl({
        imageURL: src,
        width: PixelRatio.getPixelSizeForLayoutSize(dimensions.width),
        height: PixelRatio.getPixelSizeForLayoutSize(dimensions.height),
        resizeMode: geminiResizeMode,
      })
    }

    return (
      <Flex position="relative" {...flexProps} style={{ ...dimensions }}>
        <View style={[dimensions, { position: "absolute" }]}>
          <ImageSkeleton
            dimensions={dimensions}
            blurhash={blurhash}
            style={{ position: "absolute" }}
          />
        </View>

        <Animated.View style={animatedStyles}>
          <FastImage
            style={[
              dimensions,
              style,
              // If we have a blurhash, we don't want to show a background color
              // That might flash before the image loads
              { backgroundColor: blurhash ? "transparent" : color("mono30") },
            ]}
            resizeMode={resizeMode}
            onLoadEnd={onAnimationEnd}
            source={{
              priority: FastImage.priority.normal,
              uri,
            }}
          />
        </Animated.View>
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
        <Blurhash blurhash={blurhash} style={{ flex: 1 }} decodeWidth={16} decodeHeight={16} />
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
