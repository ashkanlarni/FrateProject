//import liraries
import React, { Component } from 'react';
import { RefreshControl, Text, SafeAreaView, ScrollView, StyleSheet, AsyncStorage, Dimensions } from 'react-native';
import { Container, Content, Header, Title, Button, Icon, Card, CardItem, Thumbnail, Body, Left, Right, View } from 'native-base';
import ProgressCircle from 'react-native-progress-circle';

import DashboardComponent from './DashboardComponent';

const { width, height } = Dimensions.get('window');

// create a component
class Dashboard extends Component {
    render() {
        return (
            <View style={styles.container}>
                <DashboardComponent
                    username={'Ashkan'}
                    profilePicture={require('../assets/images/profile/Ashkan.jpg')}
                    isSelfProfile={true}
                />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    }
});

//make this component available to the app
export default Dashboard;
