// react
import React from "react"

// react-native
import {
  View,
  Text,
  ViewStyle,
  StatusBar,
  TextStyle,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageStyle,
  Linking,
  ImageBackground,
  NativeMethodsMixinStatic
} from "react-native"

// third-party
import { NavigationScreenProps } from "react-navigation"
import { connect } from "react-redux"
import { Dispatch } from "redux";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";

// redux
import { ApplicationState } from "../../redux";
import {contactUsAsync, IUser, saveMessage, saveSubject} from "../../redux/user";
import { updateUserAsync } from "../../redux/user";

// styles
import { Layout } from "../../constants";
import {translate} from "../../i18n";
import { colors, fonts } from "../../theme";
import { TextField } from "../../components/text-field";
import { Button } from "../../components/button";
import {Input, Item, Textarea} from "native-base";
import {notify} from "../../redux/auth";


interface DispatchProps {
  updateUserAsync: () => void
  notify: (message: string, type: string) => void
  saveSubject: (subject: string) => void
  saveMessage: (message: string) => void
  contactUsAsync: (subject: string, message: string) => void
}

interface StateProps {
  User: IUser
  isLoading: boolean
  authSubject: string
  authMessage: string
}

interface ContactUsScreenProps extends NavigationScreenProps {}

type Props = DispatchProps & StateProps & ContactUsScreenProps

const ROOT: ViewStyle = {
  height: Layout.window.height,
}

const appNameTextStyle: TextStyle = {
  marginLeft: 20,
  marginTop: Layout.window.height / 15,
  color: colors.purple,
  fontFamily: fonts.latoRegular,
  lineHeight: 40,
  textAlign: 'left',
  width: Layout.window.width / 1.5,
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


class ContactUs extends React.Component<NavigationScreenProps & Props> {
  
  subjectInput: NativeMethodsMixinStatic | any
  messageInput: NativeMethodsMixinStatic | any
  
  sendMessage = () => {
    const { authSubject, authMessage, notify, contactUsAsync } = this.props
    if(authSubject.length < 4) {
      notify(`${translate(`common.fieldError`, {
        fieldName: 'Subject'
      })}`, 'danger')
      return
    }
    
    if(authMessage.length < 4) {
      notify(`${translate(`common.fieldError`, {
        fieldName: 'Message'
      })}`, 'danger')
      return
    }
    
    contactUsAsync(authSubject, authMessage)
  }
  
  public render(): React.ReactNode {
    const {
      navigation, User, authSubject, authMessage, isLoading, saveSubject, saveMessage
    } = this.props
    
    return (
      <View
        style={ROOT}
      >
        <StatusBar barStyle={"dark-content"} />
  
        <Text
    
          style={appNameTextStyle}
        >
          {translate(`contactUs.header`)}
        </Text>
        
        <ScrollView
          // onScroll={this.handleScroll}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          pinchGestureEnabled
          contentContainerStyle={{
            justifyContent: "space-between"
          }}
          onContentSizeChange={(contentWidth, contentHeight)=>{
            // this.setState((state) => ({
            //   scrollTo: state.scrollTo + 100
            // }), () => {
            //   this.scrollView.scrollTo({ x: scrollTo, animated: true });
            // } )
          }}
        >
  
          <View
            style={{
              backgroundColor: '#FFF',
              justifyContent: 'center',
              alignItems: 'center',
              width: Layout.window.width / 1.2,
              marginLeft: Layout.window.width / 15,
              marginTop: 30,
            }}
          >
    
            <Item
              rounded
              style={{
                marginTop: 20,
                backgroundColor: '#FFF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                borderColor: 'transparent',
                elevation: 1,
              }}
            >
              <Input
                value={authSubject}
                ref={i => {
                  this.subjectInput = i
                }}
                // onSubmitEditing={() => this.messageInput._root.focus()}
                style={{
                  marginLeft: 20,
                  fontSize: 12,
                }}
                placeholder={translate("contactUs.subject")}
                onChangeText={(subject) => {saveSubject(subject); }}
                autoCapitalize='sentences'
                placeholderTextColor={colors.blue1}
              />
            </Item>
    
            <Item
              style={{
                marginTop: 20,
                backgroundColor: '#FFF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                borderColor: 'transparent',
                borderRadius: 8,
                elevation: 1,
              }}
            >
              <Textarea
                ref={i => {
                  this.messageInput = i
                }}
                value={authMessage}
                underline={false}
                style={{
                  marginLeft: 20,
                  fontSize: 12,
                  borderColor: 'transparent',
                  width: Layout.window.width / 1.28
                }}
                rowSpan={5}
                bordered
                onChangeText={(message) => {saveMessage(message)}}
                placeholder={translate("contactUs.savings")}
                placeholderTextColor={colors.blue1}
              />
            </Item>
    
    
            <Button
              style={CONTINUE_BUTTON}
              textStyle={CONTINUE_BUTTON_TEXT}
              disabled={isLoading}
              onPress={this.sendMessage}
              tx={`contactUs.buttonText`}
            />
          </View>

        </ScrollView>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  updateUserAsync: () => dispatch(updateUserAsync()),
  notify: (message: string, type: string) => dispatch(notify(message, type)),
  saveSubject: (subject: string) => dispatch(saveSubject(subject)),
  saveMessage: (message: string) => dispatch(saveMessage(message)),
  contactUsAsync: (message: string, subject: string) => dispatch(contactUsAsync(message, subject)),
})

let mapStateToProps: (state: ApplicationState) => StateProps;
mapStateToProps = (state: ApplicationState): StateProps => ({
  User: state.user.data,
  isLoading: state.user.loading,
  authSubject: state.user.subject,
  authMessage: state.user.message,
});

export const ContactUsScreen = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(ContactUs)
