import {
  ViewStyle,
  NativeSyntheticEvent,
  NativeScrollEvent
} from "react-native"
import { ScreenPresets } from "./screen.presets"

export interface ScreenProps {
  /**
   * Children components.
   */
  children?: React.ReactNode

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  /**
   * One of the different types of presets.
   */
  preset?: ScreenPresets

  /**
   * An optional background color
   */
  backgroundColor?: string

  /**
   * An optional status bar setting.
   */
  statusBarStyle?: "light-content" | "dark-content"

  /**
   * An optional status bar setting.
   */
  statusBarColor?: string

  /**
   * Should we not wrap in SafeAreaView?
   */
  unsafe?: boolean

  /**
   * Should enable the keyboardVerticalOffset on KeyboardAvoidingView
   */
  hasKeyboardOffset?: boolean

  onLayout?: (event: any) => void

  /**
   * Preset for an additional point amount to offset the keyboard with. Only will take effect with hasKeyboardOffset prop
   */
  keyboardOffsetPreset?: "header" | "no-header" | "none"

  /**
   * Callback for the ScrollView ref
   */
  forwardedRef?: (ref: any) => void

  /**
   * Determines when the keyboard should stay visible after a tap.
   */
  keyboardShouldPersistTaps?: "always" | "handled" | "never"

  /**
   * footer components.
   */
  footerComponent?: React.ReactNode

  /**
   * Refresh Control for scrollview.
   */
  refreshControl?: React.ReactElement

  /**
   * Scroll event.
   */
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => any

  /**
   * An array of child indices determining which children get docked to the top of the screen when scrolling.
   */
  stickyHeaderIndices?: number[]
}
