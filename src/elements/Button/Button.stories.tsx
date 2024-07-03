import { capitalize } from "lodash"
import { useState } from "react"
import { Button, ButtonProps } from "./Button"
import { DataList, List } from "../../storybook/helpers"
import { Wrap } from "../../utils/Wrap"
import { NoUndefined } from "../../utils/types"
import { Flex } from "../Flex"
import { LinkText } from "../Text"

const sizes: Array<NoUndefined<ButtonProps["size"]>> = ["small", "large"]
const variants: Array<NoUndefined<ButtonProps["variant"]>> = [
  "fillDark",
  "fillLight",
  "fillGray",
  "fillSuccess",
  "outline",
  "outlineGray",
  "outlineLight",
  "text",
]

export default {
  title: "Button",
  component: Button,
}

export const Sizes = () => (
  <DataList
    data={sizes}
    renderItem={({ item: size }) => (
      <Button size={size} onPress={() => console.log(`tapped ${size}`)}>
        {capitalize(size)}
      </Button>
    )}
  />
)

export const States = () => {
  const [variant, setVariant] = useState<NoUndefined<ButtonProps["variant"]>>("fillDark")

  return (
    <List>
      <Flex flexDirection="row" flexWrap="wrap" px={2}>
        {variants.map((v) => (
          <LinkText color="orange" onPress={() => setVariant(v)} mr="2">
            {v}
          </LinkText>
        ))}
      </Flex>
      <Button variant={variant} onPress={() => console.log(`tapped`)} longestText="Regular YEA">
        Regular
      </Button>
      <Button variant={variant} onPress={() => console.log(`tapped`)} disabled>
        Disabled
      </Button>
      <Button variant={variant} onPress={() => console.log(`tapped`)} loading>
        Loading
      </Button>
    </List>
  )
}

export const Variants = () => (
  <DataList
    data={variants}
    renderItem={({ item: variant }) => (
      <Wrap if={variant === "outlineLight" || variant === "fillLight"}>
        <Flex backgroundColor="pink" p={1}>
          <Wrap.Content>
            <Button variant={variant} onPress={() => console.log(`tapped ${variant}`)}>
              {variant}
            </Button>
          </Wrap.Content>
        </Flex>
      </Wrap>
    )}
  />
)

export const VariantsLoading = () => (
  <DataList
    data={variants}
    renderItem={({ item: variant }) => {
      if (variant !== "outlineLight") {
        return (
          <Button variant={variant} loading onPress={() => console.log(`tapped ${variant}`)}>
            {variant}
          </Button>
        )
      }
      return (
        <Flex backgroundColor="pink" py={0.5}>
          <Button variant={variant} loading onPress={() => console.log(`tapped ${variant}`)}>
            {variant}
          </Button>
        </Flex>
      )
    }}
  />
)
