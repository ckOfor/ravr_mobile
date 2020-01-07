import {
  ADD_REFERRAL_CODE,
  ADD_REFERRAL_CODE_FAILURE,
  ADD_REFERRAL_CODE_SUCCESS,
  AuthAction,
  AuthState,
  CHECK_PHONE_EXISTS_SUCCESS,
  CLEAR_AUTH,
  CLEAR_TOKEN,
  LOG_IN_WITH_EMAIL,
  LOG_IN_WITH_EMAIL_FAILURE,
  LOG_IN_WITH_EMAIL_SUCCESS,
  SET_AUTH_EMAIL,
  SET_AUTH_FULL_NAME,
  SET_AUTH_PASSWORD,
  SET_AUTH_PHONE,
  SET_AUTH_PICTURE,
  SET_AUTH_TYPE,
  SET_AUTH_UID,
  SET_FCM_TOKEN,
  SET_TOKEN,
  SET_USER_EXISTS,
  SOCIAL_AUTHENTICATION,
  SOCIAL_AUTHENTICATION_FAILURE,
  SOCIAL_AUTHENTICATION_SUCCESS
} from "./auth.types"

export const ISelected = {
  name: '',
  id: 0
}

const initialState: AuthState = {
  token: null,
  userExists: false,
  phoneNumber: "",
  countryCode: "+234",
  email: "",
  fullName: "",
  FCMToken: "",
  password: "",
  authType: "",
  uid: "",
  picture: "",
  loading: false
}

export function authReducer(
  state = initialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload
      }
    
    case SET_FCM_TOKEN:
      return {
        ...state,
        FCMToken: action.payload
      }

    case CLEAR_TOKEN:
      return {
        ...state,
        token: null
      }

    case SET_USER_EXISTS:
      return {
        ...state,
        userExists: action.payload
      }
      
    case SET_AUTH_FULL_NAME:
      return {
        ...state,
        fullName: action.payload
      }

    case CHECK_PHONE_EXISTS_SUCCESS:
      return {
        ...state,
        phoneNumber: action.payload.phoneNumber
      }

    case SET_AUTH_EMAIL:
      return {
        ...state,
        email: action.payload
      }
   
    case SET_AUTH_PHONE:
      return {
        ...state,
        phoneNumber: action.payload
      }
  
    case SET_AUTH_PASSWORD:
      return {
        ...state,
        password: action.payload
      }
    
    case SET_AUTH_TYPE:
      return {
        ...state,
        authType: action.payload
      }
      
    case SET_AUTH_PICTURE:
      return {
        ...state,
        picture: action.payload
      }
    
    case SET_AUTH_UID:
      return {
        ...state,
        uid: action.payload
      }
      
    case SOCIAL_AUTHENTICATION:
    case LOG_IN_WITH_EMAIL:
    case ADD_REFERRAL_CODE:
      return {
        ...state,
        loading: true
      }
      
      
    case SOCIAL_AUTHENTICATION_FAILURE:
    case LOG_IN_WITH_EMAIL_FAILURE:
    case LOG_IN_WITH_EMAIL_SUCCESS:
    case ADD_REFERRAL_CODE_FAILURE:
    case ADD_REFERRAL_CODE_SUCCESS:
      return {
        ...state,
        loading: false
      }
      
    case SOCIAL_AUTHENTICATION_SUCCESS:
      return {
        ...state,
        loading: false
      }
      
    case CLEAR_AUTH:
      return initialState
      
    default:
      return state
  }
}
