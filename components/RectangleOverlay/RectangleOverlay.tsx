import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
type Props = {
  scanning: boolean;
  left: number;
  top: number;
  width: number;
  height: number;
};

const RectangleOverlay = ({ scanning, left, top, width, height }: Props) => {
  return (
    <>
      <View
        style={[
          styles.rectangleOverlay,
          {
            borderColor: scanning ? "#65a30d" : "#e2e8f0",
            left: left,
            top: top,
            width: width,
            height: height,
          },
        ]}
      >
        <Text style={[styles.overlayText, { opacity: scanning ? 0.4 : 0.7 }]}>
          __.__
        </Text>
      </View>
      <View style={[styles.overlayTextContainer, { top: top + height + 10 }]}>
        <Text style={styles.helperText}>Place amount in box above then</Text>
        <Text style={styles.helperText}>hold scan button below</Text>
      </View>
    </>
  );
};

export default RectangleOverlay;

const styles = StyleSheet.create({
  rectangleOverlay: {
    position: "absolute",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    color: Colors.slate[900],
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
  },
  overlayTextContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  helperText: {
    color: Colors.slate[50],
    textAlign: "center",
    zIndex: 10,
  },
});
