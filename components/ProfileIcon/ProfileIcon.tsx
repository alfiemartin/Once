import { View, Image, StyleProp, ImageStyle } from "react-native";

interface ProfileProps {
  style?: StyleProp<ImageStyle>;
}

const ProfileIcon = ({ style }: ProfileProps) => {
  return (
    <Image
      style={[
        { width: 50, height: 50, borderRadius: 100, backgroundColor: "blue" },
        style ?? null,
      ]}
      source={{uri: "https://firebasestorage.googleapis.com/v0/b/lensflare-41b96.appspot.com/o/alfie.jpg?alt=media&token=ceb410ef-59b4-4338-8675-279f6e76d381"}}
    />
  );
};

export default ProfileIcon;
