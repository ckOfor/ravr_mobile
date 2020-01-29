// react
import React from "react"

// react-native
import {
  ImageBackground, ImageStyle, Image, TextStyle, ViewStyle, View, Text, ActivityIndicator
} from "react-native"

// third-party libraries
import { NavigationScreenProps } from "react-navigation"
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from "react-native-fbsdk";

// redux
import { connect } from "react-redux"
import { Dispatch } from "redux";
import { ApplicationState } from "../../redux";
import {
  googleAuthenticationSignInAsync,
  facebookAuthenticationSignInAsync, socialAuthentication, socialAuthenticationFailure
} from "../../redux/auth"

// styles
import { images, colors, fonts } from "../../theme"
import { Layout } from "../../constants";

// components
import { Button } from "../../components/button";

// import { Text } from "../../components/text"
import {corePlugins} from "reactotron-core-client";
import {translate} from "../../i18n";

import {
  checkLocationPermissionAsync,
  askLocationPermissionAsync,
  openSettingsAsync, checkNotificationPermissionAsync, requestNotificationPermissionAsync, getFirebasetokenAsync,
} from "../../redux/startup";
import * as Permissions from "expo-permissions";
import {fetchUserLocationAsync} from "../../redux/device";

interface DispatchProps {
  facebookAuthenticationSignInAsync: (user: object) => void
  googleAuthenticationSignInAsync: () => void
  socialAuthentication: () => void
  socialAuthenticationFailure: () => void
  
  checkLocation: () => Permissions.PermissionStatus | any
  askLocation: () => Permissions.PermissionStatus | any
  openSettings: () => void
  checkNotificationPermission: () => Permissions.PermissionStatus | any
  requestNotificationPermission: () => Permissions.PermissionStatus | any
  getFirebaseToken: () => void
  getUserLocation: () => void
}

interface StateProps {
  isLoading: boolean
  appState: object,
  hasLocation: boolean,
  hasNotificationPermissions: boolean,
  hasDenied: boolean,
  disabledNotifications: boolean,
}

interface LandingProps extends NavigationScreenProps {}

type Props = DispatchProps & StateProps & LandingProps

const backgroundImageStyle: ImageStyle = {
  width: '100%',
  height: '100%',
  backgroundColor: colors.purple,
}

const APP_LOGO: ImageStyle = {
  alignSelf: "flex-start",
  marginLeft: 20,
  height: 50,
  width: 50,
}

const signInTextStyle: TextStyle = {
  fontSize: 22,
  marginLeft: 20,
  color: colors.white,
  fontFamily: fonts.latoRegular,
  lineHeight: 40,
  textAlign: 'left',
  width: Layout.window.width / 1.5
}

const BOTTOM_VIEW: ViewStyle = {
  height: '20%',
  alignItems: 'center',
  justifyContent: 'center',
}

const BUTTON: ViewStyle = {
  alignSelf: "center",
  justifyContent: "center",
  borderRadius: 100,
  width: Layout.window.width / 1.4,
  marginTop: 15,
  backgroundColor: '#97b9d2'
}

const BUTTON_LOGO: ImageStyle = {
  alignSelf: "center",
  height: 25,
  width: 25,
}

const FACEBOOK: ViewStyle = {
  ...BUTTON,
  backgroundColor: colors.white
}

const FACEBOOK_TEXT_STYLE: TextStyle = {
  marginLeft: 20,
  color: colors.purple,
}

const SOCIAL_VIEW: ViewStyle = {
  flexDirection:'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 10,
}

const orTextStyle: TextStyle = {
  fontFamily: fonts.latoRegular,
  fontSize: 11,
  color: colors.white,
  textAlign: 'center',
  textTransform: 'uppercase'
}

const IMAGE_BUTTON: ViewStyle = {
  backgroundColor: colors.transparent,
}

const bottomTextStyle: TextStyle = {
  fontSize: 14,
  marginLeft: 20,
  marginTop: 30,
  color: colors.white,
  fontFamily: fonts.latoRegular,
  textAlign: 'left',
  width: Layout.window.width / 2
}

const termsAndConditions: TextStyle = {
  fontSize: 14,
  marginLeft: 20,
  marginTop: 20,
  color: colors.white,
  fontFamily: fonts.latoRegular,
  textAlign: 'left',
  width: Layout.window.width / 1.1
}

class Landing extends React.Component<NavigationScreenProps & Props> {
  
  componentDidMount(): void {
    this.props.checkNotificationPermission()
  }
  
  /**
   * onClickFacebookbutton
   *
   */
  onClickFacebookbutton = () => {
    const { socialAuthentication, socialAuthenticationFailure} = this.props
    socialAuthentication()
    LoginManager.logInWithPermissions(["public_profile", 'email']).then(
      (result) => {
        if (result.isCancelled) {
          console.log("Login cancelled");
          socialAuthenticationFailure()
        } else {
          console.tron.log(
            "Login success with permissions: " +
            result.grantedPermissions.toString(), result
          );
  
          AccessToken.getCurrentAccessToken()
            .then((data) => {
              this.getFacebookUser(data.accessToken)
              console.tron.log(data.accessToken)
            })
            .catch((error) => {
              socialAuthenticationFailure()
              console.tron.log(error)
            })
        }
      },
      (error) =>  {
        console.tron.log("Login fail with error: " + error);
        socialAuthenticationFailure()
      }
    );
  }
  
