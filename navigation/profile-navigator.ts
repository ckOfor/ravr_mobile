import { createStackNavigator } from "react-navigation"
import { DEFAULT_STACK_NAVIGATOR_CONFIG } from "./navigation-config"
import { ProfileScreen } from "../screens/profile-screen";
import { TripsScreen } from "../screens/trips-screen";
import {SavingsScreen} from "../screens/savings-screen";

export const ProfileNavigator = createStackNavigator(
  {
    profile: {
      screen: ProfileScreen,
      navigationOptions: {
        header: null
      }
    },
    trips: {
      screen: TripsScreen,
      navigationOptions: {
        header: null
      }
    },
    savings: {
      screen: SavingsScreen,
      navigationOptions: {
        header: null
      }
    },
  },
  DEFAULT_STACK_NAVIGATOR_CONFIG
)


