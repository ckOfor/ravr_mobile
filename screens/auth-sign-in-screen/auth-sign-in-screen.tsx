// react
import React from "react"

// react-native
import {
  View, Text, ViewStyle, ImageBackground, ImageStyle, Image, TextStyle,
  TouchableOpacity, NativeMethodsMixinStatic, KeyboardAvoidingView
} from "react-native"

// third-party libraries
import {NavigationActions, NavigationScreenProps} from "react-navigation"
import {Formik, FormikProps, useFormik} from "formik";
import * as Yup from "yup";
import Firebase from '../../config/FirebaseClient'

// redux
import { connect } from "react-redux"
import { Dispatch } from "redux";
import { logInUserAsync, notify} from "../../redux/auth"
import { ApplicationState } from "../../redux";

// styles
import { colors, fonts, images } from "../../theme";
import { Layout } from "../../constants";
import { translate } from "../../i18n";
import { TextField } from "../../components/text-field";
import { Button } from "../../components/button";

// API
import {logInUserPayload} from "../../services/api";

interface DispatchProps {
  loginUser: (values: MyFormValues) => void
  notify: (message: string, type: string) => void
}

interface StateProps {
  authEmail: string
  isLoading: boolean
}

interface MyFormValues {
  email: string
  password: string
}

interface AuthSignUpProps extends NavigationScreenProps {}

type Props = DispatchProps & StateProps & AuthSignUpProps

const backgroundImageStyle: ImageStyle = {
  width: '100%',
  height: '100%',
  backgroundColor: colors.purple,
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email("common.fieldValidEmail")
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

const FORGOT_PASSWORD_LINK_BUTTON: ViewStyle = {
  alignItems: "flex-start",
  justifyContent: "flex-start",
  marginRight: Layout.window.width / 2.5
}

const FORGOT_PASSWORD__LINK_TEXT: TextStyle = {
  // color: colors.blue1,
  paddingLeft: 18,
  fontSize: 12,
  fontFamily: fonts.gibsonRegular,
  textTransform: 'uppercase'
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

class AuthSignUp extends React.Component<NavigationScreenProps & Props> {
  
  emailInput: NativeMethodsMixinStatic | any
  passwordInput: NativeMethodsMixinStatic | any
  
  submit = values => {
    const { notify } = this.props
    try {
      Firebase.auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .then((success) => {
          console.tron.log(success.user.emailVerified)
          
          if(!success.user.emailVerified) {
            Firebase.auth()
              .currentUser
              .sendEmailVerification()
              .then((success) => {
                console.tron.log(success)
                notify(`We have sent a verification link to ${values.email}`, 'success')
              })
              .catch(error =>{
                console.tron.log(error)
                notify(`${error.message}`, 'danger')
              })
            return
          } else {
            this.props.loginUser({email: values.email, password: success.user.uid})
          }
          
        })
        .catch(error =>{
          notify(`${error.message}`, 'danger')
        })
    } catch ({message}) {
      notify(`${message}`, 'danger')
    }
  }
  
  sendVerificationEmail
  
  public render(): React.ReactNode {
    const {
      navigation, authEmail, isLoading
    } = this.props
    return (
      <KeyboardAvoidingView
        enabled={true}
        behavior={"padding"}
        style={{ flex: 1 }}
      >
        <ImageBackground
          source={images.bkImage}
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
              {translate(`signUpScreen.welcomeText`)}
            </Text>
          </View>
    
          <Formik
            initialValues={{
              email: authEmail,
              password: ""
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
                    onSubmitEditing={() => handleSubmit()}
                  />
            
                  <Button
                    style={FORGOT_PASSWORD_LINK_BUTTON}
                    textStyle={FORGOT_PASSWORD__LINK_TEXT}
                    preset="link"
                    tx="signUpScreen.forgotPassword"
                    onPress={() => navigation.navigate('forgotPassword')}
                  />
            
                  <Button
                    style={CONTINUE_BUTTON}
                    textStyle={CONTINUE_BUTTON_TEXT}
                    disabled={!isValid || isLoading}
                    onPress={() => handleSubmit()}
                    tx={`signUpScreen.signIn`}
                  />
                </View>
              </View>
            )}
          </Formik>
    
          <Text
      
            style={bottomTextStyle}
          >
            {translate("signUpScreen.yes")}
          </Text>
    
          <TouchableOpacity
            onPress={() => navigation.navigate('authSignUp')}
          >
    
            <Text
        
              style={termsAndConditions}
            >
              {translate(`signUpScreen.createAccount`)}
      
            </Text>
          </TouchableOpacity>
  
        </ImageBackground>
      </KeyboardAvoidingView>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  loginUser: values => dispatch(logInUserAsync(values as logInUserPayload)),
  notify: (message: string, type: string) => dispatch(notify(message, type))
})

let mapStateToProps: (state: ApplicationState) => StateProps;
mapStateToProps = (state: ApplicationState): StateProps => ({
  authEmail: state.auth.email,
  isLoading: state.auth.loading
});

export const AuthSignInScreen = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(AuthSignUp)
