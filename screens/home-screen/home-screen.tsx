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
  KeyboardAvoidingView
} from "react-native"

// third-party
import { NavigationScreenProps } from "react-navigation"
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
  // marginLeft: 20,
  color: colors.black,
  fontFamily: fonts.latoRegular,
  lineHeight: 40,
  textAlign: 'left',
  width: Layout.window.width / 1.9,
}

const moreTextStyle: TextStyle = {
  color: colors.blue1,
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


const discoverMoreTextStyle: TextStyle = {
  color: colors.blue1,
  fontFamily: fonts.latoRegular,
  textAlign: 'left',
  width: Layout.window.width / 1.5,
  marginLeft: 40,
}


const PROFILE_IMAGE: ImageStyle = {
  alignSelf: "flex-end",
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
  marginBottom: Layout.window.height / 7,
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
  
  componentDidMount(): void {
    AppState.addEventListener("change", this.handleAppStateChange)
    this.getFeeds()
  }
  
  getFeeds = () => {
    const { getWeekendToursAsync, getDiscoverToursAsync } = this.props
    getWeekendToursAsync(8)
    getDiscoverToursAsync(4)
  }
  
  
  handleAppStateChange = nextAppState => {
    console.tron.log('CAlleds')
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
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
      scrollTo
    } = this.state
    
    // console.tron.log(userPicture === '')
    return (
	    <KeyboardAvoidingView
        enabled={true}
        behavior={"position"}
        style={{ flex: 1 }}
      >
        <View
          style={ROOT}
        >
          <StatusBar barStyle={"dark-content"} />
      
          <ScrollView
            showsHorizontalScrollIndicator={false}
          >
            <Text
          
              style={appNameTextStyle}
            >
              {translate(`home.appName`)}
            </Text>
        
            <View
              style={{
                flexDirection: 'row',
                justifyContent: "space-evenly",
                width: Layout.window.width
              }}
            >
              <TouchableOpacity
                disabled={isLoading}
                onPress={() => navigation.navigate('weekendTours')}
                style={{
                  flexDirection: "row",
                  justifyContent: 'space-between',
                  width:  Layout.window.width / 1.7
                }}
              >
                <Text
              
                  style={weekendTextStyle}
                >
                  {translate(`home.weekend`)}
                </Text>
            
                <Text
              
                  style={moreTextStyle}
                >
                  {translate(`home.more`)}
                </Text>
              </TouchableOpacity>
          
              <TouchableOpacity
                onPress={() => navigation.navigate('profile')}
                disabled={isLoading}
              >
                {
                  userPicture === '' && (
                    <Image
                      style={PROFILE_IMAGE}
                      source={images.appLogo}
                      resizeMethod={'auto'}
                      resizeMode='cover'
                    />
                  )
                }
            
                {
                  userPicture !== '' && (
                    <Image
                      style={PROFILE_IMAGE}
                      source={{ uri: `${userPicture}` }}
                      resizeMethod={'auto'}
                      resizeMode='cover'
                    />
                  )
                }
          
              </TouchableOpacity>
            </View>
        
            <WeekendScreen
              weekendTours={weekendTours}
              viewTours={() => navigation.navigate('viewTour')}
              {...this.props}
            />
        
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
          
              <TouchableOpacity
                style={{
                  marginTop: 15,
                }}
                disabled={isLoading}
                onPress={() => navigation.navigate('viewTours')}
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
              {translate(`home.recommendedMore`)}
            </Text>
        
            <DiscoverScreen
              discoverTours={discoverTours}
              viewTours={() => navigation.navigate('viewTour')}
              {...this.props}
            />
        
            <View
              style={{
                flexDirection: 'row',
                justifyContent: "space-between",
                marginTop: Layout.window.height / 25
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
          
              <TouchableOpacity
                style={{
                  marginTop: 15,
                }}
                onPress={() => navigation.navigate('search')}
              >
                <Text
              
                  style={discoverMoreTextStyle}
                >
                  {translate(`home.go`)}
                </Text>
          
              </TouchableOpacity>
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
                      tx={`home.quote`}
                    />
                  </View>
                </View>
              )}
            </Formik>
      
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
  userPicture: state.auth.picture,
  weekendTours: state.tour.weekendTours,
  discoverTours: state.tour.discoverTours,
  isLoading: state.tour.loading,
}) as StateProps;

export const HomeScreen = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(Home)
