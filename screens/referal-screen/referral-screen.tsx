// react
import React from "react"

// react-native
import {
  View,
  Text,
  ViewStyle,
  ImageBackground,
  ImageStyle,
  Image,
  TextStyle,
  TouchableOpacity,
  NativeMethodsMixinStatic,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView, ActivityIndicator
} from "react-native"

// third-party libraries
import {NavigationActions, NavigationScreenProps} from "react-navigation"
import {Formik, FormikProps, useFormik} from "formik";
import * as Yup from "yup";
import Firebase from '../../config/FirebaseClient'

// redux
import { connect } from "react-redux"
import { Dispatch } from "redux";
import {addReferralCodeAsync, logInUserAsync, notify, setAuthUserID} from "../../redux/auth"
import { ApplicationState } from "../../redux";

// styles
import { colors, fonts, images } from "../../theme";
import {Layout, WhichPlatform} from "../../constants";
import { translate } from "../../i18n";
import { TextField } from "../../components/text-field";
import { Button } from "../../components/button";

// API
import {logInUserPayload} from "../../services/api";

interface DispatchProps {
  addReferralCodeAsync: (code: string) => void
}

interface StateProps {
  isLoading: boolean
}

interface MyFormValues {
  referralCode: string
}

interface ReferralProps extends NavigationScreenProps {}

type Props = DispatchProps & StateProps & ReferralProps

const backgroundImageStyle: ImageStyle = {
  width: '100%',
  height: '100%',
  backgroundColor: colors.purple,
}

const APP_LOGO: ImageStyle = {
  alignSelf: "flex-start",
  marginLeft: 20,
  height: 30,
  width: 30,
}

const signInTextStyle: TextStyle = {
  fontSize: 25,
  marginLeft: 20,
  color: colors.white,
  fontFamily: fonts.latoRegular,
  lineHeight: 40,
  textAlign: 'left',
  width: Layout.window.width / 1.5,
}

const FIELD: ViewStyle = {
  alignItems: 'center'
}

const CONTINUE_BUTTON: ViewStyle = {
  alignSelf: "center",
  justifyContent: "center",
  borderRadius: 100,
  width: Layout.window.width / 1.4,
  marginTop: Layout.window.height / 20,
  backgroundColor: colors.purple
}

const CONTINUE_BUTTON_TEXT: TextStyle = {
  fontSize: 12,
  fontFamily: fonts.gibsonRegular,
  color: colors.palette.white,
  textTransform: 'uppercase'
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

const bottomTextStyle: TextStyle = {
  fontSize: 14,
  marginLeft: 20,
  marginTop: Layout.window.height / 8,
  color: colors.white,
  fontFamily: fonts.latoRegular,
  textAlign: 'left',
  width: Layout.window.width / 1.5
}

class Referral extends React.Component<NavigationScreenProps & Props> {
  
  referralCodeInput: NativeMethodsMixinStatic | any
  
  submit = values => {
    this.props.addReferralCodeAsync(values.referralCode)
  }
  
  public render(): React.ReactNode {
    const {
      navigation, isLoading
    } = this.props
    return (
      <KeyboardAvoidingView
        enabled={true}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            height: '100%'
          }}
        >
          <ImageBackground
            source={images.referralBk}
            style={backgroundImageStyle}
            resizeMethod={'scale'}
            resizeMode='cover'
          >
            
            <View
              style={{
                height: '10%',
                marginTop: Layout.window.height / 20,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.goBack()}
              >
                <Image
                  style={APP_LOGO}
                  source={images.appLogo}
                  resizeMethod={'auto'}
                  resizeMode='cover'
                />
              </TouchableOpacity>
            </View>
            
            <View
              style={{
                height: '15%',
              }}
            >
              <Text
                
                style={signInTextStyle}
              >
                {translate(`referralScreen.welcomeText`)}
              </Text>
            </View>
            
            <Formik
              initialValues={{
                referralCode: "",
              }}
              onSubmit={this.submit}
              enableReinitialize
            >
              {({
                  values,
                  handleChange,
                  handleBlur,
                  errors,
                  isValid,
                  handleSubmit
                }: FormikProps<MyFormValues>) => (
                <View>
                  
                  <View
                    style={FIELD}
                  >
                    <TextField
                      name="referralCode"
                      keyboardType="email-address"
                      placeholderTx="referralScreen.code"
                      value={values.referralCode}
                      onChangeText={handleChange("referralCode")}
                      onBlur={handleBlur("referralCode")}
                      autoCapitalize="none"
                      returnKeyType="next"
                      isInvalid={!isValid}
                      fieldError={errors.referralCode}
                      onSubmitEditing={() => handleSubmit()}
                      forwardedRef={i => {
                        this.referralCodeInput = i
                      }}
                    />
                    
                    <Button
                      style={CONTINUE_BUTTON}
                      textStyle={CONTINUE_BUTTON_TEXT}
                      disabled={!isValid || isLoading}
                      onPress={() => handleSubmit()}
                    >
                      {
                        isLoading
                          ? <ActivityIndicator size="small" color={colors.palette.white} />
                          : <Text style={CONTINUE_BUTTON_TEXT}>{translate(`referralScreen.send`)}</Text>
                      }
                    </Button>
                  </View>
                </View>
              )}
            </Formik>
            
            <Text
              
              style={bottomTextStyle}
            >
              {translate("referralScreen.question")}
            </Text>
            
            <TouchableOpacity
              onPress={() => navigation.navigate('home')}
            >
              
              <Text
                
                style={termsAndConditions}
              >
                {translate(`referralScreen.answer`)}
              
              </Text>
            </TouchableOpacity>
          
          </ImageBackground>
        </ScrollView>
      
      </KeyboardAvoidingView>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  addReferralCodeAsync: (code: string) => dispatch(addReferralCodeAsync(code)),
})

let mapStateToProps: (state: ApplicationState) => StateProps;
mapStateToProps = (state: ApplicationState): StateProps => ({
  isLoading: state.auth.loading
});

export const ReferralScreen = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(Referral)
