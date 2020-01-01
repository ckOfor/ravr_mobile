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
  Image,
  TouchableOpacity,
  ImageStyle,
  NativeMethodsMixinStatic,
  KeyboardAvoidingView
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
import { IUser, createTransactionAsync } from "../../redux/user";

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
  createTransactionAsync: (reference: string, slots: number) => void
}
interface StateProps {
  isLoading: boolean
  User: IUser,
  SelectedTour: ITours
}

interface MyFormValues {
  slots: number
}

interface PaymentScreenProps extends NavigationScreenProps {}

type Props = DispatchProps & StateProps & PaymentScreenProps

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


class Payment extends React.Component<NavigationScreenProps & Props> {
  
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
    amountInKobo: this.props.SelectedTour.payStackCharges * 100
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
  
  calculatePricePerSlots = (slots) => {
    const { userPays } = this.props.SelectedTour
    let newUserPay = userPays * slots
    console.tron.log(newUserPay, "newUserPay")
  
    let payStackPercentage = 0.015
    let payStackCharges = newUserPay < 2500 ? (payStackPercentage * newUserPay) + newUserPay : (payStackPercentage * newUserPay) + newUserPay + 100
    
    this.setState({
      amountInKobo: payStackCharges * 100
    }, () => this.chargeCard())
  }
  
  chargeCard = () => {
    const { cardNumber, expiryMonth, expiryYear, cvc, amountInKobo, slots } = this.state
    const { User, notify, createTransactionAsync } = this.props
    const { email } = User

    RNPaystack.chargeCard({
      cardNumber,
      expiryMonth,
      expiryYear,
      cvc,
      email,
      amountInKobo,
    })
    .then(response => {
      console.tron.log(response);
      createTransactionAsync(response.reference, slots)
    })
    .catch(error => {
      console.tron.log(error);
      console.tron.log(error.message);
      console.tron.log(error.code);
      notify(error.message, 'danger')
    })
  }
  
  submit  = (values) => {
    this.setState({
      slots: values.slots
    })
    const {
      numberState, expiryState, cvcState, isCardValid, slots
    } = this.state
    const {
      payStackCharges
    } = this.props.SelectedTour
    if(isCardValid) {
      
      if(parseInt(values.slots) === 1) {
        this.setState({
          amountInKobo: payStackCharges * 100
        }, () => this.chargeCard())
      } else {
        this.calculatePricePerSlots(values.slots)
      }
    } else {
      this.props.notify(`Card Number is ${numberState}, Expiry Date is ${expiryState} and CVC is ${cvcState}`, 'danger')
    }
  }
  
  public render(): React.ReactNode {
    const {
      navigation, isLoading
    } = this.props
    return (
      <KeyboardAvoidingView
        enabled={true}
        behavior={"padding"}
        style={{ flex: 1 }}
      >
        <View
          style={ROOT}
        >
          <StatusBar barStyle={"dark-content"} />
          
          <ScrollView>
    
            <TouchableOpacity
              onPress={() => navigation.goBack()}
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
                        style={RECHARGE_BUTTON}
                        textStyle={RECHARGE_BUTTON_TEXT}
                        disabled={!isValid || isLoading}
                        onPress={() => handleSubmit()}
                        tx={`payment.pay`}
                      />
                      
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  notify: (message: string, type: string) => dispatch(notify(message, type)),
  createTransactionAsync: (reference: string, slots: number) => dispatch(createTransactionAsync(reference, slots))
})

let mapStateToProps: (state: ApplicationState) => StateProps;
mapStateToProps = (state: ApplicationState): StateProps => ({
  isLoading: state.user.loading,
  User: state.user.data,
  SelectedTour: state.tour.selectedTour,
});

export const PaymentScreen = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(Payment)
