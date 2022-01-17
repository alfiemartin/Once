import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import React from "react";
import Chatting from "../screens/Chat/Chatting";
import StoryView from "../screens/Stories/StoryView";
import { SPACING } from "../styles";
import TabNav from "./TabNavigation";

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureDirection: "vertical",
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerBackground: () => null,
          cardStyle: { 
            backgroundColor: "black",
            borderTopLeftRadius: SPACING.xl,
            borderTopRightRadius: SPACING.xl
          },
        }}
      >
        <Stack.Screen name="TabNav" component={TabNav} />
        <Stack.Screen name="StoryView" component={StoryView} />
        <Stack.Screen name="Chatting" component={Chatting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
