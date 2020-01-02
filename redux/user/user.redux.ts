import {
  CLEAR_USER,
  CONTACT_US,
  CONTACT_US_FAILURE,
  CONTACT_US_SUCCESS,
  CREATE_TRANSACTION,
  CREATE_TRANSACTION_FAILURE,
  CREATE_TRANSACTION_SUCCESS,
  SAVE_MESSAGE,
  SAVE_SUBJECT,
  SET_USER_DETAILS,
  UPDATE_PHONE_NUMBER,
  UPDATE_PHONE_NUMBER_FAILURE,
  UPDATE_PHONE_NUMBER_SUCCESS,
  UserAction,
  UserState,
} from "./user.types"

export const IUser = {
  id: null,
  fullName: '',
  pictureURL: '',
  email: '',
  userType: '',
  phoneNumber: '',
  notificationID: '',
  gender: '',
  authType: '',
  status: '',
  createdAt: '',
  updatedAt: '',
  Tourists: [],
  Transactions: [],
  Guides: [],
}

const initialState: UserState = {
  data: IUser,
  loading: false,
  subject: '',
  message: '',
  authRedeemKey: '',
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

    case SET_USER_DETAILS:
      return {
        ...state,
        data: action.payload
      }
  
    case CREATE_TRANSACTION:
    case CONTACT_US:
    case UPDATE_PHONE_NUMBER:
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
