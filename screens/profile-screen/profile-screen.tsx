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
  NativeMethodsMixinStatic, KeyboardAvoidingView, AppState, ActivityIndicator, Platform, Keyboard
} from "react-native"

// third-party
import { NavigationScreenProps } from "react-navigation"
import { connect } from "react-redux"
import { Dispatch } from "redux";
import moment from "moment";
import Modal from "react-native-modal";
import call from 'react-native-phone-call'
import * as Yup from "yup";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import CryptoJS from 'crypto-js';
import {
  CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_UPLOAD_URL
} from "react-native-dotenv"

// redux
import { ApplicationState } from "../../redux";
import {
  IUser,
  updateUserProfilePicture,
  updateUserProfilePictureAsync,
  updateUserProfilePictureFailure
} from "../../redux/user";
import { updateUserAsync } from "../../redux/user";
import { notify } from "../../redux/auth";

// style
import { Layout } from "../../constants";
import { translate } from "../../i18n";
import { colors, fonts, images } from "../../theme";
import { Button } from "../../components/button";
import {Formik, FormikProps} from "formik";
import {TextField} from "../../components/text-field";
import {openSettingsAsync} from "../../redux/startup";

interface DispatchProps {
  updateUserAsync: () => void
  notify: (message: string, type: string) => void
  updateUserProfilePicture: () => void
  updateUserProfilePictureFailure: () => void
  updateUserProfilePictureAsync: (imageURL: string) => void
  openSettings: () => void
}

interface StateProps {
  User: IUser
  authRedeemKey: string
  isLoading: boolean
  isUploading: boolean
}

interface MyFormValues {
  redeemKey: string
}

const schema = Yup.object().shape({
  redeemKey: Yup.string()
    .min(3, "common.fieldTooShort")
    .required("common.fieldRequired"),
})


interface ProfileScreenProps extends NavigationScreenProps {}

type Props = DispatchProps & StateProps & ProfileScreenProps

const ROOT: ViewStyle = {
  height: Layout.window.height,
}


const REDEEM_BUTTON: ViewStyle = {
  borderRadius: 100,
  width: Layout.window.width / 1.4,
  marginTop: 10,
  backgroundColor: colors.purple,
  marginBottom: Platform.OS === "ios" ? Layout.window.height / 7 : Layout.window.height / 15,
}

const REDEEM_BUTTON_TEXT: TextStyle = {
  fontSize: 12,
  fontFamily: fonts.gibsonRegular,
  color: colors.palette.white,
  textTransform: 'uppercase'
}

const BACKGROUND_IMAGE: ImageStyle = {
  height: Layout.window.height / 2.2,
  width: Layout.window.width,
  flex: 1,
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
}

const PROFILE_IMAGE: ImageStyle = {
  height: 120,
  width: 120,
  borderRadius: 60
}


const BACK_IMAGE: ImageStyle = {
  marginLeft: 30,
  marginTop: 50,
  height: 30,
  width: 30,
  tintColor: colors.purple
}

const DETAILS: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: Layout.window.height / 7
}


const SHADOW: ViewStyle = {
  height: 251,
  width: 299,
  backgroundColor: colors.white,
  borderRadius: 8,
  //ios
  shadowOpacity: 0.5,
  shadowRadius: 3,
  shadowOffset: {
    height: 1,
    width: 1
  },
//android
  elevation: 2,
  alignItems: "center",
  justifyContent: "center",
}

const HEADER_TEXT: TextStyle = {
  fontSize: 22,
  color: colors.black,
  fontFamily: fonts.latoRegular,
  lineHeight: 40,
  textAlign: 'center',
  width: Layout.window.width / 1.9,
}

const LABEL_TEXT: TextStyle = {
  marginLeft: 25,
  color: colors.black,
  fontFamily: fonts.latoRegular,
  lineHeight: 40,
  textAlign: 'center',
  width: Layout.window.width / 1.9,
}

const LOCATION: TextStyle = {
  color: colors.blue1,
  fontFamily: fonts.latoRegular,
  textAlign: 'center',
  width: Layout.window.width / 1.5,
}

const JOIN_BUTTON: ViewStyle = {
  borderRadius: 100,
  width: Layout.window.width / 2,
  marginTop: 10,
  marginBottom: Layout.window.height / 10,
  backgroundColor: colors.purple,
}

