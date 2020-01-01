export const SET_USER_DETAILS = "SET_USER_DETAILS"
type setUserDetails = {
  type: typeof SET_USER_DETAILS
  payload: IUser
}

export const CREATE_TRANSACTION = "CREATE_TRANSACTION"
type createTransaction = {
  type: typeof CREATE_TRANSACTION
}

export const CREATE_TRANSACTION_FAILURE = "CREATE_TRANSACTION_FAILURE"
type createTransactionFailure = {
  type: typeof CREATE_TRANSACTION_FAILURE
}

export const CREATE_TRANSACTION_SUCCESS = "CREATE_TRANSACTION_SUCCESS"
type createTransactionSuccess = {
  type: typeof CREATE_TRANSACTION_SUCCESS
}


export type IUser = {
  id: number
  fullName: string,
  pictureURL: string,
  email: string,
  userType: string,
  phoneNumber: string,
  notificationID: string,
  gender: string,
  authType: string,
  status: string,
  createdAt: string,
  updatedAt: string,
  Tourists: any[],
  Transactions: any[],
  Guides: any[],
}

export type UserState = {
  data: IUser,
  loading: boolean,
}

export type UserAction =
  | setUserDetails
  | createTransaction
  | createTransactionFailure
  | createTransactionSuccess
