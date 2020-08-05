//import liraries
import React from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';
import axios from 'axios';

import SearchComponent from '../Components/SearchComponent';

var username = 'Ashkan'
var userid = 1

var following = []

// create a component
function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

export default function Followings({ navigation }) {
    const [refreshing, setRefreshing] = React.useState(false);

    onRefresh = React.useCallback(() => {
        setRefreshing(true);

        following = []

        axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/followers/'
        )
            .then(res => {
                var followingid = []
                for (var u in res.data) {
                    var obj = res.data[u]
                    if (obj.follower == userid) {
                        followingid.push(obj.following)
                    }
                }

                axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/login/'
                )
                    .then(res => {
                        for (var u in res.data) {
                            var obj = res.data[u]
                            if (followingid.includes(obj.id)) {
                                var f = {
                                    "id": obj.id,
                                    "name": obj.username,
                                    "profilePicSource": require('../../assets/images/profile/Ashkan.jpg'),
                                    "following": true
                                }
                                following.push(f)
                            }
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
                            following.map((p) => {
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
