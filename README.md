# React Native Tab

<!-- [![NPM Version](https://badge.fury.io/js/esta.svg?style=flat)](https://npmjs.org/package/@feri/react-native-tab) -->
[![NPM Version](0.1.1)

Tab Component for React-Native (android & ios)

### Installation

```
$ npm install --save @feri/react-native-tab
```

## Usage

Add Tab and pass children to it.

```
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Tab from '@feriz/react-native-tab';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Tab>
          <View
            name="First"
            style={{ flex: 1, backgroundColor: '#0f0' }}
          >
            <Text>Tab 1</Text>
          </View>

          <View
            name="Second"
            style={{ flex: 1, backgroundColor: '#f00' }}
          >
            <Text>Tab 2</Text>
          </View>

          <View
            name="Third"
            style={{ flex: 1, backgroundColor: '#00f' }}
          >
            <Text>Tab 3</Text>
          </View>

          <View
            name="Fourth"
            style={{ flex: 1, backgroundColor: '#f0f' }}
          >
            <Text>Tab 4</Text>
          </View>
        </Tab>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
```

By default tab buttons scrolling. For Change, Pass 'mode' prop to component.

mode="scroll"

<a href="https://raw.githubusercontent.com/farbd-dev/react-native-tab/master/demo/tabScroll.mp4"><img src="https://raw.githubusercontent.com/farbod-dev/react-native-tab/master/demo/tabScroll.gif" width="360"></a>

mode="normal"

<a href="https://raw.githubusercontent.com/farbd-dev/react-native-tab/master/demo/tabNormal.mp4"><img src="https://raw.githubusercontent.com/farbod-dev/react-native-tab/master/demo/tabNormal.gif" width="360"></a>

### Props

| Prop          | Values           | Action                                   |
| ------------- |:----------------:| ----------------------------------------:|
| style         | style object     | extra styles for tab component container |
| mode          | normal, scroll   | make tab buttons static or scrollable    |
| reverse       | true, false      | direction of tab Buttons and Views       |
