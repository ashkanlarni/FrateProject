//import liraries
import React from 'react';
import { RefreshControl, View, SafeAreaView, ScrollView, Text, StyleSheet, Dimensions, TextInput } from 'react-native';
import { Container, Content, Header, Title, Button } from 'native-base';
import axios from 'axios';

import SearchComponent from '../Components/SearchComponent';

const { width, height } = Dimensions.get('window');

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default function Search({ navigation }) {
    const [refreshing, setRefreshing] = React.useState(false);

    this.result = []
    this.search = "Ashkan"
    this.user = 'Ashkan'
    this.userid = 1

    onRefresh = React.useCallback(() => {
        console.log('ajab2', this.search)
        setRefreshing(true);

        this.result = []
        var followers = []
        axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/followers/'
        )
        
            .then(res => {
                for (var u in res.data) {
                    var obj = res.data[u]
                    if (obj.follower == this.userid) {
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
                                if (followers.includes(obj.id))
                                    isF = true

                                var p = {
                                    id : obj.id,
                                    username: obj.username,
                                    profilePic: require('../../assets/images/profile/Ashkan.jpg'),
                                    isFollowing: isF
                                }
                                this.result.push(p);
                                console.log('big', p);
                                console.log('small', this.result);
                            }
                        }

                    })
            })

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
                        onChangeText={(text) => this.search = text, console.log('ok', this.search, 'ko')}
                        onEndEditing={(text) => this.search = text, console.log('ok2', this.search, 'ko2')}
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
                <Button transparent style={styles.searchButton} onPress={() => { console.log('kir') }}>
                    <Text style={{ fontFamily: 'SamsungSans_Bold', fontSize: 18, color: '#0080ff' }}>
                        {'Search'}
                    </Text>
                </Button>
            </Header>
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', width: width }}>
                <ScrollView
                    contentContainerStyle={{ flex: 1 }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <Content>
                        {
                            this.result.map((p) => {
                                console.log('ajab', this.result);
                                return (<SearchComponent
                                    username={this.user}
                                    userid={thid.userid}
                                    nameid={p.id}
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

