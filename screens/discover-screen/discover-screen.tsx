import * as React from "react"
import {
  TouchableOpacity, Image, View, ImageStyle, TextStyle, FlatList, Text, Platform, StatusBar
} from "react-native"
import {colors, fonts, images} from "../../theme"
import { ITours } from "../../services/api";
import {Layout} from "../../constants";

interface WeekendScreenProps {
  forwardedRef?: (ref: any) => void
  discoverTours: [ITours]
  viewTours: () => void
  setSelectedTours: (tour: ITours) => void
}

const TRIP_IMAGE: ImageStyle = {
  alignSelf: "flex-end",
  height: 233,
  width: Layout.window.width / 2.4,
  borderRadius: 12,
}

const discoverMoreTextStyle: TextStyle = {
  color: colors.blue1,
  fontFamily: fonts.latoRegular,
  marginLeft: 10,
  marginTop: 10,
}


export class DiscoverScreen extends React.Component<WeekendScreenProps> {
  state = {
    // isPickerCollapsed: !this.props.visible
  }
  
  // componentDidMount() {
  //   const { scrollTo } = this.state
  //   this.interval = setInterval(() =>
  //       this.setState((state, props) => ({
  //         scrollTo: state.scrollTo + 100
  //       }))
  //     , 100);
  // }
  //
  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }
  //
  // scrollView: any
  //
  // handleScroll = (event: Object) => {
  //   const { scrollTo } = this.state
  //   console.tron.log(event.nativeEvent.contentOffset.x, "YAH");
  //   // this.scrollView.scrollTo({ x: scrollTo, animated: true });
  // }
  
  
  render() {
    const {
      forwardedRef, discoverTours, viewTours, setSelectedTours
    } = this.props
    
    return (
      <View>
        {
          Platform.OS === "ios"
            ? <StatusBar barStyle="dark-content" />
            : <StatusBar barStyle={"light-content"} translucent backgroundColor={colors.purple} />
        }
        {
          discoverTours[0].id !== null && (
            <FlatList
              data={discoverTours}
              numColumns={2}
              style={{
                marginBottom: Platform.OS === "ios" ? Layout.window.height / 7 : Layout.window.height / 15,
              }}
              contentContainerStyle={{
                paddingBottom: 0
              }}
              renderItem={(tours) => {
                const { index } = tours
                const { tripName, locationPictureOne, userPays } = tours.item
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSelectedTours(tours.item)
                      viewTours()
                    }}
                    style={{
                      flexDirection: "column",
                      marginLeft: 20,
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
              
                        style={discoverMoreTextStyle}
                      >
                        {tripName.substring(0, 20)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )
              }}
            />
          )
        }
        
      </View>
    )
  }
}
