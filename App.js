import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Login from './app/Login';
import SignUp from './app/Signup';
import Home from './app/Home';
import Profile from './app/Profile';


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

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName='Home' >
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name='Home'
        component={Home}
      />
      <Stack.Screen options={{ headerShown: false }} name='Profile' component={Profile} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName='Profile' >
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name='Profile'
        component={Profile}
      />
      <Stack.Screen options={{ headerShown: false }} name='Home' component={Home} />
    </Stack.Navigator>
  );
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    const imageAssets = cacheImages([
      require('./assets/images/LoginBackground.jpg'),
      require('./assets/images/SignUpBackground.png'),
    ]);

    const fontAssets = cacheFonts([FontAwesome.font]);

    await Font.loadAsync({
      OpenSans_Bold: require("./assets/fonts/Open_Sans/OpenSans-Bold.ttf"),
      OpenSans_SemiBoldItalic: require("./assets/fonts/Open_Sans/OpenSans-SemiBoldItalic.ttf"),
      OpenSans_SemiBold: require("./assets/fonts/Open_Sans/OpenSans-SemiBold.ttf"),
      OpenSans_Regular: require("./assets/fonts/Open_Sans/OpenSans-Regular.ttf"),
      Roboto_Light: require("./assets/fonts/Roboto/Roboto-Light.ttf"),
      Roboto_Regular: require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
      Roboto_Bold: require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
      Roboto_Black: require("./assets/fonts/Roboto/Roboto-Black.ttf"),
      ...Ionicons.font,
    });

    await Promise.all([...imageAssets, ...fontAssets]);
    this.setState({ isReady: true });
  }


  render() {
    if (!this.state.isReady) {
      return <Login />;
    }
    return (
      <NavigationContainer>
        <Tab.Navigator initialRouteName='Home' tabBarOptions={{ activeTintColor: '#e91e63' }}>
          <Tab.Screen name="HomeStack" component={HomeStack} options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }} />
          <Tab.Screen name="ProfileStack" component={ProfileStack} options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }} />
        </Tab.Navigator>
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

