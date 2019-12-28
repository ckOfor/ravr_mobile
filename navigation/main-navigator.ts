import { createStackNavigator } from "react-navigation"
import { HomeScreen } from "../screens/home-screen/home-screen";

export const MainNavigator = createStackNavigator({
  home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
}, {
})
