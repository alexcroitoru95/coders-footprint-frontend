import React from 'react';
import {
    Text,
    View
} from 'react-native';

export const HorizontalLineWithText = () => {
    const { textStyle , horizontalLine, container } = styles;

    return(
        <View style={container}>
            <View style={horizontalLine} />
                <Text style={textStyle}>OR</Text>
            <View style={horizontalLine} />
        </View>
    );
};

const styles = {
    container: {
        flexDirection: 'row'
    },
    horizontalLine: {
        backgroundColor: 'white',
        height: 2,
        width: 127,
        alignSelf: 'center'
    },
    textStyle: {
        fontFamily: 'League Spartan',
        alignSelf: 'center',
        paddingHorizontal: 5,
        color: 'white',
        fontSize: 12 
    }
}