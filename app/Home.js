//import liraries
import React, { Component } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Container, Content, Header, Title } from 'native-base';
import Constants from 'expo-constants';

import CardComponent from './CardComponent';

const ashkanPost1 = {
    "name": 'Ashkan',
    "date": 'Jun 9, 2020',
    "profilePic": require('../assets/images/profile/Ashkan.jpg'),
    "image": require('../assets/images/feed/1.jpg'),
    "category": 'Lifestyle',
    "rate": [1.5, 2.5, 3.5, 4.5],
    "caption": 'Ea do Lorem occaecat laborum do. Minim ullamco ipsum minim eiusmod dolore cupidatat magna exercitation amet proident qui. Est do irure magna dolor adipisicing do quis labore excepteur.',
}

const aliPost1 = {
    "name": 'Ali',
    "date": 'Feb 14, 2020',
    "profilePic": require('../assets/images/profile/Ali.jpg'),
    "image": require('../assets/images/feed/2.jpg'),
    "category": 'Photography',
    "rate": [1.7, 2.7, 3.7, 4.7],
    "caption": 'Minim ullamco ipsum minim eiusmod dolore cupidatat magna exercitation amet proident qui. Est do irure magna dolor adipisicing do quis labore excepteur.',
}

const shayestehPost1 = {
    "name": 'Shayesteh',
    "date": 'Aug 2, 2019',
    "profilePic": require('../assets/images/profile/Shayesteh.jpg'),
    "image": require('../assets/images/feed/3.jpg'),
    "category": 'Art',
    "rate": [1.9, 2.9, 3.9, 4.9],
    "caption": 'Est do irure magna dolor adipisicing do quis labore excepteur.'
}

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default function Home() {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
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
                        <CardComponent
                            name={ashkanPost1['name']}
                            date={ashkanPost1['date']}
                            profilePicSource={ashkanPost1['profilePic']}
                            imageSource={ashkanPost1['image']}
                            category={ashkanPost1['category']}
                            rate={ashkanPost1['rate']}
                            caption={ashkanPost1['caption']}
                        />
                        <CardComponent
                            name={aliPost1['name']}
                            date={aliPost1['date']}
                            profilePicSource={aliPost1['profilePic']}
                            imageSource={aliPost1['image']}
                            category={aliPost1['category']}
                            rate={aliPost1['rate']}
                            caption={aliPost1['caption']}
                        />
                        <CardComponent
                            name={shayestehPost1['name']}
                            date={shayestehPost1['date']}
                            profilePicSource={shayestehPost1['profilePic']}
                            imageSource={shayestehPost1['image']}
                            category={shayestehPost1['category']}
                            rate={shayestehPost1['rate']}
                            caption={shayestehPost1['caption']}
                        />
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