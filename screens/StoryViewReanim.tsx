import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';
import { View, Button, Dimensions } from 'react-native';
import React from 'react';
import { PanGestureHandler } from 'react-native-gesture-handler';

export default function StoryViewReanim() {
  const screenWidth = Dimensions.get("screen").width;
  const randomWidth = useSharedValue(screenWidth);
  const randomX = useSharedValue(0);
  const x = useSharedValue(0);

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


  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = x.value;
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
    },
    onEnd: (_) => {
      x.value = withSpring(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x.value,
        },
      ],
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
      <PanGestureHandler onGestureEvent={gestureHandler} >
        <Animated.View
          style={[{ width: 100, height: 80, backgroundColor: 'black', margin: 30 },
            animatedStyle
          ]}
        />
      </PanGestureHandler>
    </View>
  );
}