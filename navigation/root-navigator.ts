import { createSwitchNavigator } from "react-navigation"
import { AuthNavigator } from "./auth-navigator"
import { MainNavigator } from "./main-navigator";

export const RootNavigator = createSwitchNavigator({
  Main: { screen: MainNavigator },
  Auth: { screen: AuthNavigator },
})
