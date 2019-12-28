import {
  ViewStyle,
  NativeSyntheticEvent,
  NativeScrollEvent
} from "react-native"

export interface ScreenProps {
  /**
   *
   */
  headerText: string
  
  /**
   *
   */
  value: string
  
  /**
   *
   */
  disabled: boolean
  
  /**
   *
   */
  dropDownList: object
  
  /**
   *
   */
  placeHolderText: string
  
  /**
   * View for left side passed in instead of an icon or text
   */
  leftView?: React.ReactNode
  
  /**
   * What happens when you press the left icon
   */
  onNextPress(): void
  
  /**
   * What happens when you press the left icon
   */
  toggleModal(): void
  
  /**
   * What happens when you press the left icon
   */
  returnSelected(school: object): void
  
  /**
   * What happens when you press the left icon
   */
  modalStatus: boolean
}
