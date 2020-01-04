// react
import React from "react"

// react-native
import {
  FlatList,
  Image, ImageStyle, Platform, RefreshControl,
  ScrollView, StatusBar, Text, TextStyle, TouchableOpacity, View, ViewStyle
} from "react-native"

// third-party libraries
import { NavigationScreenProps } from "react-navigation"

// redux
import { connect } from "react-redux"
import { Dispatch } from "redux";
import { ApplicationState } from "../../redux";
import { ITours } from "../../services/api";
import { Layout } from "../../constants";
import { colors, fonts, images } from "../../theme";
import { translate} from "../../i18n";
import { getPopularToursAsync, setSelectedTours } from "../../redux/tour";
import moment from "moment";


interface DispatchProps {
  setSelectedTours: (tour: ITours) => void
  getPopularToursAsync: (limit: number) => void
}

interface StateProps {
  isLoading: boolean
  tours: [ITours]
}

interface ViewTourScreenProps extends NavigationScreenProps {}

type Props = DispatchProps & StateProps & ViewTourScreenProps

const TRIP_IMAGE: ImageStyle = {
  alignSelf: "flex-end",
  height: 235.5,
  width: 342.78,
  borderRadius: 12,
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

const infoTextStyle: TextStyle = {
  color: colors.blue1,
  fontFamily: fonts.latoRegular,
  marginLeft: 10,
  marginTop: 10,
}

class ViewTours extends React.Component<NavigationScreenProps & Props> {
  
  state={
    limit: 3
  }
  
  componentDidMount(): void {
    const { limit } = this.state
    this.fetchTours(limit)
  }
  
  fetchTours = (limit: number) => {
    console.tron.log("dsd")
    this.props.getPopularToursAsync(limit)
  }
  
  onReFresh = () => {
    this.setState((state, props) => ({
      limit: state.limit + 2
    }), () => this.fetchTours(this.state.limit + 10))
  }
  
  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };
  
  public render(): React.ReactNode {
    const {
      navigation, tours, setSelectedTours, isLoading
    } = this.props
    
    const {
      limit
    } = this.state
    
    console.tron.log(tours)
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
    
        
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Text
  
            style={appNameTextStyle}
          >
            {translate(`viewTour.welcomeText`)}
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
              {translate(`viewTour.popular`)}
            </Text>
          </TouchableOpacity>
        </View>
      
        <Text
      
          style={discoverMoreTextStyle}
        >
          {translate(`viewTour.experience`)}
        </Text>
        
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => this.fetchTours(limit)}
            />
          }
          onScroll={({nativeEvent}) => {
            if (this.isCloseToBottom(nativeEvent)) {
              this.fetchTours(limit)
              this.setState({
                limit: limit + 10
              })
            }
          }}
          showsHorizontalScrollIndicator={false}
        >
          {
            tours[0].id !== null && (
              <FlatList
                onEndReached={() => this.fetchTours(limit)}
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
                        navigation.navigate('viewTour')
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
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  setSelectedTours: (tour: ITours) => dispatch(setSelectedTours(tour)),
  getPopularToursAsync: (limit: number) => dispatch(getPopularToursAsync(limit)),
})

let mapStateToProps: (state: ApplicationState) => StateProps;
mapStateToProps = (state: ApplicationState): StateProps => ({
  isLoading: state.tour.loading,
  tours: state.tour.discoverTours
});

export const ViewToursScreen = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(ViewTours)
