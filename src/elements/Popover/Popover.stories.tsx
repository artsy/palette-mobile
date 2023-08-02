import { storiesOf } from "@storybook/react-native"
import { useState } from "react"
import { Popover } from "./Popover"
import { Button } from "../Button"
import { Flex } from "../Flex"
import { Text } from "../Text"

storiesOf("Popover", module)
  .add("variants", () => {
    const [visible, setVisible] = useState<string | null>(null)

    return (
      <Flex flex={1} alignSelf="center" mt={12} alignItems="center" flexWrap="wrap">
        <Popover
          visible={visible === "top-dark"}
          title={
            <Text color="white100" variant="xs">
              Popover Top Dark
            </Text>
          }
          onPressOutside={() => setVisible(null)}
          onDismiss={() => setVisible(null)}
        >
          <Text onPress={() => setVisible("top-dark")}>Top Dark</Text>
        </Popover>

        <Popover
          visible={visible === "bottom-dark"}
          placement="bottom"
          title={
            <Text color="white100" variant="xs">
              Popover Bottom Dark
            </Text>
          }
          onPressOutside={() => setVisible(null)}
          onDismiss={() => setVisible(null)}
        >
          <Text onPress={() => setVisible("bottom-dark")}>Bottom Dark</Text>
        </Popover>

        <Popover
          visible={visible === "top-light"}
          placement="top"
          variant="light"
          title={<Text variant="xs">Popover Top Light</Text>}
          onPressOutside={() => setVisible(null)}
          onDismiss={() => setVisible(null)}
        >
          <Text onPress={() => setVisible("top-light")}>Top Light</Text>
        </Popover>

        <Popover
          visible={visible === "bottom-light"}
          placement="bottom"
          variant="light"
          title={<Text variant="xs">Popover Bottom Light</Text>}
          onPressOutside={() => setVisible(null)}
          onDismiss={() => setVisible(null)}
        >
          <Text onPress={() => setVisible("bottom-light")}>Bottom Light</Text>
        </Popover>
      </Flex>
    )
  })
  .add("with title and/or content", () => {
    const [visible, setVisible] = useState<string | null>(null)

    return (
      <Flex flex={1} alignSelf="center" mt={12} alignItems="center" flexWrap="wrap">
        <Popover
          visible={visible === "title"}
          title={
            <Text weight="medium" color="white100">
              Popover title
            </Text>
          }
          content={
            <>
              <Text color="white100">
                Popover descriptive text with some not so long long long body
              </Text>
              <Text color="white100">And some line break</Text>
            </>
          }
          onDismiss={() => setVisible(null)}
        >
          <Text onPress={() => setVisible("title")}>Some title and description</Text>
        </Popover>

        <Popover
          visible={visible === "buttons"}
          placement="bottom"
          variant="light"
          content={
            <>
              <Text weight="medium" mb={1}>
                Popover title
              </Text>
              <Flex height={80} backgroundColor="black30" mb={1} />
              <Text mb={1}>Popover descriptive text</Text>

              <Flex flexDirection="row" justifyContent="flex-end">
                <Button size="small" variant="outlineGray">
                  Learn more
                </Button>
                <Button size="small" ml={1} onPress={() => setVisible(null)}>
                  Got it
                </Button>
              </Flex>
            </>
          }
          onDismiss={() => setVisible(null)}
        >
          <Text onPress={() => setVisible("buttons")}>Buttons and more content</Text>
        </Popover>

        <Popover
          visible={visible === "no-close"}
          placement="bottom"
          noCloseIcon
          variant="light"
          content={
            <>
              <Text weight="medium" mb={1}>
                Popover title?
              </Text>
              <Flex height={80} backgroundColor="black30" mb={1} />
              <Text mb={1}>Popover descriptive text</Text>

              <Button size="small" onPress={() => setVisible(null)}>
                Got it
              </Button>
            </>
          }
          onDismiss={() => setVisible(null)}
        >
          <Text onPress={() => setVisible("no-close")}>Content without close icon</Text>
        </Popover>
      </Flex>
    )
  })
  .add("edge positions", () => {
    const [topVisible, setTopVisible] = useState(true)
    const [bottomVisible, setBottomVisible] = useState(false)
    return (
      <Flex flex={1} backgroundColor="black30" justifyContent="space-between" px={1}>
        <Flex backgroundColor="white100" width={80} px={1}>
          <Popover
            visible={topVisible}
            placement="bottom"
            onDismiss={() => setTopVisible(false)}
            onCloseComplete={() => setBottomVisible(true)}
            title={
              <Text color="white100" variant="xs">
                Top-Left
              </Text>
            }
          >
            <Text>Top-left</Text>
          </Popover>
        </Flex>

        <Flex backgroundColor="white100" width={120} mb={6} alignSelf="flex-end" px={1}>
          <Popover
            visible={bottomVisible}
            onDismiss={() => setBottomVisible(false)}
            title={
              <Text color="white100" variant="xs">
                Bottom-Right
              </Text>
            }
          >
            <Text>Bottom-right</Text>
          </Popover>
        </Flex>
      </Flex>
    )
  })
