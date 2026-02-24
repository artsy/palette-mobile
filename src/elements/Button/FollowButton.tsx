import { CheckmarkIcon } from "@artsy/icons/native"
import { DEFAULT_ICON_SIZE, DEFAULT_ICON_SIZE_SMALL } from "../../constants"
import { formatLargeNumber } from "../../utils/formatLargeNumber"
import { Button, ButtonProps } from "../Button"
import { Flex } from "../Flex"
import { Text } from "../Text"

type FollowButtonProps = Omit<
  ButtonProps,
  "variant" | "size" | "longestText" | "icon" | "children"
> & {
  isFollowed: boolean
  followCount?: number
  longestText?: string
}

export const FollowButton = ({
  isFollowed,
  followCount,
  longestText,
  loading,
  ...restProps
}: FollowButtonProps) => {
  const followText = isFollowed ? "Following" : "Follow"
  const followCountText =
    !!followCount && followCount > 1 ? " " + formatLargeNumber(followCount, 1) : ""

  const text = followText + followCountText

  return (
    <Button
      variant={isFollowed ? "outline" : "outlineGray"}
      size="small"
      longestText={longestText ? longestText : "Following"}
      icon={
        isFollowed &&
        !loading && (
          <CheckmarkIcon
            fill="mono60"
            width={DEFAULT_ICON_SIZE_SMALL}
            height={DEFAULT_ICON_SIZE_SMALL}
          />
        )
      }
      loading={loading}
      {...restProps}
    >
      {!loading && text}
    </Button>
  )
}
