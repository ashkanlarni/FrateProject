//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Button, Icon, Card, CardItem, Thumbnail, Body, Left, Right } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProgressCircle from 'react-native-progress-circle'

const { width, height } = Dimensions.get('window');

// create a component
class CardComponent extends Component {
    render() {

        const images = {
            "1": require('../assets/images/feed/1.jpg'),
            "2": require('../assets/images/feed/2.jpg'),
            "3": require('../assets/images/feed/3.jpg')
        }

        return (
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail
                                    source={require('../assets/images/me.png')}
                                />
                                <Body>
                                    <Text style={{ fontFamily: 'Roboto_Regular' }}>Ashkan</Text>
                                    <Text note style={{ fontFamily: 'Roboto_Light' }}>Jun 9, 2020</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image
                                source={images[this.props.imageSource]}
                                style={{ height: width, width: null, flex: 1 }}
                            />
                        </CardItem>
                        <CardItem style={{ height: 50 }}>
                            <Right>
                                <ProgressCircle
                                    percent={30}
                                    radius={18}
                                    borderWidth={4}
                                    color="#3399FF"
                                    shadowColor="#d3d3d3"
                                    bgColor="white"
                                >
                                    <Text style={{ fontSize: 12, fontFamily: 'Roboto_Light' }} >{[this.props.rate]}</Text>
                                </ProgressCircle>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>
                                    <Text style={{ fontWeight: "900" }}>varun</Text>
                                    {' '}{'Ea do Lorem occaecat laborum do. Minim ullamco ipsum minim eiusmod dolore cupidatat magna exercitation amet proident qui. Est do irure magna dolor adipisicing do quis labore excepteur. Commodo veniam dolore cupidatat nulla consectetur do nostrud ea cupidatat ullamco labore. Consequat ullamco nulla ullamco minim.'}
                                </Text>
                            </Body>
                        </CardItem>
                    </Card>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});

//make this component available to the app
export default CardComponent;
