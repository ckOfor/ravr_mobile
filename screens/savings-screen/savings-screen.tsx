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

class Savings extends React.Component<NavigationScreenProps & Props> {
  
  public render(): React.ReactNode {
    const {
      navigation, User
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
          onScrollBeginDrag={() => this.setState({ scrollTo: 0 })}
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
