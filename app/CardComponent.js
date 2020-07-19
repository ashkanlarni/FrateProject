//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Button, Icon, Card, CardItem, Thumbnail, Body, Left, Right } from 'native-base';
import ProgressCircle from 'react-native-progress-circle'

import SliderComponent from './Slider/SliderComponent';

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

function goToPost(props) {
    props.navigation.navigate('Post', {
        name: props.name,
        date: props.date,
        profilePicSource: props.profilePicSource,
        imageSource: props.imageSource,
        category: props.category,
        rate: props.rate,
        caption: props.caption,
        comments: props.comments,
        fullPagePost: true,
        goIntoAnotherPage: false
    });
}

// create a component
class CardComponent extends Component {
    constructor(props) {
        super(props);

        this.openRating = this.props.canRate;
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

    onSubmitRating() {
        var ratings = [4.6, 2.0, 3.7, 2.1]
        var b = props.rate.map(parseFloat)
        var newRatings = ''

        for (var i = 0; i < 4; i++) {
            var t = ( b[i] * props.rateCount + ratings[i] ) / (props.rateCount + 1)
            t = t.toFixed(1)
            newRatings += t.toString() + '-'
        }

        newRatings = newRatings.substring(0, newRatings.length - 1)
        var newCount = (props.rateCount + 1).toString()

        axios.patch('https://nameless-tor-88964.herokuapp.com/api/fusers/posts/'+props.postid+'/', {rateCount: newCount, ratings: newRatings})
            .then(res => {
                // console.log(res)
            })


        
    }

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
                <CardItem cardBody button={this.props.goIntoAnotherPage} onPress={() => goToPost(this.props)}>
                    <Image
                        source={{ uri: this.props.imageSource }}
                        style={{ height: width, width: null, flex: 1 }}
                    />
                </CardItem>
                {
                    this.openRating
                    &&
                    <CardItem style={{ height: 140, backgroundColor: 'white', borderColor: 'black' }}>
                        <Body style={styles.body}>
                            <SliderComponent
                                sliderHeight={160}
                                barColor={colors[category[this.props.category]]}
                            />
                        </Body>
                        <Body style={styles.body}>
                            <SliderComponent
                                sliderHeight={160}
                                barColor={colors[category[this.props.category]]}
                            />
                        </Body>
                        <Body style={styles.body}>
                            <SliderComponent
                                sliderHeight={160}
                                barColor={colors[category[this.props.category]]}
                            />
                        </Body>
                        <Body style={styles.body}>
                            <SliderComponent
                                sliderHeight={160}
                                barColor={colors[category[this.props.category]]}
                            />
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
                <CardItem button={this.props.goIntoAnotherPage} onPress={() => goToPost(this.props)}>
                    <Body>
                        <Text style={{ fontFamily: 'Vision_Regular', fontSize: 14, textAlign: 'left', textAlignVertical: 'auto' }}>
                            {this.props.caption}
                        </Text>
                    </Body>
                </CardItem>
                {
                    this.props.fullPagePost
                    &&
                    <CardItem>
                        <Body>
                            {this.props.comments.map((p) => {
                                return (
                                    <Text style={{ fontFamily: 'Vision_Light', fontSize: 13, textAlign: 'left', textAlignVertical: 'auto' }}>
                                        <Text style={{ fontFamily: 'Vision_Bold', fontSize: 13, textAlign: 'left', textAlignVertical: 'auto' }}>
                                            {p[0]}{' '}
                                        </Text>
                                        {p[1]}
                                    </Text>
                                )
                            })}
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