  /**
   * getFacebookUser
   *
   * Get facebook user information
   * @param {string} token - user's access token
   * @return {void}
   */
  getFacebookUser = (token: string) => {
    console.tron.log("Called getFacebookUser", token)
    const infoRequest = new GraphRequest(
      '/me',
      {
        accessToken: token,
        parameters: {
          fields: {
            string: 'name,first_name,middle_name,last_name,picture,email'
          }
        }
      },
      this._responseInfoCallback
    );

    new GraphRequestManager().addRequest(infoRequest).start()
  }
  
  /**
   * _responseInfoCallback
   *
   * GraphRequest call back handler
   * @param {object} error - error containing error message
   * @param {object} result - object containg user information
   * @private
   * @return {void}
   */
  _responseInfoCallback = (error?:Object, result?: Object) => {
    console.tron.log("_responseInfoCallback")
    if (error) {
      LoginManager.logOut()
      console.tron.log(error)
      this.props.socialAuthenticationFailure
    } else {
      this.facebookLoginSucces(result);
    }
  }
  
  /**
   * facebookLoginSucces
   *
   * Sets the state with the user's details
   * @param {object} userDetails - User's information
   * @return {void}
   */
  facebookLoginSucces = (userDetails) => {
    console.tron.log(userDetails, 'UUUUUESSSER')
    this.props.facebookAuthenticationSignInAsync(userDetails)
    // this.setState({
    //   firstName: userDetails.first_name,
    //   lastName: userDetails.last_name,
    //   socialEmail: userDetails.email,
    //   imgURL: userDetails.picture.data['url'],
    //   userAuthID: userDetails.id,
    // }, () => this.facebookSignIn());
  };
  
  public render(): React.ReactNode {
    const {
      navigation, facebookAuthenticationSignInAsync, isLoading, googleAuthenticationSignInAsync
    } = this.props
    return (
      <ImageBackground
        source={images.landingPageBackgroundImage}
        style={backgroundImageStyle}
        resizeMethod={'scale'}
        resizeMode='cover'
      >
  
        <View
          style={{
            height: '10%',
            marginTop: Layout.window.height / 10,
          }}
        >
          <Image
            style={APP_LOGO}
            source={images.appLogo}
            resizeMethod={'auto'}
            resizeMode='cover'
          />
        </View>
        
        <View
          style={{
            height: '23%',
            marginTop: Layout.window.height / 10,
          }}
        >
          <Text
    
            style={signInTextStyle}
          >
            {translate(`common.slogan`)}
          </Text>
        </View>
        
  
        <View
          style={BOTTOM_VIEW}
        >
  
          <Button
            style={FACEBOOK}
            onPress={() => navigation.navigate('authSignIn')}
            disabled={isLoading}
          >
            {
              isLoading
                ? <ActivityIndicator size="small" color={colors.purple} />
                : <Text style={FACEBOOK_TEXT_STYLE}>{translate(`landingScreen.email`)}</Text>
            }
          </Button>
          
          <View
            style={SOCIAL_VIEW}
          >
            <Button
              style={IMAGE_BUTTON}
              onPress={() => this.onClickFacebookbutton()}
              disabled={isLoading}
            >
              <Image
                style={BUTTON_LOGO}
                source={images.facebookLogo}
                resizeMethod={'auto'}
                resizeMode='cover'
              />
            </Button>
  
            <Text
    
              style={orTextStyle}
            >
              {translate(`landingScreen.or`)}
            </Text>
  
            <Button
              style={IMAGE_BUTTON}
              onPress={() => googleAuthenticationSignInAsync()}
              disabled={isLoading}
            >
              <Image
                style={BUTTON_LOGO}
                source={images.googleLogo}
                resizeMethod={'auto'}
                resizeMode='cover'
              />
            </Button>
          </View>
          
        </View>
  
        <Text
          
          style={bottomTextStyle}
        >
          {translate("landingScreen.more")}
        </Text>
  
  
        <Text
    
          style={termsAndConditions}
        >
          {translate(`landingScreen.termsAndConditions`)}
          <Text
    
            style={termsAndConditions}
          >
            {translate(`landingScreen.termsAndConditions_01`)}
            <Text
    
              style={termsAndConditions}
            >
              {translate(`landingScreen.termsAndConditions_02`)}
            </Text>
          </Text>
          
        </Text>
      </ImageBackground>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  facebookAuthenticationSignInAsync: (user: object) => dispatch(facebookAuthenticationSignInAsync(user)),
  googleAuthenticationSignInAsync: () => dispatch(googleAuthenticationSignInAsync()),
  socialAuthentication: () => dispatch(socialAuthentication()),
  socialAuthenticationFailure: () => dispatch(socialAuthenticationFailure()),
  checkLocation: () => dispatch(checkLocationPermissionAsync()),
  askLocation: () => dispatch(askLocationPermissionAsync()),
  openSettings: () => dispatch(openSettingsAsync()),
  checkNotificationPermission: () => dispatch(checkNotificationPermissionAsync()),
  requestNotificationPermission: () => dispatch(requestNotificationPermissionAsync()),
  getFirebaseToken: () => dispatch(getFirebasetokenAsync()),
  getUserLocation: () => dispatch(fetchUserLocationAsync()),
})

let mapStateToProps: (state: ApplicationState) => StateProps;
mapStateToProps = (state: ApplicationState): StateProps => ({
  isLoading: state.auth.loading,
  appState: {},
  hasLocation: false,
  hasNotificationPermissions: false,
  hasDenied: false,
  disabledNotifications: false,
});

export const LandingScreen = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(Landing)
