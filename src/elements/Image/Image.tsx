import { MotiView } from "moti"
import { useState } from "react"
import { PixelRatio } from "react-native"
import { Blurhash } from "react-native-blurhash"
import FastImage, { FastImageProps } from "react-native-fast-image"
import { Easing } from "react-native-reanimated"
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
  blurhash?: string
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

export const Image: React.FC<ImageProps> = ({
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
  const [loading, setLoading] = useState(true)
  const [hideSkeleton, setHideSkeleton] = useState(false)
  const dimensions = useImageDimensions({ aspectRatio, width, height })
  const color = useColor()

  if (showLoadingState) {
    return (
      <Skeleton>
        <SkeletonBox {...dimensions} />
      </Skeleton>
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
    <Flex position="relative" {...flexProps}>
      <MotiView
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ type: "timing", duration: 400, easing: Easing.sin }}
        onDidAnimate={(_, didAnimationFinish, __, { attemptedValue }) => {
          if (didAnimationFinish && attemptedValue === 1) {
            setHideSkeleton(true)
          }
        }}
      >
        <FastImage
          style={[dimensions, style, { backgroundColor: color("black30") }]}
          resizeMode={resizeMode}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          source={{
            priority: FastImage.priority.normal,
            uri,
          }}
        />
      </MotiView>

      {!hideSkeleton && <ImageSkeleton dimensions={dimensions} blurhash={blurhash} />}
    </Flex>
  )
}

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

type ImageSkeletonProps = { dimensions: { width: number; height: number }; blurhash?: string }

const ImageSkeleton: React.FC<ImageSkeletonProps> = ({ dimensions, blurhash }) => {
  if (!!blurhash) {
    return (
      <Flex position="absolute" zIndex={-1} {...dimensions}>
        <Blurhash blurhash={blurhash} style={{ flex: 1 }} />
      </Flex>
    )
  }

  return (
    <Flex position="absolute" zIndex={-1}>
      <Skeleton>
        <SkeletonBox {...dimensions} />
      </Skeleton>
    </Flex>
  )
}
