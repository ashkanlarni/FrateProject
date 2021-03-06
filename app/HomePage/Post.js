//import liraries
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Container } from 'native-base';

import CardComponent from '../Components/CardComponent';

export default function Post({ route, navigation }) {

    const { userid, name, date, profilePicSource, imageSource, category, rate, rateCount, postid, caption, comments, fullPagePost, goIntoAnotherPage } = route.params;

    return (
        <Container>
            <ScrollView>
                <View style={styles.container}>
                    <CardComponent
                        userid={userid}
                        name={name}
                        date={date}
                        profilePicSource={JSON.stringify(profilePicSource)}
                        imageSource={imageSource}
                        category={category}
                        rate={rate}
                        rateCount={rateCount}
                        postid={postid}
                        caption={caption}
                        comments={comments}
                        fullPagePost={true}
                        navigation={navigation}
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
        backgroundColor: '#fefefe',
    },
});
