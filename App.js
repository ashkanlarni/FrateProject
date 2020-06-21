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
      <Stack.Screen options={{ headerShown: false }} name='Upload' component={Upload} />
    </Stack.Navigator>
  );
}

function UploadStack() {
  return (
    <Stack.Navigator initialRouteName='Upload' >
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name='Upload'
        component={Upload}
      />
      <Stack.Screen options={{ headerShown: false }} name='Home' component={Home} />
    </Stack.Navigator>
  );
}

function isSignedInHandler() {
  this.setState({
    isSignedIn: true,
  });
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
      isSignedIn: false
    };
    AsyncStorage.getItem('username', (err, result) => {
        if (result != null) {
          console.log('lay')
        }
      });
    console.log(this.state)

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
    return (
      this.state.isSignedIn ? (
        <>
          <NavigationContainer>
            <Tab.Navigator initialRouteName='Home' tabBarOptions={{ activeTintColor: '#e91e63' }}>
              <Tab.Screen name="HomeStack" component={HomeStack} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="home" style={{ padding: 10 }} color={color} size={26} font={'Vision_Bold'} />
                ),
              }} />
              <Tab.Screen name="UploadStack" component={UploadStack} options={{
                tabBarLabel: 'Upload',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="upload" style={{ padding: 10 }} color={color} size={26} font={'Vision_Bold'} />
                ),
              }} />
            </Tab.Navigator>
          </NavigationContainer>
        </>
      ) : (
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Login' >
              <Stack.Screen
                options={{
                  headerShown: false
                }}
                name='Login'
                component={Login}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name='Sign Up'
                component={SignUp}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name='Home'
                component={Home}
              />
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

