/* eslint-disable react-native/no-inline-styles */
import React, {FC, useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
interface SwitchButtonProps {}

export const SwitchButton: FC<SwitchButtonProps> = ({}) => {
  const [isSelected, setSelected] = useState<boolean>(false);

  const radioAnimated = useRef(new Animated.Value(0)).current;
  const circleColor = radioAnimated.interpolate({
    inputRange: [0, 17],
    outputRange: ['gray', 'green'],
  });
  const lineColor = radioAnimated.interpolate({
    inputRange: [0, 17],
    outputRange: ['gray', 'green'],
  });
  useEffect(() => {
    if (isSelected) {
      Animated.timing(radioAnimated, {
        toValue: 17,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(radioAnimated, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isSelected, radioAnimated]);
  return (
    <SafeAreaView style={[styles.container]}>
      <TouchableOpacity
        onPress={() => setSelected(!isSelected)}
        style={{
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.View
          style={{
            width: 40,
            height: 3,
            backgroundColor: lineColor,
          }}
        />
        <Animated.View
          style={{
            position: 'absolute',
            left: radioAnimated,
            width: 25,
            height: 25,
            borderRadius: 15,
            backgroundColor: '#ffffff',
            borderColor: circleColor,
            borderWidth: 3,
          }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {
    height: 2,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
});
