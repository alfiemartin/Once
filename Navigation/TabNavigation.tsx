import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import React from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import Chat from "../screens/Chat/Chat";
import Profile from "../screens/Profile/Profile";
import StoryView from "../screens/Stories/StoryView";

interface IconProps {
  color: string;
  icon: string;
}

const TabIcon = ({ color, icon }: IconProps) => {
  return (
    <View style={{ width: 60, height: 60 }}>
      <Icon
        name={icon}
        size={30}
        color={color}
        style={{ alignSelf: "flex-start" }}
      />
    </View>
  );
};

const Tab = createMaterialTopTabNavigator();

const TabNav = () => {
  const inset = useSafeAreaInsets();

  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      showPageIndicator={false}
      sceneContainerStyle={styles.scene}
      screenOptions={screenOptions}
      style={{ marginBottom: inset.bottom }}
      initialRouteName="Explore"
      initialLayout={{ width: Dimensions.get("window").width }}
    >
      <Tab.Screen
        name="Explore"
        component={StoryView}
        options={{
          tabBarIcon: ({ color }) => (
            <TabIcon color={color} icon="ios-disc-outline" />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: ({ color }) => (
            <TabIcon color={color} icon="chatbox-ellipses-outline" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <TabIcon color={color} icon="person-outline" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const screenOptions: MaterialTopTabNavigationOptions = {
  tabBarIndicator: () => null,
  swipeEnabled: Platform.OS !== "web",
  tabBarLabel: () => null,
  tabBarInactiveTintColor: "grey",
  tabBarActiveTintColor: "#ec4899",
  tabBarStyle: { backgroundColor: "black" },
};

const styles = StyleSheet.create({
  scene: { backgroundColor: "#fae8ff" },
});

export default TabNav;
