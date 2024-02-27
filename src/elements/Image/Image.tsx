import { memo } from "react"
import { PixelRatio, Platform, Image as RNImage, ImageProps as RNImageProps } from "react-native"
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

export interface ImageProps {
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
  /** Resize mode */
  resizeMode?: RNImageProps["resizeMode"] | CustomFastImageProps["resizeMode"]
  /** Style */
  style?: CustomFastImageProps["style"]
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
        opacity: withTiming(loading.value ? 1 : 0, { duration: 200, easing: Easing.sin }),
      }
    })

    if (showLoadingState) {
      return <ImageSkeleton dimensions={dimensions} blurhash={blurhash} />
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

    const onAnimationEnd = () => {
      "worklet"
      loading.value = false
    }

    return (
      <Flex position="relative" {...flexProps} style={{ ...dimensions }}>
        {Platform.OS === "android" ? (
          <RNImage
            style={[dimensions, { backgroundColor: color("black30") }]}
            resizeMode={resizeMode}
            source={{ uri }}
            onLoadEnd={onAnimationEnd}
          />
        ) : (
          <FastImage
            style={[
              dimensions,
              style as CustomFastImageProps["style"],
              { backgroundColor: color("black30") },
            ]}
            resizeMode={FastImage.resizeMode.contain}
            onLoadEnd={onAnimationEnd}
            source={{
              priority: FastImage.priority.normal,
              uri,
              cache: FastImage.cacheControl.immutable,
            }}
          />
        )}

        <Animated.View style={[dimensions, { position: "absolute" }, animatedStyles]}>
          <ImageSkeleton dimensions={dimensions} blurhash={blurhash} />
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
}

const ImageSkeleton: React.FC<ImageSkeletonProps> = ({ dimensions, blurhash }) => {
  if (!!blurhash) {
    return (
      <Flex position="absolute" backgroundColor="black10" {...dimensions}>
        <Blurhash blurhash={blurhash} style={{ flex: 1 }} />
      </Flex>
    )
  }

  return (
    <Flex position="absolute">
      <Skeleton>
        <SkeletonBox {...dimensions} />
      </Skeleton>
    </Flex>
  )
}
