//import liraries
import React, { Component } from 'react';
import { RefreshControl, Text, SafeAreaView, ScrollView, StyleSheet, AsyncStorage, Dimensions, Image } from 'react-native';
import { Container, Content, Header, Title, Button, Card, CardItem, Thumbnail, View } from 'native-base';
import ProgressCircle from 'react-native-progress-circle';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import axios from 'axios';

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
            following: props.following
        }
    }

    toggle = () => { this.setState({ following: !this.state.following }) }

    onPressFollowButton = () => {
        this.toggle()

        // var f = {
        //     Follower: this.username,
        //     Following: this.name
        // }

        // axios.post('https://nameless-tor-88964.herokuapp.com/api/fusers/followers/', f)
        //     .then(res => {
        //         // console.log(res)
        //     })
    }

    onPressUnFollowButton = () => {
        this.toggle()
        // axios.get('https://nameless-tor-88964.herokuapp.com/api/fusers/followers/'
        // )
        //     .then(res => {
        //         var id = 0
        //         for (var u in res.data) {
        //             var obj = res.data[u]
        //             if (obj.follower == this.username && obj.following == this.name) {
        //                 id = obj.id
        //                 break
        //             }
        //         }
        //         axios.delete('https://nameless-tor-88964.herokuapp.com/api/fusers/followers/' + id + '/')
        //             .then(res => {
        //                 // console.log(res)
        //             })
        //     })
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header style={{ height: 50, backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-around' }}>
                    <Title style={styles.title}>
                        F
                </Title>
                    <Title style={styles.title}>
                        R
                </Title>
                    <Title style={styles.title}>
                        A
                </Title>
                    <Title style={styles.title}>
                        T
                </Title>
                    <Title style={styles.title}>
                        E
                </Title>
                </Header>
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView>
                        <Content>
                            <Card noShadow={true} transparent={true}>
                                <CardItem style={styles.cardItem}>
                                    <View style={{ width: width / 3, alignItems: 'flex-start' }}>
                                        <Text style={{ fontFamily: 'SamsungSans_Bold', fontSize: 20, left: 15 }}>{this.props.name}</Text>
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
                                                    <Button transparent>
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
                                        <Button transparent style={{ width: width / 2, justifyContent: 'center', flexDirection: 'column' }}>
                                            <Text style={styles.samsungSans}> {'Followers'}</Text>
                                            <Text style={styles.samsungSans}>{'290'}</Text>
                                        </Button>
                                        <Button transparent style={{ width: width / 2, justifyContent: 'center', flexDirection: 'column' }}>
                                            <Text style={styles.samsungSans}>{'Followings'}</Text>
                                            <Text style={styles.samsungSans}>{'123'}</Text>
                                        </Button>
                                    </View>
                                </CardItem>
                                <CardItem style={styles.cardItem}>
                                    <View style={{ flexDirection: 'row', flex: 1, width: width, justifyContent: 'space-around', backgroundColor: '#fafafa', borderRadius: 5 }}>
                                        <View style={styles.progressCircleView}>
                                            <Text style={{ ...styles.samsungSans, paddingBottom: 10 }}>{'Art'}</Text>
                                            <ProgressCircle
                                                percent={this.props.averageRates[1] / 5 * 100}
                                                radius={18}
                                                borderWidth={4}
                                                color={colors['Art']}
                                                shadowColor="#d3d3d3"
                                                bgColor="white"
                                            >
                                                <Text style={styles.progressCircleText} >{this.props.averageRates[1]}</Text>
                                            </ProgressCircle>
                                        </View>
                                        <View style={styles.progressCircleView}>
                                            <Text style={{ ...styles.samsungSans, paddingBottom: 10 }}>{'Photography'}</Text>
                                            <ProgressCircle
                                                percent={this.props.averageRates[0] / 5 * 100}
                                                radius={18}
                                                borderWidth={4}
                                                color={colors['Photography']}
                                                shadowColor="#d3d3d3"
                                                bgColor="white"
                                            >
                                                <Text style={styles.progressCircleText} >{this.props.averageRates[0]}</Text>
                                            </ProgressCircle>
                                        </View>
                                        <View style={styles.progressCircleView}>
                                            <Text style={{ ...styles.samsungSans, paddingBottom: 10 }}>{'Lifestyle'}</Text>
                                            <ProgressCircle
                                                percent={this.props.averageRates[2] / 5 * 100}
                                                radius={18}
                                                borderWidth={4}
                                                color={colors['Lifestyle']}
                                                shadowColor="#d3d3d3"
                                                bgColor="white"
                                            >
                                                <Text style={styles.progressCircleText} >{this.props.averageRates[2]}</Text>
                                            </ProgressCircle>
                                        </View>
                                    </View>
                                </CardItem>
                                <CardItem cardBody style={{ ...styles.cardItem }}>
                                    <Image
                                        source={require('../assets/images/feed/2.jpg')}
                                        style={{ height: width, width: null, flex: 1 }}
                                    />
                                </CardItem>
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
