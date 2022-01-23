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

  const [data, setData] = useState(storyViewData);
  const first = storyViewData[0];
  const [uiData, setUiData] = useState<TData[]>([data[0], data[1]]);
  const [counter, setCounter] = useState(3);

  useEffect(() => {
    setData((old) => {
      old.shift();
      old.shift();
      return old;
    });
  }, []);

  const updateCardsUi = () => {
    setUiData((old) => {
      return [old[1], data[0]];
    });

    setData((old) => {
      old.shift();
      return old;
    });
  };

  return (
    <View style={[styles.container, { marginTop: inset.top + 20 }]}>
      {uiData
        .map((data, index) => (
          <StoryCard
            data={data}
            key={index}
            updateCardsUi={updateCardsUi}
            inView={index == 0}
            styles={[
              index == 2
                ? { transform: [{ translateY: -5 }] }
                : { transform: [{ translateY: 0 }] },
            ]}
          />
        ))
        .reverse()}
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
