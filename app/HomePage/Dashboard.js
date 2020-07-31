//import liraries
import React, { Component } from 'react';
import { RefreshControl, Text, SafeAreaView, ScrollView, StyleSheet, AsyncStorage, Dimensions } from 'react-native';
import { Container, Content, Header, Title, Button, Icon, Card, CardItem, Thumbnail, Body, Left, Right, View } from 'native-base';
import ProgressCircle from 'react-native-progress-circle';

import DashboardComponent from '../Components/DashboardComponent';

const { width, height } = Dimensions.get('window');

// create a component
class Dashboard extends Component {
    render() {
        return (
            <View style={styles.container}>
                <DashboardComponent
                    username={'Alil'}
                    name={'Alil'}
                    profilePicture={require('../../assets/images/profile/Ashkan.jpg')}
                    following={true}
                    averageRates={['2.9', '3.1', '4.4']}
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
