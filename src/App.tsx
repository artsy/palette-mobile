import { Text, View } from "react-native"
import { Spacer } from "../lib"

export const App = () =>
   (
    <View style={{ flex: 1 }}>
      <Text>wow</Text>
      <Spacer y={2} />
      <Spacer y={202} />
      <Text>wow2</Text>
    </View>
  )

