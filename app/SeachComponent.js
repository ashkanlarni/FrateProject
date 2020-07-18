//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Button, Icon, Card, CardItem, Thumbnail, Body, Left, Right } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProgressCircle from 'react-native-progress-circle'
import Slider from "react-native-slider";

const { width, height } = Dimensions.get('window');

// create a component
class SearchComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card noShadow={true} transparent={true}>
                <CardItem style={{ justifyContent: 'center', alignItems: 'center', width: width }}>
                    <View style={{ width: width / 3, alignItems: 'flex-start' }}>
                        <Text style={{ fontFamily: 'Vision_Bold', fontSize: 18, left: 15 }}>{this.props.name}</Text>
                    </View>
                    <View style={{ width: width / 3, alignItems: 'center' }}>
                        <Thumbnail
                            source={this.props.profilePicSource}
                        />
                    </View>
                    <View style={{ width: width / 3, alignItems: 'flex-end' }}>
                        {
                            this.props.following
                            &&
                            <Button rounded
                                style={styles.button}>
                                <Text style={{ ...styles.vision, color: 'rgb(220, 50, 100)' }}>
                                    {'Follow'}
                                </Text>
                            </Button>
                        }
                        {
                            !this.props.following
                            &&
                            <Button rounded
                                style={{ ...styles.button, backgroundColor: 'rgb(220, 50, 100)' }}>
                                <Text style={{ ...styles.vision, color: 'white' }}>
                                    {'Following'}
                                </Text>
                            </Button>
                        }
                    </View>
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
    button: {
        backgroundColor: 'white',
        borderColor: 'rgb(220, 50, 100)',
        borderWidth: 2,
        height: 30,
        width: 85,
        marginHorizontal: 25,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        // shadowOffset: { height: 2 },
        // shadowColor: 'black',
        // shadowOpacity: 0.4,
        // elevation: 5
    },
    vision: {
        fontFamily: 'Vision_Bold',
        fontSize: 15
    },
    body: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

//make this component available to the app
export default SearchComponent;
