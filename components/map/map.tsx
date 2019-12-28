import * as React from "react"
import MapView, {
  MapViewProps,
  Marker
} from "react-native-maps"
import MapViewDirections from "react-native-maps-directions"
import { IOS_DIRECTIONS_API_KEY, ANDROID_DIRECTIONS_API_KEY } from "react-native-dotenv"
import { images } from "../../theme"
import { Image, Platform } from "react-native";
import { Layout } from "../../constants";

interface MapProps {
  isRideOn: boolean
  userLat: number
  userLng: number
  driverLat: number
  driverLng: number
  rotateAngle: number
  isRideStarted: boolean
  userDestinationLat: number,
  userDestinationLng: number,
  forwardedRef?: (ref: any) => void
}

type Props = MapProps & MapViewProps

export class Map extends React.PureComponent<Props> {
  mapView: MapView
  
  onMapDirectionsReady = result => {
    console.tron.log(result)
    console.tron.log("result")
    console.tron.log("result")
    console.tron.log("result")
    console.tron.log(this.props)
    this.mapView.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: Layout.window.width / 20,
        bottom: Layout.window.height / 20,
        left: Layout.window.width / 20,
        top: Layout.window.height / 20
      }
    })
  }
  
  onMapDirectionsError = errorMessage => {
    console.tron.error(errorMessage)
  }
  
  render() {
    const {
      style,
      initialRegion,
      onMapReady,
      isRideOn,
      userLat,
      userLng,
      driverLat,
      driverLng,
      rotateAngle,
      isRideStarted,
      userDestinationLat,
      userDestinationLng,
      forwardedRef,
      showsMyLocationButton = true,
    } = this.props
    const origin = {
      latitude: isRideStarted ? driverLat : userLat,
      longitude: isRideStarted ? driverLng : userLng
    };
    const destination = {
      latitude: isRideStarted ? userDestinationLat : driverLat,
      longitude: isRideStarted ? userDestinationLng : driverLng
    };
    
    return (
      <MapView
        followsUserLocation
        provider={'google'}
        showsUserLocation={!isRideStarted}
        showsMyLocationButton={showsMyLocationButton}
        onMapReady={onMapReady}
        style={style}
        initialRegion={initialRegion}
        ref={forwardedRef ? forwardedRef : c => (this.mapView = c)}
      >
  
        {
          isRideOn && (
            <MapViewDirections
              mode="DRIVING"
              strokeColor="hotpink"
              // strokeColor="#F8A765"
              strokeWidth={3}
              lineDashPattern={[2, 2, 2]}
              lineCap="round"
              lineJoin="round"
              origin={origin}
              destination={destination}
              apikey={Platform.OS === 'ios' ? IOS_DIRECTIONS_API_KEY : ANDROID_DIRECTIONS_API_KEY}
              // onReady={this.onMapDirectionsReady}
              onReady={result => {
                console.tron.log('Distance: ${result.distance} km')
                console.tron.log('Duration: ${result.duration} min.')
  
                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: Layout.window.width / 20,
                    bottom: Layout.window.height / 20,
                    left: Layout.window.width / 20,
                    top: Layout.window.height / 20
                  }
                });
              }}
              onError={this.onMapDirectionsError}
            />
          )
        }
        
        {
          isRideOn && (
            <Marker
              coordinate={{
                latitude: Number(driverLat),
                longitude: Number(driverLng),
              }}
            >
              <Image
                source={images.cabIcon}
                style={{
                  width: 50,
                  height: 50,
                  transform: [{
                    rotate: `${rotateAngle}deg`}]
                }}
              />
            </Marker>
          )
        }
        
        {
          isRideStarted && (
            <Marker
              coordinate={{
                latitude: userDestinationLat,
                longitude: userDestinationLng,
              }}
            >
              <Image
                source={images.locationIcon}
                style={{
                  width: 25,
                  height: 25,
                }}
              />
            </Marker>
          )
        }
      </MapView>
    )
  }
}
