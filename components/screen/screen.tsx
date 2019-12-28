import * as React from "react"
import {
  ScrollView,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native"
import { SafeAreaView } from "react-navigation"
import { ScreenProps } from "./screen.props"
import { presets, offsets, isNonScrolling } from "./screen.presets"

const isIos = Platform.OS === "ios"

function ScreenWithoutScrolling(props: ScreenProps) {
  const preset = presets["fixed"]
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : {}
  const Wrapper = props.unsafe ? View : SafeAreaView
  const keyboardOffsetPreset = props.keyboardOffsetPreset || "header"
  const footerComponent = props.footerComponent || null

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      enabled={!!props.hasKeyboardOffset}
      behavior={isIos ? "padding" : null}
      keyboardVerticalOffset={offsets[keyboardOffsetPreset]}
    >
      <StatusBar
        barStyle={props.statusBarStyle || "dark-content"}
        backgroundColor={props.statusBarColor}
      />
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
      >
        <Wrapper style={[preset.inner, style]}>
          <>
            {props.children}
            {Boolean(footerComponent) && footerComponent}
          </>
        </Wrapper>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

function ScreenWithScrolling(props: ScreenProps) {
  const preset = presets["scroll"]
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : {}
  const Wrapper = props.unsafe ? View : SafeAreaView
  const keyboardOffsetPreset = props.keyboardOffsetPreset || "header"
  const footerComponent = props.footerComponent || null

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      enabled={!!props.hasKeyboardOffset}
      behavior={isIos ? "padding" : null}
      keyboardVerticalOffset={offsets[keyboardOffsetPreset]}
    >
      <StatusBar
        barStyle={props.statusBarStyle || "light-content"}
        backgroundColor={props.statusBarColor}
      />
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
      >
        <Wrapper style={[preset.outer, backgroundStyle]}>
          <ScrollView
            keyboardShouldPersistTaps={props.keyboardShouldPersistTaps}
            ref={props.forwardedRef}
            style={[preset.outer, backgroundStyle]}
            contentContainerStyle={[preset.inner, style]}
            onScroll={props.onScroll}
            stickyHeaderIndices={props.stickyHeaderIndices}
            refreshControl={props.refreshControl}
          >
            {props.children}
          </ScrollView>
          {Boolean(footerComponent) && footerComponent}
        </Wrapper>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />
  } else {
    return <ScreenWithScrolling {...props} />
  }
}
