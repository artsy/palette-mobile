import { isValidElement, useMemo } from "react"
import { LockIcon } from "../../svgs"
import { bullet } from "../../utils/text"
import { Avatar, AvatarSize } from "../Avatar"
import { Flex, FlexProps } from "../Flex"
import { Text } from "../Text"

export interface EntityHeaderProps extends FlexProps {
  avatarSize?: AvatarSize
  /**
   * @deprecated Use `RightButton` instead
   */
  FollowButton?: JSX.Element
  RightButton?: JSX.Element
  imageUrl?: string
  initials?: string
  meta?: string | JSX.Element
  name: string
  smallVariant?: boolean
  showLockIcon?: boolean
}

export const EntityHeader = ({
  avatarSize = "xs",
  FollowButton,
  RightButton,
  imageUrl,
  initials,
  meta,
  name,
  smallVariant = false,
  showLockIcon,
  ...restProps
}: EntityHeaderProps) => {
  const rightButton = (RightButton || FollowButton) && (
    <Flex
      ml={smallVariant ? 0.5 : 1}
      flexDirection="row"
      alignItems="center"
      justifyContent="flex-end"
    >
      {RightButton || FollowButton}
    </Flex>
  )

  const headerName = (
    <Flex flexDirection="row" alignItems="center">
      <Text
        ellipsizeMode="tail"
        numberOfLines={1}
        variant="sm"
        lineHeight="18px"
        style={{ flexShrink: 1 }}
      >
        {name}
      </Text>
      {showLockIcon && <LockIcon ml="2px" />}
    </Flex>
  )

  const headerMeta = useMemo(() => {
    if (meta) {
      if (isValidElement(meta)) {
        return meta
      }

      return (
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          variant="xs"
          color="black60"
          style={{ flexShrink: 1 }}
        >
          {meta}
        </Text>
      )
    }
    return null
  }, [meta])

  return (
    <Flex flexDirection="row" flexWrap="nowrap" {...restProps}>
      {!!(imageUrl || initials) && (
        <Flex mr={1} justifyContent="center">
          <Avatar size={avatarSize} src={imageUrl} initials={initials} />
        </Flex>
      )}

      {smallVariant ? (
        <Flex flexDirection="row" justifyContent="flex-start" flexGrow={1} alignItems="center">
          {headerName}

          <Text variant="sm" ml="0.5">
            {bullet}
          </Text>

          {rightButton}
        </Flex>
      ) : (
        <Flex justifyContent="space-between" width={0} flexGrow={1} flexDirection="row">
          <Flex alignSelf="center" flexShrink={1}>
            {headerName}
            {headerMeta}
          </Flex>
          {rightButton}
        </Flex>
      )}
    </Flex>
  )
}
