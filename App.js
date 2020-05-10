import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';
import { Container } from 'native-base';
import * as Font from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Frate from './app/index';
import SignUp from './app/signup'


function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}
// export default class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       isReady: false
//     };
//   }

//   async _loadAssetsAsync() {
//     const imageAssets = cacheImages([require('./assets/images/bg.jpg')]);

//     await Promise.all([...imageAssets]);
//   }

//   render() {
//     if (!this.state.isReady) {
//       return (
//         <AppLoading
//           startAsync={this._loadAssetsAsync}
//           onFinish={() => this.setState({ isReady: true })}
//           onError={console.warn}
//         />
//       );
//     }
//     return <Frate />;
//   }
// }
const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    const imageAssets = cacheImages([
      require('./assets/images/bg.jpg'),
      require('./assets/images/bg2.png'),
    ]);

    const fontAssets = cacheFonts([FontAwesome.font]);

    await Font.loadAsync({
      OpenSans_Bold: require("./assets/fonts/Open_Sans/OpenSans-Bold.ttf"),
      OpenSans_SemiBoldItalic: require("./assets/fonts/Open_Sans/OpenSans-SemiBoldItalic.ttf"),
      OpenSans_SemiBold: require("./assets/fonts/Open_Sans/OpenSans-SemiBold.ttf"),
      ...Ionicons.font,
    });

    await Promise.all([...imageAssets, ...fontAssets]);
    // await Font.loadAsync({
    //   IRANSans: require('./assets/fonts/IRANSansMobile.ttf'),
    //   IRANSans_bold: require('./assets/fonts/IRANSansMobile_Bold.ttf'),
    //   IRANSans_medium: require('./assets/fonts/IRANSansMobile_Medium.ttf'),
    // })
    this.setState({ isReady: true });
  }


  render() {
    if (!this.state.isReady) {
      return <Frate />;
    }

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='Sign Up' component={SignUp} />
          <Stack.Screen name='Login' component={Frate} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});