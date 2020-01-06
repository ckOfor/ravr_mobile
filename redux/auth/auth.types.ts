export const SOCIAL_AUTHENTICATION = "SOCIAL_AUTHENTICATION"
type SocialAuthenticationAction = {
  type: typeof SOCIAL_AUTHENTICATION
  payload: string
}

export const SET_USER = "SET_USER"

export const SOCIAL_AUTHENTICATION_SUCCESS = "SOCIAL_AUTHENTICATION_SUCCESS"
type SocialAuthenticationActionSuccess = {
  type: typeof SOCIAL_AUTHENTICATION_SUCCESS
  payload: string
}

export const SOCIAL_AUTHENTICATION_FAILURE = "SOCIAL_AUTHENTICATION_FAILURE"
type SocialAuthenticationActionFailure = {
  type: typeof SOCIAL_AUTHENTICATION_FAILURE
  payload: string
}

export const FACEBOOK_AUTH = "FACEBOOK_AUTH"
type FacebookAuthAction = {
  type: typeof FACEBOOK_AUTH
  payload: string
}

export const SET_TOKEN = "SET_TOKEN"
type SetTokenAction = {
  type: typeof SET_TOKEN
  payload: string
}

export const SET_FCM_TOKEN = "SET_FCM_TOKEN"
type SetFCMTokenAction = {
  type: typeof SET_FCM_TOKEN
  payload: string
}

export const CLEAR_TOKEN = "CLEAR_TOKEN"
type ClearTokenAction = {
  type: typeof CLEAR_TOKEN
}

export const SET_USER_EXISTS = "SET_USER_EXISTS"
type SetUserExistsAction = {
  type: typeof SET_USER_EXISTS
  payload: boolean
}

export const SET_AUTH_FIRST_NAME = "SET_AUTH_FIRST_NAME"
type SetAuthFirstNameAction = {
  type: typeof SET_AUTH_FIRST_NAME
  payload: string
}

export const SET_AUTH_FULL_NAME = "SET_AUTH_FULL_NAME"
type SetAuthFullNameAction = {
  type: typeof SET_AUTH_FULL_NAME
  payload: string
}

export const SET_AUTH_LAST_NAME = "SET_AUTH_LAST_NAME"
type SetAuthLastNameAction = {
  type: typeof SET_AUTH_LAST_NAME
  payload: string
}

export const SET_AUTH_EMAIL = "SET_AUTH_EMAIL"
type SetAuthEmailAction = {
  type: typeof SET_AUTH_EMAIL
  payload: string
}

export const SET_AUTH_PASSWORD = "SET_AUTH_PASSWORD"
type SetAuthPasswordAction = {
  type: typeof SET_AUTH_PASSWORD
  payload: string
}

export const SET_AUTH_TYPE = "SET_AUTH_TYPE"
type SetAuthTypeAction = {
  type: typeof SET_AUTH_TYPE
  payload: string
}

export const SET_AUTH_UID = "SET_AUTH_UID"
type SetAuthUIDAction = {
  type: typeof SET_AUTH_UID
  payload: string
}


export const SET_AUTH_PICTURE = "SET_AUTH_PICTURE"
type SetAuthPictureAction = {
  type: typeof SET_AUTH_PICTURE
  payload: string
}

export const SET_AUTH_PHONE = "SET_AUTH_PHONE"
type SetAuthPhoneAction = {
  type: typeof SET_AUTH_PHONE
  payload: string
}


export const SET_AUTH_SCHOOLS = "SET_AUTH_SCHOOLS"
type SetAuthSchoolsAction = {
  type: typeof SET_AUTH_SCHOOLS
  payload: object
}

export const SET_AUTH_ROLES = "SET_AUTH_ROLES"
type SetAuthRolesAction = {
  type: typeof SET_AUTH_ROLES
  payload: object
}

export const SAVE_SELECTED_SCHOOL = "SAVE_SELECTED_SCHOOL"
type SaveSelectedSchoolAction = {
  type: typeof SAVE_SELECTED_SCHOOL
  payload: object
}

