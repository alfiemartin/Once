import { LinearGradient } from "expo-linear-gradient"
import React from "react"
import { View, StyleSheet, Text, Image } from "react-native"

const ChatPreview = (props: any) => {
  return (
    <View style={styles.container}>
      <Text>{props.message}</Text>
    </View>
  )
}

const ChatPreviewImage = (props: any) => {
  if(props.uri.length == 0) {
    return (
      <LinearGradient colors={["rgba(49, 209, 238, 0.13)", "rgba(49, 209, 73, 0.13)"]} style={styles.container}>
        <Text style={{fontWeight: "bold", fontSize: 24}}>{props.name}</Text>
      </LinearGradient>
    )
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: props.uri}}  />
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 5,
    height: 150,
    borderColor: "#164e63",
    borderWidth: 2,
  },
  image: {
    width: "100%", 
    height: "100%", 
    borderRadius: 3
  }
});

export {ChatPreview, ChatPreviewImage}