const JOIN_BUTTON_TEXT: TextStyle = {
  fontSize: 12,
  fontFamily: fonts.gibsonRegular,
  color: colors.palette.white,
  textTransform: 'uppercase'
}

const discoverTextStyle: TextStyle = {
  fontSize: 22,
  color: colors.black,
  fontFamily: fonts.latoRegular,
  lineHeight: 40,
  textAlign: 'left',
  width: Layout.window.width / 1.5,
}

const discoverMoreTextStyle: TextStyle = {
  color: colors.blue1,
  fontFamily: fonts.latoRegular,
  alignSelf: 'flex-start',
  width: Layout.window.width / 1.5,
  // marginLeft: 20,
}

const TRIP_IMAGE: ImageStyle = {
  alignSelf: "flex-end",
  height: 233,
  width: Layout.window.width / 2.4,
  borderRadius: 12,
}

const infoTextStyle: TextStyle = {
  color: colors.blue1,
  fontFamily: fonts.latoRegular,
  marginTop: 10,
}

class Profile extends React.Component<NavigationScreenProps & Props> {
  
  state={
    isVisible: false,
    name: '',
    paid: '',
    payDay: '',
    rsvp: '',
    ref: '',
    call: '',
    imagePermissions: false,
    appState: AppState.currentState,
  }
  
  redeemKeyInput: NativeMethodsMixinStatic | any
  
  componentDidMount(): void {
    this.props.updateUserAsync()
    this.getPermissionAsync();
    AppState.addEventListener("change", this.handleAppStateChange)
  
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }
  
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  
  _keyboardDidShow = () => {
    this.setState({
      keyboardUp: true
    })
  }
  
  _keyboardDidHide = () =>  {
    this.setState({
      keyboardUp: false
    })
  }
  
