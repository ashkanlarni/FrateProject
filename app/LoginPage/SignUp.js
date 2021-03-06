//This is an example code for Navigator// 
import * as React from 'react';

import { View, Text, StyleSheet, Dimensions, TextInput, AsyncStorage } from 'react-native';
import Svg, { Image } from 'react-native-svg';
import { Button } from 'native-base';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width, height } = Dimensions.get('window');

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.username = "";
        this.email = "";
        this.password = "";
        this.passwordsmatch = false;
    }

    onPasswordChange(text) {
        if (text == this.password)
            this.passwordsmatch = true
        else
            this.passwordsmatch = false
    }

    onPressSignUpButton() {
        if (this.username == "" || this.password == "" || this.email == "") {
            alert('Please fill out all the fields.')
            return
        }

        if (!this.passwordsmatch) {
            alert("Passwords didn't match.")
            return
        }
        var user = {
            Username: this.username,
            Email: this.email,
            Password: this.password
        }
        var correct = true;

        axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/login/'
        )
            .then(res => {
                for (var u in res.data) {
                    var obj = res.data[u]
                    if (obj.username == user.Username || obj.email == user.Email)
                        correct = false
                }
                if (correct) {
                    axios.post('https://nameless-tor-88964.herokuapp.com/api/fusers/login/', user)
                        .then(res => {
                        })
                }
                if (correct == true) {
                    try {
                        AsyncStorage.setItem(
                            'username',
                            user.Username
                        );
                        AsyncStorage.setItem(
                            'email',
                            user.Email
                        );
                    } catch (error) {
                    }
                    alert('Hooray.');
                    isSignedIn = true;
                    // TODO
                }
                else
                    alert('There is already an account with this email address.');
                // TODO
            })


    }
    render() {
        return (
            <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} contentContainerStyle={styles.container} scrollEnabled={false}>
                <View style={{ flex: 1, backgroundColor: '#f2f2f2', justifyContent: 'flex-end' }}>
                    <View style={StyleSheet.absoluteFill}>
                        <Svg height={height} width={width}>
                            <Image
                                href={require('../../assets/images/SignUpBackground.png')}
                                height={height}
                                width={width}
                                preserveAspectRatio='xMidYMid slice'
                            />
                        </Svg>
                    </View>
                    <View style={{ height: height, justifyContent: 'center', alignItems: 'center' }}>
                        <TextInput
                            onChangeText={(text) => this.username = text}
                            placeholder='USERNAME'
                            style={styles.textInput}
                            placeholderTextColor='rgba(0, 0, 0, 0.6)'
                            textContentType={'emailAddress'}
                            clearButtonMode={'while-editing'}
                        />
                        <TextInput
                            onChangeText={(text) => this.email = text}
                            placeholder='EMAIL'
                            style={styles.textInput}
                            placeholderTextColor='rgba(0, 0, 0, 0.6)'
                            textContentType={'emailAddress'}
                            clearButtonMode={'while-editing'}
                            keyboardType={'email-address'}
                        />
                        <TextInput onChangeText={(text) => this.password = text}
                            placeholder='PASSWORD'
                            style={styles.textInput}
                            placeholderTextColor='rgba(0, 0, 0, 0.6)'
                            secureTextEntry={true}
                            autoCorrect={false}
                            spellCheck={false}
                            textContentType={'password'}
                            clearButtonMode={'while-editing'}
                        // TODO: returnKeyType={'next'}
                        />
                        <TextInput
                            onChangeText={(text) => this.onPasswordChange(text)}
                            placeholder='RE-ENTER PASSWORD'
                            style={styles.textInput}
                            placeholderTextColor='rgba(0, 0, 0, 0.6)'
                            secureTextEntry={true}
                            autoCorrect={false}
                            spellCheck={false}
                            textContentType={'password'}
                            clearButtonMode={'while-editing'}
                            returnKeyType={'done'}
                        />
                        <Button rounded
                            onPress={() => this.onPressSignUpButton()}
                            style={{ ...styles.button, marginVertical: 50, backgroundColor: 'rgb(85, 205, 95)' }}>
                            <Text style={{ fontFamily: 'SamsungSans_Bold', fontSize: 18 }}>
                                {'SIGN UP'}
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
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'white',
        height: 65,
        width: 3 * width / 5,
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
        width: 3 * width / 5,
        borderRadius: 25,
        borderWidth: 0.3,
        backgroundColor: 'white',
        borderColor: 'rgba(0, 0, 0, 0.5)',
        marginHorizontal: 50,
        marginVertical: 10,
        paddingLeft: 20,
        fontFamily: 'SamsungSans_Medium',
        shadowColor: 'black',
        shadowOpacity: 0.2
    }
});