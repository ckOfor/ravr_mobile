import * as Permissions from "expo-permissions"
import { Action } from "redux"
import { ThunkAction } from "redux-thunk"
import { appDetailsSettings } from "react-native-android-open-settings"
import {
  STARTUP,
  CHECK_LOCATION_PERMISSION,
  CHECK_LOCATION_PERMISSION_SUCCESS,
  ASK_LOCATION_PERMISSION,
  ASK_LOCATION_PERMISSION_SUCCESS, OPEN_SETTINGS
} from "./startup.types"
import { ApplicationState } from ".."
import {Linking, Platform} from "react-native";


const isIos = Platform.OS === "ios"

export const openSettings = () => ({
  type: OPEN_SETTINGS
})


async function canOpenUrl(url: string) {
  const canOpen = await Linking.canOpenURL(url)
  if (canOpen) {
    return true
  } else {
    alert("could not open url")
    return false
  }
}

function openUrl(url: string) {
  Linking.openURL(url).catch(err => Promise.reject(err))
}

export const startup = () => ({ type: STARTUP })

export const checkLocationPermission = () => ({
  type: CHECK_LOCATION_PERMISSION
})
export const checkLocationPermissionSuccess = (
  payload: Permissions.PermissionStatus
) => ({
  type: CHECK_LOCATION_PERMISSION_SUCCESS,
  payload
})

export const askLocationPermission = () => ({
  type: ASK_LOCATION_PERMISSION
})
export const askLocationPermissionSuccess = (
  payload: Permissions.PermissionStatus
) => ({
  type: ASK_LOCATION_PERMISSION_SUCCESS,
  payload
})

export const checkLocationPermissionAsync = (): ThunkAction<
  void,
  ApplicationState,
  null,
  Action<any>
> => async dispatch => {
  dispatch(checkLocationPermission())

  try {
    const { status } = await Permissions.getAsync(Permissions.LOCATION)
    dispatch(checkLocationPermissionSuccess(status))
    return status
  } catch (error) {
    console.tron.error(error)
  }
}

export const askLocationPermissionAsync = (): ThunkAction<
  void,
  ApplicationState,
  null,
  Action<any>
> => async (dispatch, getState) => {
  dispatch(askLocationPermission())
  try {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    dispatch(askLocationPermissionSuccess(status))
    return status
  } catch (error) {
    console.tron.error(error)
  }
}

export const openSettingsAsync = (): ThunkAction<
  void,
  ApplicationState,
  null,
  Action<any>
  > => async (dispatch, getState) => {
  dispatch(openSettings())
  try {
    if (isIos) {
      const iosUrl = "app-settings:"
      const canOpen = await canOpenUrl(iosUrl)
      if (canOpen) {
        openUrl(iosUrl)
      }
    } else {
      appDetailsSettings()
    }
  } catch (error) {
    console.tron.error(error)
  }
}

