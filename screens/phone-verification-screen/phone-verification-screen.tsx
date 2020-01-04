// react
import React from "react"

// react-native
import {
  View, Text, ViewStyle, ImageBackground, ImageStyle, Image, TextStyle,
  TouchableOpacity, NativeMethodsMixinStatic, KeyboardAvoidingView, Platform
} from "react-native"

// third-party libraries
import { NavigationScreenProps } from "react-navigation"
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux"
import { Dispatch } from "redux";

// redux
import { ApplicationState } from "../../redux";
import { updatePhoneNumberAsync } from "../../redux/user";

// styles
import { colors, fonts, images } from "../../theme";
import { Layout } from "../../constants";
import { translate } from "../../i18n";
import { TextField } from "../../components/text-field";
import { Button } from "../../components/button";

// API
import { formatPhoneNumber } from "../../utils/formatters";

// util
import { phoneRegExp } from "../../utils/regexes";

interface DispatchProps {
  updatePhoneNumberAsync: (phoneNumber: string) => void
}

interface StateProps {
  authPhoneNumber: string
  isLoading: boolean
}

interface MyFormValues {
  phoneNumber: string
}

interface PhoneVerificationScreenProps extends NavigationScreenProps {}

type Props = DispatchProps & StateProps & PhoneVerificationScreenProps

const backgroundImageStyle: ImageStyle = {
  width: '100%',
  height: '100%',
  backgroundColor: colors.purple,
}

const schema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(phoneRegExp, "phoneVerify.enterAValidPhoneNumber")
    .required("common.fieldRequired")
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


class PhoneVerification extends React.Component<NavigationScreenProps & Props> {
  
  phoneNumberInput: NativeMethodsMixinStatic | any
  
  submit = values => {
    this.props.updatePhoneNumberAsync(values.phoneNumber)
  }
  
  public render(): React.ReactNode {
    const {
      navigation, authPhoneNumber, isLoading
    } = this.props
    return (
      <KeyboardAvoidingView
        enabled={true}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ImageBackground
          source={images.phoneVerification}
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
              marginTop: Layout.window.height / 20,
            }}
          >
            <Text
              
              style={signInTextStyle}
            >
              {translate(`phoneVerify.headerText`)}
            </Text>
          </View>
          
          <Formik
            initialValues={{
              phoneNumber: authPhoneNumber
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
                    name="phoneNumber"
                    keyboardType="phone-pad"
                    placeholderTx="phoneVerify.placeholder"
                    value={formatPhoneNumber(values.phoneNumber)}
                    onChangeText={handleChange("phoneNumber")}
                    onBlur={handleBlur("phoneNumber")}
                    autoCapitalize="none"
                    returnKeyType="done"
                    isInvalid={!isValid}
                    fieldError={errors.phoneNumber}
                    forwardedRef={i => {
                      this.phoneNumberInput = i
                    }}
                  />
                  
                  <Button
                    style={CONTINUE_BUTTON}
                    textStyle={CONTINUE_BUTTON_TEXT}
                    disabled={!isValid || isLoading}
                    onPress={() => handleSubmit()}
                    tx={`phoneVerify.verify`}
                  />
                </View>
              </View>
            )}
          </Formik>
          
          <Text
            
            style={bottomTextStyle}
          >
            {translate("phoneVerify.question")}
          </Text>
          
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            
            <Text
              
              style={termsAndConditions}
            >
              {translate(`phoneVerify.answer`)}
            
            </Text>
          </TouchableOpacity>
        
        </ImageBackground>
      </KeyboardAvoidingView>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  updatePhoneNumberAsync: (phoneNumber: string) => dispatch(updatePhoneNumberAsync(phoneNumber))
})

let mapStateToProps: (state: ApplicationState) => StateProps;
mapStateToProps = (state: ApplicationState): StateProps => ({
  isLoading: state.auth.loading,
  authPhoneNumber: state.user.data.phoneNumber,
});

export const PhoneVerificationScreen = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(PhoneVerification)
