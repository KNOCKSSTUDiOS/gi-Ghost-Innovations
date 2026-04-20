import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screens/LoginScreen";
import ProjectListScreen from "./screens/ProjectListScreen";
import SceneListScreen from "./screens/SceneListScreen";
import ScriptEditorScreen from "./screens/ScriptEditorScreen";
import TimelineScreen from "./screens/TimelineScreen";
import AssetScreen from "./screens/AssetScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Projects" component={ProjectListScreen} />
        <Stack.Screen name="Scenes" component={SceneListScreen} />
        <Stack.Screen name="Script" component={ScriptEditorScreen} />
        <Stack.Screen name="Timeline" component={TimelineScreen} />
        <Stack.Screen name="Assets" component={AssetScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

