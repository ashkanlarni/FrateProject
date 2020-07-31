//import liraries
import React, { Component } from 'react';
import { RefreshControl, Text, SafeAreaView, ScrollView, StyleSheet, AsyncStorage, Dimensions } from 'react-native';
import { Container, Content, Header, Title, Button, Icon, Card, CardItem, Thumbnail, Body, Left, Right, View } from 'native-base';
import ProgressCircle from 'react-native-progress-circle';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

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
                                        <Text style={{ ...styles.samsungSans, left: 15 }}>{this.props.name}</Text>
                                    </View>
                                    <View style={{ width: width / 3, alignItems: 'center' }}>
                                        <Thumbnail
                                            large={true}
                                            source={this.props.profilePicture}
                                        />
                                    </View>
                                    <View style={{ width: width / 3, alignItems: 'center' }}>
                                        {
                                            this.isSelfProfile ?
                                                (
                                                    <Button transparent>
                                                        <Text style={{ ...styles.samsungSans, color: '#0080ff' }}>
                                                            {'Log Out'}
                                                        </Text>
                                                    </Button>
                                                ) : (
                                                    <SimpleLineIcons
                                                        name={this.state.following ? 'check' : 'plus'}
                                                        color={this.state.following ? '#50c878' : '#0080ff'}
                                                        size={30}
                                                        onPress={this.state.following ? this.onPressUnFollowButton : this.onPressFollowButton}
                                                        style={{ justifyContent: 'center', alignItems: 'center' }}
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
                                                percent={2.9 / 5 * 100}
                                                radius={18}
                                                borderWidth={3}
                                                color={'#0080ff'}
                                                shadowColor="#d3d3d3"
                                                bgColor="white"
                                            >
                                                <Text style={styles.progressCircleText} >{'2.9'}</Text>
                                            </ProgressCircle>
                                        </View>
                                        <View style={styles.progressCircleView}>
                                            <Text style={{ ...styles.samsungSans, paddingBottom: 10 }}>{'Photography'}</Text>
                                            <ProgressCircle
                                                percent={2.9 / 5 * 100}
                                                radius={18}
                                                borderWidth={3}
                                                color={'#e0115f'}
                                                shadowColor="#d3d3d3"
                                                bgColor="white"
                                            >
                                                <Text style={styles.progressCircleText} >{'2.9'}</Text>
                                            </ProgressCircle>
                                        </View>
                                        <View style={styles.progressCircleView}>
                                            <Text style={{ ...styles.samsungSans, paddingBottom: 10 }}>{'Lifestyle'}</Text>
                                            <ProgressCircle
                                                percent={2.9 / 5 * 100}
                                                radius={18}
                                                borderWidth={3}
                                                color={'#50c878'}
                                                shadowColor="#d3d3d3"
                                                bgColor="white"
                                            >
                                                <Text style={styles.progressCircleText} >{'2.9'}</Text>
                                            </ProgressCircle>
                                            {/* <Text style={{ ...styles.samsungSans }}>{'Photography'}</Text>
                                            <Text style={{ ...styles.samsungSans }}>{'Lifestyle'}</Text> */}
                                        </View>
                                    </View>
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
