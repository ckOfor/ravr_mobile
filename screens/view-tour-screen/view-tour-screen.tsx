// react
import React from "react"

// react-native
import {
  Image, ImageStyle, Linking, NativeMethodsMixinStatic, ScrollView, Text, TextStyle, TouchableOpacity, View, ViewStyle,
} from "react-native"

// third-party libraries
import {NavigationActions, NavigationScreenProps} from "react-navigation"
import moment from 'moment'
import { Tab, Tabs } from 'native-base';
import { translate } from "../../i18n";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { setLocale } from 'yup';

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
import {IUser} from "../../redux/user";

interface DispatchProps {

}

interface StateProps {
  isLoading: boolean
  selectedTour: ITours
  User: IUser
}


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

const COINS_BUTTON: ViewStyle = {
  borderRadius: 100,
  width: Layout.window.width / 4,
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
  marginBottom: 10,
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
  width: Layout.window.width / 2.4,
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

const moreTextStyle: TextStyle = {
  color: colors.white,
  fontFamily: fonts.latoRegular,
  textAlign: 'center',
  width: Layout.window.width / 3,
  textTransform: 'uppercase'
}

class ViewTour extends React.Component<NavigationScreenProps & Props> {
  
  state={
    initialPage: 0,
    activeTab: 0
  }
  
  scrollView: NativeMethodsMixinStatic | any
  monthsInput: NativeMethodsMixinStatic | any
  slotsInput: NativeMethodsMixinStatic | any
  
  submit = ({ slots, months }) => {
    const {
      selectedTour, navigation
    } = this.props
  
    const userWillPay = selectedTour.userPays
  
    const amount =   selectedTour && ((parseInt(userWillPay) * slots) / months) < 2500 ? (0.015 * ((parseInt(userWillPay) * slots) / months)) + ((parseInt(userWillPay) * slots) / months) : (0.015 * ((parseInt(userWillPay) * slots) / months)) + ((parseInt(userWillPay) * slots) / months) + 100
  
    console.tron.log(amount, slots, months)
  
    navigation.navigate('saveWithCoins', {
      slots,
      months,
      amount
    })
  }
  
  public render(): React.ReactNode {
    const {
      navigation, selectedTour, isLoading, User
    } = this.props
    
    const { initialPage, activeTab } = this.state
    
    console.tron.log(selectedTour, "selectedTour")
  
    const coinsNeeded = selectedTour && selectedTour.userPays
    const userWillPay = coinsNeeded
    const today= moment()
    const myTripDate = selectedTour && selectedTour.tripDate
    const selectedTripDate = moment(myTripDate);
    const monthDifference = selectedTripDate.diff(today, 'months')
    const maxMonth = monthDifference - 1
  
    console.tron.log(maxMonth, "maxMonth")
  
  
    console.tron.log(coinsNeeded, "coinsNeeded")
  
    const schema = Yup.object().shape({
      months: Yup
        .number()
        .test('Max', 'viewTour.monthSavings', value => value <= maxMonth),
      slots: Yup
        .number()
        .test('Max', 'payment.slotShot', value => value >= 1)
        .required("payment.slotShot")
    })
  
    const {
      Tourists
    } = User
    
    return (
      <ScrollView
        ref={i => {
          this.scrollView = i
        }}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        pinchGestureEnabled
        contentContainerStyle={{
          justifyContent: "space-between",
          paddingBottom: 20
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
  
                  <View
                    style={{
                      marginTop: 10,
                      width: Layout.window.width / 1.5,
                      flexDirection: 'column',
                      justifyContent: "space-evenly",
                    }}
                  >
  
                    <View
                      style={{
                        width: '60%',
                        flexDirection: 'row',
                        alignSelf: 'center',
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          color: colors.blue1,
                          fontFamily: fonts.latoRegular,
                          textAlign: 'center',
                        }}
                      >
                        Price:
                      </Text>
                      
                      
                      <Text
                        style={{
                          color: colors.blue1,
                          fontFamily: fonts.latoRegular,
                          textAlign: 'center',
                          textDecorationStyle: 'solid'
                        }}
                      >
                        ₦ {selectedTour.tripPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </Text>
                    </View>
  
                    <View
                      style={{
                        width: '60%',
                        flexDirection: 'row',
                        alignSelf: 'center',
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          color: colors.blue1,
                          fontFamily: fonts.latoRegular,
                          textAlign: 'center',
                        }}
                      >
                        Cash Back:
                      </Text>
                      
                      <Text
      
                        style={{
                          color: colors.blue1,
                          fontFamily: fonts.latoRegular,
                          textAlign: 'center',
                        }}
                      >
                        ₦ {selectedTour.userCoins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </Text>
                    </View>
                  </View>
  
                  <View
                    style={{
                      justifyContent: "space-evenly",
                      flexDirection: "row",
                      width: Layout.window.width / 1.5
                    }}
                  >
                    <Button
                      style={Tourists[0] !== undefined && Tourists[0].userCoins > coinsNeeded ? COINS_BUTTON : JOIN_BUTTON}
                      textStyle={JOIN_BUTTON_TEXT}
                      disabled={isLoading}
                      onPress={() => navigation.navigate('payment')}
                      tx={`viewTour.join`}
                    />
  
                    {
                      Tourists[0] !== undefined && Tourists[0].userCoins > coinsNeeded && (
                        <Button
                          style={COINS_BUTTON}
                          textStyle={JOIN_BUTTON_TEXT}
                          disabled={isLoading}
                          onPress={() => navigation.navigate('useCoins')}
                          tx={`viewTour.useCoins`}
                        />
                      )
                    }
                    
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
                      this.setState({ initialPage: 2, activeTab: 2 })
                      this.scrollView.scrollToEnd({ animated: true });
                    }}
                    style={{
                      flexDirection: "row",
                      justifyContent: 'space-between',
                    }}
                  >
                    {
                      maxMonth > 0 && (
                        <Text
    
                          style={discoverTextStyle}
                        >
                          {translate(`viewTour.save`)}
                        </Text>
                      )
                    }
                  </TouchableOpacity>
                </View>
  
                <Text
    
                  style={discoverMoreTextStyle}
                >
                  {maxMonth > 0 && translate(`viewTour.saveMore`)}
                </Text>
                
              </View>
            </View>
          )
        }
  
        {
          maxMonth > 0 && (
            <View
              style={{
                width: Layout.window.width / 5,
                alignItems: "flex-start",
                justifyContent: "flex-start",
                margin: 30,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setState({ initialPage: 2, activeTab: 2 })
                  this.scrollView.scrollToEnd({ animated: true });
                }}
                style={{
                  borderColor: colors.purple,
                  borderWidth: 1,
                  height: Layout.window.height / 20,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8,
                  backgroundColor: colors.purple
                }}
              >
                <Text
                  style={moreTextStyle}
                >
                  {translate(`viewTour.yes`)}
                </Text>
              </TouchableOpacity>
            </View>
          )
        }
  
        <ScrollView
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
            marginRight: '5%',
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "column",
              marginLeft: 20,
            }}
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
            marginTop: 30,
            marginBottom: 20,
            width: Layout.window.width / 1.2,
            alignSelf: 'center',
          }}
          tabBarUnderlineStyle={{
            backgroundColor: colors.purple,
          }}
          initialPage={initialPage}
          page={activeTab}
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
          
          {
            maxMonth > 0 && (
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
                    months: '',
                    slots: '',
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
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }}
                      >
            
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
            
                        <Text
                          numberOfLines={100}
                          style={TRIP_DETAILS}
                        >
                          Max Months: {` ${maxMonth}`}
                        </Text>
                      </View>
          
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
                          Monthly charge:
              
                          {
                            values.slots > 0 && values.months > 0 && (
                              <Text
                                numberOfLines={100}
                                style={{
                                  marginBottom: 10,
                                  fontWeight: "bold"
                                }}
                              >
                                {" "} ₦ {selectedTour && ((parseInt(userWillPay) * values.slots) / values.months) < 2500 ? (0.015 * ((parseInt(userWillPay) * values.slots) / values.months)) + ((parseInt(userWillPay) * values.slots) / values.months) : (0.015 * ((parseInt(userWillPay) * values.slots) / values.months)) + ((parseInt(userWillPay) * values.slots) / values.months) + 100}
                              </Text>
                            )
                          }
                        </Text>
            
                        <Button
                          style={SAVE_BUTTON}
                          textStyle={SAVE_BUTTON_TEXT}
                          disabled={!isValid || isLoading || values.months > maxMonth}
                          onPress={() => handleSubmit()}
                          tx={`viewTour.confirm`}
                        />
          
                      </View>
                    </View>
                  )}
                </Formik>
  
              </Tab>
            )
          }
          
          
        </Tabs>
      
      </ScrollView>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({

})

let mapStateToProps: (state: ApplicationState, dispatch: Dispatch<any>) => StateProps;
mapStateToProps = (state: ApplicationState, dispatch): StateProps => ({
  isLoading: state.tour.loading,
  selectedTour: state.tour.selectedTour,
  User: state.user.data,
});

export const ViewTourScreen = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(ViewTour)
