import { RawHeader } from "./RawHeader"
import { useSetHandledTopSafeArea, useSetScreenTitleIsAnimated } from "../atoms"
import { ActualHeader, ActualHeaderProps } from "../notExposed/ActualHeader"

type HeaderProps = Omit<ActualHeaderProps, "animatedTitle" | "titleShown">

export const Header = (props: HeaderProps) => {
  useSetHandledTopSafeArea(true)
  useSetScreenTitleIsAnimated(false)

  return (
    <RawHeader>
      <ActualHeader {...props} animatedTitle={false} />
    </RawHeader>
  )
}
Header.defaultProps = { __TYPE: "screen:header" }
