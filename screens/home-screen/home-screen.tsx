import React from "react"
import {
  View,
  Text,
  ViewStyle,
} from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { connect } from "react-redux"
import { Dispatch } from "redux";
import { ApplicationState } from "../../redux";

interface DispatchProps {

}
interface StateProps {

}

interface WalletProps extends NavigationScreenProps {}

type Props = DispatchProps & StateProps & WalletProps

const ROOT: ViewStyle = {
  alignItems: 'center',
  backgroundColor: 'blue'
}

class Home extends React.Component<NavigationScreenProps & Props> {
  
  public render(): React.ReactNode {
    const {
      navigation
    } = this.props
    return (
      <View
        style={ROOT}
      >
        <Text>Hello world...</Text>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({

})

let mapStateToProps: (state: ApplicationState) => StateProps;
mapStateToProps = (state: ApplicationState): StateProps => ({

});

export const HomeScreen = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(Home)
