import React from "react"
import {
  View, Text, ViewStyle, StatusBar, TextStyle, ScrollView, TouchableOpacity, Image, ImageStyle, Linking
} from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { connect } from "react-redux"
import { Dispatch } from "redux";
import { ApplicationState } from "../../redux";
import { Layout } from "../../constants";
import {translate} from "../../i18n";
import {colors, fonts, images} from "../../theme";
import moment from "moment";
import {Button} from "../../components/button";
import { IUser } from "../../redux/user";

interface DispatchProps {

}
interface StateProps {
  User: IUser
}

interface WalletProps extends NavigationScreenProps {}

type Props = DispatchProps & StateProps & WalletProps

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
  marginBottom: 50,
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

const DATE: TextStyle = {
  ...LOCATION,
  marginTop: 10
}

const PRICE: TextStyle = {
  ...LOCATION,
  marginTop: 10,
  color: colors.purple
}

const JOIN_BUTTON: ViewStyle = {
  borderRadius: 100,
  width: Layout.window.width / 2,
  marginTop: 20,
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
  marginLeft: 30,
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
  marginLeft: 30,
}

const TRIP_IMAGE: ImageStyle = {
  alignSelf: "flex-end",
  height: 233,
  width: 148,
  borderRadius: 12,
}

const TRIP_DETAILS: TextStyle = {
  marginTop: 30
}

const FIELD: ViewStyle = {
  // alignItems: 'center',
  marginTop: 30
}

const SAVE_BUTTON: ViewStyle = {
  alignSelf: "center",
  justifyContent: "center",
  borderRadius: 100,
  width: Layout.window.width / 1.4,
  marginTop: 20,
  backgroundColor: colors.purple
}

const SAVE_BUTTON_TEXT: TextStyle = {
  fontSize: 12,
  fontFamily: fonts.gibsonRegular,
  color: colors.white,
  textTransform: 'uppercase'
}

class Profile extends React.Component<NavigationScreenProps & Props> {
  
  public render(): React.ReactNode {
    const {
      navigation, User
    } = this.props
    const { fullName, Tourists, pictureURL, Transactions } = User
    
    console.tron.log(Tourists[0])
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
          onScrollBeginDrag={() => this.setState({ scrollTo: 0 })}
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
                      width: Layout.window.width / 2.5,
                      marginBottom: 100
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
      
                </View>
      
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    marginTop: Layout.window.height / 25,
                    width: Layout.window.width,
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
                    style={{
                      flexDirection: "row",
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text
            
                      style={discoverTextStyle}
                    >
                      {translate(`profile.save`)}
                    </Text>
                  </TouchableOpacity>
        
                  <TouchableOpacity
                    style={{
                      marginTop: 15,
                    }}
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
            
                      style={discoverMoreTextStyle}
                    >
                      {translate(`home.more`)}
                    </Text>
        
                  </TouchableOpacity>
                </View>
      
                <Text
        
                  style={discoverMoreTextStyle}
                >
                  {translate(`profile.saveMore`)}
                </Text>
    
    
    
              </View>
            </View>
          }
          
          {
            Transactions[0] !== undefined && (
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
                style={{
                  flexDirection: "row",
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}
              >
                <Text
      
                  style={discoverTextStyle}
                >
                  {translate(`profile.myTrips`)}
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
		            onScrollBeginDrag={() => this.setState({ scrollTo: 0 })}
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
                    return (
                      <TouchableOpacity
                        style={{
                          flexDirection: "column",
                          marginLeft: 20,
                        }}
                        // onPress={() => {
                        //   setSelectedTours(tour)
                        //   viewTours()
                        // }}
                      >
                        <Image
                          style={TRIP_IMAGE}
                          source={{ uri: `${Transactions[0].tripImage}` }}
                          resizeMethod={'auto'}
                          resizeMode='cover'
                        />
  
                      </TouchableOpacity>
                    )
                  })
                }
                
              </ScrollView>
            )
          }
        
        </ScrollView>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({

})

let mapStateToProps: (state: ApplicationState) => StateProps;
mapStateToProps = (state: ApplicationState): StateProps => ({
  User: state.user.data,
});

export const ProfileScreen = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
