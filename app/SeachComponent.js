//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Button, Card, CardItem, Thumbnail } from 'native-base';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
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
                <CardItem style={{ justifyContent: 'center', alignItems: 'center', width: width, height: 65, backgroundColor: '#ffffff' }}>
                    <View style={{ width: width / 3, alignItems: 'flex-start' }}>
                        <Text style={{ fontFamily: 'SamsungSans_Medium', fontSize: 18, left: 15 }}>{this.props.name}</Text>
                    </View>
                    <View style={{ width: width / 3, alignItems: 'center' }}>
                        <Thumbnail
                            source={this.props.profilePicSource}
                        />
                    </View>
                    <View style={{ width: width / 3, alignItems: 'flex-end' }}>
                        <SimpleLineIcons
                            name={this.state.following ? 'check' : 'plus'}
                            color={this.state.following ? '#50c878' : '#0080ff'}
                            size={30}
                            onPress={this.state.following ? this.onPressUnFollowButton : this.onPressFollowButton}
                            style={{ marginHorizontal: 50, justifyContent: 'center', alignItems: 'center' }}
                        />
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
    samsungSans: {
        fontFamily: 'SamsungSans_Bold',
        fontSize: 16
    },
    body: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

//make this component available to the app
export default SearchComponent;
