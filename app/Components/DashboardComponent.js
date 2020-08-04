//import liraries
import React, { Component } from 'react';
import { RefreshControl, Text, SafeAreaView, ScrollView, StyleSheet, AsyncStorage, Dimensions, Image } from 'react-native';
import { Container, Content, Header, Title, Button, Card, CardItem, Thumbnail, View } from 'native-base';
import ProgressCircle from 'react-native-progress-circle';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import axios from 'axios';

import CardComponent from './CardComponent';

const { width, height } = Dimensions.get('window');

const colors = {
    "Photography": '#e0115f',
    "Art": '#0080ff',
    "Lifestyle": '#50c878'
}

// create a component
class DashboardComponent extends Component {
    constructor(props) {
        super(props);

        this.isSelfProfile = (this.props.username == this.props.name) ? true : false;

        this.state = {
            following: props.isFollowing
        }
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
            <Container style={styles.container}>
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView>
                        <Content>
                            <Card noShadow={true} transparent={true}>
                                <CardItem style={styles.cardItem}>
                                    <View style={{ width: width / 3, alignItems: 'flex-start' }}>
                                        <Text style={{ fontFamily: 'SamsungSans_Bold', fontSize: 18, left: 15 }}>{this.props.name}</Text>
                                    </View>
                                    <View style={{ width: width / 3, alignItems: 'center' }}>
                                        <Thumbnail
                                            large={true}
                                            source={this.props.profilePicture}
                                        />
                                    </View>
                                    <View style={{ width: width / 3, alignItems: 'flex-end' }}>
                                        {
                                            this.isSelfProfile ?
                                                (
                                                    <Button transparent onPress={() => this.props.navigation.navigate('Login', { screen: 'Login' })}>
                                                        <Text style={{ ...styles.samsungSans, color: '#0080ff', right: 15 }}>
                                                            {'Log Out'}
                                                        </Text>
                                                    </Button>
                                                ) : (
                                                    <SimpleLineIcons
                                                        name={this.state.following ? 'check' : 'plus'}
                                                        color={this.state.following ? '#50c878' : '#0080ff'}
                                                        size={30}
                                                        onPress={this.state.following ? this.onPressUnFollowButton : this.onPressFollowButton}
                                                        style={{ right: 15 }}
                                                    />
                                                )
                                        }
                                    </View>
                                </CardItem>
                                <CardItem style={styles.cardItem}>
                                    <View style={{ flexDirection: 'row', width: width, alignItems: 'center', justifyContent: 'center' }}>
                                        <Button transparent style={{ width: width / 2, justifyContent: 'center', flexDirection: 'column' }} onPress={() => this.props.navigation.navigate('Followers')}>
                                            <Text style={styles.samsungSans}>{'Followers'}</Text>
                                            <Text style={{ fontFamily: 'SamsungSans_Regular', fontSize: 16 }}>{this.props.followers}</Text>
                                        </Button>
                                        <Button transparent style={{ width: width / 2, justifyContent: 'center', flexDirection: 'column' }} onPress={() => this.props.navigation.navigate('Followings')}>
                                            <Text style={styles.samsungSans}>{'Followings'}</Text>
                                            <Text style={{ fontFamily: 'SamsungSans_Regular', fontSize: 16 }}>{this.props.followings}</Text>
                                        </Button>
                                    </View>
                                </CardItem>
                                <CardItem style={styles.cardItem}>
                                    <View style={{ flexDirection: 'row', flex: 1, width: width, justifyContent: 'space-around', backgroundColor: '#fbfbfb', borderRadius: 20 }}>
                                        <View style={styles.progressCircleView}>
                                            <Text style={{ ...styles.samsungSans, paddingBottom: 5 }}>{'Photography'}</Text>
                                            <Text style={{ fontFamily: 'SamsungSans_Regular', fontSize: 14, paddingBottom: 5 }}>
                                                {this.props.numberOfPosts[0]}{(this.props.numberOfPosts[0] == 1) ? ' Post' : ' Posts'}
                                            </Text>
                                            <ProgressCircle
                                                percent={this.props.averageRates[0] / 5 * 100}
                                                radius={18}
                                                borderWidth={4}
                                                color={colors['Photography']}
                                                shadowColor="#d3d3d3"
                                                bgColor="#fbfbfb"
                                            >
                                                <Text style={styles.progressCircleText}>
                                                    {this.props.averageRates[0]}
                                                </Text>
                                            </ProgressCircle>
                                        </View>
                                        <View style={styles.progressCircleView}>
                                            <Text style={{ ...styles.samsungSans, paddingBottom: 5 }}>{'Art'}</Text>
                                            <Text style={{ fontFamily: 'SamsungSans_Regular', fontSize: 14, paddingBottom: 5 }}>
                                                {this.props.numberOfPosts[1]}{(this.props.numberOfPosts[1] == 1) ? ' Post' : ' Posts'}
                                            </Text>
                                            <ProgressCircle
                                                percent={this.props.averageRates[1] / 5 * 100}
                                                radius={18}
                                                borderWidth={4}
                                                color={colors['Art']}
                                                shadowColor="#d3d3d3"
                                                bgColor="#fbfbfb"
                                            >
                                                <Text style={styles.progressCircleText}>
                                                    {this.props.averageRates[1]}
                                                </Text>
                                            </ProgressCircle>
                                        </View>
                                        <View style={styles.progressCircleView}>
                                            <Text style={{ ...styles.samsungSans, paddingBottom: 5 }}>{'Lifestyle'}</Text>
                                            <Text style={{ fontFamily: 'SamsungSans_Regular', fontSize: 14, paddingBottom: 5 }}>
                                                {this.props.numberOfPosts[2]}{(this.props.numberOfPosts[2] == 1) ? ' Post' : ' Posts'}
                                            </Text>
                                            <ProgressCircle
                                                percent={this.props.averageRates[2] / 5 * 100}
                                                radius={18}
                                                borderWidth={4}
                                                color={colors['Lifestyle']}
                                                shadowColor="#d3d3d3"
                                                bgColor="#fbfbfb"
                                            >
                                                <Text style={styles.progressCircleText}>
                                                    {this.props.averageRates[2]}
                                                </Text>
                                            </ProgressCircle>
                                        </View>
                                    </View>
                                </CardItem>
                                <>
                                    {
                                        this.props.posts.map((p) => {
                                            return (<CardComponent
                                                userid={this.props.userid}
                                                postid={p.postid}
                                                name={p.name}
                                                date={p.date}
                                                profilePicSource={p.profilePic}
                                                imageSource={p.image}
                                                category={p.category}
                                                rate={p.rate}
                                                rateCount={p.rateCount}
                                                caption={p.caption}
                                                comments={p.comments}
                                                navigation={this.props.navigation}
                                                fullPagePost={false}
                                            />)
                                        })
                                    }
                                </>
                            </Card>
                        </Content>
                    </ScrollView>
                </SafeAreaView>
            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    title: {
        fontFamily: 'Vision_Black',
        fontSize: 22,
        color: '#bfbfbf',
        alignContent: 'center'
    },
    samsungSans: {
        fontFamily: 'SamsungSans_Medium',
        fontSize: 16
    },
    progressCircleText: {
        fontFamily: 'SamsungSans_Medium',
        fontSize: 12
    },
    cardItem: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        backgroundColor: '#ffffff'
    },
    progressCircleView: {
        width: width / 3,
        alignItems: 'center',
        marginVertical: 20
    }
});

//make this component available to the app
export default DashboardComponent;
