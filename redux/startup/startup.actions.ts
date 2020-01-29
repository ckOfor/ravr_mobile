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
import firebase from 'react-native-firebase';
import { AsyncStorage } from 'react-native';
import {notify, setFCMToken} from "../auth";


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


export const checkNotificationPermissionAsync = (): ThunkAction<
  void,
  ApplicationState,
  null,
  Action<any>
  > => async (dispatch, getState) => {
  try {
    console.tron.log("Called")
    const hasPermission = await firebase.messaging().hasPermission();
    if(hasPermission) {
      dispatch(getFirebasetokenAsync())
    }
    return hasPermission
  } catch ({ message }) {
    console.tron.log("failed", message)
    dispatch(notify(message, 'danger'))
  }
}

export const requestNotificationPermissionAsync = (): ThunkAction<
  void,
  ApplicationState,
  null,
  Action<any>
  > => async (dispatch) => {
  console.tron.log("called =>", requestNotificationPermissionAsync)
  try {
    const requestPermission =  await firebase.messaging().requestPermission();
    dispatch(getFirebasetokenAsync())
  } catch ({ message }) {
    console.tron.log("failed =>", message)
  
    dispatch(notify(message, 'danger'))
  }
}

export const getFirebasetokenAsync = (): ThunkAction<
  void,
  ApplicationState,
  null,
  Action<any>
  > => async (dispatch, getState) => {
  console.tron.log("called =>", getFirebasetokenAsync)
  try {
    
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        dispatch(setFCMToken(fcmToken))
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  } catch ({ message }) {
    console.tron.log("failed =>", message)
    setTimeout(() => dispatch(getFirebasetokenAsync()) , 10000);
    dispatch(notify(message, 'danger'))
  }
}

