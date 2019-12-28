import * as React from "react"
import {
  View,
  ViewStyle,
  TouchableOpacity,
  ImageStyle,
  TextStyle
} from "react-native"
import { Text } from "../text"
import { Icon, IconTypes } from "../icon"
import { colors } from "../../theme"
import { mergeAll } from "lodash/fp"

export interface PickerCtaItemProps {
  icon?: IconTypes
  small?: boolean
  subTx?: string
  subTxOptions?: object
  subText?: string
  style?: ViewStyle
  mainTx?: string
  mainTxOptions?: object
  mainText?: string
  onPress?: () => any
  iconStyle?: ImageStyle
  subTextStyle?: TextStyle
  mainTextStyle?: TextStyle
}

const CONTAINER = (isSmall: boolean = false): ViewStyle => ({
  height: isSmall ? 50 : 60,
  flexDirection: "row",
  alignItems: "center"
})

const ICON_CONTAINER: ViewStyle = {
  paddingLeft: 4,
  justifyContent: "center",
  alignItems: "center",
  width: 52
}

const ICON = (isSmall: boolean = false): ImageStyle => ({
  width: isSmall ? 16 : 19,
  height: isSmall ? 16 : 19,
  tintColor: colors.palette.gray69
})

const SUB_TEXT: TextStyle = {
  marginTop: 4
}

export const PickerCtaItem = (props: PickerCtaItemProps) => {
  const {
    icon,
    small = false,
    style: styleOverride = {},
    subTx,
    subTxOptions,
    subText,
    mainTx,
    mainTxOptions,
    mainText,
    onPress,
    iconStyle: iconStyleOverride = {},
    mainTextStyle = {},
    subTextStyle: subTextStyleOverride = {}
  } = props

  const iconStyle = mergeAll([ICON(small), iconStyleOverride])
  const style = mergeAll([CONTAINER(small), styleOverride])
  const subTextStyle = mergeAll([SUB_TEXT, subTextStyleOverride])

  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Icon icon={icon} containerStyle={ICON_CONTAINER} style={iconStyle} />
      <View>
        <Text
          tx={mainTx}
          txOptions={mainTxOptions}
          text={mainText}
          preset="bold"
          style={mainTextStyle}
        />
        {Boolean(subTx) ||
          (Boolean(subText) && (
            <Text
              tx={subTx}
              txOptions={subTxOptions}
              text={subText}
              style={subTextStyle}
            />
          ))}
      </View>
    </TouchableOpacity>
  )
}
