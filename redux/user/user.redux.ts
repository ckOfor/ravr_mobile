import {
  CREATE_TRANSACTION,
  CREATE_TRANSACTION_FAILURE,
  CREATE_TRANSACTION_SUCCESS,
  SET_USER_DETAILS,
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
}

export function userReducer(
  state = initialState,
  action: UserAction
): UserState {
  switch (action.type) {
    case SET_USER_DETAILS:
      return {
        ...state,
        data: action.payload
      }
  
    case CREATE_TRANSACTION:
      return {
        ...state,
        loading: true
      }
  
  
    case CREATE_TRANSACTION_FAILURE:
    case CREATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false
      }
    
    default:
      return state
  }
}
