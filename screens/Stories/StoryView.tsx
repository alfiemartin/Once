import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import StoryCard from "../../components/Explore/StoryCard";

const StoryView = () => {
  const inset = useSafeAreaInsets();
  const [data, setData] = useState([
    {
      name: "seb",
      image:
        "https://firebasestorage.googleapis.com/v0/b/lensflare-41b96.appspot.com/o/groups.jpg?alt=media&token=1cb0b7a8-93f7-467f-934e-11f74a18ddd3",
    },
    {
      name: "alfie",
      image:
        "https://firebasestorage.googleapis.com/v0/b/lensflare-41b96.appspot.com/o/MeTwo.jpeg?alt=media&token=8d7f46d1-cd24-4974-b1be-ba85f0527d66",
    },
  ]);

  return (
    <View style={[styles.container, { marginTop: inset.top + 20 }]}>
      <StoryCard data={data[0]} />
      <StoryCard data={data[1]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fae8ff",
  },
});

export default StoryView;
