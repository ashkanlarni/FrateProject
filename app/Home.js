//import liraries
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';

import CardComponent from './CardComponent';

const images = {
    "1": require('../assets/images/feed/1.jpg'),
    "2": require('../assets/images/feed/2.jpg'),
    "3": require('../assets/images/feed/3.jpg')
}

const profilePic = {
    "1": require('../assets/images/profile/Ashkan.png'),
    "2": require('../assets/images/profile/Ali.jpg'),
    "3": require('../assets/images/profile/Shayesteh.jpg'),
}

const caption = {
    "1": ' Ea do Lorem occaecat laborum do. Minim ullamco ipsum minim eiusmod dolore cupidatat magna exercitation amet proident qui. Est do irure magna dolor adipisicing do quis labore excepteur.',
    "2": ' Minim ullamco ipsum minim eiusmod dolore cupidatat magna exercitation amet proident qui. Est do irure magna dolor adipisicing do quis labore excepteur.',
    "3": ' Est do irure magna dolor adipisicing do quis labore excepteur.'
}

// create a component
class Home extends Component {

    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <CardComponent
                        name="Ashkan"
                        date="Jun 9, 2020"
                        profilePicSource={profilePic[1]}
                        imageSource={images[1]}
                        category="lifestyle"
                        rate={[1.5, 2.5, 3.5, 4.5]}
                        caption={caption[1]}
                    />
                    <CardComponent
                        name="Ali"
                        date="Feb 14, 2020"
                        profilePicSource={profilePic[2]}
                        imageSource={images[2]}
                        category="photography"
                        rate={[1.7, 2.7, 3.7, 4.7]}
                        caption={caption[2]}
                    />
                    <CardComponent
                        name="Shayesteh"
                        date="Aug 2, 2019"
                        profilePicSource={profilePic[3]}
                        imageSource={images[3]}
                        category="art"
                        rate={[1.9, 2.9, 3.9, 4.9]}
                        caption={caption[3]}
                    />
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
