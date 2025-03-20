import React from "react";
import { Animated, View, Text, StyleSheet, Easing } from "react-native";
import { Colors } from "../../constants/Colors";

type Props = {
  scanning: boolean;
  left: number;
  top: number;
  width: number;
  height: number;
};

const RectangleOverlay = ({ scanning, left, top, width, height }: Props) => {
  const translateX = React.useRef(new Animated.Value(-6)).current;

  React.useEffect(() => {
    if (scanning) {
      // Reset position and start animation
      translateX.setValue(-6);
      Animated.loop(
        Animated.sequence([
          // Move right
          Animated.timing(translateX, {
            toValue: width - 4,
            duration: 1500,
            useNativeDriver: true,
            easing: Easing.bezier(0.4, 0.0, 0.2, 1),
          }),
          // Move left
          Animated.timing(translateX, {
            toValue: -6,
            duration: 1500,
            useNativeDriver: true,
            easing: Easing.bezier(0.4, 0.0, 0.2, 1),
          }),
        ])
      ).start();
    } else {
      // Stop animation when not scanning
      translateX.stopAnimation();
      translateX.setValue(-6);
    }
  }, [scanning, width]);

  return (
    <>
      <View
        style={[
          s.rectangleOverlay,
          {
            borderColor: scanning ? Colors.lime[500] : Colors.slate[200],
            left: left,
            top: top,
            width: width,
            height: height,
          },
        ]}
      >
        <View className="relative justify-center overflow-hidden h-full w-full">
          <Animated.View
            style={[
              s.scanLine,
              {
                backgroundColor: scanning ? Colors.lime[500] : "transparent",
                transform: [{ translateX }],
              },
            ]}
          />
          <Text
            className={`text-slate-900 font-bold text-2xl text-center ${
              scanning ? "opacity-40" : "opacity-70"
            }`}
          >
            __.__
          </Text>
        </View>
      </View>
      <View style={[s.overlayTextContainer, { top: top + height + 10 }]}>
        <Text className="text-slate-50 text-center z-10">
          Place amount in box above then
        </Text>
        <Text className="text-slate-50 text-center z-10">
          hold scan button below
        </Text>
      </View>
    </>
  );
};

export default RectangleOverlay;

const s = StyleSheet.create({
  rectangleOverlay: {
    position: "absolute",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    zIndex: 10,
  },
  overlayTextContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  scanLine: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 6,
    zIndex: 10,
    opacity: 0.5,
  },
});
