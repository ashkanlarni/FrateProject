//import liraries
import React, { Component } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, AsyncStorage } from 'react-native';
import { Container, Content, Header, Title } from 'native-base';
import axios from 'axios';

import CardComponent from './CardComponent';

var posts = []
var user = 'Alil';
var dbReady = false;

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default function Home({ navigation }) {
    const [refreshing, setRefreshing] = React.useState(false);

    onRefresh = React.useCallback(() => {
        setRefreshing(true);

        posts = []

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
                axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/posts/'
                )
                    .then(res => {
                        for (var u in res.data) {
                            var obj = res.data[u]
                            if (obj.username == user || followers.includes(obj.username)) {
                                var r = obj.ratings.split('-')

                                var com = []
                                com.push(['Shay', 'Lalay'])
                                com.push(['Ashkan', 'Hooraa'])
                                com.push(['Ali', 'This is just a comment!'])

                                var rc = 0
                                if (obj.rateCount.length != 0)
                                    rc = parseInt(obj.rateCount)

                                var count = obj.rateCount.split('-')

                                var p = {
                                    "postid": obj.id,
                                    "name": obj.username,
                                    "date": obj.date,
                                    "profilePic": require('../assets/images/profile/Ashkan.jpg'),
                                    "image": obj.filename,
                                    "category": obj.category,
                                    "rate": r,
                                    "rateCount": obj.rateCount,
                                    "caption": obj.caption,
                                    "comments": com
                                }

                                posts.unshift(p)
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
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{ flex: 1 }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <Content>
                        {
                            posts.map((p) => {
                                console.log('a', p)
                                console.log('b', posts)
                                return (<CardComponent
                                    postid={p.postid}
                                    name={p.name}
                                    date={p.date}
                                    profilePicSource={p.profilePic}
                                    imageSource={p.image}
                                    category={p.category}
                                    rate={p.rate}
                                    rateCount={p.rateCount}
                                    caption={p.caption}
                                    comments={p.comments}
                                    fullPagePost={false}
                                    goIntoAnotherPage={true}
                                    canRate={false}
                                    navigation={navigation}
                                />)
                            })
                        }
                    </Content>
                </ScrollView>
            </SafeAreaView>
        </Container>
    );
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
    }
});