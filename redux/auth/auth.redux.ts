import {
  AuthAction,
  AuthState,
  CHECK_PHONE_EXISTS_SUCCESS,
  CLEAR_TOKEN,
  SAVE_SELECTED_ROLE,
  SAVE_SELECTED_SCHOOL,
  SET_AUTH_EMAIL,
  SET_AUTH_FIRST_NAME,
  SET_AUTH_LAST_NAME,
  SET_AUTH_PASSWORD,
  SET_AUTH_PHONE,
  SET_AUTH_PICTURE,
  SET_AUTH_ROLES,
  SET_AUTH_SCHOOLS,
  SET_AUTH_TYPE,
  SET_AUTH_UID,
  SET_FCM_TOKEN,
  SET_TOKEN,
  SET_USER_EXISTS,
  SOCIAL_AUTHENTICATION,
  SOCIAL_AUTHENTICATION_FAILURE,
  SOCIAL_AUTHENTICATION_SUCCESS,
  SET_AUTH_FULL_NAME
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
      return {
        ...state,
        loading: true
      }
      
      
    case SOCIAL_AUTHENTICATION_FAILURE:
      return {
        ...state,
        loading: false
      }
      
    case SOCIAL_AUTHENTICATION_SUCCESS:
      return {
        ...state,
        loading: false
      }
      
    default:
      return state
  }
}
