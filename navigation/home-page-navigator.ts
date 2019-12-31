import { createStackNavigator } from "react-navigation"
import { DEFAULT_STACK_NAVIGATOR_CONFIG } from "./navigation-config"
import { HomeScreen } from "../screens/home-screen";
import { ViewTourScreen } from "../screens/view-tour-screen";
import { ViewToursScreen } from "../screens/view-tours";
import { WeekendToursScreen } from "../screens/weekend-tours-screen";
import { SearchScreen } from "../screens/search-screen";

export const TourNavigator = createStackNavigator(
  {
    homePage: {
      screen: HomeScreen,
      navigationOptions: {
        header: null
      }
    },
    viewTour: {
      screen: ViewTourScreen,
      navigationOptions: {
        header: null
      }
    },
    viewTours: {
      screen: ViewToursScreen,
      navigationOptions: {
        header: null
      }
    },
    weekendTours: {
      screen: WeekendToursScreen,
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
  },
  DEFAULT_STACK_NAVIGATOR_CONFIG
)


