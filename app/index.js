import * as React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput } from 'react-native';
import { Button } from 'native-base';
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const { width, height } = Dimensions.get('window');
const { Value, event, block, cond, eq, set, Clock, startClock, stopClock, debug, timing, clockRunning, interpolate, Extrapolate } = Animated;

function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0)
    };

    const config = {
        duration: 500,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease)
    };

    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.frameTime, 0),
            set(config.toValue, dest),
            startClock(clock)
        ]),
        timing(clock, state, config),
        cond(state.finished, debug('stop clock', stopClock(clock))),
        state.position
    ]);
}

class Frate extends React.Component {
    constructor(props) {
        super(props);

        this.buttonOpacity = new Value(1);

        this.onStateChange = event([
            {
                nativeEvent: ({ state }) =>
                    block([
                        cond(
                            eq(state, State.END),
                            set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
                        )
                    ])
            }
        ]);

        this.onCloseState = event([
            {
                nativeEvent: ({ state }) =>
                    block([
                        cond(
                            eq(state, State.END),
                            set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
                        )
                    ])
            }
        ]);

        this.buttonY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [100, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.bgY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [-height / 2, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.logoY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [-height / 6, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.textInputZindex = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, -1],
            extrapolate: Extrapolate.CLAMP
        });

        this.textInputY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [0, 100],
            extrapolate: Extrapolate.CLAMP
        });

        this.textInputOpacity = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, 0],
            extrapolate: Extrapolate.CLAMP
        });
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#f2f2f2', justifyContent: 'flex-end' }}>
                <Animated.View style={{ ...StyleSheet.absoluteFill, transform: [{ translateY: this.bgY }] }}>
                    <Image
                        source={require('../assets/images/bg.jpg')}
                        style={{ flex: 1, height: null, width: null }}
                    />
                </Animated.View>
                <Animated.View style={{ height: height / 2 - 85, justifyContent: 'center', alignItems: 'center', transform: [{ translateY: this.logoY }] }}>
                    <Text style={{ fontSize: 65, fontFamily: 'OpenSans_Bold', color: 'white' }}>
                        F  R  A  T  E
                    </Text>
                    <Text style={{ fontSize: 20, color: 'white', fontFamily: 'OpenSans_SemiBold', marginVertical: 20 }}>
                        A Rating Social Media
                    </Text>
                </Animated.View>
                <View style={{ height: height / 3, justifyContent: 'center' }}>
                    <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                        <Animated.View style={{ opacity: this.buttonOpacity, transform: [{ translateY: this.buttonY }] }}>
                            <Button rounded style={{ ...styles.button, marginVertical: 7.5, backgroundColor: 'white' }}>
                                <Text style={{ fontSize: 20, fontFamily: 'OpenSans_Bold', color: 'black' }}>
                                    SIGN IN
                                </Text>
                            </Button>
                        </Animated.View>
                    </TapGestureHandler>
                    <Animated.View style={{ opacity: this.buttonOpacity, transform: [{ translateY: this.buttonY }] }}>
                        <Button rounded style={{ ...styles.button, marginVertical: 7.5, backgroundColor: 'rgb(217, 44, 35)' }}>
                            <Text style={{ fontSize: 20, fontFamily: 'OpenSans_Bold', color: 'white' }}>
                                SIGN IN WITH GOOGLE
                            </Text>
                        </Button>
                        {/* <Button rounded style={{ ...styles.button, marginVertical: 50, backgroundColor: 'rgb(85, 205, 95)' }}>
                        <Text style={{ fontSize: 20, fontFamily: 'OpenSans_Bold', cl }}>
                            SIGN UP
                        </Text>
                    </Button> */}
                    </Animated.View>
                    <Animated.View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 25, opacity: this.buttonOpacity, transform: [{ translateY: this.buttonY }] }}>
                        <Button transparent style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate('Sign Up')}>
                            <Text style={{ fontSize: 17, fontFamily: 'OpenSans_SemiBoldItalic', color: 'white' }}>
                                Don't have an account yet?
                            </Text>
                        </Button>
                    </Animated.View>
                    <Animated.View style={{ zIndex: this.textInputZindex, opacity: this.textInputOpacity, transform: [{ translateY: this.textInputY }], height: height / 2, ...StyleSheet.absoluteFill, top: null, justifyContent: 'center' }}>
                        <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                            <Animated.View style={{ top: 0, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                                <Button rounded style={styles.closeButton}>
                                    <Animated.Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>
                                        X
                                    </Animated.Text>
                                </Button>
                            </Animated.View>
                        </TapGestureHandler>
                        {/* <tboardAwareScrollView style={styles.container}> */}
                        <TextInput placeholder='EMAIL' style={styles.textInput} placeholderTextColor='rgba(0, 0, 0, 0.6)' />
                        <TextInput placeholder='PASSWORD' style={styles.textInput} placeholderTextColor='rgba(0, 0, 0, 0.6)' secureTextEntry={true} />
                        {/* </KeyboardAwareScrollView> */}
                        <Animated.View style={{ marginVertical: 50 }}>
                            <Button rounded style={{ ...styles.button, backgroundColor: 'white' }}>
                                <Text style={{ fontSize: 20, fontFamily: 'OpenSans_Bold', color: 'black' }}>
                                    SIGN IN
                                </Text>
                            </Button>
                        </Animated.View>
                    </Animated.View>
                </View>
            </View >
        );
    }
}
export default Frate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: 'white',
        height: 55,
        marginHorizontal: 50,
        marginVertical: 7.5,
        borderRadius: 27.5,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.4,
        elevation: 5
    },
    closeButton: {
        height: 40,
        width: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        position: 'absolute',
        left: width / 2 - 20,
        shadowOffset: { height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.4,
        elevation: 5
    },
    textInput: {
        height: 50,
        borderRadius: 25,
        // borderWidth: 0.5,
        backgroundColor: 'white',
        // borderColor: 'rgba(0, 0, 0, 0.5)',
        marginHorizontal: 50,
        marginVertical: 7.5,
        paddingLeft: 20,
        fontWeight: 'bold',
        shadowColor: 'black',
        shadowOpacity: 0.2
    }
});