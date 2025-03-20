import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";
import React from "react";

import { Colors } from "@/constants/Colors";

const NotFoundScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 justify-center items-center p-5">
        <Text
          style={{ color: Colors.slate[100], fontSize: 24, fontWeight: "bold" }}
        >
          This screen doesn't exist.
        </Text>
        <Link href="/" className="mt-4 py-4">
          <Text
            style={{
              color: Colors.slate[100],
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            Go to home screen!
          </Text>
        </Link>
      </View>
    </>
  );
};

export default NotFoundScreen;
