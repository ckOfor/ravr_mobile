import React from "react"
import * as Permissions from "expo-permissions"
import {
  AppState,
  AppStateStatus,
  Dimensions,
  Image,
  View,
  ImageBackground,
  ImageStyle,
  TextStyle,
  ViewStyle,
  Text
} from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { ApplicationState } from "../../redux";
import { colors, fonts, images } from "../../theme";
import {
  checkLocationPermissionAsync,
  askLocationPermissionAsync,
  openSettingsAsync,
} from "../../redux/startup";
import { Button } from "../../components/button";
// import {
//   checkNotificationPermissionAsync,
//   requestNotificationPermissionAsync,
//   getFirebasetokenAsync
// } from "../../redux/auth";
import { Layout } from "../../constants";
import { fetchUserLocationAsync } from "../../redux/device";

interface DispatchProps {
  // checkLocation: () => Permissions.PermissionStatus | any
  // askLocation: () => Permissions.PermissionStatus | any
  // openSettings: () => void
  // checkNotificationPermission: () => Permissions.PermissionStatus | any
  // requestNotificationPermission: () => Permissions.PermissionStatus | any
  // getFirebaseToken: () => void
  // getUserLocation: () => void
}

interface StateProps {
  appState: object,
  hasLocation: boolean,
  hasNotificationPermissions: boolean,
  hasDenied: boolean,
  disabledNotifications: boolean,
}

interface LocationPermissionProps extends NavigationScreenProps {
  appState: AppStateStatus
}

type Props = DispatchProps & StateProps & LocationPermissionProps

const CONTAINER: ViewStyle = {
  flex: 1,
  paddingHorizontal: 16,
  alignItems: "center",
  justifyContent: "space-around",
  backgroundColor: colors.monochromatic,
}

const APP_LOGO: ImageStyle = {
  alignSelf: "center",
  height: 100,
  width: 100,
}

const ENABLE_LOCATION_BUTTON: ViewStyle = {
  alignSelf: "center",
  justifyContent: "center",
  borderRadius: 100,
  width: Layout.window.width / 1.4,
  marginTop: 15,
  backgroundColor: colors.palette.primaryPink
}

const ENABLE_LOCATION_BUTTON_TEXT: TextStyle = {
  fontSize: 12,
  fontFamily: fonts.gibsonRegular,
  color: colors.palette.white,
  textTransform: 'uppercase'
}

class LocationPermissionsPage extends React.Component<Props> {
  // state = {
  //   appState: AppState.currentState,
  //   hasLocation: false,
  //   hasNotificationPermissions: false,
  //   hasDenied: false,
  //   disabledNotifications: false,
  // }
  //
  // componentWillUnmount() {
  //   AppState.removeEventListener("change", this.handleAppStateChange)
  // }
  //
  // askUserLocation = async () => {
  //   const { askLocation, getUserLocation } = this.props
  //
  //   try {
  //     const locationPermission = await askLocation()
  //     console.log(locationPermission)
  //     if (locationPermission === Permissions.PermissionStatus.GRANTED) {
  //       this.setState({ hasLocation: true, hasDenied: false }, () =>  this.checkNotificationPermission())
  //       getUserLocation()
  //     } else if (locationPermission === Permissions.PermissionStatus.DENIED) {
  //       this.setState({ hasDenied: true })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  //
  // handleAppStateChange = nextAppState => {
  //   if (
  //     this.state.appState.match(/inactive|background/) &&
  //     nextAppState === "active"
  //   ) {
  //     this.checkUserLocationStatus()
  //   }
  //
  //   this.setState({ appState: nextAppState })
  // }
  //
  // checkUserLocationStatus = async () => {
  //   AppState.addEventListener("change", this.handleAppStateChange)
  //   const { checkLocation, getUserLocation } = this.props
  //   try {
  //     const locationPermission = await checkLocation()
  //     console.log(locationPermission)
  //     if(locationPermission === Permissions.PermissionStatus.GRANTED) {
  //       getUserLocation()
  //       this.setState({ hasLocation: true, hasDenied: false }, () =>  this.checkNotificationPermission())
  //     } else if (locationPermission === Permissions.PermissionStatus.UNDETERMINED) {
  //       this.setState({ hasDenied: false }, () =>  this.askUserLocation())
  //     } else if (locationPermission === Permissions.PermissionStatus.DENIED) {
  //       this.setState({ hasDenied: true, hasLocation: false })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  //
  // checkNotificationPermission = async () => {
  //   console.log('called')
  //   const { checkNotificationPermission, requestNotificationPermission, getFirebaseToken, navigation } = this.props
  //   try {
  //     const notificationPermission = await checkNotificationPermission()
  //     console.log(notificationPermission)
  //
  //     if(notificationPermission) {
  //       getFirebaseToken()
  //       AppState.removeEventListener("change", this.handleAppStateChange)
  //       navigation.navigate("authLanding")
  //     } else {
  //       requestNotificationPermission()
  //       this.setState({ disabledNotifications: true })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  //
  // locationCTA
  //   = () => {
  //   const { openSettings } = this.props
  //   const { hasDenied } = this.state
  //
  //   return hasDenied
  //     ? openSettings()
  //     : this.checkUserLocationStatus()
  // }
  //
  // notificationsCTA = () => {
  //   console.log(this.state.disabledNotifications)
  //   const { openSettings } = this.props
  //   const { disabledNotifications } = this.state
  //
  //   return disabledNotifications ? openSettings() : this.checkNotificationPermission()
  // }
  //
  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    console.log(this.state)
    // const { hasDenied, hasLocation, disabledNotifications } = this.state
    
    
    return (
	    <View>
        <Text>SDS</Text>
	    </View>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  // checkLocation: () => dispatch(checkLocationPermissionAsync()),
  // askLocation: () => dispatch(askLocationPermissionAsync()),
  // openSettings: () => dispatch(openSettingsAsync()),
  // checkNotificationPermission: () => dispatch(checkNotificationPermissionAsync()),
  // requestNotificationPermission: () => dispatch(requestNotificationPermissionAsync()),
  // getFirebaseToken: () => dispatch(getFirebasetokenAsync()),
  // getUserLocation: () => dispatch(fetchUserLocationAsync()),
})

const mapStateToProps = (state: ApplicationState): StateProps => ({
  appState: {},
  hasLocation: false,
  hasNotificationPermissions: false,
  hasDenied: false,
  disabledNotifications: false,
})

export const LocationPermissionScreen = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(LocationPermissionsPage)
