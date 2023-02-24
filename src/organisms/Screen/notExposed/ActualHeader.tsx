// import { SelectModeConfig } from "app/system/store/selectModeAtoms"
import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated"
import { DEFAULT_HIT_SLOP } from "../../../constants"
import { Button } from "../../../elements/Button"
import { Flex } from "../../../elements/Flex"
import { Spacer } from "../../../elements/Spacer"
import { Text } from "../../../elements/Text"
import { Touchable } from "../../../elements/Touchable"
import { ArrowLeftIcon } from "../../../svgs"
import { useSetHandledTopSafeArea } from "../atoms"

export const NAVBAR_HEIGHT = 44

export interface ActualHeaderProps {
  title?: string

  onBack: () => void

  leftElements?: React.ReactNode
  rightElements?: React.ReactNode

  hideLeftElements?: boolean
  hideRightElements?: boolean

  animatedTitle?: boolean
  titleShown?: boolean

  // selectModeConfig?: Partial<SelectModeConfig>
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
    //   selectModeActive,
    //   selectModeToggle,
    //   selectModeAllSelected,
    //   selectModeSelectAll,
    //   selectModeUnselectAll,
  } = {},
}: ActualHeaderProps) => {
  useSetHandledTopSafeArea(true)
  // const navigation = useNavigation()

  const usingSelectMode = selectModeToggle !== undefined

  if (
    __DEV__ &&
    usingSelectMode &&
    // (selectModeActive === undefined ||
    //   selectModeToggle === undefined ||
    //   selectModeAllSelected === undefined ||
    false
    //   selectModeSelectAll === undefined ||
    //   selectModeUnselectAll === undefined)
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
            // onPress={onBack ? onBack : () => navigation.goBack()}
            onPress={onBack}
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
      {actualLeftElements != null && (
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

      {actualRightElements != null && (
        <Flex flexDirection="row" alignItems="center">
          <Spacer x={1} />
          {actualRightElements}
        </Flex>
      )}
    </Flex>
  )
}
