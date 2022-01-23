import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  View,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
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

const StoryCard = ({
  data,
  styles: viewStyles,
  updateCardsUi,
  inView,
}: IStoryCard) => {
  const image = data.image;
  const screenWidth = Dimensions.get("screen").width;

  const gestureTranslationX = useSharedValue(0);
  const swipeTranslationX = useSharedValue(0);
  const swipeRotation = useSharedValue(0);
  const gestureRotation = useSharedValue(0);
  const swipeLeftIndicatorOpacity = useSharedValue(0);
  const swipeRightIndicatorOpacity = useSharedValue(0);

  const aSwipeConfig: WithTimingConfig = {
    duration: 500,
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = gestureTranslationX.value;
    },
    onActive: (event, ctx) => {
      gestureTranslationX.value = ctx.startX + event.translationX * 2;
      gestureRotation.value = ctx.startX + event.translationX;
      gestureRotation.value = (gestureRotation.value * 90) / screenWidth;

      const right = ctx.startX + event.translationX > 0;
      (right ? swipeRightIndicatorOpacity : swipeLeftIndicatorOpacity).value =
        Math.abs((event.translationX * 3) / screenWidth);
    },
    onEnd: (_) => {
      gestureTranslationX.value = withSpring(0, { overshootClamping: true });
      gestureRotation.value = withSpring(0, { overshootClamping: true });
      swipeLeftIndicatorOpacity.value = withTiming(0, { duration: 100 });
      swipeRightIndicatorOpacity.value = withTiming(0, { duration: 100 });
    },
  });

  const gestureSwipeStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: gestureTranslationX.value,
        },
        {
          rotate: `${gestureRotation.value}deg`,
        },
      ],
    };
  });

  const aSwipeStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: swipeTranslationX.value,
        },
        {
          rotate: `${swipeRotation.value}deg`,
        },
      ],
    };
  });

  const aSwipeLeftIndicatorStyles = useAnimatedStyle(() => {
    return {
      opacity: swipeLeftIndicatorOpacity.value,
    };
  });

  const aSwipeRightIndicatorStyles = useAnimatedStyle(() => {
    return {
      opacity: swipeRightIndicatorOpacity.value,
    };
  });

  const swipeInDirection = (direction: string) => {
    const right = direction === "right";

    swipeTranslationX.value = withTiming(
      (right ? screenWidth * 2 : -screenWidth * 2) * 1.5,
      aSwipeConfig,
      () => {
        swipeTranslationX.value = withTiming(
          -screenWidth,
          { duration: 0 },
          () => {
            swipeTranslationX.value = withTiming(0, aSwipeConfig);
          }
        );
      }
    );

    swipeRotation.value = withTiming(right ? 45 : -45, aSwipeConfig, () => {
      swipeRotation.value = 0;
    });

    (right ? swipeRightIndicatorOpacity : swipeLeftIndicatorOpacity).value =
      withTiming(1, { duration: 200 }, () => {
        (right ? swipeRightIndicatorOpacity : swipeLeftIndicatorOpacity).value =
          withTiming(0, { duration: 200 });
      });

    updateCardsUi();
  };

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[styles.container, gestureSwipeStyles, aSwipeStyles]}
      >
        <View style={[styles.cardContainer, viewStyles]}>
          <ImageBackground
            source={{ uri: image }}
            style={[styles.mainImage]}
            imageStyle={[
              styles.mainImage,
              { display: inView ? "flex" : "none" },
            ]}
          >
            <Animated.View
              style={[
                styles.swipeIndicatorContainer,
                aSwipeRightIndicatorStyles,
              ]}
            >
              <Text style={[{ zIndex: 1000, fontSize: 200 }]}>❤️</Text>
            </Animated.View>
            <Animated.View
              style={[
                styles.swipeIndicatorContainer,
                aSwipeLeftIndicatorStyles,
              ]}
            >
              <Text style={[{ zIndex: 1000, fontSize: 200 }]}>❌</Text>
            </Animated.View>
          </ImageBackground>
          <View
            style={[
              styles.choicesContainer,
              { display: inView ? "flex" : "none" },
            ]}
          >
            <SwipeIcon
              name="ios-close-circle"
              onPress={() => swipeInDirection("left")}
            />
            <SwipeIcon name="ios-heart-half" />
            <SwipeIcon name="heart" onPress={() => swipeInDirection("right")} />
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
    backgroundColor: "#fce7f3",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
