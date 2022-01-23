import React from "react";
import { GestureResponderEvent, TouchableOpacity, View } from "react-native";
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

export default SwipeIcon;
