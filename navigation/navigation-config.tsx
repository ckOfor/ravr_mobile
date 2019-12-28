import * as React from "react"
import { Platform } from "react-native"
import {
  StackNavigatorConfig,
  NavigationScreenConfigProps,
  TabNavigatorConfig,
  DrawerNavigatorConfig
} from "react-navigation"

import { Icon } from "../components/icon"
import { colors, fonts } from "../theme"

/**
 * The default stack navigator config for this app.
 */
export const DEFAULT_STACK_NAVIGATOR_CONFIG: StackNavigatorConfig = {
  headerMode: "screen",
  defaultNavigationOptions: {
    header: null,
    gesturesEnabled: false,
    headerTitleAllowFontScaling: false
  }
}

/**
 * The default tab navigator config for this app.
 */
export const DEFAULT_TAB_NAVIGATOR_CONFIG: TabNavigatorConfig = {}

/**
 * The default drawer navigator config for this app.
 */
export const DEFAULT_DRAWER_NAVIGATOR_CONFIG: DrawerNavigatorConfig = {
  hideStatusBar: false,
  drawerBackgroundColor: colors.background,
  style: {
    // paddingTop: 40,
    borderTopWidth: 1
  },
  contentOptions: {
    // inactiveTintColor: colors.white,
    activeTintColor: colors.palette.primaryPink,
    activeBackgroundColor: colors.background,
    inactiveBackgroundColor: colors.background,

    labelStyle: {
      // fontSize: 23,
      // fontFamily: fonts.dinLight,
      textTransform: "capitalize",
      // marginVertical: 10,
      // paddingVertical: 10,
      // borderBottomWidth: 1,
      // borderBottomColor: colors.dustyGray,
      // width: "90%"
    }
  }
}
