import { createBottomTabNavigator } from "react-navigation"
import { TourNavigator } from "./home-page-navigator";
import { DEFAULT_BOTTOM_NAVIIGATION } from "./navigation-config"
import { SearchScreen } from "../screens/search-screen";
import { ProfileNavigator } from "./profile-navigator";
import { ContactUsScreen } from "../screens/contact-us-screen";

export const MainNavigator = createBottomTabNavigator({
  home: {
    screen: TourNavigator,
    navigationOptions: {
      header: null
    }
  },
  search: {
    screen: SearchScreen,
    navigationOptions: {
      header: null
    }
  },
  contactUs: {
    screen: ContactUsScreen,
    navigationOptions: {
      header: null
    }
  },
  profile: {
    screen: ProfileNavigator,
    navigationOptions: {
      header: null
    }
  },
}, DEFAULT_BOTTOM_NAVIIGATION)
