import { View } from "moti"
import { FC, useState } from "react"
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

  const [isPressed, setIsPressed] = useState(false)

  const FROM_COLOR = color("mono10")
  const TO_COLOR = color("mono5")

  const handleOnPressIn = () => {
    setIsPressed(true)
  }

  const handleOnPressOut = () => {
    setIsPressed(false)
  }

  return (
    <Touchable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      onPressIn={handleOnPressIn}
      onPressOut={handleOnPressOut}
      noFeedback
    >
      <Flex flexDirection="row" minWidth={200} height={70} overflow="hidden" borderRadius={5}>
        {!!image && <Image src={image} width={70} height={70} />}

        <View
          animate={{
            backgroundColor: !isPressed ? TO_COLOR : FROM_COLOR,
          }}
          style={{
            flex: 1,
            padding: space(1),
            justifyContent: "center",
          }}
        >
          {!!subtitle && (
            <Text variant="xs" color="mono60" selectable={false}>
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
