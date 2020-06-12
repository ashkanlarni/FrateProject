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
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail
                            source={this.props.profilePicSource}
                        />
                        <Body>
                            <Text style={{ fontFamily: 'Roboto_Regular' }}>{this.props.name}</Text>
                            <Text note style={{ fontFamily: 'Roboto_Light' }}>{this.props.date}</Text>
                        </Body>
                    </Left>
                    <Right>
                        <Text style={{ fontFamily: 'Roboto_Regular' }}>{this.props.category}</Text>
                    </Right>
                </CardItem>
                <CardItem cardBody>
                    <Image
                        source={this.props.imageSource}
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
                            <Text style={{ fontSize: 12, fontFamily: 'Roboto_Light' }} >{[this.props.rate[1]]}</Text>
                        </ProgressCircle>
                    </Right>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>
                            <Text style={{ fontWeight: "900" }}>{this.props.name}</Text>
                            {this.props.caption}
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
