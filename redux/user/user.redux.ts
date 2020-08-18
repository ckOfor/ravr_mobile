import {
  CLEAR_USER,
  CONTACT_US,
  CONTACT_US_FAILURE,
  CONTACT_US_SUCCESS,
  CREATE_PLAN,
  CREATE_PLAN_FAILURE,
  CREATE_PLAN_SUCCESS,
  CREATE_REQUEST,
  CREATE_REQUEST_FAILURE,
  CREATE_TRANSACTION,
  CREATE_TRANSACTION_FAILURE,
  CREATE_TRANSACTION_SUCCESS,
  DISABLE_PLAN,
  DISABLE_PLAN_FAILURE,
  DISABLE_PLAN_SUCCESS,
  ENABLE_PLAN,
  ENABLE_PLAN_FAILURE,
  ENABLE_PLAN_SUCCESS,
  REDEEM_COINS,
  REDEEM_COINS_FAILURE,
  REDEEM_COINS_SUCCESS,
  RESET_AUTH_REDEEM_KEY,
  SAVE_DISABLED_PLAN,
  SAVE_DISABLED_PLAN_FAILURE,
  SAVE_DISABLED_PLAN_SUCCESS,
  SAVE_ENABLED_PLAN,
  SAVE_ENABLED_PLAN_FAILURE,
  SAVE_ENABLED_PLAN_SUCCESS,
  SAVE_MESSAGE,
  SAVE_SUBJECT,
  SET_PLAN,
  SET_USER_DETAILS,
  UPDATE_PHONE_NUMBER,
  UPDATE_PHONE_NUMBER_FAILURE,
  UPDATE_PHONE_NUMBER_SUCCESS,
  UPDATE_USER_PROFILE_PICTURE,
  UPDATE_USER_PROFILE_PICTURE_FAILURE,
  UPDATE_USER_PROFILE_PICTURE_SUCCESS,
  UserAction,
  UserState,
} from './user.types'


export const IPlan = {
  id: 0,
  fullName: '',
  email: '',
  amountInKobo: 0,
  invoiceLimit: '',
  planType: '',
  planMode: '',
  planName: ''
}

export const ISub = {
  id: 1,
  fullName: '',
  email: '',
  amount: '',
  invoiceLimit: '',
  planName: '',
  planType: '',
  planMode: '',
  planCode: '',
  customerCode: '',
  subscriptionCode: '',
  emailToken: '',
  status:  '',
  createdAt: '',
  updatedAt: '',
  userId: 0
}

export const IUser = {
  id: null,
  fullName: '',
  pictureURL: '',
  email: '',
  userType: '',
  phoneNumber: '',
  ravrId: '',
  registrationBonus: true,
  notificationID: '',
  gender: '',
  authType: '',
  status: '',
  createdAt: '',
  updatedAt: '',
  Tourists: [],
  Transactions: [],
  Guides: [],
  Subscriptions: [],
  Savings: [],
}

const initialState: UserState = {
  data: IUser,
  
  
  loading: false,
  subject: '',
  message: '',
  authRedeemKey: '',
  uploading: false,
  plan: IPlan
}

export function userReducer(
  state = initialState,
  action: UserAction
): UserState {
  switch (action.type) {
    case SAVE_SUBJECT:
      return {
        ...state,
        subject: action.payload
      }
  
    case SAVE_MESSAGE:
      return {
        ...state,
        message: action.payload
      }
      
    case RESET_AUTH_REDEEM_KEY:
      return {
        ...state,
        authRedeemKey: ''
      }

    case SET_USER_DETAILS:
      return {
        ...state,
        data: action.payload
      }
  
    case SET_PLAN:
      return {
        ...state,
        plan: action.payload
      }
  
    case UPDATE_USER_PROFILE_PICTURE:
      return {
        ...state,
        uploading: true
      }
  
    case UPDATE_USER_PROFILE_PICTURE_FAILURE:
    case UPDATE_USER_PROFILE_PICTURE_SUCCESS:
      return {
        ...state,
        uploading: false
      }
  
    case CREATE_TRANSACTION:
    case CONTACT_US:
    case UPDATE_PHONE_NUMBER:
    case CREATE_REQUEST:
    case REDEEM_COINS:
    case CREATE_PLAN:
    case DISABLE_PLAN:
    case SAVE_DISABLED_PLAN:
    case ENABLE_PLAN:
    case SAVE_ENABLED_PLAN:
      return {
        ...state,
        loading: true
      }
  
  
    case CREATE_TRANSACTION_FAILURE:
    case CREATE_TRANSACTION_SUCCESS:
    case CONTACT_US_FAILURE:
    case CONTACT_US_SUCCESS:
    case UPDATE_PHONE_NUMBER_FAILURE:
    case UPDATE_PHONE_NUMBER_SUCCESS:
    case CREATE_REQUEST_FAILURE:
    case CREATE_TRANSACTION_SUCCESS:
    case REDEEM_COINS_FAILURE:
    case REDEEM_COINS_SUCCESS:
    case CREATE_PLAN_FAILURE:
    case CREATE_PLAN_SUCCESS:
    case DISABLE_PLAN_FAILURE:
    case DISABLE_PLAN_SUCCESS:
    case SAVE_DISABLED_PLAN_FAILURE:
    case SAVE_DISABLED_PLAN_SUCCESS:
    case ENABLE_PLAN_FAILURE:
    case ENABLE_PLAN_SUCCESS:
    case SAVE_ENABLED_PLAN_FAILURE:
    case SAVE_ENABLED_PLAN_SUCCESS:
      return {
        ...state,
        loading: false
      }
  
    case CLEAR_USER:
      return initialState
    
    default:
      return state
  }
}
