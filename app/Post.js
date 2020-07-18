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
                name={JSON.stringify(name)}
                date={JSON.stringify(date)}
                profilePicSource={JSON.stringify(profilePicSource)}
                imageSource={imageSource}
                category={JSON.stringify(category)}
                rate={rate}
                caption={JSON.stringify(caption)}
                fullPagePost={true}
            />
        </View>
    );
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#dddddd',
    },
});

//make this component available to the app
export default Post;

// create a component
// class Post extends Component {
//     constructor(props) {
//         super(props);
//         console.log(this.props.rate, 'kir');
//         console.log(this.props.name);
//         console.log(this.props.caption);
//         console.log(this.props.category);
//     }

//     render() {
//         return (
//             <View style={styles.container}>
//                 <CardComponent
//                     name={this.props.name}
//                     date={this.props.date}
//                     profilePicSource={this.props.profilePicSource}
//                     imageSource={this.props.imageSource}
//                     category={this.props.category}
//                     rate={['1.1', '4.5', '2.5', '3.0']}
//                     caption={this.props.caption}
//                     fullPagePost={true}
//                 />
//             </View>
//         );
//     }
// }