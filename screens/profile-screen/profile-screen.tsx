// react
import React from "react"

// react-native
import {
  View, Text, ViewStyle, StatusBar, TextStyle, ScrollView, TouchableOpacity, Image, ImageStyle, Linking
} from "react-native"

// third-party
import { NavigationScreenProps } from "react-navigation"
import { connect } from "react-redux"
import { Dispatch } from "redux";
import moment from "moment";
import Modal from "react-native-modal";
import call from 'react-native-phone-call'

// redux
import { ApplicationState } from "../../redux";
import { IUser } from "../../redux/user";
import { updateUserAsync } from "../../redux/user";

// style
import { Layout } from "../../constants";
import { translate } from "../../i18n";
import { colors, fonts, images } from "../../theme";
import { Button } from "../../components/button";

interface DispatchProps {
  updateUserAsync: () => void
}

interface StateProps {
  User: IUser
}

interface ProfileScreenProps extends NavigationScreenProps {}

type Props = DispatchProps & StateProps & ProfileScreenProps

const ROOT: ViewStyle = {
  height: Layout.window.height,
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
  marginTop: Layout.window.height / 4
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
  marginBottom: 25,
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
  marginTop: 25,
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
  width: 148,
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
  }
  
  componentDidMount(): void {
    this.props.updateUserAsync()
  }
  
  handlePhoneCall = (phoneNumber) => {
    const args = {
      number: phoneNumber, // String value with the number to call
      prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call
    }
    
    call(args).catch(console.error)
  }
  
  public render(): React.ReactNode {
    const {
      navigation, User
    } = this.props
    const { fullName, Tourists, pictureURL, Transactions } = User
  
    const {
      isVisible,
      name,
      paid,
      payDay,
      rsvp,
      ref,
      call,
    } = this.state
    
    console.tron.log(Transactions)
    return (
      <View
        style={ROOT}
      >
        <StatusBar barStyle={"dark-content"} />
  
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
  
          {
	          <View>
		          <Image
			          source={images.background}
			          style={BACKGROUND_IMAGE}
			          resizeMethod={'auto'}
			          resizeMode='cover'
		          />
    
              <View
                style={DETAILS}
              >
      
                <View
                  style={SHADOW}
                >
  
                  {
                    User.pictureURL !== ""
                      ? (
                        <Image
                          source={{ uri: `${pictureURL}` }}
                          style={PROFILE_IMAGE}
                          resizeMethod={'auto'}
                          resizeMode='cover'
                        />
                      )
                      
                      : (
                        <Image
                          source={images.appLogo}
                          style={PROFILE_IMAGE}
                          resizeMethod={'auto'}
                          resizeMode='cover'
                        />
                      )
                    
                  }
        
                  <Text
                    style={HEADER_TEXT}
                  >
                    {fullName}
        
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
                    // disabled={!isValid || isLoading}
                    onPress={() => navigation.navigate('savings')}
                    tx={`profile.mySavings`}
                  />
      
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
                  justifyContent: "space-between"
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
                  Transactions.map((transaction) => {
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
              marginBottom: 100,
              width: Layout.window.width / 1.1,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate('edit')}
              style={{
                flexDirection: "row",
                justifyContent: 'space-between',
              }}
            >
              <Text
        
                style={discoverTextStyle}
              >
                {translate(`profile.myProfileHeader`)}
              </Text>
            </TouchableOpacity>
    
            <TouchableOpacity
              style={{
                marginTop: 15,
              }}
              onPress={() => navigation.navigate('edit')}
            >
              <Text
        
                style={discoverMoreTextStyle}
              >
                {Tourists[0] !== undefined && Tourists[0].userCoins} coins
              </Text>
    
            </TouchableOpacity>
          </View>
        
        </ScrollView>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  updateUserAsync: () => dispatch(updateUserAsync())
})

let mapStateToProps: (state: ApplicationState) => StateProps;
mapStateToProps = (state: ApplicationState): StateProps => ({
  User: state.user.data,
});

export const ProfileScreen = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
