import { Stack } from "expo-router";
import React from "react";
import { Colors } from "@/constants/Colors";
export default function TabLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          contentStyle: { backgroundColor: Colors.slate[950] },
        }}
      />
    </Stack>
  );
}
