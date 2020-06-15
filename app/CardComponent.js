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



    constructor(props) {
        super(props);

        this.subrate = [];

        switch (this.props.category) {
            case 'Lifestyle':
                this.subrate = ['Beauty', 'Attractive', 'Quality', 'Overall'];
                break;
            case 'Art':
                this.subrate = ['Creativity', 'Spirit', 'Quality', 'Harmony'];
                break;
            case 'Photography':
                this.subrate = ['Framing', 'Lightning', 'Harmony', 'Overall'];
                break;
        }
    }

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
                <CardItem style={{ height: width / 6 }}>
                    <Body style={styles.body}>
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
                        <Text style={styles.roboto}>
                            {this.subrate[0]}
                        </Text>
                    </Body>
                    <Body style={styles.body}>
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
                            <Text style={styles.roboto}>
                                {this.subrate[1]}
                            </Text>
                    </Body>
                    <Body style={styles.body}>
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
                        <Text style={styles.roboto}>
                            {this.subrate[2]}
                        </Text>
                    </Body>
                    <Body style={styles.body}>
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
                        <Text style={styles.roboto}>
                            {this.subrate[3]}
                        </Text>
                    </Body>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text style={{ fontFamily: 'Roboto_Regular' }}>
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
    },
    body: {
        alignItems: 'center'
    }
});

//make this component available to the app
export default CardComponent;
