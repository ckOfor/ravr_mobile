// react
import React from "react"

// react-native
import {
  Image, ImageStyle,
  ScrollView, Text, TextStyle, TouchableOpacity, View, ViewStyle
} from "react-native"

// third-party libraries
import { NavigationScreenProps } from "react-navigation"
import moment from 'moment'
import { Container, Header, Content, Tab, Tabs } from 'native-base';

// redux
import { connect } from "react-redux"
import { Dispatch } from "redux";
import { ApplicationState } from "../../redux";
import {ITours} from "../../services/api";
import {Layout} from "../../constants";
import {colors, fonts} from "../../theme";
import {Button} from "../../components/button";
import {translate} from "../../i18n";
import {DiscoverScreen} from "../discover-screen";


interface DispatchProps {

}

interface StateProps {
  isLoading: boolean
  selectedTour: ITours
}

interface ViewTourScreenProps extends NavigationScreenProps {}

type Props = DispatchProps & StateProps & ViewTourScreenProps

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
  marginLeft: 40,
  marginBottom: 10,
  color: colors.black,
  fontFamily: fonts.latoRegular,
  lineHeight: 40,
  // textAlign: 'center',
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

class ViewTour extends React.Component<NavigationScreenProps & Props> {
  
  public render(): React.ReactNode {
    const {
      navigation, selectedTour
    } = this.props
    
    console.tron.log(selectedTour)
    return (
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
          selectedTour && (
            <View>
              <Image
                source={{ uri: `${selectedTour.locationPictureOne}` }}
                style={BACKGROUND_IMAGE}
                resizeMethod={'auto'}
                resizeMode='cover'
              >
  
              </Image>
  
              <View
                style={DETAILS}
              >
    
                <View
                  style={SHADOW}
                >
                  
                  <Text
                    style={HEADER_TEXT}
                  >
                    {selectedTour.tripName}
                  
                  </Text>
  
                  <Text
                    style={LOCATION}
                  >
                    {selectedTour.tripLocation}
  
                  </Text>
  
                  <Text
                    style={DATE}
                  >
                    { moment(selectedTour.tripDate).format("dddd, MMMM D, YYYY")}
  
                  </Text>
  
                  <Text
                    style={PRICE}
                  >
                    Price: ₦ {selectedTour.userPays.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
  
                  </Text>
  
                  <Button
                    style={JOIN_BUTTON}
                    textStyle={JOIN_BUTTON_TEXT}
                    // disabled={!isValid || isLoading}
                    // onPress={() => handleSubmit()}
                    tx={`viewTour.join`}
                  />
    
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
                    // onPress={() => navigation.navigate('profile')}
                    style={{
                      flexDirection: "row",
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text
        
                      style={discoverTextStyle}
                    >
                      {translate(`viewTour.save`)}
                    </Text>
                  </TouchableOpacity>
    
                  <TouchableOpacity
                    style={{
                      marginTop: 15,
                    }}
                    onPress={() => navigation.navigate('profile')}
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
                  {translate(`viewTour.saveMore`)}
                </Text>
  
                
                
              </View>
            </View>
          )
        }
  
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
            marginBottom: '5%',
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
              source={{ uri: `${selectedTour.poster}` }}
              resizeMethod={'auto'}
              resizeMode='cover'
            />

          </TouchableOpacity>
  
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
              source={{ uri: `${selectedTour.locationPictureTwo}` }}
              resizeMethod={'auto'}
              resizeMode='cover'
            />
          </TouchableOpacity>
  
  
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
              source={{ uri: `${selectedTour.locationPictureThree}` }}
              resizeMethod={'auto'}
              resizeMode='cover'
            />
          </TouchableOpacity>
          
          
        </ScrollView>
  
        <Tabs
          style={{
            marginTop: 10,
            marginBottom: 20,
            width: Layout.window.width / 1.2,
            alignSelf: 'center'
          }}
          tabBarUnderlineStyle={{
            backgroundColor: colors.purple,
          }}
        >
          <Tab
            activeTabStyle={{
              backgroundColor: colors.white,
            }}
            activeTextStyle={{
              color: colors.purple,
            }}
            tabStyle={{
              backgroundColor: colors.white
            }}
            heading={translate("viewTour.tabOne")}
          >
            {/*<Tab1 />*/}
            <Text
              numberOfLines={100}
              style={TRIP_DETAILS}
            >
              {selectedTour.tripContent}
            </Text>
          </Tab>
          <Tab
            activeTabStyle={{
              backgroundColor: colors.white
            }}
            activeTextStyle={{
              color: colors.purple,
            }}
            tabStyle={{
              backgroundColor: colors.white
            }}
            heading={translate("viewTour.tabTwo")}
          >
            {/*tripWallet:50400*/}
            {/*tripPaymentCount:4*/}
            {/*tripLocation:Calabar, Nigeria*/}
            {/*tripDate:2019-12-21*/}
            {/*poster:https://res.cloudinary.com/symple-innovations-company/image/upload/v1576625078/zc8l8jw5cvebdvaezmaa.jpg*/}
            {/*locationPictureOne:https://res.cloudinary.com/symple-innovations-company/image/upload/v1576625057/yano4czdfxhwkrvuldcs.jpg*/}
            {/*locationPictureTwo:https://res.cloudinary.com/symple-innovations-company/image/upload/v1576625083/uijrrbctcuf406agt0sr.png*/}
            {/*locationPictureThree:https://res.cloudinary.com/symple-innovations-company/image/upload/v1576625083/pnkmhuzivnlqcce4njtv.jpg*/}
            {/*tripVideo:null*/}
            {/*tripTime:12:20 AM*/}
            {/*tripPrice:14000*/}
            {/*tripDuration:7*/}
            {/*tripDiscount:0.1*/}
            {/*tripContent:Social Prefect Tours and Novarosta presents "Christmas in Calabar + Calabar Carvinal 2019" Date - December 24th - 29th 2019 N130,000 each (Without flights) Includes - Accommodation (Double sharing), Full board (daily breakfast, lunch & dinner), visits to Kwa waterfall, Tinapa, Marina resort & Drill ranch, Christmas party, Participation in the carvinal, t-shirt, goodie bag and more. Please note that fare with flights is no longer available. Payment details – GTB - 0265867267 Diamond bank - 0080530881 Account name – Chiamaka Social Prefect Intl Blog. For further details, contact - amaka.socialprefect@gmail.com Or call: 08163976208*/}
            {/*tripStatus:open*/}
            {/*requestStatus:N/A*/}
            {/*userDiscount:0.05*/}
            {/*userPays:13300*/}
            {/*payStackCharges:13600*/}
            {/*payTourCompany:12600*/}
            {/*paySympleInc:700*/}
            {/*userCoins:70*/}
            {/*tripLikesCount:0*/}
            {/*noOfSlots:-2*/}
            {/*companyLogo:https://res.cloudinary.com/symple-innovations-company/image/upload/v1576619650/oqqphzgeh1tgrrsgjoue.jpg*/}
            {/*paymentStatus:open*/}
            {/*tripDeadline:28-12-2019*/}
            {/*paymentId:""*/}
            {/*userId:4*/}
            {/*createdAt:2019-12-17T23:24:45.086Z*/}
            {/*updatedAt:2019-12-24T13:46:30.170Z*/}
            {/*<Tab2 />*/}
  
            <Text
              numberOfLines={100}
              style={TRIP_DETAILS}
            >
              Trip Price: ₦ {selectedTour.tripPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
  
            <Text
              numberOfLines={100}
              style={TRIP_DETAILS}
            >
              Trip Discount: {selectedTour.tripDiscount * 100}% off
            </Text>
  
            <Text
              numberOfLines={100}
              style={[TRIP_DETAILS, {
                color: colors.purple,
                fontWeight: "bold"
              }]}
            >
              Price: ₦ {selectedTour.userPays.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
  
            <Text
              numberOfLines={100}
              style={TRIP_DETAILS}
            >
              Available Ravr Coins: {selectedTour.userCoins}
            </Text>
            
            <Text
              numberOfLines={100}
              style={TRIP_DETAILS}
            >
              Meeting Time: {selectedTour.tripTime}
            </Text>
            
            <Text
              numberOfLines={100}
              style={TRIP_DETAILS}
            >
              Trip length: {selectedTour.tripDuration} day(s)
            </Text>
            
            <Text
              numberOfLines={100}
              style={TRIP_DETAILS}
            >
              Status: {selectedTour.tripStatus}
            </Text>
            
          </Tab>
          <Tab
            activeTabStyle={{
              backgroundColor: colors.white
            }}
            activeTextStyle={{
              color: colors.purple,
            }}
            tabStyle={{
              backgroundColor: colors.white
            }}
            heading={translate("viewTour.tabThree")}
          >
            {/*<Tab3 />*/}
          </Tab>
        </Tabs>
      
      </ScrollView>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({

})

let mapStateToProps: (state: ApplicationState) => StateProps;
mapStateToProps = (state: ApplicationState): StateProps => ({
  isLoading: state.tour.loading,
  selectedTour: state.tour.selectedTour
});

export const ViewTourScreen = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(ViewTour)
