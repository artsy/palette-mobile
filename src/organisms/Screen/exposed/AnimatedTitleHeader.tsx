// import { useNavigation } from "@react-navigation/native"
import { RawHeader } from "./RawHeader"
import {
  useAnimatedHeaderSetTitle,
  useAnimatedTitleSmallTitleShown,
  useAnimatedTitleSmallTitleShownSetter,
  useSetHandledTopSafeArea,
  useSetScreenTitleIsAnimated,
} from "../atoms"
import { ActualHeader, ActualHeaderProps } from "../notExposed/ActualHeader"

type AnimatedTitleHeaderProps = Omit<ActualHeaderProps, "animatedTitle" | "titleShown"> &
  Required<Pick<ActualHeaderProps, "title">>

export const AnimatedTitleHeader = ({ title, ...restProps }: AnimatedTitleHeaderProps) => {
  useSetHandledTopSafeArea(true)
  // const navigation = useNavigation()

  useSetScreenTitleIsAnimated(true)
  useAnimatedHeaderSetTitle(title)

  const titleShown = useAnimatedTitleSmallTitleShown()
  const setTitleShown = useAnimatedTitleSmallTitleShownSetter()

  return (
    <RawHeader>
      <ActualHeader
        onBack={() => {
          setTitleShown(false)
          // navigation.goBack()
        }}
        title={title}
        animatedTitle
        titleShown={titleShown}
        {...restProps}
      />
    </RawHeader>
  )
}
AnimatedTitleHeader.defaultProps = { __TYPE: "screen:animated-title-header" }

export const PlaceholderAnimatedTitleHeader = () => (
  <RawHeader>
    <ActualHeader animatedTitle titleShown={false} />
  </RawHeader>
)
PlaceholderAnimatedTitleHeader.defaultProps = { __TYPE: "screen:placeholder:animated-title-header" }
