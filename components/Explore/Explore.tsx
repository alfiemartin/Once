import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ProfileIcon from "../ProfileIcon/ProfileIcon";

interface ExploreProps {
  image: string;
  title: string;
}

const Explore = ({ image, title }: ExploreProps) => {
  const navigation = useNavigation();

  return (
      <View style={styles.container}>
        <ImageBackground
          borderRadius={10}
          style={styles.imageBackground}
          source={{
            uri: image,
          }}
        >
          <BlurView intensity={10} tint="dark" style={styles.blurContainer}>
            <Text style={styles.text}>{title}</Text>
            <View style={styles.profileContainer}>
              <ProfileIcon style={styles.icon} />
              <ProfileIcon style={styles.icon} />
              <ProfileIcon style={styles.icon} />
            </View>
          </BlurView>
        </ImageBackground>
      </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
  text: {
    color: "white",
    padding: 8,
  },
  container: {
    backgroundColor: "blue",
    // flex: 1,
    marginBottom: 30,
    borderRadius: 10,
    height: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    overflow: "hidden",
  },
  imageBackground: {
    flex: 1,
    borderRadius: 10,
    justifyContent: "space-between",
  },
  blurContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
    padding: 8,
  },
  profileContainer: {
    flexDirection: "row",
  },
});

export default Explore;
