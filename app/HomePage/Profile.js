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
var averageRates = []

var posts = [];

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

function Profile({ route }) {
    /* 2. Get the param */
    const { name, profilePicSource, isFollowing, navigation } = route.params;

    const [refreshing, setRefreshing] = React.useState(false);

    onRefresh = React.useCallback(() => {
        setRefreshing(true);
        var average = [0.0, 0.0, 0.0]

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

                var tempposts = []
                var temppostid = []

                axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/posts/'
                )
                    .then(res => {
                        numofposts = [0, 0, 0]
                        for (var p in res.data) {
                            var post = res.data[p]
                            if (post.username == nameid) {
                                tempposts.push(post)
                                temppostid.push(post.id)

                                numofposts[post.category] += 1

                                var r = post.ratings.split('-')
                                var sum = 0
                                for (var i = 0; i < r.length; i++) {
                                    sum += parseFloat(r[i])
                                }
                                average[post.category] += sum / 4
                            }
                        }

                        axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/comments/'
                        )
                            .then(res1 => {
                                var combody = []
                                for (var c in res1.data) {
                                    var comment = res1.data[c]
                                    if (temppostid.includes(comment.post)) {
                                        combody.push(comment)
                                    }
                                }

                                axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/login/'
                                )
                                    .then(res2 => {
                                        var userids = []
                                        var usernames = []
                                        for (var u in res2.data) {
                                            var use = res2.data[u]
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
                                                'profilePicSource': require('../../assets/images/profile/Ashkan.jpg'),
                                                'imageSource': p.filename,
                                                'category': p.category,
                                                'rate': r,
                                                'rateCount': p.rateCount,
                                                'caption': p.caption,
                                                'comments': com,
                                                'fullPagePost': false,
                                                'goIntoAnotherPage': true,
                                                'canRate': false
                                            }


                                            posts.unshift(newpost)
                                        }
                                        averageRates = []
                                        for (var i = 0; i < 3; i++) {
                                            if (numofposts[i] != 0)
                                                average[i] = (average[i] / numofposts[i])
                                            average[i] = average[i].toFixed(1)
                                            averageRates.push(average[i].toString())
                                        }
                                        console.log(averageRates)
                                    })
                            })


                    })
            })

        wait(1000).then(() => setRefreshing(false));
    }, [refreshing]);

    return (
        <Container>
            <ScrollView
                contentContainerStyle={{ flex: 1 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={styles.container}>
                    {console.log(posts)}
                    <DashboardComponent
                        userid={userid}
                        username={username}
                        nameid={nameid}
                        name={name}
                        profilePicture={profilePicSource}
                        isFollowing={isFollowing}
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
