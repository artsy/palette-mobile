import { Flex } from "../../atoms"
import { SpacerProps } from "../../atoms/Spacer"
import { bullet } from "../../helpers/text"
import { Avatar } from "../Avatar"
import { Text } from "../Text"

interface EntityHeaderProps extends SpacerProps {
  smallVariant?: boolean
  href?: string
  imageUrl?: string
  initials?: string
  meta?: string
  name: string
  FollowButton?: JSX.Element
}

export const EntityHeader = ({
  smallVariant,
  href,
  imageUrl,
  initials,
  name,
  meta,
  FollowButton,
  ...restProps
}: EntityHeaderProps) => {
  const followButton = FollowButton && (
    <Flex
      ml={smallVariant ? 0.5 : 1}
      flexDirection="row"
      alignItems="center"
      justifyContent="flex-end"
    >
      {FollowButton}
    </Flex>
  )

  const headerName = (
    <Text ellipsizeMode="tail" numberOfLines={1} variant="sm" style={{ flexShrink: 1 }}>
      {name}
    </Text>
  )

  const headerMeta = !!meta && (
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

  return (
    <Flex flexDirection="row" flexWrap="nowrap" {...restProps}>
      {!!(imageUrl || initials) && (
        <Flex mr={1} justifyContent="center">
          <Avatar size="xs" src={imageUrl} initials={initials} />
        </Flex>
      )}

      {smallVariant ? (
        <Flex flexDirection="row" justifyContent="flex-start" flexGrow={1} alignItems="center">
          {headerName}

          <Text variant="sm" ml="0.5">
            {bullet}
          </Text>

          {followButton}
        </Flex>
      ) : (
        <Flex justifyContent="space-between" width={0} flexGrow={1} flexDirection="row">
          <Flex alignSelf="center" flexShrink={1}>
            {headerName}
            {headerMeta}
          </Flex>
          {followButton}
        </Flex>
      )}
    </Flex>
  )
}
