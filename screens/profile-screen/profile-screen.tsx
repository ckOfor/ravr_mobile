import React from "react"
import {
  View, Text, ViewStyle, StatusBar, TextStyle, ScrollView
} from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { connect } from "react-redux"
import { Dispatch } from "redux";
import { ApplicationState } from "../../redux";
import { Layout } from "../../constants";
import {translate} from "../../i18n";
import { colors, fonts } from "../../theme";

interface DispatchProps {

}
interface StateProps {

}

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

class Profile extends React.Component<NavigationScreenProps & Props> {
  
  public render(): React.ReactNode {
    const {
      navigation
    } = this.props
    return (
      <View
        style={ROOT}
      >
        <StatusBar barStyle={"dark-content"} />
        
        <ScrollView>
          <Text
            
            style={appNameTextStyle}
          >
            {translate(`home.appName`)}
          </Text>
        </ScrollView>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({

})

let mapStateToProps: (state: ApplicationState) => StateProps;
mapStateToProps = (state: ApplicationState): StateProps => ({

});

export const ProfileScreen = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
