import { createBottomTabNavigator } from "react-navigation"
import { TourNavigator } from "./home-page-navigator";
import { DEFAULT_BOTTOM_NAVIIGATION } from "./navigation-config"
import { ProfileScreen } from "../screens/profile-screen";

export const MainNavigator = createBottomTabNavigator({
  home: {
    screen: TourNavigator,
    navigationOptions: {
      header: null
    }
  },
  profile: {
    screen: ProfileScreen,
    navigationOptions: {
      header: null
    }
  },
}, DEFAULT_BOTTOM_NAVIIGATION)
