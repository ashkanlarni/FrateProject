//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class Slider extends Component {
    render() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', top: 100 }}>
                <View style={styles.bgBar}>
                    <View style={{ ...styles.fgBar, height: 60 }}>

                    </View>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    bgBar: {
        justifyContent: 'flex-end',
        flex: 1,
        backgroundColor: '#dddddd',
        width: 10,
        height: 100,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    fgBar: {
        backgroundColor: '#e91e63',
        width: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    }
});

//make this component available to the app
export default Slider;
