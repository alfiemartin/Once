import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
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
  const [uiData, setUiData] = useState<TData>(data[0]);

  useEffect(() => {
    setUiData(data[0]);
  }, [data]);

  const updateCardsUi = () => {
    setData((old) => {
      const currentData = old.filter((_, i) => i! - 0);

      if (currentData.length == 1) setData(storyViewData);

      return currentData;
    });
  };

  return (
    <View style={[styles.container, { marginTop: inset.top + 20 }]}>
      <StoryCard
        styles={{}}
        data={uiData}
        inView
        updateCardsUi={updateCardsUi}
      />
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
