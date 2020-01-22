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

interface subscriptionsScreenProps extends NavigationScreenProps {}

type Props = DispatchProps & StateProps & subscriptionsScreenProps

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

const SUBSCRIPTION: ViewStyle = {
  backgroundColor: colors.white,
  height: Layout.window.height / 5,
  width: Layout.window.width / 1.2,
  marginLeft: 30,
  marginTop: 10,
  marginBottom: 10,
  borderRadius: 8,
  
  shadowOpacity: 0.2,
  shadowRadius: 3,
  shadowOffset: {
    height: 1,
    width: 1
  },
  
  elevation: 4,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
}

const BACKGROUND_IMAGE: ImageStyle = {
  height: '100%',
  width: '100%',
  borderRadius: 8,
}

const PLAN_TEXT: TextStyle = {
  ...HEADER_TEXT,
  // fontSize: 13,
}

const PERSONAL_PLAN: TextStyle = {
  ...SUBSCRIPTION,
  marginTop: 20
}

class Subscriptions extends React.Component<NavigationScreenProps & Props> {
  
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
      navigation, tours, isLoading, User
    } = this.props
    
    const {
     Subscriptions
    } = User
    
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
  
          <TouchableOpacity
            style={SUBSCRIPTION}
            onPress={() => navigation.navigate('createPlan')}
          >
            <View
              style={{
                width: '45%',
                height: '100%',
                backgroundColor: colors.white,
                borderRadius: 8
              }}
            >
  
              <Text
                style={PLAN_TEXT}
              >
                {translate(`subscription.createPlan`)}

              </Text>
  
            </View>
  
            <View
              style={{
                width: '55%',
                height: '100%',
                backgroundColor: colors.purple,
                borderRadius: 8
              }}
            >
              <Image
                source={images.savings}
                style={BACKGROUND_IMAGE}
                resizeMethod={'auto'}
                resizeMode='stretch'
              />
            </View>
          </TouchableOpacity>
  
          {
            Subscriptions.length > 0 && (
              <TouchableOpacity
                style={PERSONAL_PLAN}
                onPress={() => navigation.navigate('viewPlans')}
              >
                <View
                  style={{
                    width: '45%',
                    height: '100%',
                    backgroundColor: colors.white,
                    borderRadius: 8
                  }}
                >
      
                  <Text
                    style={PLAN_TEXT}
                  >
                    {translate(`subscription.viewPlan`)}
      
                  </Text>
    
                </View>
    
                <View
                  style={{
                    width: '55%',
                    height: '100%',
                    backgroundColor: colors.purple,
                    borderRadius: 8
                  }}
                >
                  <Image
                    source={images.bank}
                    style={BACKGROUND_IMAGE}
                    resizeMethod={'auto'}
                    resizeMode='stretch'
                  />
                </View>
              </TouchableOpacity>
            )
          }

          
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

export const SubscriptionsScreen = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(Subscriptions)
