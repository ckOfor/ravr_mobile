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
import {createRequestAsync, IUser} from "../../redux/user";
import { updateUserAsync } from "../../redux/user";

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
  updateUserAsync: () => void
  notify: (message: string, type: string) => void
  createRequestAsync: (slots: number) => void
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

class UseCoins extends React.Component<NavigationScreenProps & Props> {
  
  slotsInput: NativeMethodsMixinStatic | any
  
  submit  = (values) => {
    const { notify, createRequestAsync } = this.props
    if (values.slots < 1) {
      notify(`Invalid slot`, 'danger')
    } else {
      createRequestAsync(values.slots)
    }
  }
  
  public render(): React.ReactNode {
    const {
      navigation, User, isLoading, selectedTour
    } = this.props
    
    
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
              {translate(`payment.payment`)}
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
                {translate(`useCoins.header`)}
              </Text>
              
              
              <Text
                
                style={savingsMoreTextStyle}
              >
                Avail: {Tourists[0] !== undefined ? Tourists[0].userCoins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0 } coins
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
                {selectedTour.tripPrice}
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
                Get {selectedTour.userDiscount * 100} % off
              </Text>
            </TouchableOpacity>
          </View>
  
  
          <Formik
            initialValues={{
              slots: 1
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
                      {translate(`useCoins.total`)}
                    </Text>
      
      
                    <Text
        
                      style={savingsMoreTextStyle}
                    >
                      {isNaN(selectedTour.userPays * parseInt(values.slots)) ? selectedTour.userPays : selectedTour.userPays * parseInt(values.slots)}
                    </Text>
                  </TouchableOpacity>
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
          
                  <Button
                    style={USE_COINS_BUTTON}
                    textStyle={USE_COINS_BUTTON_TEXT}
                    disabled={!isValid || isLoading}
                    onPress={() => handleSubmit()}
                  >
                    {
                      isLoading
                        ? <ActivityIndicator size="small" color={colors.white} />
                        : <Text style={USE_COINS_BUTTON_TEXT}>{translate(`useCoins.useCoins`)}</Text>
                    }
                  </Button>
        
                </View>
              </View>
            )}
          </Formik>
        
        </ScrollView>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  updateUserAsync: () => dispatch(updateUserAsync()),
  notify: (message: string, type: string) => dispatch(notify(message, type)),
  createRequestAsync: (slots: number) => dispatch(createRequestAsync(slots))
})

let mapStateToProps: (state: ApplicationState) => StateProps;
mapStateToProps = (state: ApplicationState): StateProps => ({
  User: state.user.data,
  isLoading: state.user.loading,
  selectedTour: state.tour.selectedTour,
});

export const UseCoinsScreen = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(UseCoins)
