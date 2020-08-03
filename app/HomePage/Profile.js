//import liraries
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Container } from 'native-base';

import DashboardComponent from '../Components/DashboardComponent';

var posts = [{
    'postid': 1,
    'name': 'Alil',
    'date': 'July 30, 2020',
    'profilePicSource': require('../../assets/images/profile/Ashkan.jpg'),
    'imageSource': '../../assets/images/profile/Ashkan.jpg',
    'category': 1,
    'rate': ['1.0', '2.0', '3.0', '4.0'],
    'rateCount': 5,
    'caption': 'Hello',
    'comments': [['Ali', 'Salam'], ['Shay', 'Hi']],
    'fullPagePost': false,
    'goIntoAnotherPage': true,
    'canRate': false
}];

var followers = ['Ashkan', 'Ali', 'Shayesteh']
var followings = ['Soroush', 'Mazyar', 'Amin', 'Sina', 'Shahryar']

function Profile({ route, navigation }) {
    /* 2. Get the param */
    const { name, profilePicSource } = route.params;

    return (
        <Container>
            <ScrollView>
                <View style={styles.container}>
                    <DashboardComponent
                        username={'Alil'}
                        name={name}
                        profilePicture={profilePicSource}
                        followers={followers}
                        followings={followings}
                        numberOfPosts={[1, 41, 289]}
                        averageRates={['2.9', '3.1', '4.4']}
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
