import React from 'react';
import { StyleSheet, Text, View, Slider } from 'react-native';
// import Slider from '@react-native-community/slider';

export default class SliderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0.0,
            distance: 0.0
        };
        this.width = this.props.sliderHeight
        this.height = 40
    }

    change(value) {
        this.setState(() => {
            return {
                value: parseFloat(value)
            };
        });
    }

    render() {
        const { value } = this.state;
        return (
            <View style={styles.container}>
                <Slider
                    style={{ width: this.width, height: this.height, transform: [{ rotate: '270deg' }, { scale: 0.5 }] }}
                    minimumValue={0}
                    maximumValue={5}
                    minimumTrackTintColor={this.props.barColor}
                    maximumTrackTintColor={this.props.barColor}
                    value={this.state.distance}
                    onValueChange={val => this.setState({ distance: val })}
                />
                <Text style={{ ...styles.text, top: this.width / 4 }}>{Number(this.state.distance).toFixed(1)}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative', //Here is the trick
        bottom: 0,
        fontFamily: 'Vision_Bold',
        fontSize: 14
    }
});
