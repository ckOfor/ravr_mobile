// react
import React from "react"

// react-native
import {
  View, Text, ViewStyle, ImageBackground, ImageStyle, Image, TextStyle,
  TouchableOpacity, NativeMethodsMixinStatic, Keyboard, KeyboardAvoidingView, Platform, ScrollView
} from "react-native"

// third-party libraries
import { NavigationScreenProps } from "react-navigation"
import {Formik, FormikProps } from "formik";
import * as Yup from "yup";
import Firebase from '../../config/FirebaseClient'

// redux
import { connect } from "react-redux"
import { Dispatch } from "redux";
import { notify, signUpWithEmailAuth } from "../../redux/auth"
import { ApplicationState } from "../../redux";

// styles
import { colors, fonts, images } from "../../theme";
import { Layout } from "../../constants";
import { translate } from "../../i18n";
import { TextField } from "../../components/text-field";
import { Button } from "../../components/button";

interface DispatchProps {
  notify: (message: string, type: string) => void
  signUpWithEmailAuth: ({ email, fullName }, password: string) => void
}

interface StateProps {
  authEmail: string
  isLoading: boolean
}

interface MyFormValues {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}

interface AuthSignUpProps extends NavigationScreenProps {}

type Props = DispatchProps & StateProps & AuthSignUpProps

const backgroundImageStyle: ImageStyle = {
  width: '100%',
  height: '100%',
  backgroundColor: colors.purple,
}

const schema = Yup.object().shape({
  fullName: Yup.string()
    .min(4, "common.fieldTooShort")
    .required("common.fieldRequired"),
  email: Yup.string()
    .email("common.fieldValidEmail")
    .required("common.fieldRequired"),
  password: Yup.string()
    .min(4, "common.fieldTooShort")
    .required("common.fieldRequired"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'common.passwordMatch')
    .required("common.fieldRequired"),
})

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
  // marginTop: 25,
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
  marginTop: 35,
  color: colors.white,
  fontFamily: fonts.latoRegular,
  textAlign: 'left',
  width: Layout.window.width / 1.5
}

class AuthSignUp extends React.Component<NavigationScreenProps & Props> {
  
  fullNameInput: NativeMethodsMixinStatic | any
  emailInput: NativeMethodsMixinStatic | any
  passwordInput: NativeMethodsMixinStatic | any
  confirmPasswordInput: NativeMethodsMixinStatic | any
  
  submit = values => {
    const { notify, signUpWithEmailAuth } = this.props
    try {
      Firebase.auth()
        .createUserWithEmailAndPassword(values.email, values.password)
        .then((success) => {
          signUpWithEmailAuth(values, success.user.uid)
        })
        .catch(error =>{
          notify(`${error.message}`, 'danger')
        })
    } catch ({message}) {
      notify(`${message}`, 'danger')
    }
  }
  
  public render(): React.ReactNode {
    const {
      navigation, authEmail, isLoading
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
            source={images.bikeMan}
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
                height: '10%',
              }}
            >
              <Text
                
                style={signInTextStyle}
              >
                {translate(`signUp.join`)}
              </Text>
            </View>
            
            <Formik
              initialValues={{
                fullName: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={schema}
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
                      name="fullName"
                      keyboardType="default"
                      placeholderTx="common.fullNamePlaceHolder"
                      value={values.fullName}
                      onChangeText={handleChange("fullName")}
                      onBlur={handleBlur("fullName")}
                      autoCapitalize="none"
                      returnKeyType="next"
                      isInvalid={!isValid}
                      fieldError={errors.fullName}
                      onSubmitEditing={() => this.emailInput.focus()}
                      forwardedRef={i => {
                        this.fullNameInput = i
                      }}
                    />
      
                    <TextField
                      name="email"
                      keyboardType="email-address"
                      placeholderTx="common.emailPlaceHolder"
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      autoCapitalize="none"
                      returnKeyType="next"
                      isInvalid={!isValid}
                      fieldError={errors.email}
                      onSubmitEditing={() => this.passwordInput.focus()}
                      forwardedRef={i => {
                        this.emailInput = i
                      }}
                    />
                    
                    <TextField
                      name="password"
                      secureTextEntry
                      placeholderTx="common.passwordPlaceHolder"
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      autoCapitalize="none"
                      returnKeyType="done"
                      isInvalid={!isValid}
                      fieldError={errors.password}
                      forwardedRef={i => {
                        this.passwordInput = i
                      }}
                      blurOnSubmit={false}
                      onSubmitEditing={() => this.confirmPasswordInput.focus()}
                    />
                    
                    <TextField
                      name="confirmPassword"
                      secureTextEntry
                      placeholderTx="common.confirmPasswordPlaceHolder"
                      value={values.confirmPassword}
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      autoCapitalize="none"
                      returnKeyType="done"
                      isInvalid={!isValid}
                      fieldError={errors.confirmPassword}
                      forwardedRef={i => {
                        this.confirmPasswordInput = i
                      }}
                      blurOnSubmit={false}
                      onSubmitEditing={()=> {
                        handleSubmit()
                        Keyboard.dismiss()
                      }}
                    />
                    
                    <Button
                      style={CONTINUE_BUTTON}
                      textStyle={CONTINUE_BUTTON_TEXT}
                      disabled={!isValid || isLoading}
                      onPress={() => handleSubmit()}
                      tx={`signUp.signUp`}
                    />
                  </View>
                </View>
              )}
            </Formik>
      
            <Text
        
              style={bottomTextStyle}
            >
              {translate("signUp.member")}
            </Text>
      
            <TouchableOpacity
              onPress={() => navigation.navigate('authSignIn')}
            >
        
              <Text
          
                style={termsAndConditions}
              >
                {translate(`signUp.oops`)}
        
              </Text>
            </TouchableOpacity>
          
          </ImageBackground>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  notify: (message: string, type: string) => dispatch(notify(message, type)),
  signUpWithEmailAuth: ({ email, fullName }, password: string) => dispatch(signUpWithEmailAuth({ email, fullName }, password))
})

let mapStateToProps: (state: ApplicationState) => StateProps;
mapStateToProps = (state: ApplicationState): StateProps => ({
  authEmail: state.auth.email,
  isLoading: state.auth.loading
});

export const AuthSignUpScreen = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(AuthSignUp)
