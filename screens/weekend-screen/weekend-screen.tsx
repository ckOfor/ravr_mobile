import * as React from "react"
import {
  View, TouchableOpacity, Image, ScrollView, ImageStyle, Text, TextStyle, Platform, StatusBar
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
  navigation: any
}

const TRIP_IMAGE: ImageStyle = {
  alignSelf: "flex-end",
  height: 235.5,
  width: Layout.window.width / 2.5,
  borderRadius: 12,
}

const discoverMoreTextStyle: TextStyle = {
  color: colors.blue1,
  fontFamily: fonts.latoRegular,
  marginLeft: 10,
  marginTop: 10,
}

const moreTextStyle: TextStyle = {
  color: colors.white,
  fontFamily: fonts.latoRegular,
  textAlign: 'center',
  width: Layout.window.width / 3,
}

export class WeekendScreen extends React.Component<WeekendScreenProps> {
  state = {
    // isPickerCollapsed: !this.props.visible
  }
  
  render() {
    const {
      forwardedRef, weekendTours, viewTours, setSelectedTours, navigation
    } = this.props
    
    console.tron.log(weekendTours, "weekendToursweekendToursweekendToursweekendToursweekendTours")
    
    return (
      <View>
        {
          Platform.OS === "ios"
            ? <StatusBar barStyle="dark-content" />
            : <StatusBar barStyle={"light-content"} translucent backgroundColor={colors.purple} />
        }
        <ScrollView
          scrollEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            marginTop: '5%',
          }}
          pinchGestureEnabled
          contentContainerStyle={{
            justifyContent: "space-between"
          }}
        >
          {
            weekendTours && weekendTours.map((tour, index) => {
              const { locationPictureOne, tripName, tripPrice } = tour
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
                      {tripName && tripName.substring(0, 9)}
                    </Text>
              
                    <Text
                
                      style={discoverMoreTextStyle}
                    >
                      ₦ {tripName && tripPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            })
          }
          
          <View
            style={{
              width: Layout.window.width / 2,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate('weekendTours')}
              style={{
                borderColor: colors.purple,
                borderWidth: 1,
                height: Layout.window.height / 20,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                backgroundColor: colors.purple
              }}
            >
              <Text
                style={moreTextStyle}
              >
                {translate(`home.more`)}
              </Text>
            </TouchableOpacity>
          </View>
    
        </ScrollView>
      </View>
      
    )
  }
}

