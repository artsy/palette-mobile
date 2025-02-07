import { isValidElement, useMemo } from "react"
import { Text as RNText } from "react-native"
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
  displayPrivateIcon?: boolean
  theme?: "dark" | "light"
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
  displayPrivateIcon,
  theme = "light",
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
      <RNText ellipsizeMode="tail" numberOfLines={1}>
        <Text
          color={theme === "light" ? "black100" : "white100"}
          variant="sm"
          lineHeight="18px"
          style={{ flexShrink: 1 }}
        >
          {name}
        </Text>
      </RNText>
      {displayPrivateIcon && (
        <LockIcon
          ml="2px"
          width={16}
          height={16}
          testID="lock-icon"
          fill={theme === "light" ? "black100" : "white100"}
        />
      )}
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
          color={theme === "light" ? "black60" : "white100"}
          style={{ flexShrink: 1 }}
        >
          {meta}
        </Text>
      )
    }
    return null
  }, [meta, theme])

  return (
    <Flex flexDirection="row" flexWrap="nowrap" {...restProps}>
      {!!(imageUrl || initials) && (
        <Flex mr={1} justifyContent="center">
          <Avatar
            size={avatarSize}
            src={imageUrl}
            initials={initials}
            color={theme === "light" ? "black100" : "white100"}
          />
        </Flex>
      )}

      {smallVariant ? (
        <Flex flexDirection="row" justifyContent="flex-start" flexGrow={1} alignItems="center">
          {headerName}

          <Text variant="sm" ml="0.5" color={theme === "light" ? "black100" : "white100"}>
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
