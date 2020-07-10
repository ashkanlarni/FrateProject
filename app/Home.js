//import liraries
import React, { Component } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import { Container, Content, Header, Title } from 'native-base';
import axios from 'axios';

import CardComponent from './CardComponent';

var posts = []
var user = 'Ali';
var dbReady = false;

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default function Home() {
    const [refreshing, setRefreshing] = React.useState(false);

    onRefresh = React.useCallback(() => {
        setRefreshing(true);
        if (!dbReady) {
            AsyncStorage.getItem('username', (err, result) => {
                if (result != null) {
                    user = result;
                }
                dbReady = true;
            });
        }

        posts = []

        axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/posts/'
        )
            .then(res => {
                for (var u in res.data) {
                    var obj = res.data[u]
                    if (obj.Username == user) {
                        var r = obj.Ratings.split('-')

                        var p = {
                            "name": obj.Username,
                            "date": obj.Date,
                            "profilePic": require('../assets/images/profile/Ashkan.jpg'),
                            "image": obj.Filename,
                            "category": obj.Category,
                            "rate": r,
                            "caption": obj.Caption
                        }
                        posts.unshift(p)

                    }
                }

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
                                return (<CardComponent
                                    name={p.name}
                                    date={p.date}
                                    profilePicSource={p.profilePic}
                                    imageSource={p.image}
                                    category={p.category}
                                    rate={p.rate}
                                    caption={p.caption}
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
        backgroundColor: '#ffffff',
    },
    title: {
        fontFamily: 'Vision_Black',
        fontSize: 22,
        color: '#bfbfbf',
        alignContent: 'center'
    }
});