//import liraries
import React, { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet, TextInput, Dimensions, AsyncStorage } from 'react-native';
import { Button } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Container, Content, Header, Title } from 'native-base';
import RadioForm from 'react-native-simple-radio-button';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

var radio_props = [
    { label: 'Photography', value: 0 },
    { label: 'Art', value: 1 },
    { label: 'Lifesyle', value: 2 }
];

var checked = 0;
var captionText = '';
var pickedImage;
var user = 'Ashkan';
var userid = 2;
var dbReady = false


export default function Upload() {
    const [image, setImage] = useState(null);
    const [value, onChangeText] = React.useState('');

    useEffect(() => {
        (async () => {
            if (Constants.platform.ios) {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    function OnChangeCaption(text) {
        onChangeText(text)
        captionText = text
    };

    function OnPressUpButton() {
        var rate = ''
        for (var i = 0; i < 4; i++) {
            var rand1 = Math.floor(Math.random() * 5)
            var rand2 = Math.floor(Math.random() * 10)
            rate += rand1 + '.' + rand2 + '-'
        }
        rate = rate.substring(0, rate.length - 1)

        var post = {
            Username: userid,
            Filename: image,
            Category: checked,
            Ratings: rate,
            RateCount: '0',
            Caption: captionText,
        }


        axios.post('https://nameless-tor-88964.herokuapp.com/api/fusers/posts/', post)
            .then(res => {
                // console.log(res)
            })

    };


    return (
        <Container style={styles.container}>
            <Header style={{ height: 50, backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-around' }}>
                <Title style={styles.title}>
                    F
                    </Title>
                <Title style={styles.title}>
                    R
                    </Title>
                <Title style={styles.title}>
                    A
                    </Title>
                <Title style={styles.title}>
                    T
                    </Title>
                <Title style={styles.title}>
                    E
                    </Title>
            </Header>
            <Content>
                <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} contentContainerStyle={styles.container} scrollEnabled={false}>
                    <View style={{ justifyContent: 'center' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: height / 2.5, paddingTop: 10 }}>
                            {
                                image
                                &&
                                <Image source={{ uri: image }} style={{ width: 300, height: 300, borderRadius: 3 }} />
                            }
                            {
                                !image
                                &&
                                <SimpleLineIcons
                                    name='plus'
                                    color={'#0080ff'}
                                    size={100}
                                    onPress={pickImage}
                                />
                            }
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 10, paddingTop: 30, height: height / 10 }}>
                            <RadioForm
                                radio_props={radio_props}
                                initial={0}
                                onPress={(value) => { checked = value }}
                                formHorizontal={false}
                                labelHorizontal={true}
                                buttonColor={'#7285a5'}
                                selectedButtonColor={'#0080ff'}
                                buttonSize={6}
                                buttonOuterSize={18}
                                labelStyle={{ fontFamily: 'SamsungSans_Light', fontSize: 14 }}
                            />
                        </View>
                        <View style={{ justifyContent: 'center', height: height / 3 }}>
                            <View style={{ justifyContent: 'center' }}>
                                <TextInput
                                    editable
                                    maxLength={100}
                                    placeholder={'write your caption...'}
                                    multiline
                                    numberOfLines={4}
                                    onChangeText={text => OnChangeCaption(text)}
                                    value={value}
                                    style={{ ...styles.textInput, fontFamily: 'SamsungSans_Light' }}
                                />
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Button rounded
                                    onPress={() => OnPressUpButton()}
                                    style={styles.button}>
                                    <Text style={styles.samsungSans}>
                                        {'UPLOAD'}
                                    </Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </Content>
        </Container>
    );
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    title: {
        fontFamily: 'Vision_Black',
        fontSize: 22,
        color: '#bfbfbf',
        alignContent: 'center'
    },
    button: {
        backgroundColor: '#0080ff',
        height: 55,
        width: 3 * width / 5,
        marginHorizontal: 50,
        marginVertical: 20,
        borderRadius: 27.5,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 1
    },
    textInput: {
        height: 100,
        marginHorizontal: 10,
        marginVertical: 7.5,
        borderRadius: 7.5,
        borderWidth: 0.5,
        backgroundColor: 'white',
        borderColor: 'rgba(0, 0, 0, 0.35)',
        paddingLeft: 10,
        paddingTop: 5,
        fontFamily: 'SamsungSans_Medium',
        fontSize: 14,
        shadowColor: 'black',
        shadowOpacity: 0.0
    },
    samsungSans: {
        fontFamily: 'SamsungSans_Bold',
        fontSize: 18,
        color: 'white'
    }
});
