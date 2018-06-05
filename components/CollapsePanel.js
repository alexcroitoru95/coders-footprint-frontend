import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Animated } from 'react-native';
import * as Animatable from 'react-native-animatable';

export class CollapsePanel extends React.Component {
  constructor(props) {
    super(props);

    this.icons = {
      up: require('../assets/images/arrow_up.png'),
      down: require('../assets/images/arrow_down.png')
    };

    this._initContentHeight = this._initContentHeight.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state.expanded = props.expanded;
  }

  state = {
    height: new Animated.Value(),
    expanded: false,
    contentHeight: 0,
    informationGatheredShown: 'infinite'
  };

  _initContentHeight(evt) {
    if (this.state.contentHeight > 0) return;
    this.state.contentHeight = evt.nativeEvent.layout.height;
    this.state.height.setValue(this.state.expanded ? this._getMaxValue() : this._getMinValue());
  }

  _getMaxValue() {
    return this.state.contentHeight;
  }
  _getMinValue() {
    return 0;
  }

  toggle() {
    Animated.timing(this.state.height, {
      toValue: this.state.expanded ? this._getMinValue() : this._getMaxValue(),
      duration: 300
    }).start();
    this.setState({
      expanded: !this.state.expanded
    });
    this.setState({ informationGatheredShown: 0 });
  }

  render() {
    let icon = this.icons['down'];

    if (this.state.expanded) {
      icon = this.icons['up'];
    }

    return (
      <Animatable.View style={styles.container}>
        <View
          style={styles.highlightContainer}
          animation="pulse"
          easing="ease"
          iterationCount={this.state.informationGatheredShown}
        >
          <TouchableHighlight
            underlayColor="#f1f1f1"
            onPress={this.toggle}
            style={styles.buttonContainer}
          >
            <View style={styles.button}>
              <Text style={styles.title}>{this.props.title}</Text>
              <Image style={styles.buttonImage} source={icon} />
            </View>
          </TouchableHighlight>
        </View>

        <Animated.View
          style={[styles.content, { height: this.state.height }]}
          onLayout={this._initContentHeight}
        >
          {this.props.children}
        </Animated.View>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius: 4
  },
  highlightContainer: {
    flexDirection: 'row'
  },
  buttonContainer: {
    flex: 1,
    padding: 5
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Helvetica',
    color: 'black',
    fontSize: 16
  },
  buttonImage: {
    width: 30,
    height: 25
  },
  content: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5
  }
});
