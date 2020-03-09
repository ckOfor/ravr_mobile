// react
import React from "react"

// react-native
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageStyle,
  NativeMethodsMixinStatic, Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native"

// third-party libraries
import {NavigationEvents, NavigationScreenProps} from "react-navigation"
import * as Yup from "yup";

// redux
import { connect } from "react-redux"
import { Dispatch } from "redux";
import { ApplicationState } from "../../redux";
import { ITours } from "../../services/api";
import { Layout } from "../../constants";
import { colors, fonts, images } from "../../theme";
import { translate} from "../../i18n";
import {
  clearSearchTourAsync,
  getPopularToursAsync, introSearchAmountToursAsync, introSearchTextToursAsync,
  searchAmountToursAsync,
  searchTextToursAsync, setSearchKeyAsync,
  setSelectedTours
} from "../../redux/tour";
import moment from "moment";
import { Formik, FormikProps } from "formik";
import { TextField } from "../../components/text-field";
import { Button } from "../../components/button";
import DateTimePicker from "react-native-modal-datetime-picker";


interface DispatchProps {
  setSelectedTours: (tour: ITours) => void
  getPopularToursAsync: (limit: number) => void
  searchTextToursAsync: (searchKey: string, date?: string) => void
  searchAmountToursAsync: (amount: number, date?: string) => void
  clearSearchTourAsync: () => void
  setSearchKeyAsync: (searchKey: string) => void
}

interface StateProps {
  isLoading: boolean
  authSearchKey: string
  tours: [ITours]
}

interface SearchScreenProps extends NavigationScreenProps {}

type Props = DispatchProps & StateProps & SearchScreenProps

const schema = Yup.object().shape({
  searchKey: Yup.string()
    .min(3, "common.fieldTooShort")
    .required("common.fieldRequired"),
})

interface MyFormValues {
  searchKey: string
}


const SEARCH_BUTTON: ViewStyle = {
  borderRadius: 100,
  width: Layout.window.width / 1.4,
  marginTop: 10,
  backgroundColor: colors.purple,
}

const SEARCH_BUTTON_TEXT: TextStyle = {
  fontSize: 12,
  fontFamily: fonts.gibsonRegular,
  color: colors.palette.white,
  textTransform: 'uppercase'
}


const TRIP_IMAGE: ImageStyle = {
  alignSelf: "flex-end",
  height: 235.5,
  width: Layout.window.width / 1.1,
  borderRadius: 12,
}

