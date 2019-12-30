import * as React from "react"
import {
  View, TouchableOpacity, Image, ScrollView, ImageStyle, Text, TextStyle
} from "react-native"
import {colors, fonts, images} from "../../theme"
import { ITours } from "../../services/api";
import {translate} from "../../i18n";
import {Layout} from "../../constants";

interface WeekendScreenProps {
  forwardedRef?: (ref: any) => void
  viewTours: () => void
  weekendTours: [ITours]
  setSelectedTours: (tour: ITours) => void
}

const TRIP_IMAGE: ImageStyle = {
  alignSelf: "flex-end",
  height: 233,
  width: 148,
  borderRadius: 12,
}

const discoverMoreTextStyle: TextStyle = {
  color: colors.blue1,
  fontFamily: fonts.latoRegular,
  marginLeft: 10,
  marginTop: 10,
}


export class WeekendScreen extends React.Component<WeekendScreenProps> {
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
      forwardedRef, weekendTours, viewTours, setSelectedTours
    } = this.props
    
    return (
      <ScrollView
        // onScroll={this.handleScroll}
        scrollEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          marginTop: '5%',
        }}
        onScrollBeginDrag={() => this.setState({ scrollTo: 0 })}
        pinchGestureEnabled
        contentContainerStyle={{
          justifyContent: "space-between"
        }}
        // ref={forwardedRef}
        onContentSizeChange={(contentWidth, contentHeight)=>{
          // this.setState((state) => ({
          //   scrollTo: state.scrollTo + 100
          // }), () => {
          //   this.scrollView.scrollTo({ x: scrollTo, animated: true });
          // } )
        }}
      >
        {
          weekendTours && weekendTours.map((tour, index) => {
            const { locationPictureOne, tripName, userPays } = tour
            return (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: "column",
                  marginLeft: 20,
                }}
                onPress={() => {
                  setSelectedTours(tour)
                  viewTours()
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
                    {tripName.substring(0, 9)}
                  </Text>
  
                  <Text
    
                    style={discoverMoreTextStyle}
                  >
                    ₦ {userPays.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          })
        }
    
        <TouchableOpacity style={TRIP_IMAGE}>
    
        </TouchableOpacity>
      </ScrollView>
    )
  }
}
