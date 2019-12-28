import * as React from "react"
import {
  Modal as RNModal,
  View,
  ViewStyle,
  TouchableOpacity,
  Dimensions,
  TextStyle
} from "react-native"
import * as Animatable from "react-native-animatable"
import { SafeAreaView } from "react-navigation"

import { Button } from "../button"
import { colors } from "../../theme"
import { Text } from "../text"

const SCREEN_HEIGHT = Dimensions.get("window").height

const BACKDROP: ViewStyle = {
  backgroundColor: colors.transparent,
  // backgroundColor: "rgba(0,0,0,0.8)",
  width: "100%",
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  alignItems: "stretch",
  justifyContent: "flex-end"
}

const CLICK_AREA: ViewStyle = {
  flex: 1,
  height: "100%"
}

const PICKER: ViewStyle = {
  height: 238,
  flex: 0,
  paddingHorizontal: 8
}

const SAFE_AREA: ViewStyle = {
  // alignItems: "stretch",
  // justifyContent: "flex-end",
  // flex: 1,
  // paddingHorizontal: 18,
  // paddingBottom: 20
}

const PICKER_CONTENT_WRAPPER: ViewStyle = {
  flex: 1,
  backgroundColor: colors.white,
  borderRadius: 20,
  overflow: "hidden"
}

const PICKER_CONTENT: ViewStyle = {
  flex: 1
}

const PICKER_CTA: ViewStyle = {
  marginTop: 16
}

const PICKER_TITLE_TEXT: TextStyle = {
  marginBottom: 8,
  alignSelf: "center"
}

interface PickerProps {
  visible: boolean
  children?: React.ReactNode
  buttonTx?: string
  buttonText?: string
  buttonSecondaryTx?: string
  buttonSecondaryText?: string
  pickerTitleText?: string
  pickerTitleTx?: string
  pickerStyle?: ViewStyle
  pickerContentWrapperStyle?: ViewStyle
  onButtonPress?: () => void
  onButtonSecondaryPress?: () => void
  heightInPixels?: number
  onBackdropPress?: () => void
  heightInPercentageOfScreen?: number
}

export class Picker extends React.Component<PickerProps> {
  state = {
    isPickerCollapsed: !this.props.visible
  }

  render() {
    const {
      visible: isModalVisible = false,
      children,
      buttonTx,
      buttonText,
      buttonSecondaryTx,
      buttonSecondaryText,
      pickerTitleText,
      pickerTitleTx,
      pickerStyle: pickerContentStyle,
      pickerContentWrapperStyle,
      onButtonPress,
      onButtonSecondaryPress,
      heightInPixels,
      onBackdropPress,
      heightInPercentageOfScreen
    } = this.props

    const heightOverride = heightInPercentageOfScreen
      ? SCREEN_HEIGHT * heightInPercentageOfScreen
      : heightInPixels // percentage will override the pixels if both are set

    const pickerStyle = [PICKER, heightOverride && { height: heightOverride }]

    if (!isModalVisible) return null

    return (
      <RNModal
        visible={isModalVisible}
        onRequestClose={onBackdropPress}
        transparent
      >
        <Animatable.View
          style={BACKDROP}
          duration={300}
          animation={"fadeIn"}
          useNativeDriver={true}
        >
          <SafeAreaView
            style={SAFE_AREA}
            forceInset={{ bottom: "always", top: "never" }}
          >
            <TouchableOpacity
              style={CLICK_AREA}
              activeOpacity={1}
              onPress={onBackdropPress}
            />

            <View style={pickerStyle}>
              {Boolean(pickerTitleText) ||
                (Boolean(pickerTitleTx) && (
                  <Animatable.View
                    delay={100}
                    duration={350}
                    animation={"fadeInUp"}
                    useNativeDriver={true}
                  >
                    <Text
                      preset="headerSecondaryLarge"
                      text={pickerTitleText}
                      tx={pickerTitleTx}
                      style={PICKER_TITLE_TEXT}
                    />
                  </Animatable.View>
                ))}
              <Animatable.View
                delay={150}
                style={[PICKER_CONTENT_WRAPPER, pickerContentWrapperStyle]}
                duration={350}
                animation={"fadeInUp"}
                useNativeDriver={true}
              >
                <View style={[PICKER_CONTENT, pickerContentStyle]}>
                  {children}
                </View>
              </Animatable.View>

              {/*<Animatable.View*/}
              {/*  delay={200}*/}
              {/*  duration={350}*/}
              {/*  animation={"fadeInUp"}*/}
              {/*  useNativeDriver={true}*/}
              {/*>*/}
              {/*  <Button*/}
              {/*    tx={buttonTx || (!buttonText && "common.cancel")}*/}
              {/*    text={buttonText}*/}
              {/*    style={PICKER_CTA}*/}
              {/*    preset="primary"*/}
              {/*    onPress={onButtonPress}*/}
              {/*  />*/}
              {/*</Animatable.View>*/}

              {/*{Boolean(buttonSecondaryTx) || Boolean(buttonSecondaryText) ? (*/}
              {/*  <Animatable.View*/}
              {/*    delay={200}*/}
              {/*    duration={350}*/}
              {/*    animation={"fadeInUp"}*/}
              {/*    useNativeDriver={true}*/}
              {/*  >*/}
              {/*    <Button*/}
              {/*      tx={*/}
              {/*        buttonSecondaryTx ||*/}
              {/*        (!buttonSecondaryText && "common.cancel")*/}
              {/*      }*/}
              {/*      text={buttonSecondaryText}*/}
              {/*      style={PICKER_CTA}*/}
              {/*      preset="secondary"*/}
              {/*      onPress={onButtonSecondaryPress}*/}
              {/*    />*/}
              {/*  </Animatable.View>*/}
              {/*) : null}*/}
            </View>
          </SafeAreaView>
        </Animatable.View>
      </RNModal>
    )
  }
}
