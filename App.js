import * as React from 'react';
import { StyleSheet, AsyncStorage, Dimensions } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import Login from './app/LoginPage/Login';
import SignUp from './app/LoginPage/SignUp';
import Home from './app/HomePage/Home';
import Upload from './app/HomePage/Upload';
import Search from './app/HomePage/Search';
import Post from './app/HomePage/Post';
import Dashboard from './app/HomePage/Dashboard';
import Followers from './app/HomePage/Followers';
import Followings from './app/HomePage/Followings';
import Profile from './app/HomePage/Profile';


const Stack = createStackNavigator();
const Dash = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createStackNavigator();



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
        tabBarIcon: ({ color, size }) => (
          <SimpleLineIcons name="home" style={{ padding: 10 }} color={color} size={size} font={'SamsungSans_Medium'} />
        ),
      }} />
      <Tab.Screen name="Search" component={Search} options={{
        tabBarLabel: 'Search',
        tabBarIcon: ({ color, size }) => (
          <SimpleLineIcons name="magnifier" style={{ padding: 10 }} color={color} size={size} font={'SamsungSans_Medium'} />
        ),
      }} />
      <Tab.Screen name="Upload" component={Upload} options={{
        tabBarLabel: 'Upload',
        tabBarIcon: ({ color, size }) => (
          <SimpleLineIcons name="arrow-up-circle" style={{ padding: 10 }} color={color} size={size} font={'SamsungSans_Medium'} />
        ),
      }} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{
        tabBarLabel: 'Dashboard',
        tabBarIcon: ({ color, size }) => (
          <SimpleLineIcons name="menu" style={{ padding: 10 }} color={color} size={size} font={'SamsungSans_Medium'} />
        ),
      }} />
    </Tab.Navigator>
  );
}

function FollowScreen() {
  return (
    <TopTab.Navigator
      initialRouteName="Followers"
      initialLayout={{ width: Dimensions.get('window').width }}
      tabBarOptions={{ labelStyle: { fontFamily: 'SamsungSans_Medium' } }}
    >
      <TopTab.Screen name="Followers" component={Followers} />
      <TopTab.Screen name="Followings" component={Followings} />
    </TopTab.Navigator>
  );
}

function DashboardScreen() {
  return (
    <Dash.Navigator initialRouteName='Dashboard' screenOptions={{ gestureEnabled: false }} >
      <Dash.Screen options={{ headerShown: false }} name='Dashboard' component={Dashboard} />
      {/* <Dash.Screen options={{ headerShown: true, title: ' ' }} name='Follow' component={FollowScreen} /> */}
      <Dash.Screen options={{ headerShown: true, title: 'Followers' }} name='Followers' component={Followers} />
      <Dash.Screen options={{ headerShown: true, title: 'Followings' }} name='Followings' component={Followings} />
    </Dash.Navigator>
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
      SamsungSans_Bold: require("./assets/fonts/SamsungSans/SamsungSans-Bold.ttf"),
      SamsungSans_Medium: require("./assets/fonts/SamsungSans/SamsungSans-Medium.ttf"),
      SamsungSans_Regular: require("./assets/fonts/SamsungSans/SamsungSans-Regular.ttf"),
      SamsungSans_Light: require("./assets/fonts/SamsungSans/SamsungSans-Light.ttf"),
      SamsungSans_Thin: require("./assets/fonts/SamsungSans/SamsungSans-Thin.ttf"),
      Vision_Black: require("./assets/fonts/Vision/Vision-Black.ttf")
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
      <NavigationContainer>
        <Stack.Navigator initialRouteName={this.state.isSignedIn ? 'Home' : 'Login'} screenOptions={{ gestureEnabled: false }} >
          <Stack.Screen options={{ headerShown: false }} name='Login' component={Login} />
          <Stack.Screen name='Sign Up' component={SignUp} />
          <Stack.Screen options={{ headerShown: false }} name='Home' component={HomeScreen} />
          <Stack.Screen options={{ headerBackTitle: 'Back', title: 'Post' }} name='Post' component={Post} />
          <Stack.Screen options={{ headerBackTitle: 'Back', title: 'Profile' }} name='Profile' component={Profile} />
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

