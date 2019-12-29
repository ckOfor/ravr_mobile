// react
import React from "react"

// react-native
import {
  View, Text, ViewStyle, ImageBackground, ImageStyle, Image, TextStyle,
  TouchableOpacity, NativeMethodsMixinStatic
} from "react-native"

// third-party libraries
import { NavigationScreenProps } from "react-navigation"
import {Formik, FormikProps, useFormik} from "formik";
import * as Yup from "yup";
import Firebase from '../../config/FirebaseClient'

// redux
import { connect } from "react-redux"
import { Dispatch } from "redux";
import { setAuthEmail, notify} from "../../redux/auth"
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
  notify: (message: string, type: string) => void
  setAuthEmail: (email: string) => void
}

interface StateProps {
  authEmail: string
  isLoading: boolean
}

interface MyFormValues {
  email: string
}

interface ForgotPasswordScreenProps extends NavigationScreenProps {}

type Props = DispatchProps & StateProps & ForgotPasswordScreenProps

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

class ForgotPassword extends React.Component<NavigationScreenProps & Props> {
  
  emailInput: NativeMethodsMixinStatic | any
  
  submit = values => {
    const { notify, navigation, setAuthEmail } = this.props
    Firebase
      .auth()
      .sendPasswordResetEmail(values.email)
      .then((user) => {
        notify(`Please check your email...`, 'success')
        navigation.goBack()
        setAuthEmail(values.email)
      })
      .catch(({ message }) => {
        notify(`${message}`, 'danger')
      })
  }
  
  public render(): React.ReactNode {
    const {
      navigation, authEmail, isLoading
    } = this.props
    return (
      <ImageBackground
        source={images.manBk}
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
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Image
              style={APP_LOGO}
              source={images.backIcon}
              resizeMethod={'auto'}
              resizeMode='cover'
            />
          </TouchableOpacity>
        </View>
        
        <View
          style={{
            height: '15%',
            marginTop: Layout.window.height / 20,
          }}
        >
          <Text
            
            style={signInTextStyle}
          >
            {translate(`forgotPassword.resetAccount`)}
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
                  onEndEditing={(values) => console.tron.log(values.text)}
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
                
                <Button
                  style={CONTINUE_BUTTON}
                  textStyle={CONTINUE_BUTTON_TEXT}
                  disabled={!isValid || isLoading}
                  onPress={() => handleSubmit()}
                  tx={`forgotPassword.reset`}
                />
              </View>
            </View>
          )}
        </Formik>
      
      </ImageBackground>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  notify: (message: string, type: string) => dispatch(notify(message, type)),
  setAuthEmail: (email: string) => dispatch(setAuthEmail(email))
})

let mapStateToProps: (state: ApplicationState) => StateProps;
mapStateToProps = (state: ApplicationState): StateProps => ({
  authEmail: state.auth.email,
  isLoading: state.auth.loading
});

export const ForgotPasswordScreen = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword)
