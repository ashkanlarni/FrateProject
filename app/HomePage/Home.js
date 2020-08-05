//import liraries
import React from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Container, Content, Header, Title } from 'native-base';
import axios from 'axios';

import CardComponent from '../Components/CardComponent';

var posts = [];
var user = 'Ashkan';
var userid = 1;
var dbReady = false;

var newpostid;
var newname;
var newdate;
var newprofilePic = require('../../assets/images/profile/Ashkan.jpg')
var newimage;
var newcategory
var newrate
var newrateCount
var newcaption
var newcomments = []


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
        var tempposts = []
        var temppostid = []


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
                    .then(res1 => {
                        for (var p in res1.data) {
                            var post = res1.data[p]
                            if (post.username == userid || followers.includes(post.username)) {

                                tempposts.push(post)
                                temppostid.push(post.id)
                            }
                        }

                        axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/comments/'
                        )
                            .then(res2 => {
                                var combody = []
                                for (var c in res2.data) {
                                    var comment = res2.data[u]
                                    if (temppostid.includes(comment.post)) {
                                        combody.push(comment)
                                    }
                                }

                                axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/login/'
                                )
                                    .then(res3 => {
                                        var userids = []
                                        var usernames = []
                                        for (var u in res3.data) {
                                            var use = res3.data[u]
                                            userids.push(use.id)
                                            usernames.push(use.username)
                                        }

                                        posts = []

                                        for (var i = 0; i < tempposts.length; i++) {
                                            var p = tempposts[i]
                                            var com = []
                                            for (var j = 0; j < combody.length; j++) {
                                                var c = combody[j]
                                                if (c.post == p.id) {
                                                    var ind = userids.indexOf(c.username)
                                                    var n = usernames[ind]
                                                    com.push([n, c.comment])
                                                }
                                            }
                                            var r = post.ratings.split('-')
                                            var index = userids.indexOf(p.username)
                                            var name = usernames[index]
                                            var newpost = {
                                                'postid': p.id,
                                                'name': name,
                                                'date': p.date,
                                                'profilePic': require('../../assets/images/profile/Ashkan.jpg'),
                                                'image': p.filename,
                                                'category': p.category,
                                                'rate': r,
                                                'rateCount': p.rateCount,
                                                'caption': p.caption,
                                                'comments': com,
                                            }

                                            posts.unshift(newpost)
                                        }



                                    })
                            })


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
                                console.log(posts)
                                return (<CardComponent
                                    userid={userid}
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