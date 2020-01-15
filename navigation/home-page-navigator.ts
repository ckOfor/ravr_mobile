import { createStackNavigator } from "react-navigation"
import { DEFAULT_STACK_NAVIGATOR_CONFIG } from "./navigation-config"
import { HomeScreen } from "../screens/home-screen";
import { ViewTourScreen } from "../screens/view-tour-screen";
import { ViewToursScreen } from "../screens/view-tours-screen";
import { WeekendToursScreen } from "../screens/weekend-tours-screen";
import { PaymentScreen } from "../screens/payment-screen";
import { UseCoinsScreen } from "../screens/use-coins-screen";
import { SaveWithCoinsScreen } from "../screens/save-with-coins";
import { PlanPaymentScreen } from "../screens/plan-payment-screen";

export const TourNavigator = createStackNavigator(
  {
    home: {
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
    payment: {
      screen: PaymentScreen,
      navigationOptions: {
        header: null
      }
    },
    useCoins: {
      screen: UseCoinsScreen,
      navigationOptions: {
        header: null
      }
    },
    saveWithCoins: {
      screen: SaveWithCoinsScreen,
      navigationOptions: {
        header: null
      }
    },
    planPayment: {
      screen: PlanPaymentScreen,
      navigationOptions: {
        header: null
      }
    },
  },
  DEFAULT_STACK_NAVIGATOR_CONFIG
)


