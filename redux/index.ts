import { combineReducers, Reducer } from "redux"
import { deviceReducer as device, DeviceState } from "./device"
import { startupReducer as startup, StartupState } from "./startup"
import { authReducer as auth, AuthState } from "./auth"
import { tourReducer as tour, TourState} from "./tour";
import { userReducer as user, UserState} from "./user";
import { navReducer } from "../navigation/redux-navigation"

export interface ApplicationState {
  nav: any
  startup: StartupState
  device: DeviceState
  auth: AuthState
  tour: TourState
  user: UserState
}

export const appReducer: Reducer<ApplicationState> = combineReducers({
  nav: navReducer,
  startup,
  device,
  auth,
  tour,
  user
})
