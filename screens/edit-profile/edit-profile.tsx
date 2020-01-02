import React from "react"
import {
  View, Text, ViewStyle, StatusBar, TextStyle, ScrollView, TouchableOpacity, Image, ImageStyle, Linking, Alert
} from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { connect } from "react-redux"
import { Dispatch } from "redux";
import { ApplicationState } from "../../redux";
import { Layout } from "../../constants";
import {translate} from "../../i18n";
import { colors, fonts, images } from "../../theme";
import {clearUserAsync, IUser} from "../../redux/user";
import { updateUserAsync } from "../../redux/user";
import {clearAuthAsync} from "../../redux/auth";
import {clearTours} from "../../redux/tour";

interface DispatchProps {
  updateUserAsync: () => void
  clearUserAsync: () => void
  clearAuthAsync: () => void
  clearTours: () => void
}

interface StateProps {
  User: IUser
}

interface EditProfileProps extends NavigationScreenProps {}

type Props = DispatchProps & StateProps & EditProfileProps

const ROOT: ViewStyle = {
  height: Layout.window.height,
}

const HEADER_TEXT: TextStyle = {
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

const moreTextStyle: TextStyle = {
  color: colors.blue1,
  fontFamily: fonts.latoRegular,
  lineHeight: 40,
  textAlign: 'left',
  width: Layout.window.width / 1.5,
}

class EditProfile extends React.Component<NavigationScreenProps & Props> {
  
  public render(): React.ReactNode {
    const {
      navigation, clearUserAsync, clearAuthAsync, clearTours
    } = this.props
    
    return (
      <View
        style={ROOT}
      >
        <StatusBar barStyle={"dark-content"} />
        
        <ScrollView
          // onScroll={this.handleScroll}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          pinchGestureEnabled
          contentContainerStyle={{
            justifyContent: "space-between"
          }}
          onContentSizeChange={(contentWidth, contentHeight)=>{
            // this.setState((state) => ({
            //   scrollTo: state.scrollTo + 100
            // }), () => {
            //   this.scrollView.scrollTo({ x: scrollTo, animated: true });
            // } )
          }}
        >
          
          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Text
              
              style={HEADER_TEXT}
            >
              {translate(`profile.headerText`)}
            </Text>
          </TouchableOpacity>
          
          <View
            style={{
              flexDirection: 'row',
              justifyContent: "space-between",
            }}
          >
            <Text
    
              style={discoverTextStyle}
            >
              {translate(`profile.editHeader`)}
            </Text>
            
            
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Log me out!',
                  'Are you sure?',
                  [
                    {
                      text: 'Cancel',
                      // onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'Proceed',
                      onPress: () => {
                        navigation.navigate('landing')
                        clearUserAsync()
                        clearAuthAsync()
                        clearTours()
                      }},
                  ],
                  {cancelable: false},
                )
              }
              style={{
                flexDirection: "row",
                justifyContent: 'space-between',
              }}
            >
  
              <Text
    
                style={moreTextStyle}
              >
                {translate(`profile.logout`)}
              </Text>
            </TouchableOpacity>
          </View>
          
        
        </ScrollView>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  updateUserAsync: () => dispatch(updateUserAsync()),
  clearUserAsync: () => dispatch(clearUserAsync()),
  clearAuthAsync: () => dispatch(clearAuthAsync()),
  clearTours: () => dispatch(clearTours()),
})

let mapStateToProps: (state: ApplicationState) => StateProps;
mapStateToProps = (state: ApplicationState): StateProps => ({
  User: state.user.data,
});

export const EditProfileScreen = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile)
