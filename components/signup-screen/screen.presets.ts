import { ViewStyle, Dimensions, Platform } from "react-native"
import { colors } from "../../theme"
import { HEADER_HEIGHT } from "../../components/header"
import { isIphoneX } from "react-native-iphone-x-helper"
import { isNil } from "lodash"

/**
 * Vertical offsets for keyboard are calculated based on header
 * and tab-bar heights and the paddings added to each from
 * SaFeAreaView as seen here: https://github.com/react-native-community/react-native-safe-area-view/blob/master/index.js
 */
const isAndroid = Platform.OS === "android"
export const TABBAR_PADDING = isIphoneX ? 34 : 0
export const HEADER_PADDING = isAndroid ? 0 : isIphoneX ? 20 : 20

export const offsets = {
  none: 0,
  header: HEADER_HEIGHT + HEADER_PADDING,
  "no-header": HEADER_PADDING
}

/**
 * All the variations of screens.
 */
export const presets = {
  /**
   * No scrolling. Suitable for full-screen carousels and components
   * which have built-in scrolling like FlatList.
   */
  fixed: {
    outer: {
      backgroundColor: colors.background,
      flex: 1,
      height: "100%"
    } as ViewStyle,
    inner: {
      justifyContent: "flex-start",
      alignItems: "stretch",
      height: "100%",
      width: "100%"
    } as ViewStyle
  },

  /**
   * Scrolls. Suitable for forms or other things requiring a keyboard.
   *
   * Pick this one if you don't know which one you want yet.
   */
  scroll: {
    outer: {
      backgroundColor: colors.background,
      flex: 1,
      height: "100%"
    } as ViewStyle,
    inner: { justifyContent: "flex-start", alignItems: "stretch" } as ViewStyle
  }
}

/**
 * The variations of screens.
 */
export type ScreenPresets = keyof typeof presets

/**
 * Is this preset a non-scrolling one?
 *
 * @param preset The preset to check
 */
export function isNonScrolling(preset: ScreenPresets) {
  // any of these things will make you scroll
  return (
    isNil(preset) ||
    !preset.length ||
    isNil(presets[preset]) ||
    preset === "fixed"
  )
}
