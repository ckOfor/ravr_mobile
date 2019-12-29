import { createStackNavigator } from "react-navigation"
import { DEFAULT_STACK_NAVIGATOR_CONFIG } from "./navigation-config"
import { LocationPermissionScreen } from "../screens/permissions-screen";
import { LandingScreen } from "../screens/landing-screen";
import { AuthSignInScreen } from "../screens/auth-sign-in-screen";
import {ForgotPasswordScreen} from "../screens/forgot-password-screen";

export const AuthNavigator = createStackNavigator(
  {
    landing: {
      screen: LandingScreen,
      navigationOptions: {
        header: null
      }
    },
    authSignIn: {
      screen: AuthSignInScreen,
      navigationOptions: {
        header: null
      }
    },
    forgotPassword: {
      screen: ForgotPasswordScreen,
      navigationOptions: {
        header: null
      }
    },
    permission: {
      screen: LocationPermissionScreen,
      navigationOptions: {
        header: null
      }
    },
  },
  DEFAULT_STACK_NAVIGATOR_CONFIG
)