const appNameTextStyle: TextStyle = {
  marginLeft: 20,
  marginTop: Layout.window.height / 15,
  color: colors.purple,
  fontFamily: fonts.latoRegular,
  // fontSize: 30,
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

const infoTextStyle: TextStyle = {
  color: colors.blue1,
  fontFamily: fonts.latoRegular,
  marginLeft: 10,
  marginTop: 10,
}

const CALENDAR: ImageStyle = {
  height: 20,
  width: 20,
  marginTop: 10,
}

class IntroSearch extends React.Component<NavigationScreenProps & Props> {
  
  state={
    limit: 3,
    isDateTimePickerVisible: false,
    chosenDate: '',
  }
  
  searchKeyInput: NativeMethodsMixinStatic | any
  
  submit = (value) => {
    const { chosenDate } = this.state
    // console.tron.log(chosenDate)
    return /^-{0,1}\d+$/.test(value.searchKey)
      ? this.props.searchAmountToursAsync(value.searchKey, chosenDate)
      : this.props.searchTextToursAsync(value.searchKey, chosenDate)
  }
  
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
  
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
  
  handleDatePicked = (date: any) => {
    // console.tron.log("A date has been picked: ",moment(`${date}`).format('YYYY-MM-DD'));
    
    this.props.searchTextToursAsync('', date)
    
    this.setState({ chosenDate: moment(`${date}`).format('YYYY-MM-DD') })
    
    this.hideDateTimePicker();
  };
  
  public render(): React.ReactNode {
    const {
      navigation, tours, setSelectedTours, isLoading, clearSearchTourAsync, authSearchKey, setSearchKeyAsync
    } = this.props
    
    // console.tron.log(authSearchKey, "authSearchKey")
    return (
      <View
        style={{
          height: Layout.window.height,
        }}
      >
        {
          Platform.OS === "ios"
            ? <StatusBar barStyle="dark-content" />
            : <StatusBar barStyle={"light-content"} translucent backgroundColor={colors.purple} />
        }
        
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Text
      
              style={appNameTextStyle}
            >
              {'< Back'}
            </Text>
          </TouchableOpacity>
          
          <View
            style={{
              flexDirection: 'row',
              justifyContent: "space-between",
              width: Layout.window.width / 1.1,
              marginTop: 20,
            }}
          >
            
            <Text
              
              style={discoverTextStyle}
            >
              {translate(`search.search`)}
            </Text>
            <TouchableOpacity
              onPress={this.showDateTimePicker}
              style={{
                flexDirection: "row",
                justifyContent: 'space-between',
              }}
            >
              <Image
                style={CALENDAR}
                source={images.calendar}
                resizeMethod={'auto'}
                resizeMode='cover'
              />
            </TouchableOpacity>
          </View>
          
          <Formik
            initialValues={{
              searchKey: authSearchKey
            }}
            validationSchema={schema}
            onSubmit={this.submit}
            enableReinitialize
            validateOnBlur={false}
          >
            {({
                values,
                handleChange,
                handleBlur,
                errors,
                isValid,
                handleSubmit,
                handleReset
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
                  
                  <NavigationEvents onDidBlur={() => {
                    clearSearchTourAsync()
                    handleReset()
                  }} />
                  
                  <Button
                    style={SEARCH_BUTTON}
                    textStyle={SEARCH_BUTTON_TEXT}
                    disabled={!isValid || isLoading}
                    onPress={() => handleSubmit()}
                  >
                    {
                      isLoading
                        ? <ActivityIndicator size="small" color={colors.palette.white} />
                        : <Text style={SEARCH_BUTTON_TEXT}>{translate(`search.search`)}</Text>
                    }
                  </Button>
                </View>
              </View>
            )}
          </Formik>
          
          {
            tours[0].id !== null && (
              <FlatList
                // onEndReached={() => this.fetchTours(limit)}
                data={tours}
                numColumns={1}
                style={{
                  marginRight: 15,
                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: 120
                }}
                renderItem={(tours) => {
                  const { index } = tours
                  const {
                    tripName, locationPictureOne, userPays, tripDate, tripLocation
                  } = tours.item
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setSelectedTours(tours.item)
                        navigation.navigate('introViewTour')
                      }}
                      style={{
                        flexDirection: "column",
                        marginLeft:  20,
                        marginTop: 20,
                      }}
                    >
                      <Image
                        style={TRIP_IMAGE}
                        source={{ uri: `${locationPictureOne}` }}
                        resizeMethod={'auto'}
                        resizeMode='cover'
                      />
                      
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }}
                      >
                        <Text
                          
                          style={infoTextStyle}
                        >
                          {tripName}
                        </Text>
                        
                        <Text
                          
                          style={infoTextStyle}
                        >
                          ₦ {userPays.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Text>
                      </View>
                      
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }}
                      >
                        <Text
                          
                          style={infoTextStyle}
                        >
                          {tripLocation.substring(0, 20)}
                        </Text>
                        
                        <Text
                          
                          style={infoTextStyle}
                        >
                          { moment(tripDate).format("ddd, MMM D, YYYY")}
                        </Text>
                      
                      
                      </View>
                    </TouchableOpacity>
                  )
                }}
              />
            )
          }
        </ScrollView>
        
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
        
        <NavigationEvents onDidBlur={() => setSearchKeyAsync('')} />
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  setSelectedTours: (tour: ITours) => dispatch(setSelectedTours(tour)),
  getPopularToursAsync: (limit: number) => dispatch(getPopularToursAsync(limit)),
  searchTextToursAsync: (searchKey: string, date?: string) => dispatch(introSearchTextToursAsync(searchKey, date)),
  searchAmountToursAsync: (amount: number, date?: string) => dispatch(introSearchAmountToursAsync(amount, date)),
  clearSearchTourAsync: () => dispatch(clearSearchTourAsync()),
  setSearchKeyAsync: (searchKey: string) => dispatch(setSearchKeyAsync(searchKey)),
})

let mapStateToProps: (state: ApplicationState) => StateProps;
mapStateToProps = (state: ApplicationState): StateProps => ({
  isLoading: state.tour.loading,
  tours: state.tour.searchedTours,
  authSearchKey: state.tour.searchKey,
}) as StateProps;

export const IntroSearchScreen = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(IntroSearch)
