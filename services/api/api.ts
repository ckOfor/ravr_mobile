// a library to wrap and simplify api calls
import apisauce from "apisauce"
import { RN_API_ENDPOINT_BASE } from "react-native-dotenv"
import * as Types from "./api.types"
import Reactotron from "../../config/reactotron-config"
import { getGeneralApiProblem } from "./api-problem"
import {IFacebookPicture} from "./api.types";
import {Toast} from "native-base";

const api = apisauce.create({
  // base URL is read from the "constructor"
  baseURL: RN_API_ENDPOINT_BASE,
  // here are some default headers
  headers: {
    "Cache-Control": "no-cache",
    Accept: 'application/json',
    ContentType: 'application/json',
  },
  // 10 second timeout...
  timeout: 10000
})

/**
 * Process the api response
 */
const processResponse = async (response): Promise<any> => {
  // the typical ways to die when calling an api
  if (!response.ok) {
    const problem = getGeneralApiProblem(response)
    if (problem) {
      console.tron.error({ ...response, message: response.config.url })
      return problem
    }
  }

  // we're good
  // replace with `data` once api change is made.
  return { kind: "ok", data: response.data }
}


const contactUs = async (id: number, subject: string, body: string, email: string): Promise<any> => {
  const response = await api.post("/users/contact/us", {
    id,
    subject,
    body,
    email
  })
  return processResponse(response)
}

const createTransaction = async ({
  id,
  guideId,
  tourId,
  reference,
  slots
}: Types.createTransactionPayload): Promise<
  Types.logInUserResponse
  > => {
  const response = await api.post("/users/post/pay", {
    id,
    guideId,
    tourId,
    reference,
    slots
  })
  return processResponse(response)
}

const searchTextTours = async (searchKey: string, date?: string): Promise<
  Types.getResponse
  > => {
  const response = await api.post("/users/post/search", {
    searchKey,
    date
  })
  console.log(response)
  return processResponse(response)
}

const searchAmountTours = async (searchKey: number, date?: string): Promise<
  Types.getResponse
  > => {
  const response = await api.post("/users/post/search/amount", {
    searchKey,
    date
  })
  console.log(response)
  return processResponse(response)
}


const getWeekendTours = async (limit: number): Promise<
  Types.getResponse
  > => {
  const response = await api.post("/users/post/weekend", {
    limit
  })
  console.log(response)
  return processResponse(response)
}


const getDiscoverTours = async (limit: number): Promise<
  Types.getResponse
  > => {
  const response = await api.post("/users/post/discover", {
    limit
  })
  console.log(response)
  return processResponse(response)
}


const getPopularTours = async (limit: number): Promise<
  Types.getResponse
  > => {
  const response = await api.post("/users/post/all", {
    limit
  })
  console.log(response)
  return processResponse(response)
}


const logInWithEmail = async ({
  email,
  password,
  notificationId
}: Types.logInUserPayload): Promise<
  Types.logInUserResponse
  > => {
  const response = await api.post("/users/retrieve", {
    email,
    password,
    notificationId
  })
  return processResponse(response)
}


const signUpWithSocialAuth = async ({
  fullName,
  email,
  password,
  notificationId,
  authType,
  userType
}: Types.signUpPayload): Promise<
  Types.logInUserResponse
  > => {
  const response = await api.post("/users/create", {
    fullName,
    email,
    password,
    notificationId,
    authType,
    userType
  })
  return processResponse(response)
}


const signUpWithEmailAndPassword = async ({
  f_name,
  l_name,
  email,
  password,
  college,
  phone,
  user_type,
  gender,
  phone_country,
  auth_mode,
  device_id,
  device_type,
  push_token,
  app_version
}: Types.signUpWithEmailAndPasswordPayload): Promise<
  Types.logInUserResponse
  > => {
  const response = await api.post("/auth/register", {
    f_name,
    l_name,
    email,
    password,
    college,
    phone,
    user_type,
    gender,
    phone_country,
    auth_mode,
    device_id,
    device_type,
    push_token,
    app_version
  })
  return processResponse(response)
}

const logInWithSocialAuth = async ({
 email, FCMToken, password
}: Types.loginPayload): Promise<
  Types.logInUserResponse
  > => {
  const response = await api.post("/users/retrieve", {
    email,
    notificationId: FCMToken,
    password
  })
  return processResponse(response)
}

const getAllSchools = async (): Promise<
  Types.getResponse
  > => {
  const response = await api.get("/auth/select_college")
  console.log(response)
  return processResponse(response)
}

const getRideAmount = async (locationAddress, destinationAddress, noOfSeats): Promise<any> => {
  const response = await api.get(`/ride/search/amount/${locationAddress.replace(/ /g, '+')}/${destinationAddress.replace(/ /g, '+')}/${noOfSeats}/yes`)
  return processResponse(response)
}

const getAllRoles = async (): Promise<
  Types.getAllRolesResponse
  > => {
  const response = await api.get("/auth/select_user_type")
  return processResponse(response)
}

const forgotPassword = async (email: string): Promise<
  Types.logInUserResponse
  > => {
  const response = await api.post("/auth/forgot", {
    email,
  })
  return processResponse(response)
}

