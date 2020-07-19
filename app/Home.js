//import liraries
import React, { Component } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import { Container, Content, Header, Title } from 'native-base';
import axios from 'axios';

import CardComponent from './CardComponent';

var pi = {
    "name": 'Ashkan',
    "date": 'Jun 20, 2020',
    "profilePic": require('../assets/images/profile/Ashkan.jpg'),
    "image": 'file:///Users/ashkan/Library/Developer/CoreSimulator/Devices/825688DF-57ED-46F7-ADB8-2ABEF50401F0/data/Containers/Data/Application/582F0363-4AD4-4322-8115-7B227FE4E194/Library/Caches/ExponentExperienceData/%2540anonymous%252FFrate-5fb55f5d-3d78-46f0-9e2f-c614ec9e7bc4/ImagePicker/D397414C-7B98-4F77-AF48-464821404C3D.jpg',
    "category": 0,
    "rate": ['1.1', '4.5', '2.5', '3.0'],
    "caption": 'This is a test caption for a hardcode post.',
    "comments": [['Ali', 'first comment first comment first comment first comment first comment first comment first comment '], ['Shayesteh', 'second comment'], ['Ashkan', 'third comment']]
}
var posts = []
var user = 'Ali';
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
                console.log(posts.length)
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
                            // posts.map((p) => {
                            //     return (<CardComponent
                            // name={p.name}
                            // date={p.date}
                            // profilePicSource={p.profilePic}
                            // imageSource={p.image}
                            // category={p.category}
                            // rate={p.rate}
                            // caption={p.caption}
                            // fullPagePost={false}
                            // goIntoAnotherPage={true}
                            // navigation={navigation}
                            //     />)
                            // })
                            <CardComponent
                                name={pi.name}
                                date={pi.date}
                                profilePicSource={pi.profilePic}
                                imageSource={pi.image}
                                category={pi.category}
                                rate={pi.rate}
                                caption={pi.caption}
                                comments={pi.comments}
                                fullPagePost={false}
                                goIntoAnotherPage={true}
                                canRate={false}
                                navigation={navigation}
                            />
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