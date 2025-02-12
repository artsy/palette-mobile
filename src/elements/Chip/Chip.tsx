import { useAnimationState, View } from "moti"
import { FC } from "react"
import { useColor, useSpace } from "../../utils/hooks"
import { Flex } from "../Flex"
import { Image } from "../Image"
import { Text } from "../Text"
import { Touchable } from "../Touchable"

export interface ChipProps {
  title: string
  subtitle?: string
  image?: string
  onPress?: () => void
}

export const Chip: FC<ChipProps> = ({ image, title, subtitle, onPress }) => {
  const color = useColor()
  const space = useSpace()

  const animatedState = useAnimationState({
    from: { backgroundColor: color("black10") },
    to: { backgroundColor: color("black5") },
  })

  const handleOnPressIn = () => {
    animatedState.transitionTo("from")
  }

  const handleOnPressOut = () => {
    animatedState.transitionTo("to")
  }

  return (
    <Touchable onPress={onPress} onPressIn={handleOnPressIn} onPressOut={handleOnPressOut}>
      <Flex flexDirection="row" minWidth={200} height={70} overflow="hidden" borderRadius={5}>
        {!!image && <Image src={image} width={70} height={70} />}

        <View
          style={{
            flex: 1,
            padding: space(1),
            justifyContent: "center",
            backgroundColor: color("black5"),
          }}
        >
          {!!subtitle && (
            <Text variant="xs" color="black60" selectable={false}>
              {subtitle}
            </Text>
          )}
          <Text variant="sm-display" selectable={false}>
            {title}
          </Text>
        </View>
      </Flex>
    </Touchable>
  )
}
