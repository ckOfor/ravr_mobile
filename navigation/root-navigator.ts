import { createSwitchNavigator } from "react-navigation"
import { AuthNavigator } from "./auth-navigator"
import { MainNavigator } from "./main-navigator";

export const RootNavigator = createSwitchNavigator({
  Auth: { screen: AuthNavigator },
  Main: { screen: MainNavigator },
})

