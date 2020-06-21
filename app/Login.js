import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native';
import { Button } from 'native-base';
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import Svg, { Image } from 'react-native-svg';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


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

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.email = "";
        this.password = "";
        this.buttonOpacity = new Value(1);

        this.state = {
            isDisabled: true
        };

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
    onPressSignInButton() {
        if (this.password == "" || this.email == "") {
            alert('Please fill out all the fields.')
            return
        }

        var correct = false

        axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/login/'
        )
            .then(res => {
                for (var u in res.data) {
                    var obj = res.data[u]
                    if (obj.Email == this.email && obj.Password == this.password) {
                        correct = true;
                    }
                }
                if (correct) {
                    alert('Hooray.');
                    this.props.navigation.navigate('Home');
                }
                else
                    alert('The email or password did not match our records. Please try again.')

            })
    }

    render() {
        return (
            <KeyboardAwareScrollView>
                <View style={{ flex: 1, backgroundColor: '#f6f6f6', justifyContent: 'flex-end' }}>
                    <Animated.View style={{ ...StyleSheet.absoluteFill, transform: [{ translateY: this.bgY }] }}>
                        <Svg height={height} width={width}>
                            <Image
                                href={require('../assets/images/LoginBackground.jpg')}
                                height={height}
                                width={width}
                                preserveAspectRatio='xMidYMid slice'
                            />
                        </Svg>
                    </Animated.View>
                    <Animated.View style={{ height: 2 * height / 3, justifyContent: 'center', alignItems: 'center', transform: [{ translateY: this.logoY }] }}>
                        <Text style={{ fontSize: 66, fontFamily: 'Vision_Black', color: 'white', marginVertical: 30 }}>
                            {'F  R  A  T  E'}
                        </Text>
                        <Text style={{ ...styles.vision, fontFamily: 'Vision_BoldItalic' }}>
                            {'A Rating Social Media'}
                        </Text>
                    </Animated.View>
                    <View style={{ height: height / 3, justifyContent: 'center' }}>
                        <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                            <Animated.View style={{ opacity: this.buttonOpacity, transform: [{ translateY: this.buttonY }] }}>
                                <Button rounded style={styles.button} >
                                    <Text style={{ ...styles.vision, color: 'black' }}>
                                        {'SIGN IN'}
                                    </Text>
                                </Button>
                            </Animated.View>
                        </TapGestureHandler>
                        <Animated.View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 30, opacity: this.buttonOpacity, transform: [{ translateY: this.buttonY }] }}>
                            <Button transparent style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => this.props.navigation.navigate('Sign Up')}>
                                <Text style={{ ...styles.vision, fontSize: 18 }}>
                                    {"Don't have an account yet?"}
                                </Text>
                            </Button>
                        </Animated.View>
                        <Animated.View style={{ zIndex: this.textInputZindex, opacity: this.textInputOpacity, transform: [{ translateY: this.textInputY }], height: height / 2, ...StyleSheet.absoluteFill, top: null, justifyContent: 'center' }}>
                            <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                                <Animated.View style={{ top: 0, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
                                    <Button rounded style={styles.closeButton}>
                                        <Animated.Text style={{ ...styles.vision, fontSize: 18, color: 'black' }}>
                                            {'X'}
                                        </Animated.Text>
                                    </Button>
                                </Animated.View>
                            </TapGestureHandler>
                            <TextInput
                                onChangeText={(text) => this.email = text}
                                placeholder='EMAIL'
                                style={styles.textInput}
                                placeholderTextColor='rgba(0, 0, 0, 0.6)'
                                textContentType={'emailAddress'}
                                clearButtonMode={'while-editing'}
                                keyboardType={'email-address'}
                            // returnKeyType={'next'}
                            />
                            <TextInput
                                onChangeText={(text) => this.password = text}
                                placeholder='PASSWORD'
                                style={styles.textInput}
                                placeholderTextColor='rgba(0, 0, 0, 0.6)'
                                secureTextEntry={true}
                                autoCorrect={false}
                                spellCheck={false}
                                textContentType={'password'}
                                clearButtonMode={'while-editing'}
                                returnKeyType={'done'}
                            />
                            <Animated.View style={{ marginVertical: 50 }}>
                                <Button rounded
                                    onPress={() => this.onPressSignInButton()}
                                    style={styles.button}>
                                    <Text style={{ ...styles.vision, color: 'black' }}>
                                        {'SIGN IN'}
                                    </Text>
                                </Button>
                            </Animated.View>
                        </Animated.View>
                    </View>
                </View >
            </KeyboardAwareScrollView>
        );
    }
}
export default Login;

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
        borderWidth: 0.3,
        backgroundColor: 'white',
        borderColor: 'rgba(0, 0, 0, 0.5)',
        marginHorizontal: 50,
        marginVertical: 7.5,
        paddingLeft: 20,
        fontFamily: 'Vision_Bold',
        shadowColor: 'black',
        shadowOpacity: 0.2
    },
    vision: {
        fontFamily: 'Vision_Heavy',
        fontSize: 20,
        color: 'white'
    }
});