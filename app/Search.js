//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native';
import { Container, Content, Header, Title, Button, Icon, Item } from 'native-base';
import axios from 'axios';

import SearchComponent from './SeachComponent'

const { width, height } = Dimensions.get('window');

// create a component
class Search extends Component {
    constructor(props) {
        super(props);
        this.search = "";
        this.result = [];
        this.username = 'Ali';
    }

    onSearchButtonPressed() {
        this.result = []
        console.log(this.result.length)
        axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/followers/'
        )
            .then(res => {
                var followers = []
                for (var u in res.data) {
                    var obj = res.data[u]
                    if (obj.follower == this.username) {
                        followers.push(obj.following)
                    }
                }
                axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/login/'
                )
                    .then(res => {
                        for (var u in res.data) {
                            var obj = res.data[u]
                            if (obj.username.startsWith(this.search)) {
                                var isF = false
                                if (followers.includes(obj.username))
                                    isF = true

                                var p = {
                                    username: obj.username,
                                    profilePic: require('../assets/images/profile/Ashkan.jpg'),
                                    isFollowing: isF
                                }
                                this.result.push(p)
                            }
                        }
                        console.log(this.result)
                    })
            })
            console.log(this.result.length)
            // while (this.result.length == 0) {
            //     console.log('lay')
            // }

    }

    render() {
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
                <Header style={{ backgroundColor: 'white', height: 50 }} noShadow={true}>
                    <View style={{ justifyContent: 'center', width: width, height: 14 }}>
                        <TextInput
                            onChangeText={(text) => this.search = text}
                            placeholder='Username'
                            style={{ ...styles.textInput, width: width, left: 50 }}
                            placeholderTextColor='rgba(0, 0, 0, 0.3)'
                            autoCorrect={false}
                            spellCheck={false}
                            textContentType={'username'}
                            clearButtonMode={'while-editing'}
                            returnKeyType={'search'}
                        />
                    </View>
                    <Button transparent style={styles.searchButton} onPress={() => this.onSearchButtonPressed()}>
                        <Text style={{ fontFamily: 'Vision_Heavy', fontSize: 20, color: '#0080ff' }}>
                            {'Search'}
                        </Text>
                    </Button>
                </Header>
                <Content>
                    <View style={{ justifyContent: 'center', width: width }}>
                        {
                            this.result.map((p) => {
                                return (<SearchComponent
                                    username={this.username}
                                    name={p.username}
                                    profilePicSource={p.profilePic}
                                    following={p.isFollowing}
                                />)
                            })
                        }
                    </View>
                </Content>
            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fdfdfd',
    },
    title: {
        fontFamily: 'Vision_Black',
        fontSize: 22,
        color: '#bfbfbf',
        alignContent: 'center'
    },
    textInput: {
        height: 50,
        backgroundColor: '#fafafa',
        paddingLeft: 20,
        fontFamily: 'Vision_Bold',
        shadowOffset: { height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.1
    },
    searchButton: {
        height: 50,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        right: width / 6,
        bottom: 5
    },
    vision: {
        fontFamily: 'Vision_Heavy',
        fontSize: 20,
        color: 'white'
    }
});

//make this component available to the app
export default Search;
