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

export const UPDATE_USER = "UPDATE_USER"
type updateUser = {
  type: typeof UPDATE_USER
}

export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE"
type updateUserFailure = {
  type: typeof UPDATE_USER_FAILURE
}

export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS"
type updateUserSuccess = {
  type: typeof UPDATE_USER_SUCCESS
}

export const SAVE_SUBJECT = "SAVE_SUBJECT"
type saveSubject = {
  type: typeof SAVE_SUBJECT,
  payload: string
}

export const SAVE_MESSAGE = "SAVE_MESSAGE"
type saveMessage = {
  type: typeof SAVE_MESSAGE,
  payload: string
}

export const CONTACT_US = "CONTACT_US"
type contactUs = {
  type: typeof CONTACT_US
}

export const CONTACT_US_FAILURE = "CONTACT_US_FAILURE"
type contactUsFailure = {
  type: typeof CONTACT_US_FAILURE
}

export const CONTACT_US_SUCCESS = "CONTACT_US_SUCCESS"
type contactUsSuccess = {
  type: typeof CONTACT_US_SUCCESS
}

export const CLEAR_USER = "CLEAR_USER"
type clearUser = {
  type: typeof CLEAR_USER
}

export const UPDATE_PHONE_NUMBER = "UPDATE_PHONE_NUMBER"
type updatePhoneNumber = {
  type: typeof UPDATE_PHONE_NUMBER
}

export const UPDATE_PHONE_NUMBER_FAILURE = "UPDATE_PHONE_NUMBER_FAILURE"
type updatePhoneNumberFailure = {
  type: typeof UPDATE_PHONE_NUMBER_FAILURE
}

export const UPDATE_PHONE_NUMBER_SUCCESS = "UPDATE_PHONE_NUMBER_SUCCESS"
type updatePhoneNumberSuccess = {
  type: typeof UPDATE_PHONE_NUMBER_SUCCESS
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
  subject: string,
  message: string,
  authRedeemKey: string,
}

export type UserAction =
  | setUserDetails
  | createTransaction
  | createTransactionFailure
  | createTransactionSuccess
  | updateUser
  | updateUserFailure
  | updateUserSuccess
  | saveSubject
  | saveMessage
  | contactUs
  | contactUsFailure
  | contactUsSuccess
  | clearUser
  | updatePhoneNumber
  | updatePhoneNumberFailure
  | updatePhoneNumberSuccess
