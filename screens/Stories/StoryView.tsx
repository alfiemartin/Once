import { BlurView } from "expo-blur";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";

const StoryView = () => {
  const inset = useSafeAreaInsets();
  const image =
    "https://firebasestorage.googleapis.com/v0/b/lensflare-41b96.appspot.com/o/groups.jpg?alt=media&token=1cb0b7a8-93f7-467f-934e-11f74a18ddd3";

  return (
    <View style={[styles.container]}>
      <ImageBackground source={{ uri: image }} style={[styles.mainImage]} imageStyle={{borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
        <BlurView
          intensity={10}
          style={[styles.storyTitleContainer, { paddingTop: inset.top }]}
        >
          <Text style={styles.storyViewTitle}>Local to you</Text>
          <ProfileIcon />
        </BlurView>
      </ImageBackground>
      <View style={styles.postersContainer}>
          <Text style={styles.peoplesTitle}>Your locals</Text>
          <View style={[styles.peoplesList, { paddingBottom: inset.bottom }]}>
            <ProfileIcon style={styles.peoplesIcon} />
            <ProfileIcon style={styles.peoplesIcon} />
            <ProfileIcon style={styles.peoplesIcon} />
            <ProfileIcon style={styles.peoplesIcon} />
          </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  storyViewTitle: {
    padding: 10,
    color: "white",
  },
  mainImage: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "black"
  },
  postersContainer: {
    height: 130,
    padding: 10,
    justifyContent: "space-between",
    backgroundColor: "black"
  },
  peoplesTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    color: "white",
  },
  storyTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    padding: 10,
    paddingBottom: 5,
  },
  peoplesList: {
    flexDirection: "row",
  },
  peoplesIcon: {
    marginRight: 10,
  },
});

export default StoryView;
