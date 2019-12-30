import { ITours } from "../../services/api";

export const SET_WEEKEND_TOURS = "SET_WEEKEND_TOURS"
type setWeekendTours = {
  type: typeof SET_WEEKEND_TOURS
  payload: [ITours]
}

export const GET_WEEKEND_TOURS = "GET_WEEKEND_TOURS"
type getWeekendTours = {
  type: typeof GET_WEEKEND_TOURS
  payload: string
}

export const GET_WEEKEND_TOURS_SUCCESS = "GET_WEEKEND_TOURS_SUCCESS"
type getWeekendToursSuccess = {
  type: typeof GET_WEEKEND_TOURS_SUCCESS
  payload: string
}

export const GET_WEEKEND_TOURS_FAILURE = "GET_WEEKEND_TOURS_FAILURE"
type getWeekendToursFailure = {
  type: typeof GET_WEEKEND_TOURS_FAILURE
  payload: string
}


export const SET_DISCOVER_TOURS = "SET_DISCOVER_TOURS"
type setDiscoverTours = {
  type: typeof SET_DISCOVER_TOURS
  payload: [ITours]
}

export const GET_DISCOVER_TOURS = "GET_DISCOVER_TOURS"
type getDiscoverTours = {
  type: typeof GET_DISCOVER_TOURS
  payload: string
}

export const GET_DISCOVER_TOURS_SUCCESS = "GET_DISCOVER_TOURS_SUCCESS"
type getDiscoverToursSuccess = {
  type: typeof GET_DISCOVER_TOURS_SUCCESS
  payload: string
}

export const GET_DISCOVER_TOURS_FAILURE = "GET_DISCOVER_TOURS_FAILURE"
type getDiscoverToursFailure = {
  type: typeof GET_DISCOVER_TOURS_FAILURE
  payload: string
}

export const SAVE_SELECTED_TOUR = "SAVE_SELECTED_TOUR"
type saveSelectedTour = {
  type: typeof SAVE_SELECTED_TOUR
  payload: [ITours]
}

export type TourState = {
  weekendTours: [ITours],
  discoverTours: [ITours],
  selectedTour: ITours,
  loading: boolean
}

export type TourAction =
  | setWeekendTours
  | getWeekendTours
  | getWeekendToursFailure
  | getWeekendToursSuccess
  | setDiscoverTours
  | getDiscoverTours
  | getDiscoverToursFailure
  | getDiscoverToursSuccess
  | saveSelectedTour
