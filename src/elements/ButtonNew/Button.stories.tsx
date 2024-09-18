import { capitalize } from "lodash"
import { useState } from "react"
import { Button as RNButton } from "react-native"
import { Button, ButtonProps } from "./Button"
import { CTAButton } from "./CTAButton"
import { FollowButton } from "./FollowButton"
import { LinkButton } from "./LinkButton"
import { DataList, List } from "../../storybook/helpers"
import { BellIcon, LinkIcon } from "../../svgs"
import { Wrap } from "../../utils/Wrap"
import { NoUndefined } from "../../utils/types"
import { Box } from "../Box"
import { Flex } from "../Flex"
import { Spacer } from "../Spacer"
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
  title: "ButtonNew",
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
        {variants.map((variant) => (
          <LinkText color="orange" onPress={() => setVariant(variant)} mr="2">
            {variant}
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
      <Button variant={variant} onPress={() => console.log(`tapped`)} testOnly_pressed>
        Pressed
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
    renderItem={({ item: variant }) => (
      <Button variant={variant} loading onPress={() => console.log(`tapped ${variant}`)}>
        {variant}
      </Button>
    )}
  />
)

export const VariantsDisabled = () => (
  <DataList
    data={variants}
    renderItem={({ item: variant }) => (
      <Wrap if={variant === "outlineLight"}>
        <Flex backgroundColor="black100" p={1}>
          <Wrap.Content>
            <Button variant={variant} disabled onPress={() => console.log(`tapped ${variant}`)}>
              {variant}
            </Button>
          </Wrap.Content>
        </Flex>
      </Wrap>
    )}
  />
)

export const TheFollowButton = () => {
  const [follow, setFollow] = useState(true)

  return (
    <List>
      <FollowButton isFollowed={follow} onPress={() => setFollow((v) => !v)} />
      <FollowButton followCount={4} isFollowed={follow} onPress={() => setFollow((v) => !v)} />
      <FollowButton followCount={40} isFollowed={follow} onPress={() => setFollow((v) => !v)} />
      <FollowButton followCount={4000} isFollowed={follow} onPress={() => setFollow((v) => !v)} />
      <FollowButton followCount={400000} isFollowed={follow} onPress={() => setFollow((v) => !v)} />
      <FollowButton
        followCount={40000000}
        isFollowed={follow}
        onPress={() => setFollow((v) => !v)}
      />
      <FollowButton
        followCount={4000000000}
        isFollowed={follow}
        onPress={() => setFollow((v) => !v)}
      />
    </List>
  )
}

export const TheCTAButton = () => (
  <List>
    <CTAButton onPress={() => console.log("pressed")}>cta button</CTAButton>
  </List>
)

export const TheLinkButton = () => (
  <List>
    <LinkButton onPress={() => console.log("pressed")}>LinkButton</LinkButton>
  </List>
)

export const Miscellaneous = () => (
  <List>
    <Button loading disabled>
      loading and disabled
    </Button>
    <Button loading disabled icon={<LinkIcon />}>
      loading and disabled with icon
    </Button>
    <Button block>block</Button>
    <Flex
      backgroundColor="orange"
      width={400}
      height={80}
      alignItems="center"
      justifyContent="center"
    >
      <Button variant="fillLight" icon={<LinkIcon />}>
        left icon
      </Button>
    </Flex>
    <Button icon={<LinkIcon fill="white100" />} iconPosition="right">
      right icon
    </Button>
    <Button size="small" icon={<LinkIcon fill="white100" />} iconPosition="right">
      Right Icon Small
    </Button>
    <Button
      variant="fillDark"
      size="small"
      icon={<BellIcon fill="white100" width="16px" height="16px" />}
    >
      Create Alert
    </Button>
    <Box flexDirection="row">
      <Box width={2} height="100%" backgroundColor="green100" />
      <Box>
        <Button
          size="small"
          icon={<LinkIcon fill="white100" />}
          iconPosition="right"
          longestText="this is a very long text"
        >
          shortest text
        </Button>
        <Spacer y={1} />
        <Button
          size="small"
          icon={<LinkIcon fill="white100" />}
          iconPosition="right"
          longestText="this is a very long text"
        >
          this is a very long text
        </Button>
      </Box>
      <Box width={2} height="100%" backgroundColor="green100" />
    </Box>
    <Button icon={<LinkIcon fill="white100" />} block iconPosition="left-start">
      left-start aligned icon
    </Button>
  </List>
)

export const Playground = () => {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [block, setBlock] = useState(false)

  return (
    <>
      <RNButton title="loading" onPress={() => setLoading((v) => !v)} />
      <RNButton title="disabled" onPress={() => setDisabled((v) => !v)} />
      <RNButton title="block" onPress={() => setBlock((v) => !v)} />
      <List>
        <Button
          loading={loading}
          disabled={disabled}
          block={block}
          longestText="loading false, disabled false, block false"
        >
          loading {loading ? "true" : "false"}, disabled {disabled ? "true" : "false"}, block{" "}
          {block ? "true" : "false"}
        </Button>
      </List>
    </>
  )
}

export const SpacingAround = () => (
  <Box>
    <Button m={2}>wow 1</Button>
    <Button>wow 2</Button>
  </Box>
)
