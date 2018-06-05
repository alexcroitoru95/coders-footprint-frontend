import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, Alert } from 'react-native';
import { ScreenOrientation } from 'expo';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import Loader from './components/Loader';
import { PersistGate } from 'redux-persist/integration/react';
import { SplashScreen } from './components';
import StoreProvider from './store/StoreProvider';
import { AppStack } from './navigation';

ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT_UP);

export default class App extends Component {
  constructor() {
    super();

    this.waitLoader();

    this.logo = require('./assets/images/logo_loader.png');
  }

  state = {
    animationDone: false
  };

  waitLoader = () => {
    setTimeout(() => {
      this.setState({
        animationDone: true
      });
    }, 2600);
  };

  render() {
    return (
      <Provider store={store}>
        <PersistGate
          loading={<SplashScreen />}
          persistor={persistor}
          onBeforeLift={() => StoreProvider.loadAssetsAsync(store)}
        >
          <Loader
            isLoaded={this.state.animationDone}
            imageSource={this.logo}
            backgroundStyle={styles.loadingBackgroundStyle}
          >
            <View style={styles.container}>
              <AppStack />
              <StatusBar barStyle="light-content" />
            </View>
          </Loader>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loadingBackgroundStyle: {
    backgroundColor: 'black'
  }
});
