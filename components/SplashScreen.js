import React from 'react';
import * as Progress from 'react-native-progress';

import { Text, View } from 'react-native';

export const SplashScreen = () => {
  const { textStyle, overlayBackground, container } = styles;

  return (
    <View style={container}>
      <View style={overlayBackground} />
      <Progress.CircleSnail size={60} indeterminate={true} />
      <Text style={textStyle}>Loading...</Text>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlayBackground: {
    backgroundColor: 'black',
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0
  },
  textStyle: {
    alignSelf: 'center',
    paddingHorizontal: 5,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20
  }
};
