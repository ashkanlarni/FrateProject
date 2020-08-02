//import liraries
import React, { Component } from 'react';
import { RefreshControl, Text, SafeAreaView, ScrollView, StyleSheet, AsyncStorage, Dimensions } from 'react-native';
import { Container, Content, Header, Title, Button, Icon, Card, CardItem, Thumbnail, Body, Left, Right, View } from 'native-base';
import ProgressCircle from 'react-native-progress-circle';

import DashboardComponent from '../Components/DashboardComponent';

const { width, height } = Dimensions.get('window');

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

// create a component
export default function Dashboard({ navigation }) {

    return (
        <View style={styles.container}>
            <DashboardComponent
                username={'Alil'}
                name={'Alil'}
                profilePicture={require('../../assets/images/profile/Ashkan.jpg')}
                isFollowing={true}
                followers={followers}
                followings={followings}
                numberOfPosts={[1, 41, 289]}
                averageRates={['2.9', '3.1', '4.4']}
                posts={posts}
                navigation={navigation}
            />
        </View>
    );
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    }
});
