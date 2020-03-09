import * as React from "react"
import {
  Image, ImageStyle, Platform, StatusBar, TextInput, TextStyle, TouchableOpacity,
  View, ViewStyle,
} from "react-native"
import { ScreenProps } from "./signup-screen.props"
import { Formik, FormikProps } from "formik";
import { colors, fonts, images } from "../../theme";
import * as Yup from "yup";
import { Text } from "../text";
import { Layout} from "../../constants";
import { translate} from "../../i18n";
import { Button} from "../button";
import {Item} from "native-base";

interface MyFormValues {
  school: string
  value: string
}

const schema = Yup.object().shape({
  // firstName: Yup.string()
  //   .min(2, "common.fieldTooShort")
  //   .required("common.fieldRequired"),
})

const ROOT: ViewStyle = {
  height: "100%",
  alignItems: 'center',
  backgroundColor: colors.palette.white,
}

const APP_LOGO: ImageStyle = {
  alignSelf: "center",
  marginTop: 25,
  height: 50,
  width: 50,
}

const LOGO_LET_VIEW: ViewStyle = {
  flexDirection: 'row',
  marginTop: 10,
  justifyContent: 'space-between'
}

const LOGO_TEXT: TextStyle = {
  fontSize: 25,
  lineHeight: 25,
  fontFamily: fonts.gibsonRegular
}

const LOGO_LET: TextStyle = {
  ...LOGO_TEXT,
  color: colors.orange
}

const LOGO_MOOV: TextStyle = {
  ...LOGO_TEXT,
  color: colors.palette.primaryPink,
  marginLeft: 5,
}

const HEADER_VIEW: ViewStyle = {
  width: Layout.window.width,
  left: 30,
  marginTop: 20,
  marginBottom: 20,
}

const HEADER_TEXT: TextStyle = {
  fontSize: 15,
  fontFamily: fonts.gibsonRegular,
  color: colors.blue1
}

const DROPDOWN: ViewStyle = {
  paddingHorizontal: 18,
  paddingVertical: Platform.OS === 'ios' ? 16 : 5,
  backgroundColor: colors.palette.white,
  shadowColor: colors.black,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  borderColor: colors.transparent,
  elevation: 1,
  height: 50,
  borderRadius: 100,
  minWidth: Layout.window.width / 1.2,
  maxWidth: Layout.window.width / 1.2,
}

const DROPDOWN_BUTTON: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}

const PLACEHOLDER_TEXT: TextStyle = {
  fontSize: 15,
  fontFamily: fonts.gibsonRegular,
  color: colors.blue1,
  height: Platform.OS == 'android' ? 40 : 15,
  // marginBottom: Platform.OS == 'android' ? 10 : 0
}

const MODAL_VIEW: ViewStyle = {
  alignItems: 'center',
  // marginBottom: 10,
}

const MODAL: ViewStyle = {
  backgroundColor: '#FFF',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  borderColor: 'transparent',
  borderRadius: 10,
  elevation: 1,
  width: Layout.window.width / 1.45,
  flexDirection: 'column',
  zIndex: 1,
}

const MODAL_BUTTON_TEXT: TextStyle = {
  marginTop: 10,
  marginBottom: 10,
  fontSize: 15,
  color: colors.blue1,
}

const NEXT_BUTTON: ViewStyle = {
  alignSelf: "center",
  justifyContent: "center",
  borderRadius: 100,
  width: Layout.window.width / 1.4,
  marginTop: Layout.window.height / 5,
  backgroundColor: colors.palette.primaryPink
}

const NEXT_BUTTON_TEXT: TextStyle = {
  fontSize: 12,
  fontFamily: fonts.gibsonRegular,
  color: colors.palette.white,
  textTransform: 'uppercase'
}

function Screen(props: ScreenProps) {
  // console.log(props.disabled)
  
  return (
    <Formik
      initialValues={{
        value: props.value,
      }}
      validationSchema={schema}
      onSubmit={props.onNextPress}
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
        <View
          style={ROOT}
        >
          <StatusBar barStyle={"dark-content"} translucent backgroundColor={'transparent'} />
  
          <Image
            style={APP_LOGO}
            source={images.appLogo}
            resizeMethod={'auto'}
            resizeMode='cover'
          />
  
          <View
            style={LOGO_LET_VIEW}
          >
            <Text
              tx={`authLogin.let`}
              style={LOGO_LET}
            />
    
            <Text
              tx={`authLogin.moov`}
              style={LOGO_MOOV}
            />
          </View>
          
          <View
            style={HEADER_VIEW}
          >
            <Text
              tx={props.headerText}
              style={HEADER_TEXT}
            />
          </View>
          
          <View
            style={DROPDOWN}
          >
            
            <TouchableOpacity
              style={DROPDOWN_BUTTON}
              onPress={props.toggleModal}
            >
              {
                props.leftView
              }
  
              <View>
                <TextInput
                  placeholder={translate(props.placeHolderText)}
                  placeholderTextColor={colors.blue1}
                  underlineColorAndroid={colors.transparent}
                  onChangeText={handleChange("value")}
                  onBlur={handleBlur("value")}
                  style={PLACEHOLDER_TEXT}
                  autoCorrect={false}
                  selectionColor={colors.transparent}
                  value={props.value}
                  editable={false}
                />
              </View>
  
              <Image
                source={images.dropDownIcon}
                resizeMethod={'auto'}
                resizeMode='cover'
              />
            </TouchableOpacity>
          </View>
  
          {
            props.modalStatus && (
              <View
                style={MODAL_VIEW}
              >
                <View
                  style={MODAL}
                >
                  {
                    // @ts-ignore
                    props.dropDownList.map((selected, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={{
                            backgroundColor: props.value === selected.name ? '#fff9f6' : 'transparent',
                            width: '100%',
                            alignItems: 'center',
                          }}
                          onPress={() => props.returnSelected(selected)}
                        >
                          <Text
                            style={MODAL_BUTTON_TEXT}
                          >
                            {selected.name}
                          </Text>
                        </TouchableOpacity>
                      )
                    })
                  }
                </View>
              </View>
            )
          }
  
  
          {
            !props.modalStatus && (
              <Button
                style={NEXT_BUTTON}
                textStyle={NEXT_BUTTON_TEXT}
                disabled={props.disabled}
                onPress={() => handleSubmit()}
                tx={`authSignUp.next`}
              />
            )
          }
          
        </View>
      )}
    </Formik>
  )
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function SignUpScreen(props: ScreenProps) {
  return <Screen {...props} />
}
