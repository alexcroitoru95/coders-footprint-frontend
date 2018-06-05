import React from 'react';

import {
    Text,
    View,
    TouchableHighlight
} from 'react-native';

import { 
    Ionicons,
    FontAwesome
 } from "@expo/vector-icons";

export const GoogleButton = props => {
    const { textStyle , googleIcon, viewContainer, touchableHighlight } = styles;
    const { onPress } = props;

    return ( 
        <TouchableHighlight style={touchableHighlight} onPress={onPress} >
            <View style={viewContainer}>
                <View style={googleIcon}>
                    <FontAwesome name='google-plus-square' size={33} style={{color: 'white'}} />
                </View>
                <View style={{width: 214, height: 40, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{width: 214, height: 20}}>
                        <View style={{width: 178, height: 20, marginLeft: 12, marginRight: 24}}>
                            <Text style={textStyle}>Continue with Google+</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );
};

const styles = {
    touchableHighlight: {
        flexDirection: 'row',
        width: 254,
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: '#DC4A38',
    },
    viewContainer: {
        flexDirection: 'row'
    },
    googleIcon: {
        width: 40,
        height: 40,
        justifyContent: 'space-between',
        marginLeft: 8,
        marginTop: 2
    },
    textStyle: {
        fontFamily: 'Helvetica',
        color: 'white',
        textAlign: 'center',
        fontSize: 16
    }
}