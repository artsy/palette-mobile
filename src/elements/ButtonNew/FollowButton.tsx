import { CheckmarkIcon } from "@artsy/icons/native"
import { formatLargeNumber } from "../../utils/formatLargeNumber"
import { Button, ButtonProps } from "../Button"
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
  const getLongestText = () => {
    if (longestText) {
      return longestText
    }

    return `Following${
      !!followCount && followCount > 1 ? " " + formatLargeNumber(followCount, 1) : ""
    }`
  }

  return (
    <Button
      variant={isFollowed ? "outline" : "outlineGray"}
      size="small"
      longestText={getLongestText()}
      icon={isFollowed && !loading && <CheckmarkIcon fill="mono60" width="16px" height="16px" />}
      loading={loading}
      {...restProps}
    >
      {!loading && (
        <>
          <Text variant="xs">{isFollowed ? "Following" : "Follow"}</Text>
          {!!followCount && followCount > 1 && (
            <Text variant="xs" color="mono60">
              {" " + formatLargeNumber(followCount, 1)}
            </Text>
          )}
        </>
      )}
    </Button>
  )
}
