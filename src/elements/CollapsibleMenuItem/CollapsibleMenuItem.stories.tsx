import { useRef, useState } from "react"
import { ScrollView, View } from "react-native"
import { CollapsibleMenuItem } from "./CollapsibleMenuItem"
import { Button } from "../Button"
import { Flex } from "../Flex"
import { Join } from "../Join"
import { Separator } from "../Separator"
import { Spacer } from "../Spacer"
import { Text } from "../Text"

export const ArtworkDetails = ({ handlePress }: { handlePress: () => void }) => {
  return (
    <Flex backgroundColor="peachpuff" p={1} mt={1}>
      <Text>ArtworkDetails content</Text>
      <Spacer y={1} />
      <CTAButton text="Save & Continue" onPress={handlePress} />
    </Flex>
  )
}

export const UploadPhotos = ({ handlePress }: { handlePress: () => void }) => {
  return (
    <Flex backgroundColor="peachpuff" p={1} mt={1}>
      <Text>Upload Photos content</Text>
      <Spacer y={1} />
      <CTAButton text="Save & Continue" onPress={handlePress} />
    </Flex>
  )
}

export const ContactInformation = ({ handlePress }: { handlePress: () => void }) => {
  return (
    <Flex backgroundColor="peachpuff" p={1} mt={1}>
      <Text>ContactInformation content</Text>
      <Spacer y={1} />
      <CTAButton text="Submit Artwork" onPress={handlePress} />
    </Flex>
  )
}
const CTAButton = ({ onPress, text }: { onPress: () => void; text: string }) => (
  <Button block haptic maxWidth={540} onPress={onPress}>
    {text}
  </Button>
)

export const DisplayContent = () => {
  return (
    <View style={{ backgroundColor: `rgba(255,145,125,.3)`, padding: 20, marginTop: 20 }}>
      <Text>This is the collapsible menu content</Text>
    </View>
  )
}

export const ComponentWithCollapsibleMenu = () => {
  const items = [
    {
      overtitle: "Optional overtitle",
      title: "Artwork Details",
      Content: (
        <ArtworkDetails
          handlePress={() => {
            expandCollapsibleMenuContent(1)
            enableStep(1)
          }}
        />
      ),
    },
    {
      overtitle: "Optional overtitle",
      title: "Upload Photos",
      Content: (
        <UploadPhotos
          handlePress={() => {
            expandCollapsibleMenuContent(2)
            enableStep(2)
          }}
        />
      ),
    },
    {
      overtitle: "Optional overtitle",
      title: "Contact Information",
      Content: (
        <ContactInformation
          handlePress={() => {
            // navigation.navigate("ArtworkSubmittedScreen")
            // do nothing
          }}
        />
      ),
    },
  ]

  const TOTAL_STEPS = items.length

  const [validSteps, setValidSteps] = useState([true, ...new Array(TOTAL_STEPS - 1).fill(false)])

  const stepsRefs = useRef<CollapsibleMenuItem[]>(new Array(TOTAL_STEPS).fill(null)).current

  const enableStep = (stepIndex: number) => {
    const newValidSteps = [...validSteps]
    newValidSteps[stepIndex] = true
    setValidSteps(newValidSteps)
  }

  const expandCollapsibleMenuContent = (indexToExpand: number) => {
    items.forEach((_, index) => {
      if (indexToExpand !== index) {
        stepsRefs[index].collapse()
      } else {
        if (index > 0) {
          stepsRefs[index - 1].completed()
        }
        stepsRefs[index].expand()
      }
    })
  }
  return (
    <View style={{ margin: 20 }}>
      <Flex>
        <ScrollView
          contentContainerStyle={{
            paddingVertical: 20,
            paddingHorizontal: 20,
            justifyContent: "center",
          }}
        >
          <Spacer y={4} />
          <Join separator={<Separator my={2} marginTop="40" marginBottom="20" />}>
            {items.map(({ overtitle, title, Content }, index) => {
              const disabled = !validSteps[index]
              return (
                <CollapsibleMenuItem
                  key={index}
                  overtitle={overtitle}
                  title={title}
                  onExpand={() => expandCollapsibleMenuContent(index)}
                  isExpanded={index === 0}
                  disabled={disabled}
                  ref={(ref) => {
                    if (ref) {
                      stepsRefs[index] = ref
                    }
                  }}
                >
                  {Content}
                </CollapsibleMenuItem>
              )
            })}
          </Join>
        </ScrollView>
      </Flex>
    </View>
  )
}

export default {
  title: "Collapsible Menu ",

  excludeStories: [
    "ArtworkDetails",
    "UploadPhotos",
    "ContactInformation",
    "DisplayContent",
    "ComponentWithCollapsibleMenu",
  ],
}

export const CollapseCollapseItems = () => (
  <>
    <ComponentWithCollapsibleMenu />
  </>
)
