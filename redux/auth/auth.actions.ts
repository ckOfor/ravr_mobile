import { ThunkAction } from "redux-thunk"
import {Alert, Platform} from "react-native"
import { Action } from "redux"
import * as GoogleSignIn from 'expo-google-sign-in';
import * as Facebook from 'expo-facebook';
import { ApplicationState } from ".."
import firebase from 'react-native-firebase';
import { AsyncStorage } from 'react-native';
import {NavigationActions} from "react-navigation";
import {
  logInUserPayload,
  logInWithEmail as apiLogInWithEmail,
  forgotPassword as apiForgotPassword,
  logInWithSocialAuth as apiLogInWithSocial,
  getAllSchools as apiGetAllSchools,
  getAllRoles as apiGetAllRoles,
  signUpWithSocialAuth as apiSignUpWithSocialAuth,
  signUpWithEmailAndPassword as apiSignUpWithEmailAndPassword, IUser,
} from "../../services/api"
import { Toast } from "native-base";
// import {setUser, updateUserAsync} from "../user";
import {
  SOCIAL_AUTHENTICATION,
  FACEBOOK_AUTH,
  SET_AUTH_EMAIL,
  LOG_IN_WITH_EMAIL_SUCCESS,
  LOG_IN_WITH_EMAIL,
  SET_FCM_TOKEN,
  SET_AUTH_FIRST_NAME,
  SET_AUTH_LAST_NAME,
  SET_AUTH_PASSWORD,
  SET_AUTH_UID,
  SET_AUTH_TYPE,
  SET_AUTH_PICTURE,
  LOG_IN_WITH_GMAIL,
  LOG_IN_WITH_GMAIL_SUCCESS,
  LOG_IN_WITH_FACEBOOK,
  LOG_IN_WITH_FACEBOOK_SUCCESS,
  SET_AUTH_SCHOOLS,
  SAVE_SELECTED_SCHOOL,
  SET_AUTH_ROLES,
  SAVE_SELECTED_ROLE,
  SET_AUTH_PHONE,
  SOCIAL_AUTHENTICATION_FAILURE,
  SOCIAL_AUTHENTICATION_SUCCESS,
  SET_AUTH_FULL_NAME,
  SET_USER,
} from "./auth.types";
import {Layout} from "../../constants";



export const setUser = (user: IUser) => ({ type: SET_USER, payload: user })


export const facebookAuth = () => ({
  type: FACEBOOK_AUTH
})

export const logInUserWithEmail = () => ({ type: LOG_IN_WITH_EMAIL })
const logInUserWithEmailSuccess = (payload: any) => ({
  type: LOG_IN_WITH_EMAIL_SUCCESS,
  payload
})

export const logInUserWithFacebook = () => ({ type: LOG_IN_WITH_FACEBOOK })
const logInUserWithFacebookSuccess = (payload: any) => ({
  type: LOG_IN_WITH_FACEBOOK_SUCCESS,
  payload
})

export const logInUserWithGmail = () => ({ type: LOG_IN_WITH_GMAIL })
const logInUserWithGmailSuccess = (payload: any) => ({
  type: LOG_IN_WITH_GMAIL_SUCCESS,
  payload
})

export const setFCMToken = (payload: string) => ({
  type: SET_FCM_TOKEN,
  payload
})

export const setAuthFullName = (payload: string) => ({
  type: SET_AUTH_FULL_NAME,
  payload
})

export const setAuthEmail = (payload: string) => ({
  type: SET_AUTH_EMAIL,
  payload
})

export const setAuthPassword = (payload: string) => ({
  type: SET_AUTH_PASSWORD,
  payload
})

export const setAuthUserID = (payload: string) => ({
  type: SET_AUTH_UID,
  payload
})

export const setAuthPicture = (payload: string) => ({
  type: SET_AUTH_PICTURE,
  payload
})

export const setAuthType = (payload: string) => ({
  type: SET_AUTH_TYPE,
  payload
})

export const setAuthPhone = (payload: string) => ({
  type: SET_AUTH_PHONE,
  payload
})

export const setAuthSchools = (payload: object) => ({
  type: SET_AUTH_SCHOOLS,
  payload
})

export const setAuthRoles = (payload: object) => ({
  type: SET_AUTH_ROLES,
  payload
})

export const SaveSelectedSchool = (payload: object) => ({
  type: SAVE_SELECTED_SCHOOL,
  payload
})

export const SaveSelectedRole = (payload: object) => ({
  type: SAVE_SELECTED_ROLE,
  payload
})

export const setFacebookUser = (payload: string) => ({
  type: SET_FCM_TOKEN,
  payload
})

