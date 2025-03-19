import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { Colors } from "@/constants/Colors";

const NotFoundScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={s.container}>
        <Text
          style={{ color: Colors.slate[100], fontSize: 24, fontWeight: "bold" }}
        >
          This screen doesn't exist.
        </Text>
        <Link href="/" style={s.link}>
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

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
