import React, { Component } from 'react';
import {
  View,
  ScrollView,
  ViewPagerAndroid,
  TouchableWithoutFeedback,
  Image,
  Text,
  Animated,
  Dimensions,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';
import {
  styles,
  stylesNormal,
  stylesScroll
} from './styles';

const dw = Dimensions.get('window').width;

class Tab extends Component {
  constructor(props) {
    super(props);

    // ios (ScrollView)
    this.scrollX = new Animated.Value(0);
    this.scrollEnabledValue = true;
    // android (ViewPager)
    this.position = new Animated.Value(0);
    this.offset = new Animated.Value(0);
  }

  scrollEnabled(enabled) {
    this.scrollEnabledValue = enabled;
    this.forceUpdate();
  }

  onScroll(event) {
    // if (Platform.OS === 'ios') {
    //   if (event.nativeEvent.contentOffset.x > width + 1) {
    //     this.props.playOutOfScreen();
    //   } else {
    //     this.props.playBackToScreen();
    //   }
    // } else {
    //   const place = event.nativeEvent.position + event.nativeEvent.offset;
    //   if (place > 1.001) {
    //     this.props.playOutOfScreen();
    //   } else {
    //     this.props.playBackToScreen();
    //   }
    // }
  }

  onHeaderItemPress(i) {
    if (Platform.OS === 'ios') {
      let scrollX = i * dw;
      this.refs.scrollView.scrollTo({ x: scrollX });
    } else {
      this.refs.viewPager.setPage(i);
    }
  }

  renderHeaderSeacrhButton() {
    if (this.props.scene === 'home') {
      return null;
    } else if (this.props.scene === 'category') {
      return (
        <TouchableWithoutFeedback
          onPress={() => { /* navigate */ }}
        >
          <View style={styles.headerButton}>
            {/* <Image
              source={require('../images/icons/searchWhite.png')}
              style={styles.headerButtonImage}
            /> */}
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }

  renderHeaderButton() {
    if (this.props.scene === 'home') {
      return (
        <TouchableWithoutFeedback
          onPress={() => {this.props.buttonAction();}}
        >
          <View style={styles.headerButton}>
            {/* <Image
              source={require('../images/icons/menuGray.png')}
              style={styles.headerButtonImage}
            /> */}
          </View>
        </TouchableWithoutFeedback>
      );
    } else if (this.props.scene === 'category') {
      return (
        <TouchableWithoutFeedback
          onPress={() => { /* navigate */ }}
        >
          <View style={styles.headerButton}>
            {/* <Image
              source={require('../images/icons/homeGray.png')}
              style={styles.headerButtonImage}
            /> */}
          </View>
        </TouchableWithoutFeedback>
      );
    } else if (this.props.scene === 'equalizer') {
      return (
        <TouchableWithoutFeedback
          onPress={() => { /* navigate */ }}
        >
          <View style={styles.headerButton}>
            {/* <Image
              source={require('../images/icons/backWhite.png')}
              style={[styles.headerButtonImage, {transform: [{rotate: '180deg'}]}]}
            /> */}
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }

  renderHeaderInside() {
    let activeTab = null;
    let headerItems = [];

    if (Platform.OS === 'ios') {
      activeTab = Animated.divide(this.scrollX, dw);
    } else {
      activeTab = Animated.add(this.position, this.offset);
    }

    if (this.props.mode === 'normal' || !this.props.mode || this.props.mode === null) {
      for (let i = 0; i < this.props.children.length; i++) {
        let opacity = activeTab.interpolate({
          inputRange: [i - 1, i, i + 1],
          outputRange: [0.5, 1, 0.5],
          extrapolate: 'clamp'
        });
        headerItems.push(
          <TouchableWithoutFeedback
            key={i}
            onPress={() => { this.onHeaderItemPress(i) }}
          >
            <Animated.View
              style={[stylesNormal.headerItem, { opacity }]}
            >
              <Text style={[stylesNormal.headerItemText, this.props.buttonTextStyle]}>{this.props.children[i].props.name}</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        );
      }

      let inputRange = [];
      let outputRange = [];
      for (let i = 0; i < this.props.children.length; i++) {
        inputRange.push(i);
        outputRange.push((dw / this.props.children.length) * i);
      }
      const width = dw / this.props.children.length;
      const distance = activeTab.interpolate({
        inputRange,
        outputRange,
        extrapolate: 'clamp'
      });
      let stylesRoll = null;
      let stylesCarousel = null;
      if (this.props.reverse) {
        stylesRoll = { width, left: distance };
        stylesCarousel = { flexDirection: 'row-reverse' };
      } else {
        stylesRoll = { width, left: distance };
        stylesCarousel = { flexDirection: 'row' };
      }
      headerItems.push(
        <Animated.View key={`${this.props.children.length}`} style={[stylesNormal.headerRoll, stylesRoll, this.props.rollStyle]} />
      );

      return (
        <View style={[stylesNormal.headerCarousel, stylesCarousel, this.props.tabBarStyle]}>
          {headerItems}
        </View>
      );
    } else if (this.props.mode === 'scroll') {
      let inputRange = [];
      let outputRange = [];
      // for (let i = this.props.children.length - 1; i >= 0; i--) {
        // inputRange.push(this.props.children.length - 1 - i);
        // outputRange.push((this.props.children.length - 1 - i) * -50);
      for (let i = 0; i < this.props.children.length; i++) {        
        inputRange.push(i);
        outputRange.push(i * -50);
        let opacity = activeTab.interpolate({
          inputRange: [i - 1, i, i + 1],
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp'
        });
        headerItems.push(
          <TouchableWithoutFeedback
            key={i}
            onPress={() => { this.onHeaderItemPress(i) }}
          >
            <Animated.View
              style={[stylesScroll.headerCarouselItem, { opacity }]}
            >
              <Text style={[stylesScroll.headerCarouselItemText, this.props.buttonTextStyle]}>{this.props.children[i].props.name}</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        );
      }

      let stylesCarousel = null;
      if (this.props.reverse) {
        stylesCarousel = { flexDirection: 'row-reverse' };
      } else {
        stylesCarousel = { flexDirection: 'row' };
      }
      const marginLeft = activeTab.interpolate({
        inputRange,
        outputRange,
        extrapolate: 'clamp'
      });

      return (
        <Animated.View style={[stylesScroll.headerCarousel, stylesCarousel, { marginLeft }, this.props.tabBarStyle]}>
          {headerItems}
        </Animated.View>
      );
    }
  }

  renderTabMains() {
    let tabMainItems = [];
    let stylesScrollItem = null;
    if (this.props.reverse) {
      stylesScrollItem = { transform: [{scaleX: -1}] };
    }

    for (let i = 0; i < this.props.children.length; i++) {
      tabMainItems.push(
        <View
          key={i}
          style={[styles.scrollItem, stylesScrollItem]}
        >
          {this.props.children[i]}
        </View>
      );
    }
    return tabMainItems;
  }

  renderScroll() {
    let stylesScroll = null;
    if (this.props.reverse) {
      stylesScroll = { transform: [{scaleX: -1}] };
    }

    if (Platform.OS === 'ios') {
      return (
        <ScrollView
          scrollEnabled={this.scrollEnabledValue}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.scrollX } } }],
            {listener: this.onScroll.bind(this)}
          )}
          scrollEventThrottle={16}
          ref="scrollView"
          style={[styles.scroll, stylesScroll]}
        >
          {this.renderTabMains()}
        </ScrollView>
      )
    } else {
      return (
        <ViewPagerAndroid
          onPageScroll={Animated.event(
            [{ nativeEvent: { position: this.position, offset: this.offset } }],
            {listener: this.onScroll.bind(this)}
          )}
          ref="viewPager"
          style={[styles.scroll, stylesScroll]}
          initialPage={0}
        >
          {this.renderTabMains()}
        </ViewPagerAndroid>
      )
    }
  }

  render() {
    return (
      <View style={[styles.root, this.props.style]}>
        <View style={styles.header}>
          {this.renderHeaderSeacrhButton()}

          {this.renderHeaderInside()}

          {this.renderHeaderButton()}
        </View>

        {this.renderScroll()}
      </View>
    );
  }
}

Tab.propTypes = {
  mode: PropTypes.oneOf(['normal', 'scroll']),
  reverse: PropTypes.bool
};

Tab.defaultProps = {
  mode: 'scroll'
};

export default Tab;
