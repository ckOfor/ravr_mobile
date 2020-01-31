// react// react
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
  AppState,
  NativeMethodsMixinStatic,
  KeyboardAvoidingView, Platform, Keyboard, ActivityIndicator, BackHandler, Alert
} from "react-native"

// third-party
import {NavigationScreenProps, NavigationState} from "react-navigation"
import { connect } from "react-redux"
import { Dispatch } from "redux";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";

// redux
import { ApplicationState } from "../../redux";
import {
  getWeekendToursAsync, getDiscoverToursAsync, setSelectedTours, searchTextToursAsync, searchAmountToursAsync
} from "../../redux/tour";

// styles
import { Layout } from "../../constants";
import { translate} from "../../i18n";
import { colors, fonts, images } from "../../theme";

// components
import { WeekendScreen } from "../weekend-screen";
import { DiscoverScreen } from "../discover-screen";
import { Button } from "../../components/button";
import { TextField } from "../../components/text-field";

// APIs
import { ITours } from "../../services/api";

interface DispatchProps {
  getWeekendToursAsync: (limit: number) => void
  getDiscoverToursAsync: (limit: number) => void
  setSelectedTours: (tour: ITours) => void
  searchTextToursAsync: (searchKey: string) => void
  searchAmountToursAsync: (amount: number) => void
}
interface StateProps {
  userPicture: string
  weekendTours: [ITours]
  discoverTours: [ITours]
  authSearchKey: string
  isLoading: boolean
  nav: any
}

interface MyFormValues {
  searchKey: string
}

const schema = Yup.object().shape({
  searchKey: Yup.string()
    .min(3, "common.fieldTooShort")
    .required("common.fieldRequired"),
})

interface WalletProps extends NavigationScreenProps {}

type Props = DispatchProps & StateProps & WalletProps

const ROOT: ViewStyle = {
  height: Layout.window.height,
}

const appNameTextStyle: TextStyle = {
  marginLeft: 20,
  marginTop: Layout.window.height / 15,
  color: colors.purple,
  fontFamily: fonts.latoRegular,
  lineHeight: 40,
  textAlign: 'left',
  width: Layout.window.width / 1.5,
}

