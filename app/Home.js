//import liraries
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';

import CardComponent from './CardComponent';

// create a component
class Home extends Component {

    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <CardComponent imageSource="1" rate="1.5" />
                    <CardComponent imageSource="2" rate="2.6" />
                    <CardComponent imageSource="3" rate="3.7" />
                </Content>
            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',t
        backgroundColor: '#ffffff',
    },
});

//make this component available to the app
export default Home;
