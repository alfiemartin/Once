import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Profile = () => {
  const inset = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      <Text>Profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "flex-start",
    backgroundColor: "#fae8ff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default Profile;
