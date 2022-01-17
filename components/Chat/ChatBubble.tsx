import {View, Text, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { SPACING } from "../../styles";

interface IChatBubble {
  me?: Boolean;
  content: any;
}

const ChatBubble = ({me = false, content}: IChatBubble) => {
  return(
    <View
          style={[me ? styles.containerMe : styles.containerYou, styles.container]}
        >
          <Text style={{ color: "white", zIndex: 10 }}>{content}</Text>
          <Icon name="chatbubble-sharp" size={50} style={me ? styles.chatPinchMe : styles.chatPinchYou} />
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.lg,
    borderRadius: SPACING.md,
    marginBottom: SPACING.md
  },
  containerMe: {
    backgroundColor: "#2563eb",
    marginLeft: SPACING.sm * 4,
    marginRight: SPACING.sm
  },
  containerYou: {
    backgroundColor: "#4b5563",
    marginLeft: SPACING.sm,
    marginRight: SPACING.sm * 4
  },
  chatPinchMe: {
    position: "absolute",
    right: -5,
    bottom: -4,
    color: "#2563eb",
    transform: [{ rotate: "-110deg" }],
  },
  chatPinchYou: {
    position: "absolute",
    left: -4,
    bottom: -4,
    color: "#4b5563",
    transform: [{ rotate: "30deg" }],
  }
});

export default ChatBubble;