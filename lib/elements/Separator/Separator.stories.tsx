import { Spacer } from "../../atoms"
import { Separator } from "./Separator"

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
