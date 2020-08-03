import React from 'react';
import { StyleSheet, Text, View, Slider } from 'react-native';

export default class SliderComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            distance: 0.0
        };

        this.width = this.props.sliderHeight
        this.height = 40
    }

    render() {
        return (
            <View style={styles.container}>
                <Slider
                    style={{ width: this.width, height: this.height, transform: [{ rotate: '270deg' }, { scale: 0.5 }] }}
                    minimumValue={0}
                    maximumValue={5}
                    value={0.0}
                    minimumTrackTintColor={this.props.barColor}
                    maximumTrackTintColor='#999999'
                    onValueChange={val => this.props.changeFunction(this.props.variable, val)}
                />
                <Text style={{ ...styles.text, top: this.width / 5 }}>{Number(this.props.value).toFixed(1)}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative', //Here is the trick
        bottom: 0,
        fontFamily: 'SamsungSans_Medium',
        fontSize: 12
    }
});
