import {
  View,
  StyleSheet,
  ImageBackground,
  GestureResponderEvent,
  Dimensions,
} from "react-native";
import {
  PanGestureHandler,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  WithTimingConfig,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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

const StoryView = () => {
  const inset = useSafeAreaInsets();
  const image =
    "https://firebasestorage.googleapis.com/v0/b/lensflare-41b96.appspot.com/o/groups.jpg?alt=media&token=1cb0b7a8-93f7-467f-934e-11f74a18ddd3";

  const screenWidth = Dimensions.get("screen").width;

  const gestureTranslationX = useSharedValue(0);
  const swipeTranslationX = useSharedValue(0);
  const swipeRotation = useSharedValue(0);
  const gestureRotation = useSharedValue(0);

  const aSwipeConfig: WithTimingConfig = {
    duration: 700,
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = gestureTranslationX.value;
    },
    onActive: (event, ctx) => {
      gestureTranslationX.value = ctx.startX + event.translationX * 2;
      gestureRotation.value = ctx.startX + event.translationX;
      gestureRotation.value = (gestureRotation.value * 90) / screenWidth;
    },
    onEnd: (_) => {
      gestureTranslationX.value = withSpring(0, { overshootClamping: true });
      gestureRotation.value = withSpring(0, { overshootClamping: true });
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

  const aRightSwipeStyles = useAnimatedStyle(() => {
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

  const swipeInDirection = (direction: string) => {
    const right = direction === "right";

    swipeTranslationX.value = (right ? screenWidth : -screenWidth) * 1.3;
    swipeRotation.value = withTiming(right ? 45 : -45, aSwipeConfig, () => {
      swipeRotation.value = withTiming(0, aSwipeConfig);
    });
  };

  return (
    <View style={[styles.container, { paddingTop: inset.top + 20 }]}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[{ flex: 1 }, gestureSwipeStyles, aRightSwipeStyles]}
        >
          <View style={styles.cardContainer}>
            <ImageBackground
              source={{ uri: image }}
              style={[styles.mainImage]}
              imageStyle={styles.mainImage}
            ></ImageBackground>
            <View style={[styles.choicesContainer]}>
              <SwipeIcon
                name="ios-close-circle"
                onPress={() => swipeInDirection("left")}
              />
              <SwipeIcon name="ios-heart-half" />
              <SwipeIcon
                name="heart"
                onPress={() => swipeInDirection("right")}
              />
            </View>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ec4899",
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
});

export default StoryView;