  getPermissionAsync = async () => {
    const { notify } = this.props
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      console.tron.log(status)
      notify('Sorry, we need camera roll permissions to make this work!', 'danger')
      this.setState({
        imagePermissions: false
      })
    } else {
      this.setState({
        imagePermissions: true
      })
    }
  }
  
  handlePhoneCall = (phoneNumber) => {
    const args = {
      number: phoneNumber, // String value with the number to call
      prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call
    }
    
    call(args).catch(console.error)
  }
  
  
  submit = (value) => {
    console.tron.log(value)
  }
  
  uploadImage(uri: any) {
    const { notify, updateUserProfilePicture, updateUserProfilePictureFailure, updateUserProfilePictureAsync } = this.props
    updateUserProfilePicture()
    
    // console.tron.log(uri)
    let timestamp = (Date.now() / 1000 | 0).toString();
    let api_key = CLOUDINARY_API_KEY
    let api_secret = CLOUDINARY_API_SECRET
    let hash_string = 'timestamp=' + timestamp + api_secret
    let signature = CryptoJS.SHA1(hash_string).toString();
    let upload_url = CLOUDINARY_UPLOAD_URL
    
    let xhr = new XMLHttpRequest();
    xhr.open('POST', upload_url);
    xhr.onload = () => {
      console.tron.log("xhr");
      console.tron.log(xhr);
      if(xhr.status === 200) {
        console.tron.log(JSON.parse(xhr.response).secure_url)
        updateUserProfilePictureAsync(JSON.parse(xhr.response).secure_url)
        return
      }
      
      notify('Sorry, upload failed!', 'danger')
      
      updateUserProfilePictureFailure()
    };
    let formdata = new FormData();
    formdata.append('file', { uri: uri, type: 'image/png', name: 'upload.png'});
    formdata.append('timestamp', timestamp);
    formdata.append('api_key', api_key);
    formdata.append('signature', signature);
    xhr.send(formdata);
  }
  
  getImage = async () => {
    console.tron.log('called getImage')
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      // aspect: [4, 3],
    });
    
    if (!result.cancelled) {
      this.uploadImage(result.uri)
    }
  };
  
  handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      this.getPermissionAsync()
    }
    
    this.setState({ appState: nextAppState })
  }
  
  public render(): React.ReactNode {
    const {
      navigation, User, authRedeemKey, isLoading, openSettings, isUploading
    } = this.props
    const {
      fullName, Tourists, pictureURL, Transactions, email
    } = User
  
    const {
      isVisible,
      name,
      paid,
      payDay,
      rsvp,
      ref,
      call,
      imagePermissions,
      keyboardUp
    } = this.state
    
    console.tron.log(this.state)
    
    return (
      <KeyboardAvoidingView
        enabled={true}
        behavior={"padding"}
        
        style={
          keyboardUp
            ? {
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center'
              }
            : {
                flex: 1,
              }
        }
        keyboardVerticalOffset={100}
      >
        <View
          style={ROOT}
        >
          {
            Platform.OS === "ios"
              ? <StatusBar barStyle="dark-content" />
              : <StatusBar barStyle={"light-content"} translucent backgroundColor={colors.purple} />
          }
    
          <ScrollView
            scrollEnabled
            showsVerticalScrollIndicator={false}
            pinchGestureEnabled
            contentContainerStyle={{
              justifyContent: "space-between",
            }}
            onContentSizeChange={(contentWidth, contentHeight)=>{
              // this.setState((state) => ({
              //   scrollTo: state.scrollTo + 100
              // }), () => {
              //   this.scrollView.scrollTo({ x: scrollTo, animated: true });
              // } )
            }}
          >
    
            {
              <View>
                <Image
                  source={images.background}
                  style={BACKGROUND_IMAGE}
                  resizeMethod={'auto'}
                  resizeMode='cover'
                />
                
                <TouchableOpacity
                  disabled={isUploading || isLoading}
                  style={{
                    width: Layout.window.width/ 1.1,
                    alignItems: "flex-end",
                    marginTop: Layout.window.width / 7
                  }}
                  onPress={() => navigation.navigate('edit')}
                >
                  <Image
                    source={images.editIcon}
                    style={{
                      height: 20,
                      width: 20,
                    }}
                    resizeMethod={'auto'}
                    resizeMode='cover'
                  />
                </TouchableOpacity>
      
                <View
                  style={DETAILS}
                >
        
                  <View
                    style={SHADOW}
                  >
    
                    {
                      User.pictureURL !== ""
                        ? (
                          <TouchableOpacity
                            onPress={() => imagePermissions ? this.getImage() : openSettings()}
                            disabled={isUploading || isLoading}
                          >
                            <Image
                              source={{ uri: `${pictureURL}` }}
                              style={PROFILE_IMAGE}
                              resizeMethod={'auto'}
                              resizeMode='cover'
                            />
                          </TouchableOpacity>
                        )
                        
                        : (
                          <TouchableOpacity
                            onPress={() => imagePermissions ? this.getImage() : openSettings()}
                            disabled={isUploading || isLoading}
                          >
                            <Image
                              source={images.appLogo}
                              style={PROFILE_IMAGE}
                              resizeMethod={'auto'}
                              resizeMode='cover'
                            />
                          </TouchableOpacity>
                        )
                      
                    }
          
                    <Text
                      style={HEADER_TEXT}
                    >
                      {fullName}
          
                    </Text>
  
                    <Text
                      style={[LOCATION, {
                        marginBottom: 20
                      }]}
                    >
                      {email}
  
                    </Text>
                    
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        width: Layout.window.width / 2.5
                      }}
                    >
                      
                      <View
                        style={{
                          flexDirection: "column"
                        }}
                      >
                        <Text
                          style={LOCATION}
                        >
                          {translate('profile.trips')}
                        </Text>
    
                        <Text
                          style={LABEL_TEXT}
                        >
                          {Tourists[0] !== undefined ? Tourists[0].numberOfTrips : 0}
                        </Text>
                      </View>
    
                      <View
                        style={{
                          flexDirection: "column"
                        }}
                      >
                        <Text
                          style={LOCATION}
                        >
                          {translate('profile.sent')}
                        </Text>
      
                        <Text
                          style={LABEL_TEXT}
                        >
                          {Tourists[0] !== undefined ? Tourists[0].sentGift : 0}
                        </Text>
                      </View>
    
    
                      <View
                        style={{
                          flexDirection: "column"
                        }}
                      >
                        <Text
                          style={LOCATION}
                        >
                          {translate('profile.received')}
                        </Text>
      
                        <Text
                          style={LABEL_TEXT}
                        >
                          {Tourists[0] !== undefined ? Tourists[0].receivedGift : 0}
                        </Text>
                      </View>
                      
                    </View>
    
                    <Button
                      style={JOIN_BUTTON}
                      textStyle={JOIN_BUTTON_TEXT}
                      disabled={isUploading || isLoading}
                      onPress={() => navigation.navigate('savings')}
                    >
                      {/*{translate(`profile.mySavings`).toString()}*/}
                      <Text style={JOIN_BUTTON_TEXT}>{translate(`profile.mySavings`)}</Text>
                    </Button>
                    
                    {
                      isLoading || isUploading && <ActivityIndicator size="small" color={colors.purple} />
                    }
        
                  </View>
        
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: "space-between",
                      marginTop: Layout.window.height / 25,
                      marginLeft: 10,
                      width: Layout.window.width / 1.1,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        Linking.canOpenURL('https://paystack.com/pay/t4gm7oivkj').then(supported => {
                          if (supported) {
                            Linking.openURL('https://paystack.com/pay/t4gm7oivkj');
                          } else {
                            console.tron.log("Don't know how to open URI: " + 'https://paystack.com/pay/t4gm7oivkj');
                          }
                        });
                      }}
                      
                    >
                      <Text
              
                        style={discoverTextStyle}
                      >
                        {translate(`profile.save`)}
                      </Text>
    
                      <Text
      
                        style={discoverMoreTextStyle}
                      >
                        {translate(`profile.saveMore`)}
                      </Text>
                    </TouchableOpacity>
                    
                  </View>
      
      
      
                </View>
              </View>
            }
            
            {
              Transactions[0] !== undefined && (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: 'space-between',
                    marginLeft: 20,
                    marginTop: 20,
                    width: Layout.window.width / 1.15
                  }}
                  onPress={() => navigation.navigate('trips')}
                >
                  <Text
        
                    style={discoverTextStyle}
                  >
                    {translate(`profile.myTrips`)}
                  </Text>
    
                  <Text
      
                    style={infoTextStyle}
                  >
                    {translate(`home.more`)}
                  </Text>
                </TouchableOpacity>
              )
            }
            
            {
              Transactions[0] !== undefined && (
                <ScrollView
                  // onScroll={this.handleScroll}
                  scrollEnabled
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  pinchGestureEnabled
                  contentContainerStyle={{
                    justifyContent: "space-between",
                    height: 233,
                  }}
                  style={{
                    marginTop: '5%',
                    // marginBottom: '10%',
                    marginRight: '5%',
                  }}
                  // ref={forwardedRef}
                  onContentSizeChange={(contentWidth, contentHeight)=>{
                    // this.setState((state) => ({
                    //   scrollTo: state.scrollTo + 100
                    // }), () => {
                    //   this.scrollView.scrollTo({ x: scrollTo, animated: true });
                    // } )
                  }}
                >
                  
                  
                  {
                    Transactions.reverse().map((transaction) => {
                      const { tripName, slots, userPays, createdAt, reference, contactNumber, tripImage } = transaction
                      return (
                        <TouchableOpacity
                          style={{
                            flexDirection: "column",
                            marginLeft: 20,
                          }}
                          onPress={() => this.setState({
                            isVisible: !isVisible,
                            name: tripName,
                            paid: slots *  userPays,
                            payDay: createdAt,
                            rsvp: slots,
                            ref: reference,
                            call: contactNumber,
                          })}
                        >
                          <Image
                            style={TRIP_IMAGE}
                            source={{ uri: `${tripImage}` }}
                            resizeMethod={'auto'}
                            resizeMode='cover'
                          />
    
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between"
                            }}
                          >
                            <Text
        
                              style={infoTextStyle}
                            >
                              {tripName}
                            </Text>
                            
                          </View>
    
                          <Modal
                            isVisible={isVisible}
                            onBackdropPress={() => this.setState({ isVisible: !isVisible })}
                          >
                            <View
                              style={{
                                backgroundColor: colors.white,
                                height: Layout.window.height / 2,
                                justifyContent: "space-evenly",
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignSelf: "center",
                                  justifyContent: "space-between",
                                  width: Layout.window.width / 1.2
                                }}
                              >
                                <Text
            
                                  style={infoTextStyle}
                                >
                                  TripName:
                                </Text>
          
                                <Text
            
                                  style={infoTextStyle}
                                >
                                  {name}
                                </Text>
        
                              </View>
        
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignSelf: "center",
                                  justifyContent: "space-between",
                                  width: Layout.window.width / 1.2
                                }}
                              >
                                <Text
            
                                  style={infoTextStyle}
                                >
                                  Paid:
                                </Text>
          
                                <Text
            
                                  style={infoTextStyle}
                                >
                                  {paid}
                                </Text>
        
                              </View>
        
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignSelf: "center",
                                  justifyContent: "space-between",
                                  width: Layout.window.width / 1.2
                                }}
                              >
                                <Text
            
                                  style={infoTextStyle}
                                >
                                  Reference:
                                </Text>
          
                                <Text
            
                                  style={infoTextStyle}
                                >
                                  {ref}
                                </Text>
        
                              </View>
        
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignSelf: "center",
                                  justifyContent: "space-between",
                                  width: Layout.window.width / 1.2
                                }}
                              >
                                <Text
            
                                  style={infoTextStyle}
                                >
                                  Payment Date:
                                </Text>
          
                                <Text
            
                                  style={infoTextStyle}
                                >
                                  { moment(payDay).format("ddd, MMM D, YYYY")}
                                </Text>
        
                              </View>
        
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignSelf: "center",
                                  justifyContent: "space-between",
                                  width: Layout.window.width / 1.2
                                }}
                              >
                                <Text
            
                                  style={infoTextStyle}
                                >
                                  Slot(s):
                                </Text>
          
                                <Text
            
                                  style={infoTextStyle}
                                >
                                  {rsvp}
                                </Text>
                              </View>
        
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignSelf: "center",
                                  justifyContent: "space-between",
                                  width: Layout.window.width / 1.2
                                }}
                              >
                                <Text
            
                                  style={infoTextStyle}
                                >
                                  Contact:
                                </Text>
          
                                <TouchableOpacity
                                  onPress={() => this.handlePhoneCall(`${call}`)}
                                >
                                  <Image
                                    style={{
                                      marginTop: 10
                                    }}
                                    source={images.callIcon}
                                    resizeMethod={'auto'}
                                    resizeMode='cover'
                                  />
                                </TouchableOpacity>
                              </View>
      
                            </View>
                          </Modal>
    
                        </TouchableOpacity>
                      )
                    })
                  }
                  
                  
                  
                </ScrollView>
              )
            }
    
            <View
              style={{
                flexDirection: 'row',
                justifyContent: "space-between",
                marginLeft: 20,
                marginTop: Layout.window.height / 25,
                width: Layout.window.width / 1.1,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: 'space-between',
                }}
              >
                <Text
          
                  style={discoverTextStyle}
                >
                  {translate(`profile.redeemHeader`)}
                </Text>
              </View>
      
              <View
                style={{
                  marginTop: 15,
                }}
              >
                <Text
          
                  style={discoverMoreTextStyle}
                >
                  {Tourists[0] !== undefined && Tourists[0].userCoins} coins
                </Text>
      
              </View>
            </View>
    
            <Formik
              initialValues={{
                redeemKey: authRedeemKey
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
                    style={{
                      alignItems: 'center',
                      marginTop: 20
                    }}
                  >
                    <TextField
                      name="redeemKey"
                      keyboardType="default"
                      placeholderTx="profile.code"
                      value={values.redeemKey}
                      onChangeText={handleChange("redeemKey")}
                      onBlur={handleBlur("redeemKey")}
                      autoCapitalize="none"
                      returnKeyType="search"
                      isInvalid={!isValid}
                      fieldError={errors.redeemKey}
                      forwardedRef={i => {
                        this.redeemKeyInput = i
                      }}
                      onSubmitEditing={() => handleSubmit()}
                    />
            
                    <Button
                      style={REDEEM_BUTTON}
                      textStyle={REDEEM_BUTTON_TEXT}
                      disabled={!isValid || isLoading || isUploading}
                      onPress={() => handleSubmit()}
                      tx={`profile.redeem`}
                    />
                  </View>
                </View>
              )}
            </Formik>
          
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  updateUserAsync: () => dispatch(updateUserAsync()),
  notify: (message: string, type: string) => dispatch(notify(message, type)),
  updateUserProfilePicture: () => dispatch(updateUserProfilePicture()),
  updateUserProfilePictureFailure: () => dispatch(updateUserProfilePictureFailure()),
  updateUserProfilePictureAsync: (imageURL: string) => dispatch(updateUserProfilePictureAsync(imageURL)),
  openSettings: () => dispatch(openSettingsAsync()),
})

let mapStateToProps: (state: ApplicationState) => StateProps;
mapStateToProps = (state: ApplicationState): StateProps => ({
  User: state.user.data,
  authRedeemKey: state.user.authRedeemKey,
  isLoading: state.user.loading,
  isUploading: state.user.uploading,
});

export const ProfileScreen = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
