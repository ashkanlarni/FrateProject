//import liraries
import React from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, AsyncStorage, Dimensions } from 'react-native';
import { Container, Content, Header, Title } from 'native-base';
import axios from 'axios';

import DashboardComponent from '../Components/DashboardComponent';

const { width, height } = Dimensions.get('window');

var username = 'Ashkan'
var userid = 1

var posts = [];

var follower_length = 0
var following_length = 0
var numofposts = [0, 0, 0]
var averageRates = []

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

// create a component
export default function Dashboard({ navigation }) {

    const [refreshing, setRefreshing] = React.useState(false);

    onRefresh = React.useCallback(() => {
        setRefreshing(true);
        var average = [0.0, 0.0, 0.0]
        axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/followers/'
        )
            .then(res => {
                var followers = []
                var following = []
                for (var u in res.data) {
                    var obj = res.data[u]
                    if (obj.follower == userid) {
                        following.push(obj.following)
                    }
                    if (obj.following == userid) {
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
                    if (post.username == userid) {
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
                    .then(res => {
                        var combody = []
                        for (var c in res.data) {
                            var comment = res.data[c]
                            if (temppostid.includes(comment.post)) {
                                combody.push(comment.comment)
                            }
                        }

                        axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/login/'
                        )
                            .then(res => {
                                var userids = []
                                var usernames = []
                                for (var u in res.data) {
                                    var use = res.data[u]
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


        wait(1000).then(() => setRefreshing(false));
    }, [refreshing]);

    return (
        <Container>
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
                    <DashboardComponent
                        userid={userid}
                        username={username}
                        nameid={userid}
                        name={username}
                        profilePicture={require('../../assets/images/profile/Ashkan.jpg')}
                        isFollowing={true}
                        followers={follower_length}
                        followings={following_length}
                        numberOfPosts={numofposts}
                        averageRates={averageRates}
                        posts={posts}
                        navigation={navigation}
                    />
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
