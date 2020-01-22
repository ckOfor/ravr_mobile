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
  Platform,
  ActivityIndicator, NativeMethodsMixinStatic
} from "react-native"

// third-parties
import { NavigationScreenProps } from "react-navigation"
import { connect } from "react-redux"
import * as Yup from "yup";
import { Dispatch } from "redux";
import { Formik, FormikProps } from "formik";

// redux
import { ApplicationState } from "../../redux";
import { savePlanAsync, IUser} from "../../redux/user";

// styles
import { Layout } from "../../constants";
import { translate } from "../../i18n";
import { colors, fonts } from "../../theme";
import { TextField } from "../../components/text-field";
import { Button } from "../../components/button";

// utils
import { formatSLots } from "../../utils/formatters";
import {ITours} from "../../services/api";
import {notify} from "../../redux/auth";

const schema = Yup.object().shape({
  slots: Yup.string()
    .max(1, "payment.slotError")
    .required("payment.slotShot")
})

interface DispatchProps {
  savePlanAsync: (data) => void
}

interface StateProps {
  User: IUser
  isLoading: boolean
  selectedTour: ITours
}

interface MyFormValues {
  slots: number
}

interface UseCoinsScreenProps extends NavigationScreenProps {}

type Props = DispatchProps & StateProps & UseCoinsScreenProps

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
  marginLeft: 40,
  color: colors.black,
  fontFamily: fonts.latoRegular,
  lineHeight: 40,
  textAlign: 'left',
  width: Layout.window.width / 1.9,
}

const savingsMoreTextStyle: TextStyle = {
  color: colors.blue1,
  fontFamily: fonts.latoRegular,
  lineHeight: 40,
  textAlign: 'left',
  width: Layout.window.width / 1.5,
}

const FIELD: ViewStyle = {
  alignItems: 'center',
  marginTop: 30
}


const USE_COINS_BUTTON: ViewStyle = {
  alignSelf: "center",
  justifyContent: "center",
  borderRadius: 100,
  width: Layout.window.width / 1.4,
  marginTop: 20,
  backgroundColor: colors.purple
}

const USE_COINS_BUTTON_TEXT: TextStyle = {
  fontSize: 12,
  fontFamily: fonts.gibsonRegular,
  color: colors.white,
  textTransform: 'uppercase'
}

class SaveWithCoins extends React.Component<NavigationScreenProps & Props> {
  
  submit  = (values) => {
    const { savePlanAsync, selectedTour, User, navigation } = this.props
    const months = navigation.getParam('months')
    const amount = navigation.getParam('amount')
    
    let newObject;
    
    newObject = {
      amount,
      months,
      planName: `Savings for ${selectedTour.tripName}`,
      page: 'viewTour'
    }
    
    savePlanAsync(newObject)
  }
  
  public render(): React.ReactNode {
    const {
      navigation, User, isLoading, selectedTour
    } = this.props
  
    const slots = navigation.getParam('slots')
    const months = navigation.getParam('months')
    const amount = navigation.getParam('amount')
    
    
    const {
      Tourists
    } = User
    
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
              {translate(`saveWithCoins.viewTour`)}
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
                
                style={[discoverTextStyle, { fontSize: 22, marginBottom: 10 }]}
              >
                {translate(`saveWithCoins.receipt`)}
              </Text>
              
            </TouchableOpacity>
          </View>
          
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
                {translate(`saveWithCoins.originalPrice`)}
              </Text>
              
              
              <Text
                
                style={savingsMoreTextStyle}
              >
                ₦ {selectedTour.tripPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Text>
            </TouchableOpacity>
          </View>
          
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
                {translate(`useCoins.discount`)}
              </Text>
              
              
              <Text
                
                style={savingsMoreTextStyle}
              >
                {selectedTour.userDiscount * 100} % off
              </Text>
            </TouchableOpacity>
          </View>
  
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
                {translate(`useCoins.price`)}
              </Text>
      
      
              <Text
        
                style={savingsMoreTextStyle}
              >
                ₦ {selectedTour.userPays.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Text>
            </TouchableOpacity>
          </View>
  
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
                {translate(`saveWithCoins.slot`)}
              </Text>
      
      
              <Text
        
                style={savingsMoreTextStyle}
              >
                {slots}
              </Text>
            </TouchableOpacity>
          </View>
  
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
                {translate(`saveWithCoins.plan`)}
              </Text>
      
      
              <Text
        
                style={savingsMoreTextStyle}
              >
                {translate(`saveWithCoins.monthly`)}
              </Text>
            </TouchableOpacity>
          </View>
  
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
        
                style={[discoverTextStyle, { fontWeight: "900" }]}
              >
                {translate(`saveWithCoins.numberOfMonths`)}
              </Text>
      
      
              <Text
        
                style={[savingsMoreTextStyle, { fontWeight: '900' }]}
              >
               {months}
              </Text>
            </TouchableOpacity>
          </View>
          
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
        
                style={[discoverTextStyle, { fontWeight: "900" }]}
              >
                {translate(`saveWithCoins.monthlyFee`)}
              </Text>
      
      
              <Text
        
                style={[savingsMoreTextStyle, { fontWeight: '900' }]}
              >
                ₦ {amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Text>
            </TouchableOpacity>
          </View>
  
          <Button
            style={USE_COINS_BUTTON}
            textStyle={USE_COINS_BUTTON_TEXT}
            disabled={isLoading}
            onPress={this.submit}
          >
            {
              isLoading
                ? <ActivityIndicator size="small" color={colors.white} />
                : <Text style={USE_COINS_BUTTON_TEXT}>{translate(`saveWithCoins.confirm`)}</Text>
            }
          </Button>
        
        </ScrollView>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  savePlanAsync: (data) => dispatch(savePlanAsync(data)),
})

let mapStateToProps: (state: ApplicationState) => StateProps;
mapStateToProps = (state: ApplicationState): StateProps => ({
  User: state.user.data,
  isLoading: state.user.loading,
  selectedTour: state.tour.selectedTour,
});

export const SaveWithCoinsScreen = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(SaveWithCoins)
