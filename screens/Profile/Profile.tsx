import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { storyViewData } from "../../mockData";

const Profile = () => {
  const inset = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      <View style={{ flexDirection: "row" }}>
        <View style={[styles.headerItems]}>
          <View
            style={[
              { flex: 1, backgroundColor: "#f9a8d4", borderRadius: 5 },
              styles.headerItems,
            ]}
          >
            <Text style={[styles.headerItemsText, { marginBottom: 10 }]}>
              3 ❤️
            </Text>
            <Text style={styles.headerItemsText}>5 💔</Text>
          </View>
        </View>
        <View style={[styles.headerItems]}>
          <View
            style={[
              styles.headerItems,
              { backgroundColor: "#f9a8d4", borderRadius: 5 },
            ]}
          >
            <Icon
              name="settings-outline"
              size={100}
              style={{ textAlign: "center" }}
            />
          </View>
        </View>
      </View>
      <View style={styles.profileViewContainer}>
        <ImageBackground
          style={styles.profileImage}
          source={{ uri: storyViewData[0].image }}
        >
          <View style={styles.profileBioContainer}>
            <Text>Chillin on a friday night</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={[styles.profileViewContainer]}>
        <ImageBackground
          style={[styles.profileImage, { flex: 1, borderRadius: 5 }]}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/lensflare-41b96.appspot.com/o/alfie.jpg?alt=media&token=ceb410ef-59b4-4338-8675-279f6e76d381",
          }}
        >
          <View style={styles.profileBioContainer}>
            <Text>If u here youre already winning</Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fae8ff",
  },
  headerItems: {
    height: Dimensions.get("screen").width / 2 - 10,
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
    padding: 10,
  },
  headerItemsText: {
    textAlign: "center",
    fontSize: 30,
  },
  profileViewContainer: {
    flex: 1,
    marginBottom: 10,
  },
  profileImage: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "flex-end",
  },
  profileBioContainer: {
    padding: 10,
    backgroundColor: "#f9a8d4",
  },
});

export default Profile;
