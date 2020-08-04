//import liraries
import React from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Container, Content, Header, Title } from 'native-base';
import axios from 'axios';

import CardComponent from '../Components/CardComponent';

var posts = [
    {
        "postid": 1,
        "name": 'Ashkan',
        "date": 'July 20, 2020',
        "profilePic": require('../../assets/images/profile/Ashkan.jpg'),
        "image": require('../../assets/images/feed/2.jpg'),
        "category": 0,
        "rate": ['1.0', '2.0', '3.0', '4.0'],
        "rateCount": 50,
        "caption": 'Nothing',
        "comments": [['Ali', 'Hi'], ['Shay', 'Hello']]
    }
]
var user = 'Ashkan';
var userid = 1;
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
                    if (obj.follower == userid) {
                        followers.push(obj.following)
                    }
                }
                axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/posts/'
                )
                    .then(res => {
                        for (var p in res.data) {
                            var post = res.data[p]
                            if (post.username == userid || followers.includes(post.username)) {
                                var r = post.ratings.split('-')

                                var com = []
                                axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/comments/'
                                )
                                    .then(res => {
                                        var comusers = []
                                        var combody = []
                                        for (var c in res.data) {
                                            var comment = res.data[u]
                                            if (comment.post == post.id) {
                                                comusers.push(comment.username)
                                                combody.push(comment.comment)
                                            }
                                        }

                                        axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/login/'
                                        )
                                            .then(res => {
                                                for (var u in res.data) {
                                                    var use = res.data[u]
                                                    if (comusers.includes(use.id)) {
                                                        var index = comusers.indexOf(use.id)
                                                        com.push([use.username, combody[index]])
                                                    }
                                                }

                                                var rc = 0
                                                if (post.rateCount.length != 0)
                                                    rc = parseInt(post.rateCount)
                                                var count = post.rateCount.split('-')

                                                var newpost = {
                                                    "postid": post.id,
                                                    "name": post.username,
                                                    "date": post.date,
                                                    "profilePic": require('../../assets/images/profile/Ashkan.jpg'),
                                                    "image": post.filename,
                                                    "category": post.category,
                                                    "rate": r,
                                                    "rateCount": post.rateCount,
                                                    "caption": post.caption,
                                                    "comments": com
                                                }

                                                posts.unshift(newpost)
                                            })
                                    })
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
        backgroundColor: '#ffffff',
    },
    title: {
        fontFamily: 'Vision_Black',
        fontSize: 22,
        color: '#bfbfbf',
        alignContent: 'center'
    }
});