export const socialAuthentication = () => ({
  type: SOCIAL_AUTHENTICATION,
})

export const socialAuthenticationFailure = () => ({
  type: SOCIAL_AUTHENTICATION_FAILURE,
})

export const socialAuthenticationSuccess = () => ({
  type: SOCIAL_AUTHENTICATION_SUCCESS,
})

//
// export const saveUserAuthAsync = ({
//   firstName,
//   lastName,
//   email,
//   password,
// }): ThunkAction<
//   void,
//   ApplicationState,
//   null,
//   Action<any>
//   > => async (dispatch, getState) => {
//
//   dispatch(setAuthFirstName(firstName))
//   dispatch(setAuthLastName(lastName))
//   dispatch(setAuthEmail(email))
//   dispatch(setAuthPassword(password))
//   dispatch(getAllSchoolsAsync())
// }
//
// export const getAllSchoolsAsync = (): ThunkAction<
//   void,
//   ApplicationState,
//   null,
//   Action<any>
//   > => async (dispatch) => {
//
//   try {
//     const result = await apiGetAllSchools()
//     const { status, message, data } = result.data
//     if(status) {
//       dispatch(setAuthSchools(data.details))
//       dispatch(NavigationActions.navigate({ routeName: "authSelectUniversity" }))
//     }
//   } catch ({ message }){
//     Toast.show({ text: `${message}`, type: 'danger', position: 'top', duration: 3000,
//       style: {
//         marginTop: Layout.window.height / 2,
//         width: Layout.window.width / 3,
//         alignSelf: 'center'
//       } })
//   }
// }
//
// export const saveSelectedSchoolAsync = (selectedSchool: object): ThunkAction<
//   void,
//   ApplicationState,
//   null,
//   Action<any>
//   > => async (dispatch, getState) => {
//   dispatch(SaveSelectedSchool(selectedSchool))
// }
//
// export const savePhoneNumberAsync = (phoneNumber: string): ThunkAction<
//   void,
//   ApplicationState,
//   null,
//   Action<any>
//   > => async (dispatch, getState) => {
//   dispatch((setAuthPhone(phoneNumber)))
//
//   const authType =  getState().auth.authType;
//   console.log(authType)
//
//   return authType === 'email'
//     ? dispatch(signUpWithEmailAndPassword(authType))
//     : dispatch(signUpWithSocialAuth(authType))
// }
//
// export const signUpWithEmailAndPassword = (registrationType): ThunkAction<
//   void,
//   ApplicationState,
//   null,
//   Action<any>
//   > => async (dispatch, getState) => {
//   console.log('email')
//
//   const f_name = getState().auth.firstName
//   const l_name = getState().auth.lastName
//   const email = getState().auth.email
//   const password = getState().auth.password
//   const college = getState().auth.selectedSchool.id
//   const phone = 0 + getState().auth.phoneNumber
//   const user_type = 0 + getState().auth.selectedRole.id
//   const phone_country = getState().auth.countryCode
//   const gender = ''
//   const auth_mode = registrationType
//   const device_type = Platform.OS === 'ios' ? "iOS" : "android"
//   const push_token = getState().auth.FCMToken;
//   const app_version = '2.0'
//   const device_id = getState().auth.FCMToken;
//
//   const userDetails = {
//     f_name, l_name, email, college, phone, user_type, gender, phone_country, auth_mode,
//     device_type, device_id, push_token, app_version, password
//   }
//
//   try {
//     const result = await apiSignUpWithEmailAndPassword(userDetails)
//     const { status, message, data } = result.data
//     console.log(result)
//     if(status) {
//       Toast.show({ text: `${message}`, type: 'success', position: 'top', duration: 3000,
//         style: {
//           marginTop: Layout.window.height / 2,
//           width: Layout.window.width / 3,
//           alignSelf: 'center'
//         } })
//       dispatch(setUser(data))
//       dispatch(NavigationActions.navigate({ routeName: "moov" }))
//       dispatch(updateUserAsync())
//     } else {
//       Toast.show({ text: `${message}`, type: 'danger', position: 'top', duration: 3000,
//         style: {
//           marginTop: Layout.window.height / 2,
//           width: Layout.window.width / 3,
//           alignSelf: 'center'
//         } })
//     }
//   } catch ({ message }){
//     Toast.show({ text: `${message}`, type: 'danger', position: 'top', duration: 3000,
//       style: {
//         marginTop: Layout.window.height / 2,
//         width: Layout.window.width / 3,
//         alignSelf: 'center'
//       } })
//   }
// }
//
// export const signUpWithSocialAuth = (registrationType): ThunkAction<
//   void,
//   ApplicationState,
//   null,
//   Action<any>
//   > => async (dispatch, getState) => {
//   console.log('social', registrationType)
//
//   const f_name = getState().auth.firstName
//   const l_name = getState().auth.lastName
//   const email = getState().auth.email
//   const college = getState().auth.selectedSchool.id
//   const phone = 0 + getState().auth.phoneNumber
//   const user_type = 0 + getState().auth.selectedRole.id
//   const gender = ''
//   const phone_country = getState().auth.countryCode
//   const auth_mode = 'social'
//   const auth_provider = registrationType
//   const auth_uid = getState().auth.uid
//   const device_type = Platform.OS === 'ios' ? "iOS" : "android"
//   const device_id = getState().auth.FCMToken;
//   const push_token = getState().auth.FCMToken;
//   const app_version = '2.0'
//   const password = ''
//
//   const payload = {
//     f_name, l_name, email, college, phone, user_type, gender, phone_country, auth_mode,
//     auth_provider, auth_uid, device_type, device_id, push_token, app_version, password
//   }
//
//   try {
//     const result = await apiSignUpWithSocialAuth(payload)
//     const { status, message, data } = result.data
//     console.log(result)
//     if(status) {
//       Toast.show({ text: `${message}`, type: 'success', position: 'top', duration: 3000,
//         style: {
//           marginTop: Layout.window.height / 2,
//           width: Layout.window.width / 3,
//           alignSelf: 'center'
//         } })
//       dispatch(setUser(data))
//       dispatch(NavigationActions.navigate({ routeName: "moov" }))
//       dispatch(updateUserAsync())
//     } else {
//       Toast.show({ text: `${message}`, type: 'danger', position: 'top', duration: 3000,
//         style: {
//           marginTop: Layout.window.height / 2,
//           width: Layout.window.width / 3,
//           alignSelf: 'center'
//         } })
//     }
//   } catch ({ message }){
//     Toast.show({ text: `${message}`, type: 'danger', position: 'top', duration: 3000,
//       style: {
//         marginTop: Layout.window.height / 2,
//         width: Layout.window.width / 3,
//         alignSelf: 'center'
//       } })
//   }
// }
//
// export const saveSelectedRoleAsync = (selectedRole: object): ThunkAction<
//   void,
//   ApplicationState,
//   null,
//   Action<any>
//   > => async (dispatch) => {
//   dispatch(SaveSelectedRole(selectedRole))
// }
//
// export const getAllRolesAsync = (): ThunkAction<
//   void,
//   ApplicationState,
//   null,
//   Action<any>
//   > => async (dispatch) => {
//
//   try {
//     const result = await apiGetAllRoles()
//     const { status, message, data } = result.data
//     console.log(result)
//     if(status) {
//       dispatch(setAuthRoles(data.details))
//       dispatch(NavigationActions.navigate({ routeName: "authSelectRole" }))
//     }
//   } catch ({ message }){
//     Toast.show({ text: `${message}`, type: 'danger', position: 'top', duration: 3000,
//       style: {
//         marginTop: Layout.window.height / 2,
//         width: Layout.window.width / 3,
//         alignSelf: 'center'
//       } })
//   }
// }
//
// export const saveEmailAuthAsync = (): ThunkAction<
//   void,
//   ApplicationState,
//   null,
//   Action<any>
//   > => async (dispatch, getState) => {
//   dispatch(setAuthType('email'))
//   dispatch(NavigationActions.navigate({ routeName: "auth", params: { initialPage: 1  } }))
// }
//
export const googleAuthenticationSignInAsync = (): ThunkAction<
  void,
  ApplicationState,
  null,
  Action<any>
  > => async (dispatch, getState) => {
  dispatch(socialAuthentication())

  try {
    await GoogleSignIn.initAsync({ webClientId: '547133332369-kq43s986h2mfl44qhp4vucdim0crqjag.apps.googleusercontent.com' });
    dispatch(googleUserSignInAsync())
  } catch ({ message }) {
    dispatch(googleAuthenticationSignOutAsync())
    dispatch(socialAuthenticationFailure())
    dispatch(notify(`${message}`, 'danger'))
  }
}

