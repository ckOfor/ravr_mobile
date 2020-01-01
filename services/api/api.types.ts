export type createTransactionPayload = {
  id: number
  guideId: string
  tourId: number
  reference: string
  slots: number
}

export type logInUserPayload = {
  email: string
  password: string
  notificationId: string,
}

export type loginPayload = {
  email: string
  FCMToken: string
  password: string
}

export type signUpPayload = {
  fullName: string
  email: string
  password: string
  notificationId: string
  authType: string,
  userType: string
}

export type signUpWithEmailAndPasswordPayload = {
  f_name: string
  l_name: string
  email: string
  password: string
  college: number
  phone: string
  user_type: number
  phone_country: string
  gender: string
  auth_mode: string
  device_type: string
  push_token: string
  app_version: string
  device_id: string
}


export type IFacebookPicture = {
  height: string,
  is_silhouette: boolean
  url: string
  width: number
}

export type logInUserResponse = {
  kind: "ok";
  data: {
    message: string
    errors: object
    links: object
    status: boolean,
    data: IUser
  },
  message: string
  errors: object
  links: object
  status: boolean
}

export type getResponse = {
  kind: "ok";
  data: {
    data: {
      details: ISchool
    },
    message: string
    errors: object
    links: object
    status: boolean
  },
}

export type getAllRolesResponse = {
  kind: "ok";
  data: {
    data: {
      details: ISchool
    },
    message: string
    errors: object
    links: object
    status: boolean
  },
}

export type ISchool = {
  name: string
  id: string
}

export type IUserWallet = {
  balance: number
}

export type IUserDetails = {
  u_edu_institution: number
  first_name: string
  u_id: number
  u_image: string
  wallet_balance: IUserWallet
}

export type IUser = {
  access_token: string
  institution_id: number
  institution_name: string
  user_details: IUserDetails
  user_pic_url: string
  user_pic_url_100: string
  user_pic_url_200: string
}

export type ITours = {
  id: number
  tripName: string
  tripWallet: number
  tripPaymentCount: number
  tripLocation: string
  tripDate: string
  poster: string
  locationPictureOne: string
  locationPictureTwo: string
  locationPictureThree: string
  tripVideo: null
  tripTime: string
  tripPrice: number
  tripDuration: number
  tripDiscount: number
  tripContent: string
  tripStatus: string
  requestStatus: string
  userDiscount: number
  userPays: string
  payStackCharges: number
  payTourCompany: number
  paySympleInc: number
  userCoins: number
  tripLikesCount: number
  noOfSlots: number
  companyLogo: string
  paymentStatus: string
  tripDeadline: string
  paymentId: string
  userId: string
  createdAt: string
  updatedAt: string
}

export type IUpcomingTrips = {
  ride_id: string
  ride_trip_id: string
  ride_type: string
  future_date: string
  future_time: string
  ride_driver_id: number
  ride_booked_on:  string
  ride_booked_on_date: string
  ride_booked_on_time: string
  ride_amount: number
  ride_status: string
  ride_payment_status: string
  ride_payment_time: string
  ride_seats: number
  ride_from: string
  ride_to: string
}
