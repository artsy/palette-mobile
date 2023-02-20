// import { Button, DEFAULT_HIT_SLOP, Spacer } from "@artsy/palette-mobile"
// import { ArrowLeftIcon, Flex, Text, Touchable } from "@artsy/palette-mobile"
// import { useNavigation } from "@react-navigation/native"
// import { SelectModeConfig } from "app/system/store/selectModeAtoms"
import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated"
import { useSetHandledTopSafeArea } from "../atoms"

export const NAVBAR_HEIGHT = 44

export interface ActualHeaderProps {
  title?: string

  onBack?: () => void

  leftElements?: React.ReactNode
  rightElements?: React.ReactNode

  hideLeftElements?: boolean
  hideRightElements?: boolean

  animatedTitle?: boolean
  titleShown?: boolean

  selectModeConfig?: Partial<SelectModeConfig>
}

export const ActualHeader = ({
  leftElements,
  hideLeftElements,
  rightElements,
  hideRightElements,
  title,
  onBack,
  animatedTitle = false,
  titleShown = false,
  selectModeConfig: {
    selectModeActive,
    selectModeToggle,
    selectModeAllSelected,
    selectModeSelectAll,
    selectModeUnselectAll,
  } = {},
}: ActualHeaderProps) => {
  useSetHandledTopSafeArea(true)
  const navigation = useNavigation()

  const usingSelectMode = selectModeToggle !== undefined

  if (
    __DEV__ &&
    usingSelectMode &&
    (selectModeActive === undefined ||
      selectModeToggle === undefined ||
      selectModeAllSelected === undefined ||
      selectModeSelectAll === undefined ||
      selectModeUnselectAll === undefined)
  ) {
    console.warn("For select mode, you need all `selectMode*` props defined.")
    return null
  }

  const actualLeftElements = (() => {
    switch (true) {
      case hideLeftElements: {
        return null
      }
      case leftElements !== undefined: {
        return leftElements
      }
      case usingSelectMode && selectModeActive: {
        return (
          <Button
            size="small"
            variant="fillGray"
            onPress={selectModeAllSelected ? selectModeUnselectAll : selectModeSelectAll}
            longestText="Unselect All"
          >
            {selectModeAllSelected ? "Unselect All" : "Select All"}
          </Button>
        )
      }
      default: {
        return (
          <Touchable
            onPress={onBack ? onBack : () => navigation.goBack()}
            underlayColor="transparent"
            hitSlop={DEFAULT_HIT_SLOP}
          >
            <ArrowLeftIcon fill="onBackgroundHigh" />
          </Touchable>
        )
      }
    }
  })()

  const actualRightElements = (() => {
    switch (true) {
      case hideRightElements: {
        return null
      }
      case usingSelectMode: {
        return (
          <Button size="small" variant="fillGray" onPress={selectModeToggle} longestText="Cancel">
            {selectModeActive ? "Cancel" : "Select"}
          </Button>
        )
      }
      default: {
        return rightElements
      }
    }
  })()

  const actualTitle = (
    <Text variant="md" numberOfLines={1}>
      {title}
    </Text>
  )

  return (
    <Flex height={NAVBAR_HEIGHT} flexDirection="row" px={2}>
      {!!actualLeftElements && (
        <Flex flexDirection="row" alignItems="center">
          {actualLeftElements}
          <Spacer x={1} />
        </Flex>
      )}

      <Flex flex={1} flexDirection="row" alignItems="center">
        {title !== undefined &&
          (animatedTitle
            ? titleShown && (
                <Animated.View
                  entering={FadeInLeft}
                  exiting={FadeOutLeft}
                  style={{
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    flex: 1,
                  }}
                >
                  {actualTitle}
                </Animated.View>
              )
            : actualTitle)}
      </Flex>

      {!!actualRightElements && (
        <Flex flexDirection="row" alignItems="center">
          <Spacer x={1} />
          {actualRightElements}
        </Flex>
      )}
    </Flex>
  )
}
