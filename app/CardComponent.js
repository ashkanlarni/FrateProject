//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Button, Icon, Card, CardItem, Thumbnail, Body, Left, Right } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProgressCircle from 'react-native-progress-circle'

const { width, height } = Dimensions.get('window');

const colors = {
    "Lifestyle": '#3cb371',
    "Art": '#1b7ced',
    "Photography": '#e0115f',
}

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
                            <Text style={{ fontFamily: 'Roboto_Black', fontSize: 16 }}>{this.props.name}</Text>
                            <Text note style={{ fontFamily: 'Roboto_Light', fontSize: 12 }}>{this.props.date}</Text>
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
                <CardItem style={{ height: width / 6.5 }}>
                    <Right>
                        <ProgressCircle
                            percent={this.props.rate[0] / 5 * 100}
                            radius={18}
                            borderWidth={4}
                            color={colors[this.props.category]}
                            shadowColor="#d3d3d3"
                            bgColor="white"
                        >
                            <Text style={{ fontSize: 12, fontFamily: 'Roboto_Regular' }} >{[this.props.rate[0]]}</Text>
                        </ProgressCircle>
                        <Text style={{ fontSize: 12, fontFamily: 'Roboto_Regular' }}>{this.props.category[2]}</Text>
                    </Right>
                    <Right>
                        <ProgressCircle
                            percent={this.props.rate[1] / 5 * 100}
                            radius={18}
                            borderWidth={4}
                            color={colors[this.props.category]}
                            shadowColor="#d3d3d3"
                            bgColor="white"
                        >
                            <Text style={{ fontSize: 12, fontFamily: 'Roboto_Regular' }} >{[this.props.rate[1]]}</Text>
                        </ProgressCircle>
                    </Right>
                    <Right>
                        <ProgressCircle
                            percent={this.props.rate[2] / 5 * 100}
                            radius={18}
                            borderWidth={4}
                            color={colors[this.props.category]}
                            shadowColor="#d3d3d3"
                            bgColor="white"
                        >
                            <Text style={{ fontSize: 12, fontFamily: 'Roboto_Regular' }} >{[this.props.rate[2]]}</Text>
                        </ProgressCircle>
                    </Right>
                    <Right>
                        <ProgressCircle
                            percent={this.props.rate[3] / 5 * 100}
                            radius={18}
                            borderWidth={4}
                            color={colors[this.props.category]}
                            shadowColor="#d3d3d3"
                            bgColor="white"
                        >
                            <Text style={{ fontSize: 12, fontFamily: 'Roboto_Regular' }} >{[this.props.rate[3]]}</Text>
                        </ProgressCircle>
                    </Right>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text style={{ fontFamily: 'Roboto_Regular' }}>
                            {/* <Text style={{ fontWeight: "900" }}>{this.props.name}</Text> */}
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
    roboto: {
        fontFamily: 'Roboto_Regular',
        fontSize: 12
    }
});

//make this component available to the app
export default CardComponent;
