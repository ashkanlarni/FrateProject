//import liraries
import React, { Component } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, AsyncStorage } from 'react-native';
import { Container, Content, Header, Title } from 'native-base';

import SearchComponent from '../Components/SearchComponent';

var posts = [{
    'username': 'Alil',
    'name': 'Ashkan',
    'profilePicSource': require('../../assets/images/profile/Ashkan.jpg'),
    'following': true
}, {
    'username': 'Alil',
    'name': 'Ali',
    'profilePicSource': require('../../assets/images/profile/Ali.jpg'),
    'following': false
}, {
    'username': 'Alil',
    'name': 'Shayesteh',
    'profilePicSource': require('../../assets/images/profile/Shayesteh.jpg'),
    'following': true
}]

// create a component
function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default function Followers({ navigation }) {
    // const [refreshing, setRefreshing] = React.useState(false);

    // onRefresh = React.useCallback(() => {
    //     setRefreshing(true);

    //     posts = []

    //     axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/followers/'
    //     )
    //         .then(res => {
    //             var followers = []
    //             for (var u in res.data) {
    //                 var obj = res.data[u]
    //                 if (obj.follower == user) {
    //                     followers.push(obj.following)
    //                 }
    //             }
    //             axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/posts/'
    //             )
    //                 .then(res => {
    //                     for (var u in res.data) {
    //                         var obj = res.data[u]
    //                         if (obj.username == user || followers.includes(obj.username)) {
    //                             var r = obj.ratings.split('-')

    //                             var com = []
    //                             com.push(['Shay', 'Lalay'])
    //                             com.push(['Ashkan', 'Hooraa'])
    //                             com.push(['Ali', 'This is just a comment!'])

    //                             var rc = 0
    //                             if (obj.rateCount.length != 0)
    //                                 rc = parseInt(obj.rateCount)

    //                             var count = obj.rateCount.split('-')

    //                             var p = {
    //                                 "postid": obj.id,
    //                                 "name": obj.username,
    //                                 "date": obj.date,
    //                                 "profilePic": require('../../assets/images/profile/Ashkan.jpg'),
    //                                 "image": obj.filename,
    //                                 "category": obj.category,
    //                                 "rate": r,
    //                                 "rateCount": obj.rateCount,
    //                                 "caption": obj.caption,
    //                                 "comments": com
    //                             }

    //                             posts.unshift(p)
    //                         }
    //                     }
    //                 })
    //         })
    //     wait(1000).then(() => setRefreshing(false));
    // }, [refreshing]);

    return (
        <Container style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{ flex: 1 }}
                // refreshControl={
                //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                // }
                >
                    <Content>
                        {
                            posts.map((p) => {
                                return (<SearchComponent
                                    username={p.username}
                                    name={p.name}
                                    profilePicSource={p.profilePicSource}
                                    following={p.following}
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
});
