//import liraries
import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Dimensions } from 'react-native';
import { Button, Card, CardItem, Thumbnail, Body } from 'native-base';
import ProgressCircle from 'react-native-progress-circle';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import SliderComponent from './SliderComponent';

const width = Dimensions.get('window').width;

const colors = {
    "Photography": '#e0115f',
    "Art": '#0080ff',
    "Lifestyle": '#50c878'
};

const category = {
    0: 'Photography',
    1: 'Art',
    2: 'Lifestyle'
};

function goToPost(props) {
    props.navigation.navigate('Post', {
        name: props.name,
        date: props.date,
        profilePicSource: props.profilePicSource,
        imageSource: props.imageSource,
        category: props.category,
        rate: props.rate,
        rateCount: props.rateCount,
        postid: props.postid,
        caption: props.caption,
        comments: props.comments,
        fullPagePost: true,
        goIntoAnotherPage: false
    });
}

function goToDashboard(props) {
    props.navigation.navigate('Profile', {
        name: props.name,
        profilePicSource: props.profilePicSource,
    });
}

// create a component
class CardComponent extends Component {
    constructor(props) {
        super(props);

        this.openRating = this.props.fullPagePost;
        this.subrate = [];

        this.state = {
            rate1: 0.0,
            rate2: 0.0,
            rate3: 0.0,
            rate4: 0.0
        };

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

    change = (variable, value) => {
        this.setState({ [variable]: value })
    }

    onSubmitComment() {
        // fill here
    }

    onSubmitRating() {
        var ratings = [this.state.rate1, this.state.rate2, this.state.rate3, this.state.rate4]

        var rc = 0
        if (this.props.rateCount.length != 0)
            rc = parseInt(this.props.rateCount)

        var b = this.props.rate.map(parseFloat);
        var newRatings = ''
        for (var i = 0; i < 4; i++) {
            var t = (b[i] * rc + ratings[i]) / (rc + 1)
            t = t.toFixed(1)
            newRatings += t.toString() + '-'
        }

        newRatings = newRatings.substring(0, newRatings.length - 1)
        var newCount = (rc + 1).toString()

        axios.patch('https://nameless-tor-88964.herokuapp.com/api/fusers/posts/' + this.props.postid + '/', { rateCount: newCount, ratings: newRatings })
            .then(res => {
                // console.log(res)
            })
    }

    render() {
        return (
            <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} contentContainerStyle={styles.container} scrollEnabled={false}>
                <Card transparent={true} noShadow={true}>
                    <CardItem style={styles.cardItem} button={true} onPress={() => goToDashboard(this.props)}>
                        <View style={{ width: width / 3, alignItems: 'flex-start' }}>
                            <Text style={{ fontFamily: 'SamsungSans_Medium', fontSize: 16, left: 15 }}>{this.props.name}</Text>
                            <Text note style={{ fontFamily: 'SamsungSans_Light', fontSize: 11, left: 15, color: '#333333' }}>{this.props.date}</Text>
                        </View>
                        <View style={{ width: width / 3, alignItems: 'center' }}>
                            <Thumbnail
                                source={this.props.profilePicSource}
                            />
                        </View>
                        <View style={{ width: width / 3, alignItems: 'flex-end' }}>
                            <Text style={{ ...styles.samsungSans, fontSize: 16, right: 15 }}>{category[this.props.category]}</Text>
                        </View>
                    </CardItem>
                    <CardItem cardBody style={styles.cardItem}>
                        <Image
                            source={this.props.imageSource}
                            style={{ height: width, width: null, flex: 1 }}
                        />
                    </CardItem>
                    {
                        this.openRating
                        &&
                        <>
                            <CardItem style={{ height: 140, backgroundColor: '#ffffff' }}>
                                <Body style={styles.body}>
                                    <SliderComponent
                                        sliderHeight={160}
                                        barColor={colors[category[this.props.category]]}
                                        variable='rate1'
                                        value={this.state.rate1}
                                        changeFunction={this.change}
                                    />
                                </Body>
                                <Body style={styles.body}>
                                    <SliderComponent
                                        sliderHeight={160}
                                        barColor={colors[category[this.props.category]]}
                                        variable='rate2'
                                        value={this.state.rate2}
                                        changeFunction={this.change}
                                    />
                                </Body>
                                <Body style={styles.body}>
                                    <SliderComponent
                                        sliderHeight={160}
                                        barColor={colors[category[this.props.category]]}
                                        variable='rate3'
                                        value={this.state.rate3}
                                        changeFunction={this.change}
                                    />
                                </Body>
                                <Body style={styles.body}>
                                    <SliderComponent
                                        sliderHeight={160}
                                        barColor={colors[category[this.props.category]]}
                                        variable='rate4'
                                        value={this.state.rate4}
                                        changeFunction={this.change}
                                    />
                                </Body>
                            </CardItem>
                            <CardItem style={{ height: 50, backgroundColor: '#ffffff' }}>
                                <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Button rounded style={{ width: 100, justifyContent: 'center', backgroundColor: '#50c878', height: 36 }}>
                                        <Text style={{ fontFamily: 'SamsungSans_Medium', fontSize: 14, color: 'white' }} onPress={() => this.onSubmitRating()}>
                                            {'SUBMIT'}
                                        </Text>
                                    </Button>
                                </Body>
                            </CardItem>
                        </>
                    }
                    <CardItem button={!this.props.fullPagePost} onPress={() => goToPost(this.props)} style={{ height: 70, backgroundColor: '#ffffff' }}>
                        <Body style={styles.body}>
                            <ProgressCircle
                                percent={this.props.rate[0] / 5 * 100}
                                radius={18}
                                borderWidth={4}
                                color={colors[category[this.props.category]]}
                                shadowColor="#d3d3d3"
                                bgColor="white"
                            >
                                <Text style={styles.samsungSans} >{[this.props.rate[0]]}</Text>
                            </ProgressCircle>
                            <Text style={{ ...styles.samsungSans, paddingTop: 5 }}>
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
                                <Text style={styles.samsungSans} >{[this.props.rate[1]]}</Text>
                            </ProgressCircle>
                            <Text style={{ ...styles.samsungSans, paddingTop: 5 }}>
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
                                <Text style={styles.samsungSans} >{[this.props.rate[2]]}</Text>
                            </ProgressCircle>
                            <Text style={{ ...styles.samsungSans, paddingTop: 5 }}>
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
                                <Text style={styles.samsungSans} >{[this.props.rate[3]]}</Text>
                            </ProgressCircle>
                            <Text style={{ ...styles.samsungSans, paddingTop: 5 }}>
                                {this.subrate[3]}
                            </Text>
                        </Body>
                    </CardItem>
                    <CardItem button={!this.props.fullPagePost} onPress={() => goToPost(this.props)} style={styles.cardItem}>
                        <Body>
                            <Text style={{ fontFamily: 'SamsungSans_Regular', fontSize: 14, textAlign: 'left', textAlignVertical: 'auto' }}>
                                {this.props.caption}
                            </Text>
                        </Body>
                    </CardItem>
                    {
                        this.props.fullPagePost
                        &&
                        <CardItem style={{ ...styles.cardItem, flexDirection: 'column' }}>
                            <Body style={{ flexDirection: 'row' }}>
                                {/* commenting */}
                                <TextInput
                                    // onChangeText={(text) => this.username = text}
                                    multiline={true}
                                    placeholder='comment...'
                                    style={styles.textInput}
                                    placeholderTextColor='rgba(0, 0, 0, 0.5)'
                                />
                                <Button transparent onPress={() => this.onSubmitComment()}>
                                    <SimpleLineIcons name="cursor" color={'#888888'} size={14} style={{ transform: [{ rotate: '45deg' }] }} />
                                </Button>
                            </Body>
                            <Body>
                                {this.props.comments.map((p) => {
                                    return (
                                        <Text style={{ fontFamily: 'SamsungSans_Thin', fontSize: 12, textAlign: 'left', textAlignVertical: 'auto' }}>
                                            <Text style={{ fontFamily: 'SamsungSans_Regular', fontSize: 12, textAlign: 'left', textAlignVertical: 'auto' }}>
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
            </KeyboardAwareScrollView>
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
    samsungSans: {
        fontFamily: 'SamsungSans_Medium',
        fontSize: 12
    },
    body: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardItem: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        backgroundColor: '#ffffff'
    },
    textInput: {
        width: 4.4 * width / 5,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 0.5,
        backgroundColor: '#ffffff',
        marginVertical: 10,
        fontFamily: 'SamsungSans_Regular',
    }
});

//make this component available to the app
export default CardComponent;
