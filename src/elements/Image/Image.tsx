import { MotiView } from "moti"
import { useState } from "react"
import { PixelRatio } from "react-native"
import FastImage, { FastImageProps } from "react-native-fast-image"
import { Easing } from "react-native-reanimated"
import { createGeminiUrl } from "../../utils/createGeminiUrl"
import { useScreenDimensions } from "../../utils/hooks/useScreenDimensions"
import { Flex } from "../Flex"
import { Skeleton, SkeletonBox } from "../Skeleton"

type CustomFastImageProps = Omit<FastImageProps, "onLoadStart" | "onLoadEnd" | "source">

export interface ImageProps extends CustomFastImageProps {
  /** Supplied aspect ratio of image. If none provided, defaults to 1 */
  aspectRatio?: number
  /** Supplied width of image. If none provided, defaults to screen width */
  width?: number
  /** Supplied height of image. If none provided, defaults to width / aspectRatio */
  height?: number
  /** Resize on the fly using Gemini. Defaults to true */
  performResize?: boolean
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
  ...imageProps
}) => {
  const [loading, setLoading] = useState(true)
  const dimensions = useImageDimensions({ aspectRatio, width, height })

  let uri = src
  if (performResize && dimensions) {
    uri = createGeminiUrl({
      imageURL: src,
      width: PixelRatio.getPixelSizeForLayoutSize(dimensions.width),
      height: PixelRatio.getPixelSizeForLayoutSize(dimensions.height),
    })
  }

  return (
    <Flex position="relative">
      {!!loading && (
        <Flex position="absolute" zIndex={1}>
          <Skeleton>
            <SkeletonBox {...dimensions} />
          </Skeleton>
        </Flex>
      )}

      <MotiView
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ type: "timing", duration: 400, easing: Easing.sin }}
      >
        <FastImage
          style={[style, dimensions]}
          {...imageProps}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          source={{
            priority: FastImage.priority.normal,
            uri,
          }}
        />
      </MotiView>
    </Flex>
  )
}

const useImageDimensions = (props: Pick<ImageProps, "aspectRatio" | "width" | "height">) => {
  const screenDimensions = useScreenDimensions()

  if (!props.aspectRatio && !props.height && !props.width) {
    return null
  }

  const imageWidth = props.width ?? screenDimensions.width

  let imageHeight

  if (props.height) {
    imageHeight = props.height
  } else {
    if (!props.aspectRatio) {
      console.error("[CachedImage] Error: `aspectRatio` is required if `height` is not provided.")
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
