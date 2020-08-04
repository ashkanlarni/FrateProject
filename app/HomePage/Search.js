//import liraries
import React from 'react';
import { RefreshControl, View, SafeAreaView, ScrollView, Text, StyleSheet, Dimensions, TextInput } from 'react-native';
import { Container, Content, Header, Title } from 'native-base';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SearchComponent from '../Components/SearchComponent';

const { width, height } = Dimensions.get('window');

var result = [];
var search = '';
var user = 'Ashkan';
var userid = 1

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default function Search({ navigation }) {
    const [refreshing, setRefreshing] = React.useState(false);

    onRefresh = React.useCallback(() => {
        setRefreshing(true);

        result = []

        axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/followers/'
        )
            .then(res => {
                var followers = []
                for (var u in res.data) {
                    var obj = res.data[u]
                    if (obj.follower == userid) {

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
                                if (followers.includes(obj.id))
                                    isF = true

                                var p = {
                                    id: obj.id,
                                    username: obj.username,
                                    profilePic: require('../../assets/images/profile/Ashkan.jpg'),
                                    isFollowing: isF
                                }
                                result.push(p);
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
            <Header style={{ backgroundColor: 'white', justifyContent: 'flex-start', alignItems: 'flex-start', height: 24 }} noShadow={true}>
                <View style={{ justifyContent: 'center', width: width }}>
                    <TextInput
                        onChangeText={(text) => search = text}
                        placeholder='Username'
                        style={{ ...styles.textInput, width: width }}
                        placeholderTextColor='rgba(0, 0, 0, 0.3)'
                        autoCorrect={false}
                        spellCheck={false}
                        textContentType={'username'}
                        clearButtonMode={'while-editing'}
                        returnKeyType={'search'}
                    />
                </View>
            </Header>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{ flex: 1 }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <Content>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', top: 25 }}>
                            <Text style={{ fontFamily: 'SamsungSans_Regular', fontSize: 14, color: 'grey' }}>
                                {'Pull down to search'}
                            </Text>
                            <MaterialCommunityIcons name="arrow-down" color={'grey'} size={20} style={{ marginHorizontal: 10 }} />
                        </View>
                        {
                            result.map((p) => {
                                return (<SearchComponent
                                    username={user}
                                    userid={userid}
                                    nameid={p.id}
                                    name={p.username}
                                    profilePicSource={p.profilePic}
                                    following={p.isFollowing}
                                    navigation={navigation}
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
        height: 40,
        backgroundColor: '#fafafa',
        paddingLeft: 20,
        fontFamily: 'SamsungSans_Medium'
    }
});

