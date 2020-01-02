import React from "react"
import {
  View, Text, ViewStyle, StatusBar, TextStyle, ScrollView, TouchableOpacity, Image, ImageStyle, Linking
} from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { connect } from "react-redux"
import { Dispatch } from "redux";
import { ApplicationState } from "../../redux";
import { Layout } from "../../constants";
import {translate} from "../../i18n";
import { colors, fonts, images } from "../../theme";
import { IUser } from "../../redux/user";
import { updateUserAsync } from "../../redux/user";

interface DispatchProps {
  updateUserAsync: () => void
}

interface StateProps {
  User: IUser
}

interface SavingsScreenProps extends NavigationScreenProps {}

type Props = DispatchProps & StateProps & SavingsScreenProps

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

const savingsMoreTextStyle: TextStyle = {
  color: colors.blue1,
  fontFamily: fonts.latoRegular,
  lineHeight: 40,
  textAlign: 'left',
  width: Layout.window.width / 1.5,
}

class Savings extends React.Component<NavigationScreenProps & Props> {
  
  public render(): React.ReactNode {
    const {
      navigation, User
    } = this.props
  
  
    const {
      Tourists
    } = User
    
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
                {translate(`profile.mySavingsHeader`)}
              </Text>
  
  
              <Text
    
                style={savingsMoreTextStyle}
              >
                Avail: {Tourists[0] !== undefined ? Tourists[0].userCoins : 0} coins
              </Text>
            </TouchableOpacity>
          </View>
        
        </ScrollView>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  updateUserAsync: () => dispatch(updateUserAsync())
})

let mapStateToProps: (state: ApplicationState) => StateProps;
mapStateToProps = (state: ApplicationState): StateProps => ({
  User: state.user.data,
});

export const SavingsScreen = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(Savings)
