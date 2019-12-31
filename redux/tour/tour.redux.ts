import {
  GET_DISCOVER_TOURS,
  GET_DISCOVER_TOURS_FAILURE,
  GET_DISCOVER_TOURS_SUCCESS,
  GET_SEARCH_TOURS,
  GET_SEARCH_TOURS_FAILURE,
  GET_SEARCH_TOURS_SUCCESS,
  GET_WEEKEND_TOURS,
  GET_WEEKEND_TOURS_FAILURE,
  GET_WEEKEND_TOURS_SUCCESS,
  SAVE_SELECTED_TOUR,
  SET_DISCOVER_TOURS,
  SET_SEARCH_TOURS,
  SET_WEEKEND_TOURS,
  TourAction,
  TourState
} from "./tour.types";

export const ITours = {
  id: null,
  tripName: '',
  tripWallet:  null,
  tripPaymentCount:  null,
  tripLocation: '',
  tripDate: '',
  poster: '',
  locationPictureOne: '',
  locationPictureTwo: '',
  locationPictureThree: '',
  tripVideo: null,
  tripTime: '',
  tripPrice:  null,
  tripDuration:  null,
  tripDiscount:  null,
  tripContent: '',
  tripStatus: '',
  requestStatus: '',
  userDiscount:  null,
  userPays:  '',
  payStackCharges:  null,
  payTourCompany:  null,
  paySympleInc:  null,
  userCoins:  null,
  tripLikesCount:  null,
  noOfSlots:  null,
  companyLogo: '',
  paymentStatus: '',
  tripDeadline: '',
  paymentId: '',
  userId: '',
  createdAt: '',
  updatedAt: '',
}

const initialState: TourState = {
  weekendTours: [ITours],
  discoverTours: [ITours],
  selectedTour: {
    ...ITours
  },
  loading: false,
  searchedTours: [ITours],
}

export function tourReducer(
  state = initialState,
  action: TourAction
): TourState {
  switch (action.type) {
    
    case SET_WEEKEND_TOURS:
      return {
        ...state,
        weekendTours: action.payload
      }
  
    case SET_SEARCH_TOURS:
      return {
        ...state,
        searchedTours: action.payload
      }
  
    case SAVE_SELECTED_TOUR:
      return {
        ...state,
        selectedTour: action.payload
      }
  
    case SET_DISCOVER_TOURS:
      return {
        ...state,
        discoverTours: action.payload
      }
  
    case GET_WEEKEND_TOURS:
    case GET_DISCOVER_TOURS:
    case GET_SEARCH_TOURS:
      return {
        ...state,
        loading: true
      }
  
    case GET_WEEKEND_TOURS_FAILURE:
    case GET_WEEKEND_TOURS_SUCCESS:
    case GET_DISCOVER_TOURS_FAILURE:
    case GET_DISCOVER_TOURS_SUCCESS:
    case GET_SEARCH_TOURS_FAILURE:
    case GET_SEARCH_TOURS_SUCCESS:
      return {
        ...state,
        loading: false
      }
      
    
    default:
      return state
  }
}
