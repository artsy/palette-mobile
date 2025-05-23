import { CheckIcon } from "../../svgs/CheckIcon"
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
  return (
    <Button
      variant={isFollowed ? "outline" : "outlineGray"}
      size="small"
      longestText={longestText ? longestText : "Following"}
      icon={isFollowed && !loading && <CheckIcon fill="mono60" width="16px" height="16px" />}
      loading={loading}
      {...restProps}
    >
      {!loading && (
        <>
          <Text variant="xs">{isFollowed ? "Following" : "Follow"}</Text>
          {!!followCount && followCount > 1 && (
            <>
              <Text variant="xs" color="mono60">
                {" " + formatLargeNumber(followCount, 1)}
              </Text>
            </>
          )}
        </>
      )}
    </Button>
  )
}
