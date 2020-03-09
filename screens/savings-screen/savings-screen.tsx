import React from "react"
import {
  View,
  Text,
  ViewStyle,
  StatusBar,
  TextStyle,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageStyle,
  Linking,
  Platform,
  FlatList, ActivityIndicator
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
import moment from "moment";
import {Button} from "../../components/button";

interface DispatchProps {
  updateUserAsync: () => void
}

interface StateProps {
  User: IUser
  savings: any
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


const SUBSCRIPTION: ViewStyle = {
  backgroundColor: colors.white,
  height: Layout.window.height / 6,
  width: Layout.window.width / 1.15,
  marginLeft: 20,
  marginTop: 30,
  borderRadius: 8,
  
  shadowOpacity: 0.2,
  shadowRadius: 3,
  shadowOffset: {
    height: 1,
    width: 1
  },
  
  elevation: 2,
  alignItems: "center",
  // justifyContent: "center",
}

class Savings extends React.Component<NavigationScreenProps & Props> {
  
  componentDidMount(): void {
    this.updateUser()
  }
  
  updateUser = () => {
    this.props.updateUserAsync()
  }
  
  public render(): React.ReactNode {
    const {
      navigation, User, savings
    } = this.props

    const {
      Tourists
    } = User
    
    
    console.tron.log(savings, "savings")
    
    return (
      <View
        style={ROOT}
      >
        {
          Platform.OS === "ios"
            ? <StatusBar barStyle="dark-content" />
            : <StatusBar barStyle={"light-content"} translucent backgroundColor={colors.purple} />
        }
        
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
                ₦ {Tourists[0] !== undefined ? Tourists[0].userCoins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}
              </Text>
            </TouchableOpacity>
          </View>
  
          <ScrollView
            scrollEnabled
            showsVerticalScrollIndicator={false}
            pinchGestureEnabled
            contentContainerStyle={{
              justifyContent: "space-between"
            }}
          >
            
            {
              savings.length > 0 && (
                <FlatList
                  data={savings}
                  numColumns={1}
                  style={{
                    marginRight: 15,
                  }}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingBottom: 120
                  }}
                  renderItem={(savings) => {
                    const { index } = savings
                    const {
                      reference, amount, createdAt
                    } = savings.item
      
                    // const today= moment()
                    // const createdDate = moment(createdAt)
                    // const monthDifference = createdDate.diff(today, 'months')
                    // const monthLeft = invoiceLimit - monthDifference
      
                    return (
                      <View
                        key={index}
                        style={SUBSCRIPTION}
                      >
  
                        <View
                          style={{
                            marginTop: 20,
                            width: Layout.window.width / 1.5,
                            flexDirection: 'row',
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              color: colors.purple,
                              fontFamily: fonts.latoRegular,
                              textAlign: 'center',
                            }}
                          >
                            Reference:
                          </Text>
    
    
                          <Text
                            style={{
                              color: colors.purple,
                              fontFamily: fonts.latoRegular,
                              textAlign: 'center',
                              textTransform: "capitalize"
                            }}
                          >
                            {reference}
                          </Text>
  
                        </View>
  
                        <View
                          style={{
                            marginTop: 10,
                            width: Layout.window.width / 1.5,
                            flexDirection: 'row',
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              color: colors.purple,
                              fontFamily: fonts.latoRegular,
                              textAlign: 'center',
                            }}
                          >
                            Amount:
                          </Text>
    
    
                          <Text
                            style={{
                              color: colors.purple,
                              fontFamily: fonts.latoRegular,
                              textAlign: 'center',
                              textTransform: "capitalize"
                            }}
                          >
                            ₦ {amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </Text>
  
                        </View>
                        
                        <View
                          style={{
                            marginTop: 10,
                            width: Layout.window.width / 1.5,
                            flexDirection: 'row',
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              color: colors.purple,
                              fontFamily: fonts.latoRegular,
                              textAlign: 'center',
                            }}
                          >
                            Date Created:
                          </Text>
    
    
                          <Text
                            style={{
                              color: colors.purple,
                              fontFamily: fonts.latoRegular,
                              textAlign: 'center',
                              textTransform: "capitalize"
                            }}
                          >
                            {moment(createdAt).format("ddd, MMM D, YYYY")}
                          </Text>
  
                        </View>
                        
                      </View>
                    )
                  }}
                />
              )
            }
            
          </ScrollView>
          
        
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
  savings: state.user.data.Savings,
});

export const SavingsScreen = connect<StateProps>(
  mapStateToProps,
  mapDispatchToProps
)(Savings)
