//This is an example code for Navigator// 
import * as React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput } from 'react-native';
import { Button } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width, height } = Dimensions.get('window');

class SignUp extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        // const { navigate } = this.props.navigation;
        return (
            <KeyboardAwareScrollView>
                <View style={{ flex: 1, backgroundColor: '#f2f2f2', justifyContent: 'flex-end' }}>
                    <View style={StyleSheet.absoluteFill}>
                        <Image
                            source={require('../assets/images/bg2.png')}
                            style={{ flex: 1, height: null, width: null }}
                        />
                    </View>
                    <View style={{ height: height, justifyContent: 'center' }}>
                        <TextInput placeholder='USERNAME' style={styles.textInput} placeholderTextColor='rgba(0, 0, 0, 0.6)' />
                        <TextInput placeholder='EMAIL' style={styles.textInput} placeholderTextColor='rgba(0, 0, 0, 0.6)' />
                        <TextInput placeholder='PASSWORD' style={styles.textInput} placeholderTextColor='rgba(0, 0, 0, 0.6)' secureTextEntry={true} />
                        <TextInput placeholder='RE-ENTER PASSWORD' style={styles.textInput} placeholderTextColor='rgba(0, 0, 0, 0.6)' secureTextEntry={true} />
                        <Button rounded style={{ ...styles.button, marginVertical: 50, backgroundColor: 'rgb(85, 205, 95)' }}>
                            <Text style={{ fontSize: 20, fontFamily: 'OpenSans_Bold' }}>
                                SIGN UP
                        </Text>
                        </Button>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}
export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'white',
        height: 65,
        marginHorizontal: 50,
        marginVertical: 7.5,
        borderRadius: 32.5,
        alignItems: 'center',
        justifyContent: 'center',
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
        marginVertical: 15,
        paddingLeft: 20,
        fontWeight: 'bold',
        shadowColor: 'black',
        shadowOpacity: 0.2
    }
});