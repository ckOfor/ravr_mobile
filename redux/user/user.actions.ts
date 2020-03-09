import {
  CLEAR_USER,
  CONTACT_US,
  CONTACT_US_FAILURE,
  CONTACT_US_SUCCESS,
  CREATE_PLAN,
  CREATE_PLAN_FAILURE,
  CREATE_PLAN_SUCCESS,
  CREATE_REQUEST,
  CREATE_TRANSACTION,
  CREATE_TRANSACTION_FAILURE,
  CREATE_TRANSACTION_SUCCESS,
  DISABLE_PLAN,
  DISABLE_PLAN_FAILURE,
  DISABLE_PLAN_SUCCESS, ENABLE_PLAN, ENABLE_PLAN_FAILURE, ENABLE_PLAN_SUCCESS,
  IPlan,
  IUser,
  REDEEM_COINS,
  REDEEM_COINS_FAILURE,
  REDEEM_COINS_SUCCESS,
  RESET_AUTH_REDEEM_KEY,
  SAVE_DISABLED_PLAN,
  SAVE_DISABLED_PLAN_FAILURE, SAVE_DISABLED_PLAN_SUCCESS, SAVE_ENABLED_PLAN, SAVE_ENABLED_PLAN_SUCCESS,
  SAVE_MESSAGE,
  SAVE_SUBJECT,
  SET_PLAN,
  SET_USER_DETAILS,
  UPDATE_PHONE_NUMBER,
  UPDATE_PHONE_NUMBER_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_FAILURE,
  UPDATE_USER_PROFILE_PICTURE,
  UPDATE_USER_PROFILE_PICTURE_FAILURE,
  UPDATE_USER_PROFILE_PICTURE_SUCCESS,
  UPDATE_USER_SUCCESS
} from "../user";
import {
  createPlan as apiCreatePlan,
  redeemCoins as apiRedeemCoins,
  createTransaction as apiCreateTransaction,
  createRequest as apiCreateRequest,
  logInWithEmail as apiLogInWithEmail,
  contactUs as apiContactUs,
  updatePhone as apiUpdatePhone,
  updatePicture as apiUpdatePicture,
  disablePlan as apiDisablePlan,
  enablePlan as apiEnablePlan
} from "../../services/api";
import { ThunkAction } from "redux-thunk";
import { ApplicationState } from "../index";
import { Action } from "redux";
import {
  notify,
  setUser,
} from "../auth";
import {NavigationActions} from "react-navigation";
import axios from "axios";
import { PAYSTACK_SECRET_KEY } from "react-native-dotenv"

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
    // console.log(data)
    
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
  
  const email = getState().auth.email;
  const password = getState().auth.uid;
  const notificationId = getState().auth.FCMToken;
  
  const params = {
    email,
    password,
    notificationId
  }
  
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

export const clearUserAsync = () => ({ type: CLEAR_USER })


export const updatePhoneNumber = () => ({
  type: UPDATE_PHONE_NUMBER,
})

export const updatePhoneNumberFailure = () => ({
  type: UPDATE_USER_FAILURE,
})

export const updatePhoneNumberSuccess = () => ({
  type: UPDATE_PHONE_NUMBER_SUCCESS,
})

export const updatePhoneNumberAsync = (phoneNumber: string): ThunkAction<
  void,
  ApplicationState,
  null,
  Action<any>
  > => async (dispatch, getState) => {
  dispatch(updatePhoneNumber())
  
  const email = getState().auth.email;
  const password = getState().auth.uid;
  
  try {
    const result = await apiUpdatePhone(phoneNumber, email, password)
    const { status, message, data } = result.data
    
    if (status) {
      console.tron.log(data)
      dispatch(updatePhoneNumberSuccess())
      dispatch(updateUserAsync())
      dispatch(NavigationActions.navigate({ routeName: "referral" }))
    } else {
      dispatch(notify(`${message}`, 'danger'))
      dispatch(updatePhoneNumberFailure())
    }
  } catch ({ message }) {
    console.log(message )
    dispatch(updatePhoneNumberFailure())
    dispatch(notify(`${message}`, 'danger'))
  }
  
}

export const updateUserProfilePicture = () => ({
  type: UPDATE_USER_PROFILE_PICTURE
})

export const updateUserProfilePictureFailure = () => ({
  type: UPDATE_USER_PROFILE_PICTURE_FAILURE
})

export const updateUserProfilePictureSuccess = () => ({
  type: UPDATE_USER_PROFILE_PICTURE_SUCCESS
})


