//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native';
import { Container, Content, Header, Title } from 'native-base';

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
                    })
            })

        
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
                            placeholder='SEARCH'
                            style={styles.textInput}
                            placeholderTextColor='rgba(0, 0, 0, 0.4)'
                            autoCorrect={false}
                            spellCheck={false}
                            textContentType={'username'}
                            clearButtonMode={'while-editing'}
                            returnKeyType={'search'}
                        />
                    </View>
                </Header>
                <Content>
                    <View style={{ justifyContent: 'center', width: width }}>

                        <SearchComponent
                            name={'Ashkan'}
                            profilePicSource={require('../assets/images/profile/Ashkan.jpg')}
                            following={true}
                        />
                        <SearchComponent
                            name={'Ali'}
                            profilePicSource={require('../assets/images/profile/Ali.jpg')}
                            following={false}
                        />
                        <SearchComponent
                            name={'Shayesteh'}
                            profilePicSource={require('../assets/images/profile/Shayesteh.jpg')}
                            following={false}
                        />
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
        backgroundColor: '#fdfdfd',
        paddingLeft: 20,
        fontFamily: 'Vision_Bold',
        shadowOffset: { height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.1
    },
    vision: {
        fontFamily: 'Vision_Heavy',
        fontSize: 20,
        color: 'white'
    }
});

//make this component available to the app
export default Search;