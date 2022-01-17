import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import { IStackNavigation } from "../../types";

const Chat = ({navigation}: IStackNavigation) => {
  const inset = useSafeAreaInsets();

  const [chatData, setChatData] = useState([
    {
      name: "alfie",
      uri: "https://firebasestorage.googleapis.com/v0/b/lensflare-41b96.appspot.com/o/alfie.jpg?alt=media&token=ceb410ef-59b4-4338-8675-279f6e76d381",
    },
    {
      name: "timmy",
      uri: "https://firebasestorage.googleapis.com/v0/b/lensflare-41b96.appspot.com/o/timmy.jpg?alt=media&token=9e9c28ce-f38e-4cd3-9b19-ba22fff0fb22",
    },
    {
      name: "jack",
      uri: "https://firebasestorage.googleapis.com/v0/b/lensflare-41b96.appspot.com/o/jack.jpeg?alt=media&token=5ac29c38-47e8-4fe8-99da-2fc543c21b85",
    },
    {
      name: "seb",
      uri: "https://firebasestorage.googleapis.com/v0/b/lensflare-41b96.appspot.com/o/seb.jpg?alt=media&token=881b4485-9341-4f9c-b407-ac8c14403b64",
    },
    { name: "laykha", uri: "" },
  ]);

  return (
    <View style={[styles.container]}>
      <ScrollView
        contentOffset={{ x: 0, y: -inset.top }}
        contentInset={{ top: inset.top }}
      >
        {chatData.map((data, i) => (
          <TouchableOpacity onPress={() => navigation.navigate("Chatting")} key={i}>
            <View style={styles.chatContainer}>
              {data.uri.length > 0 && <ProfileIcon />}
              <Text style={styles.chatTitle}>{data.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginLeft: 5,
    marginRight: 5,
  },
  chatContainer: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    backgroundColor: "#2563eb",
    borderRadius: 15,
  },
  chatTitle: {
    marginLeft: "auto",
    color: "#eff6ff",
  },
});

export default Chat;
