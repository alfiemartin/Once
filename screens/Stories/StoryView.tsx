import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import StoryCard from "../../components/Explore/StoryCard";

const StoryView = () => {
  const inset = useSafeAreaInsets();

  return (
    <View style={[styles.container, { marginTop: inset.top + 20 }]}>
      <StoryCard />
      <StoryCard />
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
