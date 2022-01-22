import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
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
import Icon from "react-native-vector-icons/Ionicons";

interface ISwipeIcon {
  name: string;
  size?: number;
  onPress?:
    | (((event: GestureResponderEvent) => void) & (() => void))
    | undefined;
}

const SwipeIcon = ({ name, size = 40, onPress }: ISwipeIcon) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 40,
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <Icon style={{ flex: 1 }} size={size} name={name} />
      </TouchableOpacity>
    </View>
  );
};

const StoryCard = () => {
  const image =
    "https://firebasestorage.googleapis.com/v0/b/lensflare-41b96.appspot.com/o/groups.jpg?alt=media&token=1cb0b7a8-93f7-467f-934e-11f74a18ddd3";

  const screenWidth = Dimensions.get("screen").width;

  const gestureTranslationX = useSharedValue(0);
  const swipeTranslationX = useSharedValue(0);
  const swipeRotation = useSharedValue(0);
  const gestureRotation = useSharedValue(0);
  const swipeIndicatorOpacity = useSharedValue(0);
  const [gestureIndicatorEmoji, setGestureIndicatorEmoji] = useState("❤️");

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

      swipeIndicatorOpacity.value = Math.abs(
        (event.translationX * 3) / screenWidth
      );
    },
    onEnd: (_) => {
      gestureTranslationX.value = withSpring(0, { overshootClamping: true });
      gestureRotation.value = withSpring(0, { overshootClamping: true });
      swipeIndicatorOpacity.value = withTiming(0, { duration: 100 });
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
          translateX: withTiming(
            swipeTranslationX.value,
            aSwipeConfig,
            () => (swipeTranslationX.value = 0)
          ),
        },
        {
          rotate: `${swipeRotation.value}deg`,
        },
      ],
    };
  });

  const aSwipeIndicatorStyles = useAnimatedStyle(() => {
    return {
      opacity: swipeIndicatorOpacity.value,
    };
  });

  const swipeInDirection = (direction: string) => {
    const right = direction === "right";

    setGestureIndicatorEmoji(right ? "❤️" : "❌");

    swipeTranslationX.value = (right ? screenWidth : -screenWidth) * 1.3;
    swipeRotation.value = withTiming(right ? 45 : -45, aSwipeConfig, () => {
      swipeRotation.value = withTiming(0, aSwipeConfig);
    });
    swipeIndicatorOpacity.value = withTiming(1, { duration: 200 }, () => {
      swipeIndicatorOpacity.value = withTiming(0, { duration: 200 });
    });
  };

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[styles.container, gestureSwipeStyles, aSwipeStyles]}
      >
        <View style={styles.cardContainer}>
          <ImageBackground
            source={{ uri: image }}
            style={[styles.mainImage]}
            imageStyle={styles.mainImage}
          >
            <Animated.View
              style={[styles.swipeIndicatorContainer, aSwipeIndicatorStyles]}
            >
              <Text style={[{ zIndex: 1000, fontSize: 200 }]}>
                {gestureIndicatorEmoji}
              </Text>
            </Animated.View>
          </ImageBackground>
          <View style={[styles.choicesContainer]}>
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
    backgroundColor: "black",
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
