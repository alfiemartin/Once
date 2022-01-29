import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./Navigation/StackNavigation";
import { registerRootComponent } from "expo";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Cannot record touch end without a touch start."]);

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar />
      <Navigation />
    </SafeAreaProvider>
  );
}

registerRootComponent(App);
