//import liraries
import React from 'react';
import { RefreshControl, View, SafeAreaView, ScrollView, Text, StyleSheet, Dimensions, TextInput } from 'react-native';
import { Container, Content, Header, Title, Button } from 'native-base';
import axios from 'axios';

import SearchComponent from '../Components/SearchComponent';

const { width, height } = Dimensions.get('window');

var result = [];
var search = '';
var user = 'Alil';

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default function Search({ navigation }) {
    const [refreshing, setRefreshing] = React.useState(false);

    onRefresh = React.useCallback(() => {
        setRefreshing(true);

<<<<<<< HEAD
        result = []
=======
        this.result = []
>>>>>>> master

        axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/followers/'
        )
            .then(res => {
                var followers = []
                for (var u in res.data) {
                    var obj = res.data[u]
                    if (obj.follower == user) {
                        followers.push(obj.following)
                    }
                }
                axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/login/'
                )
                    .then(res => {
                        for (var u in res.data) {
                            var obj = res.data[u]
                            if (obj.username.startsWith(search)) {
                                var isF = false
                                if (followers.includes(obj.username))
                                    isF = true

                                var p = {
                                    username: obj.username,
                                    profilePic: require('../../assets/images/profile/Ashkan.jpg'),
                                    isFollowing: isF
                                }
                                result.push(p);
                            }
                        }

                    })
            })
<<<<<<< HEAD
=======

>>>>>>> master
        wait(1000).then(() => setRefreshing(false));
    }, [refreshing]);


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
                        onChangeText={(text) => search = text}
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
                <Button transparent style={styles.searchButton}>
                    <Text style={{ fontFamily: 'SamsungSans_Bold', fontSize: 18, color: '#0080ff' }}>
                        {'Search'}
                    </Text>
                </Button>
            </Header>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{ flex: 1 }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <Content>
                        {
                            result.map((p) => {
                                return (<SearchComponent
                                    username={user}
                                    name={p.username}
                                    profilePicSource={p.profilePic}
                                    following={p.isFollowing}
                                />)
                            })
                        }
                    </Content>
                </ScrollView>
            </SafeAreaView>
        </Container >
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
    textInput: {
        height: 50,
        backgroundColor: '#fafafa',
        paddingLeft: 20,
        fontFamily: 'SamsungSans_Medium'
    },
    searchButton: {
        height: 50,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        right: width / 6.5,
        bottom: 10
    }
});

