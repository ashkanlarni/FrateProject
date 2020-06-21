//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Button, Icon, Card, CardItem, Thumbnail, Body, Left, Right } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProgressCircle from 'react-native-progress-circle'

const { width, height } = Dimensions.get('window');

const colors = {
    "Lifestyle": '#00a572',
    "Art": '#2196f3',
    "Photography": '#e91e63',
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

    render() {
        return (
            <Card>
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
                        source={this.props.imageSource}
                        style={{ height: width, width: null, flex: 1 }}
                    />
                </CardItem>
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
                        <Text style={{ fontFamily: 'Vision_Regular', fontSize: 14, textAlign: 'left', textAlignVertical: 'auto' }}>
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
