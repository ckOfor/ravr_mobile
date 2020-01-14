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

export const UPDATE_USER_PROFILE_PICTURE= "UPDATE_USER_PROFILE_PICTURE"
type updateUserProfilePicture = {
  type: typeof  UPDATE_USER_PROFILE_PICTURE,
}

export const UPDATE_USER_PROFILE_PICTURE_FAILURE = "UPDATE_USER_PROFILE_PICTURE_FAILURE"
type updateUserProfilePictureFailure = {
  type: typeof UPDATE_USER_PROFILE_PICTURE_FAILURE,
}

export const UPDATE_USER_PROFILE_PICTURE_SUCCESS = "UPDATE_USER_PROFILE_PICTURE_SUCCESS"
type updateUserProfilePictureSuccess = {
  type: typeof UPDATE_USER_PROFILE_PICTURE_SUCCESS,
}


export const CREATE_REQUEST = "CREATE_REQUEST"
type createRequest = {
  type: typeof CREATE_REQUEST
}

export const CREATE_REQUEST_FAILURE = "CREATE_REQUEST_FAILURE"
type createRequestFailure = {
  type: typeof CREATE_REQUEST_FAILURE
}

export const CREATE_REQUEST_SUCCESS = "CREATE_REQUEST_SUCCESS"
type createRequestSuccess = {
  type: typeof CREATE_REQUEST_SUCCESS
}

export const REDEEM_COINS = "REDEEM_COINS"
type redeemCoins = {
  type: typeof REDEEM_COINS
}

export const REDEEM_COINS_FAILURE = "REDEEM_COINS_FAILURE"
type redeemCoinsFailure = {
  type: typeof REDEEM_COINS_FAILURE
}

export const REDEEM_COINS_SUCCESS = "REDEEM_COINS_SUCCESS"
type redeemCoinsSuccess = {
  type: typeof REDEEM_COINS_SUCCESS
}

export const RESET_AUTH_REDEEM_KEY = "RESET_AUTH_REDEEM_KEY"
type resetAuthRedeemKey = {
  type: typeof RESET_AUTH_REDEEM_KEY
}

export type IUser = {
  id: number
  fullName: string,
  pictureURL: string,
  email: string,
  userType: string,
  phoneNumber: string,
  notificationID: string,
  ravrId: string
  registrationBonus: boolean
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
  uploading: boolean,
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
  | updateUserProfilePicture
  | updateUserProfilePictureFailure
  | updateUserProfilePictureSuccess
  | createRequest
  | createRequestFailure
  | createRequestSuccess
  | redeemCoins
  | redeemCoinsFailure
  | redeemCoinsSuccess
  | resetAuthRedeemKey
