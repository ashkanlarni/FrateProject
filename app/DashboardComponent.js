//import liraries
import React, { Component } from 'react';
import { RefreshControl, Text, SafeAreaView, ScrollView, StyleSheet, AsyncStorage, Dimensions } from 'react-native';
import { Container, Content, Header, Title, Button, Icon, Card, CardItem, Thumbnail, Body, Left, Right, View } from 'native-base';
import ProgressCircle from 'react-native-progress-circle';

const { width, height } = Dimensions.get('window');

// create a component
class DashboardComponent extends Component {
    constructor(props) {
        super(props);
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
                                        <Text style={{ ...styles.samsungSans, left: 15 }}>{this.props.username}</Text>
                                    </View>
                                    <View style={{ width: width / 3, alignItems: 'center' }}>
                                        <Thumbnail
                                            large={true}
                                            source={this.props.profilePicture}
                                        />
                                    </View>
                                    <View style={{ width: width / 3, alignItems: 'flex-end' }}>
                                        {/* TODO: isSelfProfile */}
                                        <Button transparent style={{ right: 15 }}>
                                            <Text style={{ ...styles.samsungSans, color: '#0080ff' }}>{'Log Out'}</Text>
                                        </Button>
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
                                    <View style={{ flexDirection: 'row', flex: 1, width: width, justifyContent: 'space-around', backgroundColor: '#fbfbfb', borderRadius: 5 }}>
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
        fontSize: 18
    },
    progressCircleText: {
        fontFamily: 'SamsungSans_Medium',
        fontSize: 13
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
