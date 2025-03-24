import { Stack } from "expo-router";
import React from "react";
import { Colors } from "@/constants/Colors";

const MainLayout = () => {
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
};

export default MainLayout;
