import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import { View, Button, Dimensions } from 'react-native';
import React from 'react';

export default function StoryViewReanim() {
  const randomWidth = useSharedValue(Dimensions.get("screen").width);
  const randomX = useSharedValue(0);
  const screenWidth = Dimensions.get("screen").width;

  const config = {
    duration: 500,
    easing: Easing.elastic(1),
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
      transform: [{translateX: withTiming(randomX.value * screenWidth, config)}]
    };
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <Animated.View
        style={[{ width: 100, height: 80, backgroundColor: 'black', margin: 30 }, style]}
      />
      <Button
        title="toggle"
        onPress={() => {
          // randomWidth.value = Math.random() * Dimensions.get("screen").width;
          randomX.value = Math.random();
        }}
      />
    </View>
  );
}