import * as React from "react"
import {
  TouchableOpacity, Image, View, ImageStyle, TextStyle, FlatList, Text, Platform, StatusBar
} from "react-native"
import {colors, fonts, images} from "../../theme"
import { ITours } from "../../services/api";
import {Layout} from "../../constants";
import {translate} from "../../i18n";

interface WeekendScreenProps {
  forwardedRef?: (ref: any) => void
  discoverTours: [ITours]
  viewTours: () => void
  setSelectedTours: (tour: ITours) => void
  navigation: any
  page: string
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

const moreTextStyle: TextStyle = {
  color: colors.white,
  fontFamily: fonts.latoRegular,
  textAlign: 'center',
  width: Layout.window.width / 3,
}

export class DiscoverScreen extends React.Component<WeekendScreenProps> {
  
  render() {
    const {
      discoverTours, viewTours, setSelectedTours, navigation, page
    } = this.props

    return (
      <View
        style={{
          // marginBottom: 50
        }}
      >
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
  
        <View
          style={{
            width: Layout.window.width / 2,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 50,
            marginBottom: Platform.OS === "ios" ? Layout.window.height / 7 : Layout.window.height / 15,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate(`${page}`)}
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
        
      </View>
    )
  }
}
