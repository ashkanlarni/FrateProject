import * as React from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Login from './app/Login';
import SignUp from './app/SignUp';
import Home from './app/Home';
import Upload from './app/Upload';
import Search from './app/Search';
import Post from './app/Post';
import SliderComponent from './app/Slider/SliderComponent';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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

function HomeScreen() {
  return (
    <Tab.Navigator initialRouteName='Home' tabBarOptions={{ activeTintColor: '#e91e63' }}>
      <Tab.Screen name="Home" component={Home} options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" style={{ padding: 10 }} color={color} size={26} font={'Vision_Bold'} />
        ),
      }} />
      <Tab.Screen name="Search" component={Search} options={{
        tabBarLabel: 'Search',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="magnify" style={{ padding: 10 }} color={color} size={26} font={'Vision_Bold'} />
        ),
      }} />
      <Tab.Screen name="Upload" component={Upload} options={{
        tabBarLabel: 'Upload',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="upload" style={{ padding: 10 }} color={color} size={26} font={'Vision_Bold'} />
        ),
      }} />
      <Tab.Screen name="Slider" component={SliderComponent} options={{
        tabBarLabel: 'Slider',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="slider" style={{ padding: 10 }} color={color} size={26} font={'Vision_Bold'} />
        ),
      }} />
    </Tab.Navigator>
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.dbReady = false;

    this.state = {
      isReady: false,
      isSignedIn: false
    };

    AsyncStorage.getItem('username', (err, result) => {
      if (result != null) {
        this.state.isSignedIn = true;
      }
      this.dbReady = true;
    });

    console.log(this.state);

  }

  async componentDidMount() {
    const imageAssets = cacheImages([
      require('./assets/images/LoginBackground.jpg'),
      require('./assets/images/SignUpBackground.png'),
    ]);

    const fontAssets = cacheFonts([FontAwesome.font]);

    await Font.loadAsync({
      Roboto_medium: require("./assets/fonts/Vision/Vision-Black.ttf"),
      Vision_Black: require("./assets/fonts/Vision/Vision-Black.ttf"),
      Vision_Heavy: require("./assets/fonts/Vision/Vision-Heavy.ttf"),
      Vision_Bold: require("./assets/fonts/Vision/Vision-Bold.ttf"),
      Vision_Regular: require("./assets/fonts/Vision/Vision-Regular.ttf"),
      Vision_Light: require("./assets/fonts/Vision/Vision-Light.ttf"),
      Vision_Thin: require("./assets/fonts/Vision/Vision-Thin.ttf"),
      Vision_HeavyItalic: require("./assets/fonts/Vision/Vision-HeavyItalic.ttf"),
      Vision_BoldItalic: require("./assets/fonts/Vision/Vision-BoldItalic.ttf"),
      Vision_Italic: require("./assets/fonts/Vision/Vision-Italic.ttf")
    });

    await Promise.all([...imageAssets, ...fontAssets]);
    this.setState({ isReady: true });

  }


  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
      // TODO
    }
    while (!this.dbReady) {

    }
    return (
      this.state.isSignedIn ? (
        <>
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Home' >
              <Stack.Screen options={{ headerShown: false }} name='Home' component={HomeScreen} />
              <Stack.Screen options={{ headerBackTitle: 'Back' }} name='Post' component={Post} />
            </Stack.Navigator>
          </NavigationContainer>
        </>
      ) : (
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Login' >
              <Stack.Screen options={{ headerShown: false }} name='Login' component={Login} />
              <Stack.Screen options={{ headerShown: false }} name='Sign Up' component={SignUp} />
              <Stack.Screen options={{ headerShown: false }} name='Home' component={Home} />
            </Stack.Navigator>
          </NavigationContainer>
        )
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

