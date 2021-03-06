import { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import StoryCard from "../../components/Explore/StoryCard";
import { storyViewData } from "../../mockData";

type TData = {
  name: string;
  image: string;
};

const StoryView = () => {
  const inset = useSafeAreaInsets();
  const [data, setData] = useState<TData[]>(storyViewData);

  const updateCardsUi = () => {
    Image.prefetch(data[1].image);

    setData((old) => {
      const currentData = old.filter((_, i) => i != 0);
      if (currentData.length == 1) setData(storyViewData);

      return currentData;
    });
  };

  return (
    <View style={[styles.container, { marginTop: inset.top + 20 }]}>
      <StoryCard data={data[0]} updateCardsUi={updateCardsUi} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fae8ff",
  },
});

export default StoryView;
