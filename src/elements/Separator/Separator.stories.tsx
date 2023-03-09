import { Separator } from "./Separator"
import { Spacer } from "../Spacer"

export default {
  title: "Separator",
  component: Separator,
}

export const Styled = () => (
  <>
    <Separator />
    <Spacer y={2} />
    <Separator borderColor="red" />
  </>
)
