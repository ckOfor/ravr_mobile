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
  ActivityIndicator, NativeMethodsMixinStatic, Keyboard
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
  amount: Yup
    .number()
    .min(1000, 'createPlan.amountError'),
  times: Yup
    .number()
    .min(1, 'createPlan.minTimesError')
    .max(12, 'createPlan.maxTimesError')
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
  amount: number
  times: number
}

interface CreatePlanProps extends NavigationScreenProps {}

type Props = DispatchProps & StateProps & CreatePlanProps

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

const REDEEM_BUTTON: ViewStyle = {
  borderRadius: 100,
  width: Layout.window.width / 1.4,
  marginTop: 10,
  backgroundColor: colors.purple,
  marginBottom: Platform.OS === "ios" ? Layout.window.height / 7 : Layout.window.height / 15,
}

const REDEEM_BUTTON_TEXT: TextStyle = {
  fontSize: 12,
  fontFamily: fonts.gibsonRegular,
  color: colors.palette.white,
  textTransform: 'uppercase'
}

class CreatePlan extends React.Component<NavigationScreenProps & Props> {
  
  amountInput: NativeMethodsMixinStatic | any
  timesInput: NativeMethodsMixinStatic | any
  
  submit  = ({ amount, times}) => {
    const { savePlanAsync, User } = this.props

    let newObject;
    let newAmount = amount < 2500 ? (0.015 * amount) + parseInt(amount) : ((0.015 * amount) + parseInt(amount)) + 100

    newObject = {
      amount: newAmount,
      months: times,
      planName: `Ravr Savings for ${User.fullName}`,
      type: 'personal'
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
  
  
          <Formik
            initialValues={{
              amount: '',
              times: '',
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
                    alignItems: 'center',
                    marginTop: 20
                  }}
                >
  
                  <Text
                    numberOfLines={100}
                    style={{
                      marginBottom: 10
                    }}
                  >
                    Amount to charge:
    
                    {
                      values.times > 0 && values.amount > 999 && (
                        <Text
                          numberOfLines={100}
                          style={{
                            marginBottom: 10,
                            fontWeight: "bold"
                          }}
                        >
                          {" "} ₦ {values.amount < 2500 ? (0.015 * values.amount) + parseInt(values.amount) : ((0.015 * values.amount) + parseInt(values.amount)) + 100}
                        </Text>
                      )
                    }
                  </Text>
                  
                  
                  <TextField
                    name="amount"
                    keyboardType="number-pad"
                    placeholderTx="createPlan.amountPlaceholder"
                    value={values.amount.toString()}
                    onChangeText={handleChange("amount")}
                    onBlur={handleBlur("amount")}
                    autoCapitalize="none"
                    returnKeyType="search"
                    isInvalid={!isValid}
                    fieldError={errors.amount}
                    forwardedRef={i => {
                      this.amountInput = i
                    }}
                    onSubmitEditing={() => this.timesInput.focus()}
                  />
                  
                  
                  <TextField
                    name="times"
                    keyboardType="number-pad"
                    placeholderTx="createPlan.timesPlaceholder"
                    value={values.times.toString()}
                    onChangeText={handleChange("times")}
                    onBlur={handleBlur("times")}
                    autoCapitalize="none"
                    returnKeyType="search"
                    isInvalid={!isValid}
                    fieldError={errors.times}
                    forwardedRef={i => {
                      this.timesInput = i
                    }}
                    onSubmitEditing={() => Keyboard.dismiss()}
                  />
          
                  <Button
                    style={REDEEM_BUTTON}
                    textStyle={REDEEM_BUTTON_TEXT}
                    disabled={!isValid || isLoading}
                    onPress={() => handleSubmit()}
                  >
                    {
                      isLoading
                        ? <ActivityIndicator size="small" color={colors.palette.white} />
                        : <Text style={REDEEM_BUTTON_TEXT}>{translate(`createPlan.start`)}</Text>
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
  savePlanAsync: (data) => dispatch(savePlanAsync(data)),
})

let mapStateToProps: (state: ApplicationState) => StateProps;
mapStateToProps = (state: ApplicationState): StateProps => ({
  User: state.user.data,
  isLoading: state.user.loading,
  selectedTour: state.tour.selectedTour,
});

export const CreatePlanScreen = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(CreatePlan)