export const googleUserSignInAsync = (): ThunkAction<
  void,
  ApplicationState,
  null,
  Action<any>
  > => async (dispatch, getState) => {
  dispatch(socialAuthentication())

  try {
    await GoogleSignIn.askForPlayServicesAsync();
    const { type, user } = await GoogleSignIn.signInAsync();
    console.tron.log(user)
    if (type === 'success') {
      dispatch(setAuthFullName(`${user.firstName} ${user.lastName}`))
      dispatch(setAuthEmail(user.email))
      dispatch(setAuthUserID(user.uid))
      dispatch(setAuthPicture(user.photoURL))
      dispatch(setAuthType('google'))
      dispatch(googleAuthenticationSignOutAsync())
      
      dispatch(logInWithSocialAuth())
      return
    }

    dispatch(socialAuthenticationFailure())

  } catch ({ message }) {
    dispatch(googleAuthenticationSignOutAsync())
    dispatch(socialAuthenticationFailure())
    dispatch(notify(`${message}`, 'danger'))
  }
}

export const googleAuthenticationSignOutAsync = (): ThunkAction<
  void,
  ApplicationState,
  null,
  Action<any>
  > => async (dispatch, getState) => {

  try {
    const result = await GoogleSignIn.signOutAsync();
  } catch ({ message }) {
    dispatch(notify(`${message}`, 'danger'))
  }
}

