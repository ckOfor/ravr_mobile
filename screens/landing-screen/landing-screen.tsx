// react
import React from "react"

// react-native
import {
  ImageBackground, ImageStyle, Image, TextStyle, ViewStyle, View, Text
} from "react-native"

// third-party libraries
import { NavigationScreenProps } from "react-navigation"

// redux
import { connect } from "react-redux"
import { Dispatch } from "redux";
import { ApplicationState } from "../../redux";
import {
  googleAuthenticationSignInAsync,
  facebookAuthenticationSignInAsync
} from "../../redux/auth"

// styles
import { images, colors, fonts } from "../../theme"
import { Layout } from "../../constants";

// components
import { Button } from "../../components/button";

// import { Text } from "../../components/text"
import {corePlugins} from "reactotron-core-client";
import {translate} from "../../i18n";

interface DispatchProps {
  facebookAuthenticationSignInAsync: () => void
  googleAuthenticationSignInAsync: () => void
}

interface StateProps {
  isLoading: boolean
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

const facebookTextStyle: TextStyle = {
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
            <Text
    
              style={facebookTextStyle}
            >
              {translate(`landingScreen.email`)}
            </Text>
          </Button>
          
          <View
            style={SOCIAL_VIEW}
          >
            <Button
              style={IMAGE_BUTTON}
              onPress={() => facebookAuthenticationSignInAsync()}
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
  facebookAuthenticationSignInAsync: () => dispatch(facebookAuthenticationSignInAsync()),
  googleAuthenticationSignInAsync: () => dispatch(googleAuthenticationSignInAsync()),
})

let mapStateToProps: (state: ApplicationState) => StateProps;
mapStateToProps = (state: ApplicationState): StateProps => ({
  isLoading: state.auth.loading
});

export const LandingScreen = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(Landing)
