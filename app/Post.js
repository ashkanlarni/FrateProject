//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import CardComponent from './CardComponent';

function Post({ route, navigation }) {
    /* 2. Get the param */
    const { name } = route.params;
    const { date } = route.params;
    const { profilePicSource } = route.params;
    const { imageSource } = route.params;
    const { category } = route.params;
    const { rate } = route.params;
    const { caption } = route.params;

    return (
        <View style={styles.container}>
            <CardComponent
                name={name}
                date={date}
                profilePicSource={JSON.stringify(profilePicSource)}
                imageSource={imageSource}
                category={category}
                rate={rate}
                caption={caption}
                fullPagePost={true}
            />
        </View>
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