export const facebookAuthenticationSignInAsync = (): ThunkAction<
  void,
  ApplicationState,
  null,
  Action<any>
  > => async (dispatch, getState) => {
  dispatch(socialAuthentication())
  try {
    const {
      type,
      token,
      expires,
    } = await Facebook.logInWithReadPermissionsAsync('863575403830061', {
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?fields=id,email,first_name,last_name,picture&access_token=${token}`);
      const user = (await response.json())
      
      console.tron.log(user, "USER")

      dispatch(setAuthFullName(`${user.first_name} ${user.last_name}`))
      dispatch(setAuthEmail(user.email))
      dispatch(setAuthPicture(user.picture.data.url))
      dispatch(setAuthUserID(user.id))
      dispatch(setAuthType('facebook'))
      
      dispatch(logInWithSocialAuth())
    } else {
      // type === 'cancel'
      dispatch(socialAuthenticationFailure())
    }
  } catch ({ message }) {
    dispatch(socialAuthenticationSuccess())
    dispatch(notify(`${message}`, 'danger'))
  }
}


export const notify = (message, type): ThunkAction<
  void,
  ApplicationState,
  null,
  Action<any>
  > => async (dispatch, getState) => {
  Toast.show({ text: `${message}`, type: `${type}`, position: 'top', duration: 3000,
    style: {
      // marginTop: Layout.window.height / 2,
      // width: Layout.window.width / 3,
      // alignSelf: 'center'
    } })
}

export const logInWithSocialAuth = (): ThunkAction<void, ApplicationState, null, Action<any>> => async (
  dispatch,
  getState
) => {
  const { email, FCMToken, uid } = getState().auth

  try {
    const result = await apiLogInWithSocial({
      email, FCMToken, password: uid
    })

    const { status, message, data } = result.data
    console.tron.log(data)

    if (status) {
      dispatch(socialAuthenticationSuccess())
      
      if(data.userType === 'tourist') {
        dispatch(setUser(data))
        dispatch(notify( `${message}`, 'success'))
        dispatch(logInUserWithFacebookSuccess(email))
        dispatch(logInUserWithGmailSuccess(email))
        // dispatch(NavigationActions.navigate({ routeName: "home" }))
      } else {
        dispatch(notify(`Use our web app to manage your tours`, 'danger'))
      }
    } else {
      dispatch(socialAuthenticationFailure())
      return message === "User not found!"
        ? dispatch(signUpWithSocialAuth())
        : dispatch(notify(`${message}`, 'danger'))
      
    }
    dispatch(socialAuthenticationFailure())
  } catch ({ message }) {
    dispatch(socialAuthenticationFailure())
    dispatch(notify(`${message}`, 'danger'))
  }
}


export const signUpWithSocialAuth = (): ThunkAction<
  void,
  ApplicationState,
  null,
  Action<any>
  > => async (dispatch, getState) => {
  console.tron.log(getState().auth, "getState().authgetState().auth")
  const fullName = getState().auth.fullName
  const email = getState().auth.email
  const password = getState().auth.uid
  const notificationId = getState().auth.FCMToken;
  const authType = getState().auth.authType;
  const userType = 'tourist';

  const payload = {
    fullName,
    email,
    password,
    notificationId,
    authType,
    userType
  }

  console.tron.log(payload)

  try {
    const result = await apiSignUpWithSocialAuth(payload)
    const { status, message, data } = result.data
    console.log(result)

    if (status) {
      dispatch(socialAuthenticationSuccess())

      dispatch(setUser(data))
      dispatch(notify( `${message}`, 'success'))
      dispatch(logInUserWithFacebookSuccess(email))
      dispatch(logInUserWithGmailSuccess(email))
      // dispatch(NavigationActions.navigate({ routeName: "home" }))

    } else {
      dispatch(notify(`${message}`, 'danger'))
    }
    dispatch(socialAuthenticationFailure())

  } catch ({ message }){
    dispatch(notify(`${message}`, 'danger'))
  }
}


// export const checkNotificationPermissionAsync = (): ThunkAction<
//   void,
//   ApplicationState,
//   null,
//   Action<any>
//   > => async (dispatch, getState) => {
//   try {
//     const hasPermission = await firebase.messaging().hasPermission();
//     return hasPermission
//   } catch ({ message }) {
//     Toast.show({ text: `${message}`, type: 'danger', position: 'top', duration: 3000,
//       style: {
//         marginTop: Layout.window.height / 2,
//         width: Layout.window.width / 3,
//         alignSelf: 'center'
//       } })
//   }
// }
//
// export const requestNotificationPermissionAsync = (): ThunkAction<
//   void,
//   ApplicationState,
//   null,
//   Action<any>
//   > => async (dispatch, getState) => {
//
//   try {
//     const requestPermission =  await firebase.messaging().requestPermission();
//   } catch ({ message }) {
//     Toast.show({ text: `${message}`, type: 'danger', position: 'top', duration: 3000,
//       style: {
//         marginTop: Layout.window.height / 2,
//         width: Layout.window.width / 3,
//         alignSelf: 'center'
//       } })
//   }
// }
//
// export const getFirebasetokenAsync = (): ThunkAction<
//   void,
//   ApplicationState,
//   null,
//   Action<any>
//   > => async (dispatch, getState) => {
//
//   try {
//
//     let fcmToken = await AsyncStorage.getItem('fcmToken');
//     if (!fcmToken) {
//       fcmToken = await firebase.messaging().getToken();
//       if (fcmToken) {
//         // user has a device token
//         dispatch(setFCMToken(fcmToken))
//         await AsyncStorage.setItem('fcmToken', fcmToken);
//       }
//     }
//   } catch ({ message }) {
//     Toast.show({ text: `${message}`, type: 'danger', position: 'top', duration: 3000,
//       style: {
//         marginTop: Layout.window.height / 2,
//         width: Layout.window.width / 3,
//         alignSelf: 'center'
//       } })
//   }
// }
//
export const logInUserAsync = ({
   email,
   password
 }: logInUserPayload): ThunkAction<void, ApplicationState, null, Action<any>> => async (
  dispatch,
  getState
) => {
  dispatch(setAuthEmail(email))
  dispatch(setAuthType('email'))
  const notificationId = getState().auth.FCMToken;

  try {
    const result = await apiLogInWithEmail({
      email,
      password,
      notificationId
    })
    const { status, message, data } = result.data

    if (status) {
  
      if(data.userType === 'tourist') {
        dispatch(notify(`${message}`, 'success'))
        dispatch(setUser(data))
        dispatch(logInUserWithEmailSuccess({ email }))
        // dispatch(NavigationActions.navigate({ routeName: "home" }))
      } else {
        dispatch(notify(`Use our web app to manage your tours`, 'danger'))
      }
    } else {
      dispatch(notify(`${message}`, 'danger'))
    }
  } catch ({ message }) {
    console.log(message )
    dispatch(notify(`${message}`, 'danger'))
  }
}

// export const forgotPasswordAsync = (email : string): ThunkAction<void, ApplicationState, null, Action<any>> => async (
//   dispatch,
// ) => {
//   dispatch(setAuthEmail(email))
//
//   try {
//     const result = await apiForgotPassword(email)
//     const { status, message, data } = result.data
//
//     if (status) {
//       Toast.show({ text: `${message}`, type: 'success', position: 'top', duration: 3000,
//         style: {
//           marginTop: Layout.window.height / 2,
//           width: Layout.window.width / 3,
//           alignSelf: 'center'
//         } })
//       dispatch(NavigationActions.navigate({ routeName: "auth" }))
//     } else {
//       Toast.show({ text: `${message}`, type: 'danger', position: 'top', duration: 3000,
//         style: {
//           marginTop: Layout.window.height / 2,
//           width: Layout.window.width / 3,
//           alignSelf: 'center'
//         } })
//     }
//   } catch (error) {
//     Toast.show({ text: `Reset Password failed`, type: 'danger', position: 'top', duration: 3000,
//       style: {
//         marginTop: Layout.window.height / 2,
//         width: Layout.window.width / 3,
//         alignSelf: 'center'
//       } })
//   }
// }
//
//
