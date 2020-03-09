import { createStackNavigator } from "react-navigation"
import { DEFAULT_STACK_NAVIGATOR_CONFIG } from "./navigation-config"
import { LocationPermissionScreen } from "../screens/permissions-screen";
import { LandingScreen } from "../screens/landing-screen";
import { AuthSignInScreen } from "../screens/auth-sign-in-screen";
import { ForgotPasswordScreen } from "../screens/forgot-password-screen";
import { AuthSignUpScreen } from "../screens/auth-sign-up-screen";
import { PhoneVerificationScreen } from "../screens/phone-verification-screen";
import { ReferralScreen } from "../screens/referal-screen";
import { IntroScreen } from "../screens/intro-screen";
import { IntroSearchScreen } from "../screens/intro-search-screen";
import { IntroViewTourScreen } from "../screens/intro-view-tour";

export const AuthNavigator = createStackNavigator(
  {
    intro: {
      screen: IntroScreen,
      navigationOptions: {
        header: null
      }
    },
    introSearch: {
      screen: IntroSearchScreen,
      navigationOptions: {
        header: null
      }
    },
    introViewTour: {
      screen: IntroViewTourScreen,
      navigationOptions: {
        header: null
      }
    },
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
    referral: {
      screen: ReferralScreen,
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
    authSignUp: {
      screen: AuthSignUpScreen,
      navigationOptions: {
        header: null
      }
    },
    phoneVerification: {
      screen: PhoneVerificationScreen,
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
  DEFAULT_STACK_NAVIGATOR_CONFIG,
)