const weekendTextStyle: TextStyle = {
  fontSize: 22,
  color: colors.black,
  fontFamily: fonts.latoRegular,
  lineHeight: 40,
  textAlign: 'left',
  width: Layout.window.width,
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


const discoverMoreTextStyle: TextStyle = {
  color: colors.blue1,
  fontFamily: fonts.latoRegular,
  textAlign: 'left',
  width: Layout.window.width / 1.5,
  marginLeft: 40,
}


const PROFILE_IMAGE: ImageStyle = {
  // alignSelf: "flex-start",
  height: 30,
  width: 30,
  borderRadius: 15,
}

const findMyTourTextStyle: TextStyle = {
  ...discoverMoreTextStyle,
  marginTop: 15,
  
}

const QUOTE_BUTTON: ViewStyle = {
  borderRadius: 100,
  width: Layout.window.width / 1.4,
  marginTop: 10,
  backgroundColor: colors.purple,
}

const QUOTE_BUTTON_TEXT: TextStyle = {
  fontSize: 12,
  fontFamily: fonts.gibsonRegular,
  color: colors.palette.white,
  textTransform: 'uppercase'
}

class Home extends React.Component<NavigationScreenProps & Props> {
  
  state={
    scrollTo: 100,
    appState: AppState.currentState,
  }
  
  searchKeyInput: NativeMethodsMixinStatic | any
  
  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  componentDidMount(): void {
    AppState.addEventListener("change", this.handleAppStateChange)
    this.getFeeds()
    
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }
  
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  handleBackButtonClick = () => {
    if (this.props.navigation.isFocused()) {
      // Alert.alert(
      //   "Exit App",
      //   "Do you want to exit?",
      //   [
      //     {
      //       text: "No",
      //       onPress: () => console.log("Cancel Pressed"),
      //       style: "cancel"
      //     },
      //     { text: "Yes", onPress: () => BackHandler.exitApp() }
      //   ],
      //   { cancelable: false }
      // );
      BackHandler.exitApp()
      
      return
    }
    this.props.navigation.goBack(null);
    return true;
  }
  
  
  _keyboardDidShow = () => {
    this.setState({
      keyboardUp: true
    })
  }
  
  _keyboardDidHide = () =>  {
    this.setState({
      keyboardUp: false
    })
  }
  
  getFeeds = () => {
    const { getWeekendToursAsync, getDiscoverToursAsync } = this.props
    getWeekendToursAsync(8)
    getDiscoverToursAsync(4)
  }
  
  
  handleAppStateChange = nextAppState => {
    console.tron.log('CAlleds', this.state.appState)
    if (this.state.appState.match(/background/)) {
      this.getFeeds()
    }
    
    this.setState({ appState: nextAppState })
  }
  
  submit = (value) => {
    console.tron.log(value)
    return /^-{0,1}\d+$/.test(value.searchKey)
      ? this.props.searchAmountToursAsync(value.searchKey)
      : this.props.searchTextToursAsync(value.searchKey)
  }
  
  public render(): React.ReactNode {
    const {
      navigation, userPicture, weekendTours, discoverTours, authSearchKey, isLoading
    } = this.props
    const {
      keyboardUp
    } = this.state
    
    // console.tron.log(userPicture === '')
    return (
      <KeyboardAvoidingView
        enabled={true}
        behavior={"padding"}
        keyboardVerticalOffset={100}
      >
        <View
          style={ROOT}
        >
          {
            Platform.OS === "ios"
              ? <StatusBar barStyle="dark-content" />
              : <StatusBar barStyle={"light-content"} translucent backgroundColor={colors.purple} />
          }
          
          <ScrollView
            showsVerticalScrollIndicator={false}
            
            style={{
              marginBottom: Platform.OS === "ios" ? 0 : Layout.window.height / 15
            }}
          >
            
            <View
              style={{
                flexDirection: 'row',
                justifyContent: "space-between",
                marginTop: Layout.window.height / 15,
                width: Layout.window.height / 2.5,
              }}
            >
              <View
                // onPress={() => navigation.navigate('profile')}
                style={{
                  flexDirection: "row",
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  
                  style={discoverTextStyle}
                >
                  {translate(`home.findTour`)}
                </Text>
              </View>
            
            </View>
            
            <Text
              
              style={findMyTourTextStyle}
            >
              {translate(`home.findTourMore`)}
            </Text>
            
            
            <Formik
              initialValues={{
                searchKey: authSearchKey
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
                    <TextField
                      name="searchKey"
                      keyboardType="default"
                      placeholderTx="home.search"
                      value={values.searchKey}
                      onChangeText={handleChange("searchKey")}
                      onBlur={handleBlur("searchKey")}
                      autoCapitalize="none"
                      returnKeyType="search"
                      isInvalid={!isValid}
                      fieldError={errors.searchKey}
                      forwardedRef={i => {
                        this.searchKeyInput = i
                      }}
                      onSubmitEditing={() => handleSubmit()}
                    />
                    
                    <Button
                      style={QUOTE_BUTTON}
                      textStyle={QUOTE_BUTTON_TEXT}
                      disabled={!isValid || isLoading}
                      onPress={() => handleSubmit()}
                    >
                      {
                        isLoading
                          ? <ActivityIndicator size="small" color={colors.palette.white} />
                          : <Text style={QUOTE_BUTTON_TEXT}>{translate(`home.quote`)}</Text>
                      }
                    </Button>
                  </View>
                </View>
              )}
            </Formik>
            
            {
              weekendTours[0].id !== null && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    marginTop: Layout.window.height / 25
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
                      {translate(`home.weekend`)}
                    </Text>
                  </TouchableOpacity>
                </View>
              )
            }
  
            {
              weekendTours[0].id !== null && (
                <WeekendScreen
                  navigation={navigation}
                  weekendTours={weekendTours}
                  viewTours={() => navigation.navigate('viewTour')}
                  {...this.props}
                />
              )
            }
  
            {
              discoverTours[0].id !== null && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    marginTop: Layout.window.height / 25
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
                      {translate(`home.recommendedTours`)}
                    </Text>
                  </TouchableOpacity>
                </View>
              )
            }
  
            {
              discoverTours[0].id !== null && (
                <Text
    
                  style={discoverMoreTextStyle}
                >
                  {translate(`home.recommendedMore`)}
                </Text>
              )
            }
  
            {
              discoverTours[0].id !== null && (
                <DiscoverScreen
                  discoverTours={discoverTours}
                  viewTours={() => navigation.navigate('viewTour')}
                  {...this.props}
                />
              )
            }
            
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  getWeekendToursAsync: (limit: number) => dispatch(getWeekendToursAsync(limit)),
  getDiscoverToursAsync: (limit: number) => dispatch(getDiscoverToursAsync(limit)),
  setSelectedTours: (tour: ITours) => dispatch(setSelectedTours(tour)),
  searchTextToursAsync: (searchKey: string) => dispatch(searchTextToursAsync(searchKey)),
  searchAmountToursAsync: (amount: number) => dispatch(searchAmountToursAsync(amount)),
})

let mapStateToProps: (state: ApplicationState) => StateProps;
mapStateToProps = (state: ApplicationState): StateProps => ({
  userPicture: state.user.data.pictureURL,
  weekendTours: state.tour.weekendTours,
  discoverTours: state.tour.discoverTours,
  isLoading: state.tour.loading,
  nav: state.nav,
}) as StateProps;

export const HomeScreen = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(Home)
