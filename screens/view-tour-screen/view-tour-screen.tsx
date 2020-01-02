// react
import React from "react"

// react-native
import {
  Image, ImageStyle, Linking, NativeMethodsMixinStatic,
  ScrollView, Text, TextStyle, TouchableOpacity, View, ViewStyle
} from "react-native"

// third-party libraries
import { NavigationScreenProps } from "react-navigation"
import moment from 'moment'
import { Tab, Tabs } from 'native-base';
import { translate } from "../../i18n";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";

// redux
import { connect } from "react-redux"
import { Dispatch } from "redux";
import { ApplicationState } from "../../redux";

// API
import {ITours} from "../../services/api";

// styles
import { Layout } from "../../constants";
import { colors, fonts, images } from "../../theme";
import { Button } from "../../components/button";
import { TextField } from "../../components/text-field";
import {formatSLots} from "../../utils/formatters";


interface DispatchProps {

}

interface StateProps {
  isLoading: boolean
  selectedTour: ITours
}


const schema = Yup.object().shape({
  months: Yup.string()
    .required("payment.slotShot"),
  slots: Yup.string()
    .required("payment.slotShot")
})

interface MyFormValues {
  months: number
  slots: number
}

interface ViewTourScreenProps extends NavigationScreenProps {}

type Props = DispatchProps & StateProps & ViewTourScreenProps


const appNameTextStyle: TextStyle = {
  marginLeft: 20,
  marginTop: Layout.window.height / 15,
  color: colors.purple,
  fontFamily: fonts.latoRegular,
  lineHeight: 40,
  textAlign: 'left',
  width: Layout.window.width / 1.5,
}

const BACK_IMAGE: ImageStyle = {
  marginLeft: 30,
  marginTop: 50,
  height: 30,
  width: 30,
  tintColor: colors.purple
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

class ViewTour extends React.Component<NavigationScreenProps & Props> {
  
  monthsInput: NativeMethodsMixinStatic | any
  slotsInput: NativeMethodsMixinStatic | any
  
  submit = () => {
    Linking.canOpenURL('https://paystack.com/pay/t4gm7oivkj').then(supported => {
      if (supported) {
        Linking.openURL('https://paystack.com/pay/t4gm7oivkj');
      } else {
        console.tron.log("Don't know how to open URI: " + 'https://paystack.com/pay/t4gm7oivkj');
      }
    });
  }
  
  public render(): React.ReactNode {
    const {
      navigation, selectedTour, isLoading
    } = this.props
  
    const today= moment()
    let myTripDate = selectedTour && selectedTour.tripDate
    const selectedTripDate = moment(myTripDate);
    const monthDifference = selectedTripDate.diff(today, 'months')
    // console.log(monthlyPay)
    
    // console.tron.log(selectedTour)
    
    return (
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
          selectedTour && (
            <View>
              <Image
                source={{ uri: `${selectedTour.locationPictureOne}` }}
                style={BACKGROUND_IMAGE}
                resizeMethod={'auto'}
                resizeMode='cover'
              />

              <TouchableOpacity
                onPress={() => navigation.goBack()}
              >
                <Image
                  source={images.backIcon}
                  style={BACK_IMAGE}
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
                    onPress={() => navigation.navigate('payment')}
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
          pinchGestureEnabled
          contentContainerStyle={{
            justifyContent: "space-between"
          }}
          style={{
            marginTop: '5%',
            marginBottom: '5%',
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
  
            <Formik
              initialValues={{
                months: 1,
                slots: 1,
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
  
                  <Text
                    numberOfLines={100}
                    style={TRIP_DETAILS}
                  >
                    Amount:
                    {
                      values.slots > 0 && values.months > 0 && (
                        <Text
                          numberOfLines={100}
                          style={TRIP_DETAILS}
                        >
                          { } ₦ {selectedTour && Math.abs(selectedTour.userPays / (monthDifference - 1) * values.slots).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Text>
                      )
                    }
                  </Text>
        
                  <View
                    style={FIELD}
                  >
  
                    <TextField
                      name="slots"
                      keyboardType="number-pad"
                      placeholderTx="payment.slots"
                      value={formatSLots(values.slots.toString())}
                      onChangeText={handleChange("slots")}
                      onBlur={handleBlur("slots")}
                      autoCapitalize="none"
                      returnKeyType="next"
                      isInvalid={!isValid}
                      fieldError={errors.slots}
                      onSubmitEditing={() => handleSubmit()}
                      forwardedRef={i => {
                        this.slotsInput = i
                      }}
                    />
                    
                    <TextField
                      name="months"
                      keyboardType="number-pad"
                      placeholderTx="save.month"
                      value={values.months.toString()}
                      onChangeText={handleChange("months")}
                      onBlur={handleBlur("months")}
                      autoCapitalize="none"
                      returnKeyType="next"
                      isInvalid={!isValid}
                      fieldError={errors.months}
                      onSubmitEditing={() => handleSubmit()}
                      forwardedRef={i => {
                        this.monthsInput = i
                      }}
                    />
                    
                    <Text
                      numberOfLines={100}
                      style={{
                        marginBottom: 10
                      }}
                    >
                      Amount to charge:
                      
                      {
                        values.slots > 0 && values.months > 0 && (
                          <Text
                            numberOfLines={100}
                            style={{
                              marginBottom: 10,
                              fontWeight: "bold"
                            }}
                          >
                            { } ₦ {selectedTour && 0.015 * Math.abs(selectedTour.userPays / (monthDifference - 1) * values.slots) / values.months + Math.abs(selectedTour.userPays / (monthDifference - 1) * values.slots) / values.months + 100}
                            {/*{ } ₦ {selectedTour && (0.015 * Math.round(Math.abs(selectedTour.userPays / (monthDifference - 1) * values.slots) / values.months) + (Math.abs(selectedTour.userPays / (monthDifference - 1) * values.slots) / values.months) + 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}*/}
                          </Text>
                        )
                      }
                    </Text>
          
                    <Button
                      style={SAVE_BUTTON}
                      textStyle={SAVE_BUTTON_TEXT}
                      disabled={!isValid || isLoading}
                      onPress={() => handleSubmit()}
                      tx={`save.save`}
                    />
        
                  </View>
                </View>
              )}
            </Formik>
            
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
