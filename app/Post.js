//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Container } from 'native-base';

import CardComponent from './CardComponent';

function Post({ route, navigation }) {
    /* 2. Get the param */
    const { name, date, profilePicSource, imageSource, category, rate, caption, comments, fullPagePost, goIntoAnotherPage } = route.params;

    return (
        <Container>
            <ScrollView>
                <View style={styles.container}>
                    <CardComponent
                        name={name}
                        date={date}
                        profilePicSource={JSON.stringify(profilePicSource)}
                        imageSource={imageSource}
                        category={category}
                        rate={rate}
                        caption={caption}
                        comments={comments}
                        fullPagePost={true}
                        goIntoAnotherPage={false}
                        canRate={true}
                    />
                </View>
            </ScrollView>
        </Container>
    );
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#efefef',
    },
});

//make this component available to the app
export default Post;
