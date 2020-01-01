import {
  CONTACT_US, CONTACT_US_FAILURE, CONTACT_US_SUCCESS,
  CREATE_TRANSACTION,
  CREATE_TRANSACTION_FAILURE,
  CREATE_TRANSACTION_SUCCESS,
  IUser, SAVE_MESSAGE, SAVE_SUBJECT,
  SET_USER_DETAILS, UPDATE_USER, UPDATE_USER_FAILURE, UPDATE_USER_SUCCESS
} from "../user";
import {
  createTransaction as apiCreateTransaction,
  logInUserPayload,
  logInWithEmail as apiLogInWithEmail,
  contactUs as apiContactUs,
} from "../../services/api";
import { ThunkAction } from "redux-thunk";
import { ApplicationState } from "../index";
import { Action } from "redux";
import {notify, setUser, socialAuthenticationFailure} from "../auth";
import {NavigationActions} from "react-navigation";
import {searchToursFailure } from "../tour";
import Firebase from '../../config/FirebaseClient'

export const setUserDetails = (user: IUser) => ({ type: SET_USER_DETAILS, payload: user })


export const createTransaction = () => ({
  type: CREATE_TRANSACTION,
})

export const createTransactionFailure = () => ({
  type: CREATE_TRANSACTION_FAILURE,
})

export const createTransactionSuccess = () => ({
  type: CREATE_TRANSACTION_SUCCESS,
})


export const createTransactionAsync = (reference: string, slots: number): ThunkAction<void, ApplicationState, null, Action<any>> => async (
  dispatch,
  getState
) => {
  const state = getState();
  const id = state.user.data.id
  const guideId = state.tour.selectedTour.userId
  const tourId = state.tour.selectedTour.id
  
  dispatch(createTransaction())
  
  try {
    const result = await apiCreateTransaction({
      id,
      guideId,
      tourId,
      reference,
      slots
    })
    const { status, message, data } = result.data
    console.log(data)
    
    if(status) {
      dispatch(notify(`${message}`, 'success'))
      dispatch(createTransactionSuccess())
      dispatch(NavigationActions.navigate({ routeName: "viewTour" }))
      dispatch(updateUserAsync())
    } else {
      dispatch(notify(`${message}`, 'danger'))
      dispatch(createTransactionFailure())
    }
    
  } catch ({ message }) {
    dispatch(notify(`${message}`, 'danger'))
    dispatch(createTransactionFailure())
  }
}

export const updateUser = () => ({
  type: UPDATE_USER,
})

export const updateUserFailure = () => ({
  type: UPDATE_USER_FAILURE,
})

export const updateUserSuccess = () => ({
  type: UPDATE_USER_SUCCESS,
})

export const updateUserAsync = (): ThunkAction<
  void,
  ApplicationState,
  null,
  Action<any>
  > => async (dispatch, getState) => {
  dispatch(updateUser())
  
  const notificationId = getState().auth.FCMToken;
  
  try {
    Firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const email = user.email
        const password = user.uid
        const data = {
          email,
          password,
          notificationId
        }
        dispatch(retrieveUserAsync(data))
        // User is signed in.
        // dispatch(logInUserAsync(data))
      } else {
        // No user is signed in.
      }
    });
    
  } catch ({ message }){
    console.tron.log(message)
    dispatch(updateUserFailure())
  }
}

export const retrieveUserAsync = (params: logInUserPayload): ThunkAction<
  void,
  ApplicationState,
  null,
  Action<any>
  > => async (dispatch, getState) => {
  
  
  try {
    const result = await apiLogInWithEmail({
      ...params
    })
    const { status, message, data } = result.data
    
    if (status) {
      
      if(data.userType === 'tourist') {
        dispatch(setUser(data))
        dispatch(setUserDetails(data))
        dispatch(updateUserSuccess())
        console.tron.log(data)
        return
      }
    } else {
      dispatch(notify(`${message}`, 'danger'))
      dispatch(updateUserFailure())
    }
  } catch ({ message }) {
    console.log(message )
    dispatch(updateUserFailure())
    dispatch(notify(`${message}`, 'danger'))
  }
}

export const saveSubject = (subject: string) => ({ type: SAVE_SUBJECT, payload: subject })

export const saveMessage = (message: string) => ({ type: SAVE_MESSAGE, payload: message })


export const contactUs = () => ({
  type: CONTACT_US
})

export const contactUsFailure = () => ({
  type: CONTACT_US_FAILURE
})

export const contactUsSuccess = () => ({
  type: CONTACT_US_SUCCESS
})


export const contactUsAsync = (subject: string, body: string): ThunkAction<void, ApplicationState, null, Action<any>> => async (
  dispatch,
  getState
) => {
  console.tron.log(body)
  dispatch(contactUs())
  const id = getState().user.data.id;
  const email = getState().user.data.email;
  
  try {
    const result = await apiContactUs(id, subject, body, email)
    const { status, message, data } = result.data
    
    if (status) {
      console.tron.log(data)
      dispatch(notify(message, 'success'))
      dispatch(saveSubject(''))
      dispatch(saveMessage(''))
      dispatch(contactUsSuccess())
    } else {
      dispatch(contactUsFailure())
      dispatch(notify(message, 'danger'))
    }
  } catch ({ message }) {
    console.tron.log(message)
    dispatch(updateUserFailure())
    dispatch(notify(message, 'danger'))
  }
}
