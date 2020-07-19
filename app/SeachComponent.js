//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Button, Icon, Card, CardItem, Thumbnail, Body, Left, Right } from 'native-base';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

// create a component
class SearchComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            following: props.following
        }
        this.username = props.username
        this.name = props.name
    }

    toggle = () => { this.setState({ following: !this.state.following }) }

    onPressFollowButton = () => {
        this.toggle()

        var f = {
            Follower: this.username,
            Following: this.name
        }

        axios.post('https://nameless-tor-88964.herokuapp.com/api/fusers/followers/', f)
            .then(res => {
                // console.log(res)
            })

    }

    onPressUnFollowButton = () => {
        this.toggle()

        axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/followers/'
        )
            .then(res => {
                var id = 0
                for (var u in res.data) {
                    var obj = res.data[u]
                    if (obj.follower == this.username && obj.following == this.name) {
                        id = obj.id
                        break
                    }
                }


                axios.delete('https://nameless-tor-88964.herokuapp.com/api/fusers/followers/' + id + '/')
                    .then(res => {
                        // console.log(res)
                    })
            })
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
                            this.state.following
                            &&
                            <Button rounded
                                style={styles.button}
                                onPress={this.onPressFollowButton}
                            >
                                <Text style={{ ...styles.vision, color: 'rgb(220, 50, 100)' }}>
                                    {'Follow'}
                                </Text>
                            </Button>
                        }
                        {
                            !this.state.following
                            &&
                            <Button rounded
                                style={{ ...styles.button, backgroundColor: 'rgb(220, 50, 100)' }}
                                onPress={this.onPressUnFollowButton}
                            >
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
        height: 34,
        width: 95,
        marginHorizontal: 25,
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.1,
        elevation: 5
    },
    vision: {
        fontFamily: 'Vision_Heavy',
        fontSize: 16
    },
    body: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

//make this component available to the app
export default SearchComponent;
