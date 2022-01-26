import React, { useEffect } from "react";
import {
  Dimensions,
  ImageBackground,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
  WithTimingConfig,
} from "react-native-reanimated";
import SwipeIcon from "../SwipeIcon/SwipeIcon";

interface IStoryCard {
  data: {
    name: string;
    image: string;
  };
  styles?: StyleProp<ViewStyle>;
  updateCardsUi: () => void;
  inView: boolean;
}

const aSwipeConfig: WithTimingConfig = {
  duration: 300,
};
const instantTiming: WithTimingConfig = {
  duration: 0,
};

const StoryCard = ({ data, styles: viewStyles, updateCardsUi }: IStoryCard) => {
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;

  const swipeTranslationX = useSharedValue(0);
  const swipeTranslationY = useSharedValue(0);
  const swipeScale = useSharedValue(1);
  const swipeRotation = useSharedValue(0);

  const finishSwipeAnimation = () => {
    "worklet";
    const right = swipeTranslationX.value > 0;

    swipeTranslationX.value = withSequence(
      withTiming(right ? screenWidth * 1.5 : -screenWidth * 1.5, {
        duration: 200,
      }),
      withTiming(0, { duration: 0 }, () => runOnJS(updateCardsUi)())
    );

    swipeTranslationY.value = withDelay(200, withTiming(screenHeight, instantTiming));
    swipeScale.value = withDelay(200, withTiming(0.1, { duration: 0 }));

    swipeRotation.value = withSequence(
      withTiming(right ? 45 : -45, { duration: 100 }),
      withTiming(0, instantTiming)
    );
  };

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event, ctx) => {
      swipeTranslationX.value = event.translationX;
      swipeRotation.value = interpolate(event.translationX, [0, screenWidth], [0, 45]);
    },
    onEnd: () => {
      if (Math.abs(swipeTranslationX.value) > screenWidth * 0.6) {
        finishSwipeAnimation();
        return;
      }

      swipeTranslationX.value = withTiming(0, aSwipeConfig);
      swipeRotation.value = withTiming(0, aSwipeConfig);
    },
  });

  const aSwipeStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: swipeTranslationX.value,
        },
        {
          translateY: swipeTranslationY.value,
        },
        {
          scale: swipeScale.value,
        },
        {
          rotate: `${swipeRotation.value}deg`,
        },
      ],
    };
  });

  const swipeInDirection = (direction: string) => {
    const right = direction === "right";

    swipeTranslationX.value = withSequence(
      withTiming((right ? screenWidth : -screenWidth) * 1.5, aSwipeConfig),
      withTiming(0, instantTiming, () => runOnJS(updateCardsUi)())
    );

    swipeTranslationY.value = withDelay(
      aSwipeConfig.duration as number,
      withTiming(screenHeight, instantTiming)
    );

    swipeScale.value = withDelay(aSwipeConfig.duration as number, withTiming(0.8, instantTiming));

    swipeRotation.value = withSequence(
      withTiming(right ? 45 : -45, aSwipeConfig),
      withTiming(0, instantTiming)
    );
  };

  const bringNewCard = () => {
    swipeTranslationY.value = withSpring(0, { damping: 17, velocity: 9000 });
    swipeScale.value = withDelay(100, withTiming(1, aSwipeConfig));
  };

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.container, aSwipeStyles]}>
        <View style={[styles.cardContainer, viewStyles]}>
          <ImageBackground
            onLoad={bringNewCard}
            source={{ uri: data.image }}
            style={[styles.mainImage]}
            imageStyle={styles.mainImageInner}
          >
            <Animated.View style={[styles.swipeIndicatorContainer]}>
              <Text style={[{ zIndex: 1000, fontSize: 200 }]}>❤️</Text>
            </Animated.View>
            <Animated.View style={[styles.swipeIndicatorContainer]}>
              <Text style={[{ zIndex: 1000, fontSize: 200 }]}>❌</Text>
            </Animated.View>
          </ImageBackground>
          <View style={[styles.choicesContainer]}>
            <SwipeIcon name='ios-close-circle' onPress={() => swipeInDirection("left")} />
            <SwipeIcon name='ios-heart-half' />
            <SwipeIcon name='heart' onPress={() => swipeInDirection("right")} />
          </View>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    padding: 20,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    overflow: "hidden",
  },
  cardContainer: {
    flex: 1,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mainImage: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fbcfe8",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  mainImageInner: {
    margin: 2,
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fce7f3",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },
  choicesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fce7f3",
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  swipeIndicatorContainer: {
    position: "absolute",
    display: "none",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});

export default StoryCard;
