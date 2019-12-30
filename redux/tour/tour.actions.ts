import {
  ITours,
  getWeekendTours as apiGetWeekendTours,
  getDiscoverTours as apiGetDiscoverTours,
} from "../../services/api"

import {
  GET_DISCOVER_TOURS,
  GET_DISCOVER_TOURS_FAILURE,
  GET_DISCOVER_TOURS_SUCCESS,
  GET_WEEKEND_TOURS,
  GET_WEEKEND_TOURS_FAILURE,
  GET_WEEKEND_TOURS_SUCCESS,
  SAVE_SELECTED_TOUR,
  SET_DISCOVER_TOURS,
  SET_WEEKEND_TOURS
} from "./";
import { notify } from "../auth";
import {ThunkAction} from "redux-thunk";
import {ApplicationState} from "../index";
import {Action} from "redux";

export const getWeekendTours = () => ({
  type: GET_WEEKEND_TOURS,
})

export const getWeekendToursFailure = () => ({
  type: GET_WEEKEND_TOURS_FAILURE,
})

export const getWeekendToursSuccess = () => ({
  type: GET_WEEKEND_TOURS_SUCCESS,
})

export const setWeekendTours = (tours: [ITours]) => ({ type: SET_WEEKEND_TOURS, payload: tours })


export const getWeekendToursAsync = (limit): ThunkAction<
  void,
  ApplicationState,
  null,
  Action<any>
  > => async (dispatch, getState) => {
  
  dispatch(getWeekendTours())
  
  try {
    const result = await apiGetWeekendTours(limit)
    const { status, message, data } = result.data
    console.tron.log(data)
    
    if (status) {
      dispatch(getWeekendToursSuccess())
      dispatch(setWeekendTours(data))
      
    } else {
      dispatch(notify(`${message}`, 'danger'))
    }
    dispatch(getWeekendToursFailure())
    
  } catch ({ message }){
    console.tron.log(message)
    dispatch(getWeekendToursFailure())
  }
}


export const getDiscoverTours = () => ({
  type: GET_DISCOVER_TOURS,
})

export const getDiscoverToursFailure = () => ({
  type: GET_DISCOVER_TOURS_FAILURE,
})

export const getDiscoverToursSuccess = () => ({
  type: GET_DISCOVER_TOURS_SUCCESS,
})

export const setDiscoverTours = (tours: [ITours]) => ({ type: SET_DISCOVER_TOURS, payload: tours })


export const getDiscoverToursAsync = (limit): ThunkAction<
  void,
  ApplicationState,
  null,
  Action<any>
  > => async (dispatch, getState) => {
  
  dispatch(getDiscoverTours())
  
  try {
    const result = await apiGetDiscoverTours(limit)
    const { status, message, data } = result.data
    console.tron.log(data)
    
    if (status) {
      dispatch(getDiscoverToursSuccess())
      dispatch(setDiscoverTours(data))
      
    } else {
      dispatch(notify(`${message}`, 'danger'))
      dispatch(getDiscoverToursFailure())
    }
    
  } catch ({ message }){
    console.tron.log(message, "messagemessagemessagemessage")
    dispatch(getDiscoverToursFailure())
  }
}

export const setSelectedTours = (tour: ITours) => ({ type: SAVE_SELECTED_TOUR, payload: tour })