const rateRide = async (
  driver_id,
  trip_id,
  user_id,
  rating_score,
  review
): Promise<
  any
  > => {
  const response = await api.post("/ride/add_rating", {
    driver_id,
    trip_id,
    user_id,
    rating_score,
    review
  })
  return processResponse(response)
}

const changeNumber = async (
  userid,
  phone_country,
  phone
): Promise<
  any
  > => {
  const response = await api.post("/update/phone", {
    userid,
    phone_country,
    phone
  })
  return processResponse(response)
}

const changePassword = async (
  userid,
  old_password,
  new_password
): Promise<
  any
  > => {
  const response = await api.post("/update/password", {
    userid,
    old_password,
    new_password
  })
  return processResponse(response)
}

const getUser = async (user_id): Promise<any> => {
  const response = await api.get(`/view/details/user/${user_id}`, {user_id,
  })
  return processResponse(response)
}

const getPreviousTrips = async (user_id): Promise<any> => {
  const response = await api.get(`/view/rides/user/${user_id}`)
  return processResponse(response)
}

const getUpcomingTrips = async (user_id): Promise<any> => {
  const response = await api.get(`/view/rides/current/user/${user_id}`)
  return processResponse(response)
}

const cancelUserRide = async (ride_id): Promise<
  any
  > => {
  const response = await api.get( `/rides/cancel/${ride_id}/yes`)
  return processResponse(response)
}

const cancelUserRideWithCharges = async (ride_id, userLocationLatitude, userLocationLongitude): Promise<
  any
  > => {
  const response = await api.get( `/rides/stop/${ride_id}/${userLocationLatitude}/${userLocationLongitude}`)
  return processResponse(response)
}

const requestMoov = async ({
   userid,
   from,
   to,
   pooling,
   seats,
   amount,
   current_lat,
   current_long,
   from_lat,
   from_long,
   to_lat,
   to_long,
   collegeid
                           }): Promise<
  Types.logInUserResponse
  > => {
  const response = await api.post("/ride/book_now", {
    userid,
    from,
    to,
    pooling,
    seats,
    amount,
    current_lat,
    current_long,
    from_lat,
    from_long,
    to_lat,
    to_long,
    collegeid
  })
  console.log(response)
  return processResponse(response)
}

const updateProfile = async (
  userid,
  f_name,
  l_name,
  gender,
  college
): Promise<
  Types.logInUserResponse
  > => {
  const response = await api.post("/update/profile", {
    userid,
    f_name,
    l_name,
    gender,
    college
  })
  return processResponse(response)
}

const updateUserEmail = async (
  userid,
  old_email,
  new_email
): Promise<
  Types.logInUserResponse
  > => {
  const response = await api.post("/update/email", {
    userid,
    old_email,
    new_email
  })
  return processResponse(response)
}

const verifyWalletRecharge = async (
  userid,
  reference
): Promise<
  Types.logInUserResponse
  > => {
  const response = await api.post(`/wallet/verify`, {
    userid,
    reference
  })
  return processResponse(response)
}

const verifyReceiverEmail = async (receiverEmail): Promise<any> => {
  const response = await api.get(`/users/email/${receiverEmail}`)
  return processResponse(response)
}

const transferToWallet = async (
  from,
  to,
  amount
): Promise<
  Types.logInUserResponse
  > => {
  const response = await api.post(`/wallet/transfer/user`, {
    from,
    to,
    amount
  })
  return processResponse(response)
}

// const updateUserProfilePicture = async (
//   userId,
//   image
// ): Promise<
//   Types.logInUserResponse
//   > => {
//   const response = await api.post(`/update/profile_pic/${userId}`, {
//     image
//   })
//   return processResponse(response)
// }

const updateUserProfilePicture = async (
  userId,
  image
): Promise<
  Types.logInUserResponse
  > => {
  const response = await api.post(`/update/profile_pic/ios/${userId}`, {
    image
  })
  return processResponse(response)
}

const initializeWalletRecharge = async (userid, amount): Promise<
  Types.logInUserResponse
  > => {
  const response = await api.post("/wallet/init_payment", {
    userid,
    amount,
  })
  return processResponse(response)
}

const sendMessage = async (
 userid,
 from,
 subject,
 message,
 message_type
): Promise<
  Types.logInUserResponse
  > => {
  const response = await api.post("/support/email", {
    userid,
    from,
    subject,
    message,
    message_type
    // userid: 341,
    // "from": "Chinedu",
    // subject: "Hello",
    // message: "YAsasas",
    // message_type: "user"
  })
  return processResponse(response)
}

export {
  logInWithEmail,
  forgotPassword,
  logInWithSocialAuth,
  getAllSchools,
  getAllRoles,
  signUpWithSocialAuth,
  signUpWithEmailAndPassword,
  getRideAmount,
  requestMoov,
  cancelUserRide,
  cancelUserRideWithCharges,
  rateRide,
  getUser,
  initializeWalletRecharge,
  sendMessage,
  changeNumber,
  changePassword,
  getUpcomingTrips,
  getPreviousTrips,
  updateProfile,
  updateUserEmail,
  updateUserProfilePicture,
  verifyWalletRecharge,
  verifyReceiverEmail,
  transferToWallet,
  getWeekendTours,
  getDiscoverTours,
  getPopularTours,
  searchTextTours,
  searchAmountTours,
  createTransaction,
  contactUs,
}
