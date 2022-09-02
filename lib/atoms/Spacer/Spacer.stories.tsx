import { View } from "react-native"
import { Spacer } from "./Spacer"

export default {
  title: "Spacer",
  component: Spacer,
}

export const Vertical = () => (
  <>
    <View style={{ backgroundColor: "red", width: 10, height: 10 }} />
    <Spacer y={20} />
    <View style={{ backgroundColor: "red", width: 10, height: 10 }} />
  </>
)
