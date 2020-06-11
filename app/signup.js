//This is an example code for Navigator// 
import * as React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput } from 'react-native';
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

    onPressSignupButton() {
        if (this.username == "" || this.password == "" || this.email == "") {
            alert('Please fill all the fields')
            return
        }

        if (!this.passwordsmatch) {
            alert('Passwords do not match')
            return
        }
        var user = {
            Username: this.username,
            Email: this.email,
            Password: this.password
        }
        var correct = true;
        var users;

        console.log(user);

        axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/login/'
        )
            .then(res => {
                // console.log(res);
                console.log(res.data);
                for (var u in res.data) {
                    var obj = res.data[u]
                    if (obj.Username == user.Username || obj.Email == user.Email)
                        correct = false
                }
                console.log(correct)
                if (correct) {
                    axios.post('https://nameless-tor-88964.herokuapp.com/api/fusers/login/', user)
                        .then(res => {
                            // console.log(res);
                            console.log(res.data.Status);
                        })
                }
                console.log(correct)
                if (correct == true)
                    alert('Hoora');
                else
                    alert('You already have an account')
            })


    }
    render() {
        // const { navigate } = this.props.navigation;
        return (
            <KeyboardAwareScrollView>
                <View style={{ flex: 1, backgroundColor: '#f2f2f2', justifyContent: 'flex-end' }}>
                    <View style={StyleSheet.absoluteFill}>
                        <Image
                            source={require('../assets/images/SignUpBackground.png')}
                            style={{ flex: 1, height: null, width: null }}
                        />
                    </View>
                    <View style={{ height: height, justifyContent: 'center' }}>
                        <TextInput onChangeText={(text) => this.username = text}
                            placeholder='USERNAME' style={styles.textInput} placeholderTextColor='rgba(0, 0, 0, 0.6)' />
                        <TextInput onChangeText={(text) => this.email = text}
                            placeholder='EMAIL' style={styles.textInput} placeholderTextColor='rgba(0, 0, 0, 0.6)' />
                        <TextInput onChangeText={(text) => this.password = text}
                            placeholder='PASSWORD' style={styles.textInput} placeholderTextColor='rgba(0, 0, 0, 0.6)' secureTextEntry={true} />
                        <TextInput onChangeText={(text) => this.onPasswordChange(text)}
                            placeholder='RE-ENTER PASSWORD' style={styles.textInput} placeholderTextColor='rgba(0, 0, 0, 0.6)' secureTextEntry={true} />
                        <Button rounded
                            onPress={() => this.onPressSignupButton()}
                            style={{ ...styles.button, marginVertical: 50, backgroundColor: 'rgb(85, 205, 95)' }}>
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