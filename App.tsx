/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {SvgIcon} from './src/component';
import React, {FC, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Easing,
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  Text,
} from 'react-native';
import {LikeReaction, SwitchButton} from './src/shares';
interface AppProps {}

export const App: FC<AppProps> = ({}) => {
  return (
    <View style={styles.container}>
      <LikeReaction />
      {/* <SwitchButton /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
