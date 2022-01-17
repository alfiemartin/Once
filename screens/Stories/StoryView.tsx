import { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Animated,
  GestureResponderEvent,
  Dimensions,
  PanResponder,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
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

  const swipeAnimation = useRef(new Animated.Value(0)).current;
  const rotateAnimation = useRef(new Animated.Value(0)).current;
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: 0,
          y: 0,
        });
      },
      onPanResponderMove: (e, gs) => {
        Animated.event([null, { dx: pan.x }], {useNativeDriver: false})(e, gs);
      },
      onPanResponderRelease: (e, gestureState) => {
        //console.log(gestureState.dx); will be useful

        Animated.timing(pan.x, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  const rotateRev = Animated.timing(rotateAnimation, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
  });

  const swipeRev = Animated.timing(swipeAnimation, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
  });

  const swipeRight = () => {
    const swipe = Animated.timing(swipeAnimation, {
      toValue: Dimensions.get("screen").width * 2,
      duration: 1000,
      useNativeDriver: true,
    });

    const rotate = Animated.timing(rotateAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });

    swipe.start();
    rotate.start();
    setTimeout(() => {
      swipeRev.start();
      rotateRev.start();
    }, 1000);
  };

  const swipeLeft = () => {
    const swipe = Animated.timing(swipeAnimation, {
      toValue: -Dimensions.get("screen").width * 2,
      duration: 1000,
      useNativeDriver: true,
    });

    const rotate = Animated.timing(rotateAnimation, {
      toValue: -1,
      duration: 1000,
      useNativeDriver: true,
    });

    swipe.start();
    rotate.start();
    setTimeout(() => {
      swipeRev.start();
      rotateRev.start();
    }, 1000);
  };


  return (
    <View style={[styles.container, { paddingTop: inset.top + 20 }]}>
      <Animated.View
        style={[{flex: 1}, {
          transform: [{ translateX: pan.x }, {translateX: swipeAnimation}, {rotate: rotateAnimation}],
        }]}
        {...panResponder.panHandlers}
      >
        <View style={styles.cardContainer}>
          <ImageBackground
            source={{ uri: image }}
            style={[styles.mainImage]}
            imageStyle={styles.mainImage}
          ></ImageBackground>
          <View style={styles.choicesContainer}>
            <SwipeIcon name="ios-close-circle" onPress={swipeLeft} />
            <SwipeIcon name="ios-heart-half" />
            <SwipeIcon name="heart" onPress={swipeRight} />
          </View>
        </View>
      </Animated.View>
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
