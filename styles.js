import {
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';

const dw = Dimensions.get('window').width;
const dh = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    width: Platform.OS === 'android' ? dw : 'auto'
    // marginBottom: 50
  },
  header: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'rgb(32, 32, 32)'
  },
  headerButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(32, 32, 32)'
  },
  headerButtonImage: {
    width: 24,
    height: 24
  },
  scroll: {
    flex: 1
  },
  scrollItem: {
    width: dw
  }
});

export const stylesNormal = StyleSheet.create({
  headerCarousel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  headerItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerItemText: {
    backgroundColor: 'transparent',
    // fontFamily: 'BHoma',
    fontSize: 16,
    color: '#fff'
  },
  headerRoll: {
    height: 2,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff'
  },
});

export const stylesScroll = StyleSheet.create({
  headerCarousel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  headerCarouselItem: {
    minWidth: 34, // 50 - 16
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerCarouselItemText: {
    // fontFamily: 'IRANSansMedium',
    fontSize: 12,
    color: 'rgb(255, 255, 255)'
  },
});