export const updateUserProfilePictureAsync = (pictureURL: string): ThunkAction<
  void,
  ApplicationState,
  null,
  Action<any>
  > => async (dispatch, getState) => {
  
  dispatch(updateUserProfilePicture())
  
  const state = getState()
  const email = state.auth.email;
  const password = state.auth.uid;
  
  try {
    const result = await apiUpdatePicture(pictureURL, email, password)
    const { status, data, message } = result.data
    console.tron.log(data)
    console.tron.log(status)
    
    if(status) {
      dispatch(notify(`${message}`, 'success'))
      dispatch(updateUserAsync())
      dispatch(updateUserProfilePictureSuccess())
      return
    }
    
    dispatch(notify(`${message}`, 'danger'))
    dispatch(updateUserProfilePictureFailure())
    
  } catch ({ message }) {
    console.tron.log(message)
    dispatch(notify(`${message}`, 'danger'))
    dispatch(updateUserProfilePictureFailure())
  }
}

export const createRequest = () => ({
  type: CREATE_REQUEST,
})

export const createRequestFailure = () => ({
  type: CREATE_TRANSACTION_FAILURE,
})

export const createRequestSuccess = () => ({
  type: CREATE_TRANSACTION_SUCCESS,
})

export const createRequestAsync = (slots: number): ThunkAction<void, ApplicationState, null, Action<any>> => async (
  dispatch,
  getState
) => {
  const state = getState();
  const id = state.user.data.id
  const guideId = state.tour.selectedTour.userId
  const tourId = state.tour.selectedTour.id
  
  dispatch(createRequest())
  
  try {
    const result = await apiCreateRequest({
      id,
      guideId,
      tourId,
      reference: "request",
      slots
    })
    const { status, message, data } = result.data
    // console.log(data)
    
    if(status) {
      dispatch(notify(`${message}`, 'success'))
      dispatch(createRequestSuccess())
      dispatch(NavigationActions.navigate({ routeName: "viewTour" }))
      dispatch(updateUserAsync())
    } else {
      dispatch(notify(`${message}`, 'danger'))
      dispatch(createRequestFailure())
    }
    
  } catch ({ message }) {
    dispatch(notify(`${message}`, 'danger'))
    dispatch(createRequestFailure())
  }
}

export const redeemCoins = () => ({
  type: REDEEM_COINS,
})

export const redeemCoinsFailure = () => ({
  type: REDEEM_COINS_FAILURE,
})

export const redeemCoinsSuccess = () => ({
  type: REDEEM_COINS_SUCCESS,
})

export const resetRedeemKey = () => ({ type: RESET_AUTH_REDEEM_KEY })

export const redeemCoinsAsync = (code: string): ThunkAction<void, ApplicationState, null, Action<any>> => async (
  dispatch,
  getState
) => {
  const state = getState();
  const id = state.user.data.id
  
  dispatch(redeemCoins())
  
  try {
    const result = await apiRedeemCoins({
      id,
      code,
    })
    const { status, message, data } = result.data
    // console.log(data)
    
    if(status) {
      dispatch(notify(`${message}`, 'success'))
      dispatch(redeemCoinsSuccess())
      dispatch(updateUserAsync())
      dispatch(resetRedeemKey())
    } else {
      dispatch(notify(`${message}`, 'danger'))
      dispatch(redeemCoinsFailure())
    }
    
  } catch ({ message }) {
    dispatch(notify(`${message}`, 'danger'))
    dispatch(redeemCoinsFailure())
  }
}

export const createPlan = () => ({
  type: CREATE_PLAN,
})

export const createPlanFailure = () => ({
  type: CREATE_PLAN_FAILURE,
})

export const createPlanSuccess = () => ({
  type: CREATE_PLAN_SUCCESS,
})

export const setPlan = (payload: IPlan) => ({
  type: SET_PLAN,
  payload
})

export const createPlanAsync = (reference?: string): ThunkAction<void, ApplicationState, null, Action<any>> => async (
  dispatch,
  getState
) => {
  dispatch(createPlan())
  
  const plan = getState().user.plan;
  console.tron.log(plan, "PLAN", reference)
  
  try {
    const result = await apiCreatePlan(plan)
    const { status, message, data } = result.data
    // console.log(data)
    
    if(status) {
      dispatch(notify(`${message}`, 'success'))
      dispatch(createPlanSuccess())
      dispatch(updateUserAsync())
      dispatch(NavigationActions.back())
    } else {
      dispatch(notify(`${message}`, 'danger'))
      dispatch(createPlanFailure())
    }
    
  } catch ({ message }) {
    dispatch(notify(`${message}`, 'danger'))
    dispatch(createPlanFailure())
  }
}

