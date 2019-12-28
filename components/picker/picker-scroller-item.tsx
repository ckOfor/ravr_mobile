import * as React from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import Carousel from "react-native-snap-carousel"
import { Text } from "../text"
import { fonts } from "../../theme"
import { PickerDividerItem } from "./"

interface Option {
  text: string
  value: string | number
}

interface PickerScrollerItemProps {
  height: number
  options: Option[]
  onSelect?: (v: string | number, i: number) => any
  optionsToShow: number
  selectedIndex?: number
  optionTextStyle?: TextStyle
  scaleDownInactive?: boolean
}

const OPTION_CONTAINER: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  flex: 1
}

const OPTION_TEXT: TextStyle = {
  fontSize: 15,
  fontFamily: fonts.dinBold,
  paddingHorizontal: 16
}

const ScrollerItem = props => {
  const {
    item: { text },
    textStyle: textStyleOverride = {}
  } = props

  const textStyle = { ...OPTION_TEXT, ...textStyleOverride }

  return (
    <View style={OPTION_CONTAINER}>
      <Text text={text} style={textStyle} numberOfLines={1} />
    </View>
  )
}

export const PickerScrollerItem = (props: PickerScrollerItemProps) => {
  const {
    height = 150,
    options,
    onSelect,
    optionsToShow = 3,
    selectedIndex = 0,
    optionTextStyle,
    scaleDownInactive = true
  } = props

  const itemHeight = height / optionsToShow

  return (
    <Carousel
      data={options}
      vertical
      firstItem={selectedIndex}
      itemHeight={itemHeight}
      renderItem={props => (
        <ScrollerItem textStyle={optionTextStyle} {...props} />
      )}
      sliderHeight={height}
      onSnapToItem={i => onSelect(options[i].value, i)}
      inactiveSlideScale={scaleDownInactive ? 0.82 : 1}
      inactiveSlideOpacity={0.27}
      ItemSeparatorComponent={PickerDividerItem}
    />
  )
}
