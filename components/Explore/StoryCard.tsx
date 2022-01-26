import React, { useEffect } from "react";
import {
  Dimensions,
  ImageBackground,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Image,
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

const StoryCard = ({ data, styles: viewStyles, updateCardsUi }: IStoryCard) => {
  const screenWidth = Dimensions.get("screen").width;

  const swipeTranslationX = useSharedValue(0);
  const swipeRotation = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = swipeTranslationX.value;
    },
    onActive: (event, ctx) => {
      swipeTranslationX.value = event.translationX;
      swipeRotation.value = interpolate(
        event.translationX,
        [0, screenWidth],
        [0, 45]
      );
    },
    onEnd: () => {
      if (Math.abs(swipeTranslationX.value) > screenWidth * 0.8) {
        swipeTranslationX.value = withSequence(
          withTiming(
            swipeTranslationX.value > 0 ? screenWidth * 2 : -screenWidth * 2,
            {
              duration: 300,
            }
          ),
          withTiming(-screenWidth, { duration: 0 }, () =>
            runOnJS(updateCardsUi)()
          )
        );
        swipeRotation.value = withSequence(
          withTiming(swipeTranslationX.value > 0 ? 45 : -45, { duration: 300 }),
          withTiming(0, { duration: 0 })
        );

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
          rotate: `${swipeRotation.value}deg`,
        },
      ],
    };
  });

  const swipeInDirection = (direction: string) => {
    const right = direction === "right";

    swipeTranslationX.value = withSequence(
      withTiming((right ? screenWidth : -screenWidth) * 2, aSwipeConfig),
      withTiming(-screenWidth, { duration: 0 }, () => runOnJS(updateCardsUi)())
    );

    swipeRotation.value = withSequence(
      withTiming(right ? 45 : -45, aSwipeConfig),
      withTiming(0, { duration: 0 })
    );
  };

  const bringNewCard = () => {
    swipeTranslationX.value = withDelay(50, withTiming(0, aSwipeConfig));
  };

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.container, aSwipeStyles]}>
        <View style={[styles.cardContainer, viewStyles]}>
          <ImageBackground
            onLoad={bringNewCard}
            source={{ uri: data.image }}
            style={[styles.mainImage]}
            imageStyle={[styles.mainImage]}
          >
            <Animated.View style={[styles.swipeIndicatorContainer]}>
              <Text style={[{ zIndex: 1000, fontSize: 200 }]}>❤️</Text>
            </Animated.View>
            <Animated.View style={[styles.swipeIndicatorContainer]}>
              <Text style={[{ zIndex: 1000, fontSize: 200 }]}>❌</Text>
            </Animated.View>
          </ImageBackground>
          <View style={[styles.choicesContainer]}>
            <SwipeIcon
              name='ios-close-circle'
              onPress={() => swipeInDirection("left")}
            />
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
    backgroundColor: "#fce7f3",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
