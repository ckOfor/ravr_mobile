import * as React from "react"
import {
  Image,
  ImageStyle, Keyboard,
  StatusBar,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native"
import {
  NavigationScreenProps,
  DrawerItems,
  DrawerItemsProps
} from "react-navigation"
import {colors} from "../../theme"
import { Header } from "../header"
import {Text} from "native-base";
import {Dispatch} from "redux";
import * as DeviceActions from "../../redux/device/device.actions";
import {ApplicationState} from "../../redux";
import { connect } from "react-redux"

interface DispatchProps {
  getUserLocation: () => void
}

interface StateProps {
  user_pic_url: string
  firstName: string
  lastName: string
}

interface BaseProps extends NavigationScreenProps {}

type CustomDrawerMenuProps = DispatchProps & StateProps & BaseProps & DrawerItemsProps

const ROOT: ViewStyle = {
  height: 250,
  backgroundColor: colors.moovBackground
}

const PROFILE_IMAGE_VIEW: ViewStyle = {
  height: 250,
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}

const PROFILE_IMAGE: ImageStyle = {
  height: 62,
  width: 62,
  marginRight: 20,
  borderRadius: 31
}

const FIRST_NAME: TextStyle = {
  marginTop: 10,
  marginRight: 20,
  color: '#FFF',
}

const DIVIDER: ViewStyle = {
  height: 8,
  backgroundColor: colors.palette.primaryPink
}

class CustomDrawer extends React.Component<CustomDrawerMenuProps> {
  static navigationOptions = ({ navigation }) => ({
    header: <Header leftIcon="arrowLeft" navigation={navigation} />
  })
  
  componentDidUpdate(prevProps: Readonly<CustomDrawerMenuProps>, prevState: Readonly<{}>, snapshot?: any): void {
    Keyboard.dismiss()
  }
  
  render() {
    const {
      firstName,
      user_pic_url,
      navigation,
      lastName
    } = this.props
    return (
      <View>
        <StatusBar barStyle={"dark-content"} backgroundColor={colors.palette.primaryPink} />
        <View style={ROOT}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(`profile`)
            }
            style={PROFILE_IMAGE_VIEW}
          >
            <Image
              source={{ uri: `${user_pic_url}` }}
              style={PROFILE_IMAGE}
            />
            <Text
              style={FIRST_NAME}
            >
              {firstName} {lastName}
            </Text>
          </TouchableOpacity>
  
          <View
            style={DIVIDER}
          />
        </View>
        
        <DrawerItems {...this.props} />
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  getUserLocation: () => dispatch(DeviceActions.fetchUserLocationAsync())
})

const mapStateToProps = (state: ApplicationState): StateProps => ({
  user_pic_url: state.user.user_details.image,
  firstName: state.user.user_details.first_name,
  lastName: state.user.user_details.last_name,
})

export const CustomDrawerMenu = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(CustomDrawer)
