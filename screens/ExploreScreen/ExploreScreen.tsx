import React from "react";
import { ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Explore from "../../components/Explore/Explore";
import { IStackNavigation } from "../../types";

const ExploreScreen = ({navigation}: IStackNavigation) => {
  const inset = useSafeAreaInsets();

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentOffset={{x: 0, y: -inset.top}} contentInset={{top: inset.top}} style={[styles.container]}>
      <TouchableOpacity onPress={() => navigation.navigate("StoryView")}>
        <Explore title={"Local to you"} image={"https://firebasestorage.googleapis.com/v0/b/lensflare-41b96.appspot.com/o/IMG_5360.jpg?alt=media&token=0fe11ea4-f56e-4711-a0d0-144b5522ae97"} />
      </TouchableOpacity>
      <Explore title={"Friends"} image={"https://firebasestorage.googleapis.com/v0/b/lensflare-41b96.appspot.com/o/MeTwo.jpeg?alt=media&token=8d7f46d1-cd24-4974-b1be-ba85f0527d66"} />
      <Explore title={"Followers"} image={"https://firebasestorage.googleapis.com/v0/b/lensflare-41b96.appspot.com/o/follower.jpg?alt=media&token=efe34f28-3806-4626-a4a3-b30bb49f0fa4"}  />
      <Explore title={"Groups"} image={"https://firebasestorage.googleapis.com/v0/b/lensflare-41b96.appspot.com/o/groups.jpg?alt=media&token=1cb0b7a8-93f7-467f-934e-11f74a18ddd3"}  />
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default ExploreScreen;
