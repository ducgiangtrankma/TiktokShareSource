import {SvgIcon} from '../component';
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
} from 'react-native';

interface LikeReactionProps {}
interface Like {
  id: number;
  right: number; // margin right
}
interface LikeCmpProps {
  style?: StyleProp<ViewStyle>;
}
let likeCounts = 1;

const getRandomMarginRight = (min: number, max: number) => {
  return Math.random() * (max - min);
};
export const LikeReaction: FC<LikeReactionProps> = ({}) => {
  const [likes, setLike] = useState<Like[]>([]);
  const _onPressLike = () => {
    setLike([
      ...likes,
      {
        id: likeCounts,
        right: getRandomMarginRight(0, 150),
      },
    ]);
  };
  useEffect(() => {
    likeCounts = likeCounts + 1;
  }, [likes]);
  return (
    <View style={styles.container}>
      {likes.map(e => {
        return <LikeComp key={e.id} style={{right: e.right}} />;
      })}
      <TouchableOpacity style={styles.likeButton} onPress={_onPressLike}>
        <SvgIcon type="AntDesign" name="like2" size={54} />
      </TouchableOpacity>
    </View>
  );
};
const HeightSc = Dimensions.get('screen').height;
const animationEndY = Math.ceil(HeightSc * 0.8);
const negativeEndY = animationEndY * -1;
const LikeComp = (props: LikeCmpProps) => {
  const position = useRef(new Animated.Value(0)).current;
  const yAnimation = position.interpolate({
    inputRange: [negativeEndY, 0],
    outputRange: [animationEndY, 0],
  });
  const animationOpacity = yAnimation.interpolate({
    inputRange: [0, animationEndY],
    outputRange: [1, 0],
  });
  const animationScale = yAnimation.interpolate({
    inputRange: [0, 15, 30],
    outputRange: [0, 1.4, 1],
    extrapolate: 'clamp',
  });
  useEffect(() => {
    Animated.timing(position, {
      duration: 2000,
      toValue: negativeEndY,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [position]);
  return (
    <Animated.View
      style={[
        styles.like,
        props.style,
        {
          transform: [{translateY: position}, {scale: animationScale}],
          opacity: animationOpacity,
        },
      ]}>
      <SvgIcon type="AntDesign" name="like1" size={34} style={styles.icon} />
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  likeButton: {
    position: 'absolute',
    bottom: 32,
    left: 32,
  },
  like: {
    position: 'absolute',
    bottom: 32,
  },
  icon: {
    color: 'red',
  },
});