export const SAVE_SELECTED_ROLE = "SAVE_SELECTED_ROLE"
type SaveSelectedRoleAction = {
  type: typeof SAVE_SELECTED_ROLE
  payload: object
}

export const CHECK_PHONE_EXISTS = "CHECK_PHONE_EXISTS"
export const CHECK_PHONE_EXISTS_SUCCESS = "CHECK_PHONE_EXISTS_SUCCESS"
type CheckPhoneExistsSuccessAction = {
  type: typeof CHECK_PHONE_EXISTS_SUCCESS
  payload: {
    phoneNumber: string
  }
}

export const CHECK_EMAIL_EXISTS = "CHECK_EMAIL_EXISTS"
export const CHECK_EMAIL_EXISTS_SUCCESS = "CHECK_EMAIL_EXISTS_SUCCESS"
type CheckEmailExistsSuccessAction = {
  type: typeof CHECK_EMAIL_EXISTS_SUCCESS
  payload: {
    email: string
  }
}


export const LOG_IN_WITH_EMAIL = "LOG_IN_WITH_EMAIL"
type loginWithEmail = {
  type: typeof LOG_IN_WITH_EMAIL
  payload: string
}

export const LOG_IN_WITH_EMAIL_FAILURE = "LOG_IN_WITH_EMAIL_FAILURE"
type loginWithEmailFailure = {
  type: typeof LOG_IN_WITH_EMAIL_FAILURE
  payload: string
}

export const LOG_IN_WITH_EMAIL_SUCCESS = "LOG_IN_WITH_EMAIL_SUCCESS"
type loginWithEmailSuccess = {
  type: typeof LOG_IN_WITH_EMAIL_SUCCESS
  payload: string
}

export const LOG_IN_WITH_GMAIL = "LOG_IN_WITH_GMAIL"
export const LOG_IN_WITH_GMAIL_SUCCESS = "LOG_IN_WITH_GMAIL_SUCCESS"
type logInWithGmailSuccessAction = {
  type: typeof LOG_IN_WITH_GMAIL_SUCCESS
  payload: {
    email: string
  }
}


export const LOG_IN_WITH_FACEBOOK = "LOG_IN_WITH_FACEBOOK"
export const LOG_IN_WITH_FACEBOOK_SUCCESS = "LOG_IN_WITH_FACEBOOK_SUCCESS"
type logInWithFacebookSuccessAction = {
  type: typeof LOG_IN_WITH_FACEBOOK_SUCCESS
  payload: {
    email: string
  }
}

export const CREATE_USER = "CREATE_USER"
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS"
export interface CreateUserPayload {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
}

type CreateUserSuccessAction = {
  type: typeof CREATE_USER_SUCCESS
  payload: CreateUserPayload
}


export const CLEAR_AUTH = "CLEAR_AUTH"
type clearAuth = {
  type: typeof CLEAR_AUTH
}


export type ISelected = {
  name: string
  id: number
}

export type AuthState = {
  token: string | null
  userExists: boolean
  phoneNumber: string
  countryCode: string
  email: string
  fullName: string
  FCMToken: string
  password: string,
  authType: string,
  uid: string
  picture: string
  loading: boolean
}

export type AuthAction =
  | SetTokenAction
  | ClearTokenAction
  | SetUserExistsAction
  | CheckPhoneExistsSuccessAction
  | CheckEmailExistsSuccessAction
  | SetAuthEmailAction
  | SetAuthFirstNameAction
  | SetAuthLastNameAction
  | CreateUserSuccessAction
  | SetAuthPhoneAction
  | SetFCMTokenAction
  | SetAuthPasswordAction
  | SetAuthUIDAction
  | SetAuthTypeAction
  | SetAuthPictureAction
  | logInWithGmailSuccessAction
  | logInWithFacebookSuccessAction
  | SetAuthSchoolsAction
  | SaveSelectedSchoolAction
  | SetAuthRolesAction
  | SaveSelectedRoleAction
  | SocialAuthenticationAction
  | SocialAuthenticationActionFailure
  | SocialAuthenticationActionSuccess
  | SetAuthFullNameAction
  | clearAuth
  | loginWithEmail
  | loginWithEmailFailure
  | loginWithEmailSuccess
