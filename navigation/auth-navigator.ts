import { createStackNavigator } from "react-navigation"
import { DEFAULT_STACK_NAVIGATOR_CONFIG } from "./navigation-config"
import { LocationPermissionScreen } from "../screens/permissions-screen/permissions-screen";

export const AuthNavigator = createStackNavigator(
  {
    permission: {
      screen: LocationPermissionScreen,
      navigationOptions: {
        header: null
      }
    },
  },
  DEFAULT_STACK_NAVIGATOR_CONFIG
)


