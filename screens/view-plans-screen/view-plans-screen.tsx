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
  FlatList, Platform, ActivityIndicator
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
import {disablePlanAsync, enablePlanAsync, IUser} from "../../redux/user";
import { updateUserAsync } from "../../redux/user";

// style
import { Layout } from "../../constants";
import { translate } from "../../i18n";
import {colors, fonts, images} from "../../theme";
import {Button} from "../../components/button";

interface DispatchProps {
  updateUserAsync: () => void
  disablePlanAsync: (code: string, token: string) => void
  enablePlanAsync: (code: string, token: string) => void
}

interface StateProps {
  User: IUser
  isLoading: boolean
  subscriptions: any
}

interface ViewPlansScreenProps extends NavigationScreenProps {}

type Props = DispatchProps & StateProps & ViewPlansScreenProps

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


const SUBSCRIPTION: ViewStyle = {
  backgroundColor: colors.white,
  height: Layout.window.height / 3.1,
  width: Layout.window.width / 1.15,
  marginLeft: 20,
  marginTop: 30,
  borderRadius: 8,
  
  shadowOpacity: 0.2,
  shadowRadius: 3,
  shadowOffset: {
    height: 1,
    width: 1
  },
  
  elevation: 2,
  alignItems: "center",
  // justifyContent: "center",
}

const PLAN_TEXT: TextStyle = {
  ...HEADER_TEXT,
  fontSize: 13,
  marginTop: 0,
}

const REDEEM_BUTTON: ViewStyle = {

}

const REDEEM_BUTTON_TEXT: TextStyle = {
  fontSize: 12,
  fontFamily: fonts.gibsonRegular,
  color: colors.palette.white,
  textTransform: 'uppercase'
}

class ViewPlans extends React.Component<NavigationScreenProps & Props> {
  
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
  
  public render(): React.ReactNode {
    const {
      navigation, subscriptions, isLoading, disablePlanAsync, enablePlanAsync
    } = this.props
    
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
          scrollEnabled
          showsVerticalScrollIndicator={false}
          pinchGestureEnabled
          contentContainerStyle={{
            justifyContent: "space-between"
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
                {translate(`viewPlan.headerText`)}
              </Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView
            showsHorizontalScrollIndicator={false}
          >
            {
              subscriptions.length > 0 && (
                <FlatList
                  data={subscriptions}
                  numColumns={1}
                  style={{
                    marginRight: 15,
                  }}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingBottom: 120
                  }}
                  renderItem={(subscriptions) => {
                    const { index } = subscriptions
                    const {
                      planName, planType, planMode, invoiceLimit, status, createdAt, amount,
                      subscriptionCode, emailToken
                    } = subscriptions.item
  
                    const today= moment()
                    const createdDate = moment(createdAt)
                    const monthDifference = createdDate.diff(today, 'months')
                    const monthLeft = invoiceLimit - monthDifference

                    return (
                      <View
                        key={index}
                        style={SUBSCRIPTION}
                      >
                        <Text
                          style={PLAN_TEXT}
                        >
                          {planName}
  
                        </Text>
  
                        <View
                          style={{
                            marginTop: 5,
                            width: Layout.window.width / 1.5,
                            flexDirection: 'row',
                            alignItems: "flex-start",
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
                            Type:
                          </Text>
    
    
                          <Text
                            style={{
                              color: colors.blue1,
                              fontFamily: fonts.latoRegular,
                              textAlign: 'center',
                              textTransform: "capitalize"
                            }}
                          >
                            {planType}
                          </Text>
  
                        </View>
  
                        <View
                          style={{
                            marginTop: 5,
                            width: Layout.window.width / 1.5,
                            flexDirection: 'row',
                            alignItems: "flex-start",
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
                            Amount:
                          </Text>
    
    
                          <Text
                            style={{
                              color: colors.blue1,
                              fontFamily: fonts.latoRegular,
                              textAlign: 'center',
                              textTransform: "capitalize"
                            }}
                          >
                            {amount}
                          </Text>
  
                        </View>
  
                        <View
                          style={{
                            marginTop: 5,
                            width: Layout.window.width / 1.5,
                            flexDirection: 'row',
                            alignItems: "flex-start",
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
                            Mode:
                          </Text>
    
    
                          <Text
                            style={{
                              color: colors.blue1,
                              fontFamily: fonts.latoRegular,
                              textAlign: 'center',
                              textTransform: "capitalize"
                            }}
                          >
                            {planMode}
                          </Text>
  
                        </View>
  
                        <View
                          style={{
                            marginTop: 5,
                            width: Layout.window.width / 1.5,
                            flexDirection: 'row',
                            alignItems: "flex-start",
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
                            Interval:
                          </Text>
    
    
                          <Text
                            style={{
                              color: colors.blue1,
                              fontFamily: fonts.latoRegular,
                              textAlign: 'center',
                              textTransform: "capitalize"
                            }}
                          >
                            {invoiceLimit}
                          </Text>
  
                        </View>
  
                        <View
                          style={{
                            marginTop: 5,
                            width: Layout.window.width / 1.5,
                            flexDirection: 'row',
                            alignItems: "flex-start",
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
                            Status:
                          </Text>
    
    
                          <Text
                            style={{
                              color: colors.blue1,
                              fontFamily: fonts.latoRegular,
                              textAlign: 'center',
                              textTransform: "capitalize"
                            }}
                          >
                            {monthLeft < 1 ? 'inactive' : status}
                          </Text>
  
                        </View>
  
                        <View
                          style={{
                            marginTop: 5,
                            width: Layout.window.width / 1.5,
                            flexDirection: 'row',
                            alignItems: "flex-start",
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
                            Payment Left:
                          </Text>
    
    
                          <Text
                            style={{
                              color: colors.blue1,
                              fontFamily: fonts.latoRegular,
                              textAlign: 'center',
                              textTransform: "capitalize"
                            }}
                          >
                            {monthLeft}
                          </Text>
  
                        </View>
  
                        {
                          monthLeft > 0 && (
                            <Button
                              style={{
                                borderRadius: 100,
                                width: Layout.window.width / 5,
                                marginTop: 20,
                                backgroundColor:  status === "active" ? colors.palette.red : colors.palette.greenDark,
                                marginBottom: Platform.OS === "ios" ? Layout.window.height / 7 : Layout.window.height / 15,
                              }}
                              textStyle={REDEEM_BUTTON_TEXT}
                              // disabled={isLoading}
                              onPress={() => {
                                return status === "active"
                                  ? disablePlanAsync(subscriptionCode, emailToken)
                                  : enablePlanAsync(subscriptionCode, emailToken)
                              }}
                            >
                              {
                                isLoading
                                  ? <ActivityIndicator size="small" color={colors.palette.white} />
                                  : <Text style={REDEEM_BUTTON_TEXT}>
                                    {
                                      status === "active"
                                        ? translate(`viewPlan.disable`)
                                        : translate(`viewPlan.enable`)
                                    }</Text>
                              }
                            </Button>
                          )
                        }
                      </View>
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
  updateUserAsync: () => dispatch(updateUserAsync()),
  disablePlanAsync: (code: string, token: string) => dispatch(disablePlanAsync(code, token)),
  enablePlanAsync: (code: string, token: string) => dispatch(enablePlanAsync(code, token)),
})

let mapStateToProps: (state: ApplicationState) => StateProps;
mapStateToProps = (state: ApplicationState): StateProps => ({
  User: state.user.data,
  isLoading: state.user.loading,
  subscriptions: state.user.data.Subscriptions.reverse(),
});

export const ViewPlansScreen = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(ViewPlans)
