import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  View,
  ScrollView,
  StyleSheet,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import { BlurView } from "expo-blur";
import { SPACING } from "../../styles";
import ChatBubble from "../../components/Chat/ChatBubble";
import Icon from "react-native-vector-icons/Ionicons";

const Chatting = () => {
  const inset = useSafeAreaInsets();
  const [convo, setConvo] = useState([
    "Hey how are you",
    "Im good thanks",
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,obcaecati?",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exdignissimos aspernatur repellat harum exercitationem omnis sequirecusandae quaerat unde, quidem pariatur voluptatibus dolore eius quosuscipit quibusdam, quam ducimus. Itaque?",
  ]);

  let scrollRef = useRef<ScrollView>(null);
  const [inputText, setInputText] = useState<string>("");

  const updateList = () => {
    setConvo(val => ([...val, inputText]));
    setInputText("");
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    Keyboard.dismiss();
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}  style={[styles.container]}>
      <ScrollView
        contentOffset={{ x: 0, y: -inset.top }}
        contentInset={{ top: inset.top }}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({animated: true})}
        style={styles.scrollContainer}
        ref={scrollRef}
      >
        {convo.map((data, i) => (
          <View key={i}>
            {i == 0 && <View style={{ marginTop: 80 }} />}
            <ChatBubble me={i%2 == 0 ? true : false} content={data} />
          </View>
        ))}
      </ScrollView>
      <BlurView
        intensity={20}
        style={[styles.header, { paddingTop: inset.top }]}
      >
        <ProfileIcon />
      </BlurView>
      <View style={[styles.inputContainer, { paddingBottom: inset.bottom }]}>
        <TextInput
          placeholder="..."
          onPressOut={() => scrollRef.current?.scrollToEnd({animated: true})}
          placeholderTextColor={"white"}
          value={inputText}
          onChangeText={(val) => setInputText(val)}
          style={styles.textInput}
        />
        <Icon onPress={updateList} name="md-arrow-up-circle" color={"blue"} size={40} /> 
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  me: {
    borderLeftColor: "red",
  },
  them: {
    borderLeftColor: "blue",
  },
  text: {
    borderLeftWidth: 2,
  },
  textContainer: {
    borderLeftWidth: 2,
    marginBottom: 10,
  },
  scrollContainer: {
    paddingLeft: 5,
    paddingRight: 5,
    borderBottomLeftRadius: SPACING.xl,
    borderBottomRightRadius: SPACING.xl,
    backgroundColor: "#06b6d4",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    padding: 10,
    left: 0,
    right: 0,
  },
  inputContainer: {
    backgroundColor: "black",
    flexDirection: "row",
    marginTop: SPACING.md,
    alignItems: "center",
    paddingLeft: SPACING.sm,
    paddingRight: SPACING.sm
  },
  textInput: {
    color: "white",
    padding: SPACING.md,
    borderRadius: SPACING.md,
    marginRight: SPACING.sm,
    flex: 1,
    backgroundColor: "blue"
  }
});

export default Chatting;
