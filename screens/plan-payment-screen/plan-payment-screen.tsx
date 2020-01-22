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
  NativeMethodsMixinStatic,
  KeyboardAvoidingView, Platform, ActivityIndicator
} from "react-native"

// third-parties
import { NavigationScreenProps } from "react-navigation"
import { connect } from "react-redux"
import { Dispatch } from "redux";
import { translate } from "../../i18n";
import { CreditCardInput } from "react-native-credit-card-input";
import RNPaystack from 'react-native-paystack';
import { PAYSTACK_PUBLIC_KEY } from "react-native-dotenv"
import * as Yup from "yup";

// redux
import { ApplicationState } from "../../redux";
import { notify } from "../../redux/auth"
import { IUser, createPlanAsync } from "../../redux/user";

// styles
import { Layout } from "../../constants";
import { colors, fonts } from "../../theme";
import { Button } from "../../components/button";

// API
import { ITours } from "../../services/api";
import { Formik, FormikProps } from "formik";
import { TextField } from "../../components/text-field";
import { phoneRegExp } from "../../utils/regexes";
import { formatSLots } from "../../utils/formatters";

interface DispatchProps {
  notify: (message: string, type: string) => void
  createPlanAsync: (reference) => void
}
interface StateProps {
  isLoading: boolean
  User: IUser,
  SelectedTour: ITours
}

interface MyFormValues {
  slots: number
}

interface PlanPaymentScreenProps extends NavigationScreenProps {}

type Props = DispatchProps & StateProps & PlanPaymentScreenProps

const ROOT: ViewStyle = {
  height: Layout.window.height,
}

const schema = Yup.object().shape({
  slots: Yup.string()
    .max(1, "payment.slotError")
    .required("payment.slotShot")
})


const appNameTextStyle: TextStyle = {
  marginLeft: 20,
  marginTop: Layout.window.height / 15,
  color: colors.purple,
  fontFamily: fonts.latoRegular,
  lineHeight: 40,
  textAlign: 'left',
  width: Layout.window.width / 1.5,
}

const PAYMENT_VIEW: ViewStyle = {
  marginLeft: 20,
  marginTop: 40,
  width: Layout.window.width / 1.15,
}

const RECHARGE_BUTTON: ViewStyle = {
  alignSelf: "center",
  justifyContent: "center",
  borderRadius: 100,
  width: Layout.window.width / 1.4,
  marginTop: 20,
  backgroundColor: colors.purple
}

const RECHARGE_BUTTON_TEXT: TextStyle = {
  fontSize: 12,
  fontFamily: fonts.gibsonRegular,
  color: colors.white,
  textTransform: 'uppercase'
}

const FIELD: ViewStyle = {
  alignItems: 'center',
  marginTop: 30
}


class PlanPayment extends React.Component<NavigationScreenProps & Props> {
  
  state = {
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: '',
    email: '',
    subAccountCode: '',
    
    numberState: '',
    expiryState: '',
    cvcState: '',
    
    isCardValid: false,
    slots: 2,
    amountInKobo: 100
  }
  
  slotsInput: NativeMethodsMixinStatic | any
  
  componentDidMount(): void {
    RNPaystack.init({ publicKey: PAYSTACK_PUBLIC_KEY });
  }
  
  _onChange = form => {
    this.setState({
      numberState: form.status.number,
      expiryState: form.status.expiry,
      cvcState: form.status.cvc,
      isCardValid: form.valid,
    })
    
    if(form.valid) {
      this.setState({
        cardNumber: form.values.number,
        expiryMonth: form.values.expiry.substring(0, 2),
        expiryYear: form.values.expiry.substring(3, 5),
        cvc: form.values.cvc,
        isCardValid: form.valid,
      })
    }
  };
  
  chargeCard = () => {
    const { cardNumber, expiryMonth, expiryYear, cvc, amountInKobo, slots } = this.state
    const { User, notify, createPlanAsync } = this.props
    const { email } = User
    
    RNPaystack.chargeCard({
      cardNumber,
      expiryMonth,
      expiryYear,
      cvc,
      email,
      amountInKobo: 5000,
    })
      .then(response => {
        console.tron.log(response);
        createPlanAsync(response.reference)
      })
      .catch(error => {
        console.tron.log(error);
        console.tron.log(error.message);
        console.tron.log(error.code);
        notify(error.message, 'danger')
      })
  }
  
  submit  = () => {
    const {
      isCardValid, numberState, expiryState, cvcState
    } = this.state
    if(isCardValid) {
      this.chargeCard()
    } else {
      this.props.notify(`Card Number is ${numberState}, Expiry Date is ${expiryState} and CVC is ${cvcState}`, 'danger')
    }
  }
  
  public render(): React.ReactNode {
    const {
      navigation, isLoading
    } = this.props
  
    const page = navigation.getParam('page')
    
    return (
      <KeyboardAvoidingView
        enabled={true}
        behavior={Platform.OS === "ios" ? "padding" : "position"}
        style={{ flex: 1 }}
      >
        <View
          style={ROOT}
        >
          <StatusBar barStyle={"dark-content"} />
          
          <ScrollView>
            
            <TouchableOpacity
              onPress={() => navigation.navigate(`${page}`)}
            >
              <Text
                
                style={appNameTextStyle}
              >
                {translate(`payment.back`)}
              </Text>
            </TouchableOpacity>
            
            <View
              style={PAYMENT_VIEW}
            >
              <CreditCardInput
                onChange={this._onChange}
              />
  
              <Button
                style={RECHARGE_BUTTON}
                textStyle={RECHARGE_BUTTON_TEXT}
                disabled={isLoading}
                onPress={this.submit}
              >
                {
                  isLoading
                    ? <ActivityIndicator size="small" color={colors.white} />
                    : <Text style={RECHARGE_BUTTON_TEXT}>{translate(`planPayment.start`)}</Text>
                }
              </Button>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  notify: (message: string, type: string) => dispatch(notify(message, type)),
  createPlanAsync: (reference: string) => dispatch(createPlanAsync(reference))
})

let mapStateToProps: (state: ApplicationState) => StateProps;
mapStateToProps = (state: ApplicationState): StateProps => ({
  isLoading: state.user.loading,
  User: state.user.data,
  SelectedTour: state.tour.selectedTour,
});

export const PlanPaymentScreen = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(PlanPayment)
