global.__TEST__ = false

import { AppRegistry } from "react-native"
import { App } from "./src/App"
import { name as appName } from "./app.json"

AppRegistry.registerComponent(appName, () => App)
