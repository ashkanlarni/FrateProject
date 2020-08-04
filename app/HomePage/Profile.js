//import liraries
import React from 'react';
import { RefreshControl, View, SafeAreaView, ScrollView, Text, StyleSheet, Dimensions, TextInput } from 'react-native';
import { Container, Content, Header, Title } from 'native-base';
import axios from 'axios';

import DashboardComponent from '../Components/DashboardComponent';

var username = 'Ashkan'
var userid = 1

var nameid = 0


var follower_length = 0
var following_length = 0
var numofposts = [0, 0, 0]
var averageRates = [0, 0, 0]

var posts = [];

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

function Profile({ route, navigation }) {
    /* 2. Get the param */
    const { name, profilePicSource } = route.params;

    const [refreshing, setRefreshing] = React.useState(false);

    onRefresh = React.useCallback(() => {
        setRefreshing(true);

        axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/login/'
        )
            .then(res => {
                for (var u in res.data) {
                    var obj = res.data[u]
                    if (obj.username == name) {
                        nameid = obj.id
                    }

                }
                axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/followers/'
                )
                    .then(res => {
                        var followers = []
                        var following = []
                        for (var u in res.data) {
                            var obj = res.data[u]
                            if (obj.follower == nameid) {
                                following.push(obj.following)
                            }
                            if (obj.following == nameid) {
                                followers.push(obj.follower)
                            }
                        }
                        following_length = following.length
                        follower_length = followers.length
                    })

                posts = []

                axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/posts/'
                )
                    .then(res => {
                        for (var p in res.data) {
                            var post = res.data[p]
                            if (post.username == nameid) {
                                numofposts[post.category] += 1

                                var r = post.ratings.split('-')
                                sum = 0
                                for (var i = 0; i < r.length; i++) {
                                    sum += parseFloat(r[i])
                                }
                                averageRates += sum / 4

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
                                                var name = ''
                                                for (var u in res.data) {
                                                    var use = res.data[u]
                                                    if (comusers.includes(use.id)) {
                                                        var index = comusers.indexOf(use.id)
                                                        com.push([use.username, combody[index]])
                                                    }
                                                    if (use.id == post.username)
                                                        name = use.username
                                                }

                                                var rc = 0
                                                if (post.rateCount.length != 0)
                                                    rc = parseInt(post.rateCount)
                                                var count = post.rateCount.split('-')

                                                var newpost = {
                                                    'postid': post.id,
                                                    'name': name,
                                                    'date': post.date,
                                                    'profilePicSource': require('../../assets/images/profile/Ashkan.jpg'),
                                                    'imageSource': post.filename,
                                                    'category': post.category,
                                                    'rate': r,
                                                    'rateCount': post.rateCount,
                                                    'caption': post.caption,
                                                    'comments': com,
                                                    'fullPagePost': false,
                                                    'goIntoAnotherPage': true,
                                                    'canRate': false
                                                }

                                                posts.unshift(newpost)
                                            })
                                    })
                            }
                        }
                        for (var i = 0; i < 3; i++) {
                            if (numofposts[i] != 0)
                                averageRates[i] = (averageRates[i] / numofposts[i])
                            averageRates[i] = averageRates[i].toFixed(1).toString()
                        }
                    })
            })

        wait(1000).then(() => setRefreshing(false));
    }, [refreshing]);

    return (
        <Container>
            <ScrollView>
                <View style={styles.container}>
                    <DashboardComponent
                        userid={userid}
                        username={username}
                        name={name}
                        profilePicture={profilePicSource}
                        followers={follower_length}
                        followings={following_length}
                        numberOfPosts={numofposts}
                        averageRates={averageRates}
                        posts={posts}
                        navigation={navigation}
                    />
                </View>
            </ScrollView>
        </Container>
    );
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fefefe',
    },
});

//make this component available to the app
export default Profile;