export const savePlanAsync = ({
    amount,
    months,
    planName,
    type,
    page
  }): ThunkAction<void, ApplicationState, null, Action<any>> => async (
  dispatch,
  getState
) => {
  
  const state = getState();
  const id = state.user.data.id
  const fullName = state.user.data.fullName
  const email = state.user.data.email
  const amountInKobo = amount * 100
  const invoiceLimit = months
  const planType = type ? type : "trip"
  const planMode = "monthly"
  
  const transaction = state.user.data.Transactions
  const subscription = state.user.data.Subscriptions
  
  const plan = {
    id,
    fullName,
    email,
    amountInKobo,
    invoiceLimit,
    planType,
    planMode,
    planName
  }
  
  console.tron.log(plan)
  dispatch(setPlan(plan))
  
  console.tron.log(transaction)
  console.tron.log(subscription)
  return subscription.length < 1
    ? dispatch(NavigationActions.navigate({ routeName: "planPayment", params: {
      page
      } }))
    : dispatch(createPlanAsync())
}

export const disablePlan = () => ({
  type: DISABLE_PLAN,
})

export const disablePlanFailure = () => ({
  type: DISABLE_PLAN_FAILURE,
})

export const disablePlanSuccess = () => ({
  type: DISABLE_PLAN_SUCCESS,
})


export const disablePlanAsync = (code: string, token: string): ThunkAction<void, ApplicationState, null, Action<any>> => async (
  dispatch,
  getState
) => {
  dispatch(disablePlan())
  
  try {
      await axios.post(`https://api.paystack.co/subscription/disable`, {
        code,
        token
      }, { headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` } })
        .then((response) => {
          console.tron.log(response)
          dispatch(disablePlanSuccess())
          dispatch(saveDisabledPlanAsync(code))
        })
        .catch(error  => {
          console.tron.log(error)
          dispatch(notify(`${error.message}`, 'danger'))
          dispatch(disablePlanFailure())
        })
  } catch ({ message }) {
    dispatch(notify(`${message}`, 'danger'))
    dispatch(disablePlanFailure())
  }
}

export const saveDisabledPlan = () => ({
  type: SAVE_DISABLED_PLAN,
})

export const saveDisabledPlanFailure = () => ({
  type: SAVE_DISABLED_PLAN_FAILURE,
})

export const saveDisabledPlanSuccess = () => ({
  type: SAVE_DISABLED_PLAN_SUCCESS,
})

export const saveDisabledPlanAsync = (code: string): ThunkAction<void, ApplicationState, null, Action<any>> => async (
  dispatch,
  getState
) => {
  dispatch(saveDisabledPlan())
  console.tron.log(code)
  
  try {
    const result = await apiDisablePlan(code)
    const { status, message } = result.data
    
    if(status) {
      dispatch(notify(`${message}`, 'success'))
      dispatch(saveDisabledPlanSuccess())
      dispatch(updateUserAsync())
    } else {
      dispatch(notify(`${message}`, 'danger'))
      dispatch(saveDisabledPlanFailure())
    }
    
  } catch ({ message }) {
    dispatch(notify(`${message}`, 'danger'))
    dispatch(disablePlanFailure())
  }
}

export const enablePlan = () => ({
  type: ENABLE_PLAN,
})

export const enablePlanFailure = () => ({
  type: ENABLE_PLAN_FAILURE,
})

export const enablePlanSuccess = () => ({
  type: ENABLE_PLAN_SUCCESS,
})

export const enablePlanAsync = (code: string, token: string): ThunkAction<void, ApplicationState, null, Action<any>> => async (
  dispatch,
  getState
) => {
  dispatch(enablePlan())
  
  try {
    await axios.post(`https://api.paystack.co/subscription/enable`, {
      code,
      token
    }, { headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` } })
      .then((response) => {
        console.tron.log(response)
        dispatch(enablePlanSuccess())
        dispatch(saveEnabledPlanAsync(code))
      })
      .catch(error  => {
        console.tron.log(error)
        dispatch(notify(`${error.message}`, 'danger'))
        dispatch(enablePlanFailure())
      })
  } catch ({ message }) {
    dispatch(notify(`${message}`, 'danger'))
    dispatch(enablePlanFailure())
  }
}


export const saveEnabledPlan = () => ({
  type: SAVE_ENABLED_PLAN,
})

export const saveEnabledPlanFailure = () => ({
  type: SAVE_DISABLED_PLAN_FAILURE,
})

export const saveEnabledPlanSuccess = () => ({
  type: SAVE_ENABLED_PLAN_SUCCESS,
})


export const saveEnabledPlanAsync = (code: string): ThunkAction<void, ApplicationState, null, Action<any>> => async (
  dispatch,
  getState
) => {
  dispatch(saveEnabledPlan())
  console.tron.log(code)
  
  try {
    const result = await apiEnablePlan(code)
    const { status, message } = result.data
    
    if(status) {
      dispatch(notify(`${message}`, 'success'))
      dispatch(saveEnabledPlanSuccess())
      dispatch(updateUserAsync())
    } else {
      dispatch(notify(`${message}`, 'danger'))
      dispatch(saveEnabledPlanFailure())
    }
    
  } catch ({ message }) {
    dispatch(notify(`${message}`, 'danger'))
    dispatch(saveEnabledPlanFailure())
  }
}

