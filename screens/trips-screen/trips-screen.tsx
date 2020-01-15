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
  RefreshControl,
  FlatList, Platform
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
import {colors, fonts, images} from "../../theme";

interface DispatchProps {
  updateUserAsync: () => void
}

interface StateProps {
  User: IUser
  isLoading: boolean
  tours: any
}

interface TripScreenProps extends NavigationScreenProps {}

type Props = DispatchProps & StateProps & TripScreenProps

const ROOT: ViewStyle = {
  height: Layout.window.height,
}


const HEADER_TEXT: TextStyle = {
  marginLeft: 20,
  marginTop: Layout.window.height / 15,
  color: colors.purple,
  fontFamily: fonts.latoRegular,
  lineHeight: 40,
  textAlign: 'left',
  width: Layout.window.width / 1.5,
}

const discoverTextStyle: TextStyle = {
  fontSize: 22,
  marginLeft: 40,
  color: colors.black,
  fontFamily: fonts.latoRegular,
  lineHeight: 40,
  textAlign: 'left',
  width: Layout.window.width / 1.9,
}

const discoverMoreTextStyle: TextStyle = {
  color: colors.blue1,
  fontFamily: fonts.latoRegular,
  textAlign: 'left',
  width: Layout.window.width / 1.5,
  marginLeft: 40,
}

const TRIP_IMAGE: ImageStyle = {
  alignSelf: "flex-end",
  height: 235.5,
  width: Layout.window.width / 1.1,
  borderRadius: 12,
}

const infoTextStyle: TextStyle = {
  color: colors.blue1,
  fontFamily: fonts.latoRegular,
  marginLeft: 10,
  marginTop: 10,
}

const SOCIAL_ICONS: ImageStyle = {
  marginRight: 10,
  // tintColor: colors.purple
}

class Trips extends React.Component<NavigationScreenProps & Props> {
  
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
    this.updateUser()
  }
  
  updateUser = () => {
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
      navigation, tours, isLoading
    } = this.props
    
    const {
      isVisible,
      name,
      paid,
      payDay,
      rsvp,
      ref,
      call,
    } = this.state
    
    console.tron.log(tours, "skd IWIQIWIQWUQ")
    console.tron.log(tours)
    
    return (
      <View
        style={ROOT}
      >
        {
          Platform.OS === "ios"
            ? <StatusBar barStyle="dark-content" />
            : <StatusBar barStyle={"light-content"} translucent backgroundColor={colors.purple} />
        }
        
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
  
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Text
      
              style={HEADER_TEXT}
            >
              {translate(`profile.headerText`)}
            </Text>
          </TouchableOpacity>
  
          <View
            style={{
              flexDirection: 'row',
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              // onPress={() => navigation.navigate('profile')}
              style={{
                flexDirection: "row",
                justifyContent: 'space-between',
              }}
            >
              <Text
        
                style={discoverTextStyle}
              >
                {translate(`profile.myTripsHeader`)}
              </Text>
            </TouchableOpacity>
          </View>
  
          <Text
    
            style={discoverMoreTextStyle}
          >
            {translate(`profile.tripHeader`)}
          </Text>
  
          <ScrollView
            showsHorizontalScrollIndicator={false}
          >
            {
              tours[0].id !== null && (
                <FlatList
                  data={tours}
                  numColumns={1}
                  style={{
                    marginRight: 15,
                  }}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingBottom: 120
                  }}
                  renderItem={(tours) => {
                    const { index } = tours
                    const {
                      tripImage, tripName, userPays, tripLocation, tripDate, createdAt, slots, reference, contactNumber
                    } = tours.item
  
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => this.setState({
                          isVisible: !isVisible,
                          name: tripName,
                          paid: slots *  userPays,
                          payDay: createdAt,
                          rsvp: slots,
                          ref: reference,
                          call: contactNumber,
                        })}
                        style={{
                          flexDirection: "column",
                          marginLeft:  20,
                          marginTop: 20,
                        }}
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
                        
                          <Text
                        
                            style={infoTextStyle}
                          >
                            ₦ {userPays.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </Text>
                        </View>
                
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between"
                          }}
                        >
                          <Text
                        
                            style={infoTextStyle}
                          >
                            {tripLocation.substring(0, 20)}
                          </Text>
                        
                          <Text
                        
                            style={infoTextStyle}
                          >
                            { moment(tripDate).format("ddd, MMM D, YYYY")}
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
                                  style={SOCIAL_ICONS}
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
                  }}
                />
              )
            }
            
          </ScrollView>
          
        
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
  isLoading: state.user.loading,
  tours: state.user.data.Transactions,
});

export const TripsScreen = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(Trips)
