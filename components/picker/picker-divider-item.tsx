import * as React from "react"
import { View, ViewStyle } from "react-native"
import { colors } from "../../theme"

export interface PickerDividerItemProps {
  color?: string
}

const CONTAINER: ViewStyle = {
  width: "100%",
  height: 1,
  backgroundColor: colors.palette.navyLight
}

export const PickerDividerItem = (props: PickerDividerItemProps) => {
  const { color } = props

  const style = color ? { ...CONTAINER, backgroundColor: color } : CONTAINER

  return <View style={style} />
}
