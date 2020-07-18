//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Button, Icon, Card, CardItem, Thumbnail, Body, Left, Right } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProgressCircle from 'react-native-progress-circle'
import Slider from "react-native-slider";

const { width, height } = Dimensions.get('window');

const colors = {
    "Lifestyle": '#00a572',
    "Art": '#2196f3',
    "Photography": 'rgb(220, 50, 100)',
}

const category = {
    0: 'Photography',
    1: 'Art',
    2: 'Lifestyle'
}

// create a component
class CardComponent extends Component {
    constructor(props) {
        super(props);

        this.openRating = false;
        this.subrate = [];

        switch (category[this.props.category]) {
            case 'Lifestyle':
                this.subrate = ['Beauty', 'Appeal', 'Quality', 'Overall'];
                break;
            case 'Art':
                this.subrate = ['Creativity', 'Spirit', 'Quality', 'Harmony'];
                break;
            case 'Photography':
                this.subrate = ['Framing', 'Lightning', 'Harmony', 'Overall'];
                break;
        }
    }

    state = {
        value: 0.2
    };

    RatingChanger() {
        // this.Ratings = !this.Ratings;
        console.log(this.Ratings);
    };

    render() {
        return (
            <Card transparent={false} noShadow={true}>
                <CardItem style={{ justifyContent: 'center', alignItems: 'center', width: width }}>
                    <View style={{ width: width / 3, alignItems: 'flex-start' }}>
                        <Text style={{ fontFamily: 'Vision_Bold', fontSize: 18, left: 15 }}>{this.props.name}</Text>
                        <Text note style={{ fontFamily: 'Vision_Light', fontSize: 12, left: 15, color: '#333333' }}>{this.props.date}</Text>
                    </View>
                    <View style={{ width: width / 3, alignItems: 'center' }}>
                        <Thumbnail
                            source={this.props.profilePicSource}
                        />
                    </View>
                    <View style={{ width: width / 3, alignItems: 'flex-end' }}>
                        <Text style={{ ...styles.vision, fontSize: 16, right: 15 }}>{category[this.props.category]}</Text>
                    </View>
                </CardItem>
                <CardItem cardBody>
                    <Image
                        source={{ uri: this.props.imageSource }}
                        style={{ height: width, width: null, flex: 1 }}
                    />
                </CardItem>
                {
                    this.openRating
                    &&
                    <CardItem style={{ height: 100, backgroundColor: 'white', borderColor: 'black', borderWidth: '2' }}>
                        <Body style={{ justifyContent: 'center', width: width }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'stretch', marginLeft: 0, marginRight: 100, width: width / 2 }}>
                                <Slider
                                    value={this.state.value}
                                    onValueChange={value => this.setState({ value })}
                                />
                                <Text>
                                    Value: {this.state.value}
                                </Text>
                            </View>
                        </Body>
                    </CardItem>
                }
                <CardItem style={{ height: 70 }}>
                    <Body style={styles.body}>
                        <ProgressCircle
                            percent={this.props.rate[0] / 5 * 100}
                            radius={18}
                            borderWidth={4}
                            color={colors[category[this.props.category]]}
                            shadowColor="#d3d3d3"
                            bgColor="white"
                        >
                            <Text style={styles.vision} >{[this.props.rate[0]]}</Text>
                        </ProgressCircle>
                        <Text style={{ ...styles.vision, paddingTop: 5 }}>
                            {this.subrate[0]}
                        </Text>
                    </Body>
                    <Body style={styles.body}>
                        <ProgressCircle
                            percent={this.props.rate[1] / 5 * 100}
                            radius={18}
                            borderWidth={4}
                            color={colors[category[this.props.category]]}
                            shadowColor="#d3d3d3"
                            bgColor="white"
                        >
                            <Text style={styles.vision} >{[this.props.rate[1]]}</Text>
                        </ProgressCircle>
                        <Text style={{ ...styles.vision, paddingTop: 5 }}>
                            {this.subrate[1]}
                        </Text>
                    </Body>
                    <Body style={styles.body}>
                        <ProgressCircle
                            percent={this.props.rate[2] / 5 * 100}
                            radius={18}
                            borderWidth={4}
                            color={colors[category[this.props.category]]}
                            shadowColor="#d3d3d3"
                            bgColor="white"
                        >
                            <Text style={styles.vision} >{[this.props.rate[2]]}</Text>
                        </ProgressCircle>
                        <Text style={{ ...styles.vision, paddingTop: 5 }}>
                            {this.subrate[2]}
                        </Text>
                    </Body>
                    <Body style={styles.body}>
                        <ProgressCircle
                            percent={this.props.rate[3] / 5 * 100}
                            radius={18}
                            borderWidth={4}
                            color={colors[category[this.props.category]]}
                            shadowColor="#d3d3d3"
                            bgColor="white"
                        >
                            <Text style={styles.vision} >{[this.props.rate[3]]}</Text>
                        </ProgressCircle>
                        <Text style={{ ...styles.vision, paddingTop: 5 }}>
                            {this.subrate[3]}
                        </Text>
                    </Body>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text style={{ fontFamily: 'Vision_Regular', fontSize: 14, textAlign: 'left', textAlignVertical: 'auto' }}
                            onPress={() => {
                                this.props.navigation.navigate('Post', {
                                    name: this.props.name,
                                    date: this.props.date,
                                    profilePicSource: this.props.profilePicSource,
                                    imageSource: this.props.imageSource,
                                    category: this.props.category,
                                    rate: this.props.rate,
                                    caption: this.props.caption,
                                    fullPagePost: true
                                });
                            }}>
                            {this.props.caption}
                        </Text>
                    </Body>
                </CardItem>
                {
                    this.props.fullPagePost
                    &&
                    <CardItem>
                        <Body>
                            <Text style={{ fontFamily: 'Vision_Light', fontSize: 13, textAlign: 'left', textAlignVertical: 'auto' }}>
                                <Text style={{ fontFamily: 'Vision_Bold', fontSize: 13, textAlign: 'left', textAlignVertical: 'auto' }}>
                                    {'Ali'}{' '}
                                </Text>
                                {'First comment, First commentFirst commentFirst commentFirst commentFirst comment First commentFirst comment'}
                            </Text>
                        </Body>
                    </CardItem>
                }
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
    vision: {
        fontFamily: 'Vision_Bold',
        fontSize: 13
    },
    body: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

//make this component available to the app
export default CardComponent;
