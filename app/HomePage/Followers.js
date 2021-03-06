//import liraries
import React from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';
import axios from 'axios';

import SearchComponent from '../Components/SearchComponent';

var followers = []

// create a component
function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default function Followers({ route, navigation }) {
    const { name, nameid } = route.params;

    var username = name
    var userid = nameid

    const [refreshing, setRefreshing] = React.useState(false);

    onRefresh = React.useCallback(() => {
        setRefreshing(true);

        followers = []

        axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/followers/'
        )
            .then(res => {
                var follows = []
                var followersid = []
                for (var u in res.data) {
                    var obj = res.data[u]
                    if (obj.follower == userid) {
                        follows.push(obj.following)
                    }
                    if (obj.following == userid) {
                        followersid.push(obj.follower)
                    }
                }

                axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/login/'
                )
                    .then(res => {
                        for (var u in res.data) {
                            var obj = res.data[u]
                            if (followersid.includes(obj.id)) {
                                var bool = false
                                if (follows.includes(obj.id))
                                    bool = true
                                var f = {
                                    "id": obj.id,
                                    "name": obj.username,
                                    "profilePicSource": require('../../assets/images/profile/Ashkan.jpg'),
                                    "following": bool
                                }
                                followers.push(f)
                            }
                            console.log('follow', followers)

                        }
                    })
            })


        wait(1000).then(() => setRefreshing(false));
    }, [refreshing]);

    return (
        <Container style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{ flex: 1 }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <Content>
                        {
                            followers.map((p) => {
                                return (<SearchComponent
                                    username={username}
                                    userid={userid}
                                    nameid={p.id}
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
        backgroundColor: '#ffffff',
    },
});
