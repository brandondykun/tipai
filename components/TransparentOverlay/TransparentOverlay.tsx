import React from "react";
import { Dimensions, View } from "react-native";
import { Colors } from "@/constants/Colors";
type Props = {
  scanning: boolean;
  rectTop: number;
  rectWidth: number;
  rectHeight: number;
};

const dimensions = Dimensions.get("window");

const TransparentOverlay = ({
  scanning,
  rectTop,
  rectWidth,
  rectHeight,
}: Props) => {
  const DEFAULT_COLOR = Colors.slate[950];
  const SCANNING_COLOR = Colors.lime[900];
  const OPACITY = 0.6;

  return (
    <>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: rectWidth + (dimensions.width - rectWidth) / 2 - 2,
          backgroundColor: scanning ? SCANNING_COLOR : DEFAULT_COLOR,
          opacity: OPACITY,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 0,
          left: rectWidth + (dimensions.width - rectWidth) / 2 - 2,
          bottom: 0,
          right: 0,
          backgroundColor: scanning ? SCANNING_COLOR : DEFAULT_COLOR,
          opacity: OPACITY,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: rectTop + rectHeight - 2,
          right: (dimensions.width - rectWidth) / 2 + 2,
          bottom: 0,
          left: (dimensions.width - rectWidth) / 2 + 2,
          backgroundColor: scanning ? SCANNING_COLOR : DEFAULT_COLOR,
          opacity: OPACITY,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 0,
          right: (dimensions.width - rectWidth) / 2 + 2,
          bottom: dimensions.height - rectTop - 2,
          left: (dimensions.width - rectWidth) / 2 + 2,
          backgroundColor: scanning ? SCANNING_COLOR : DEFAULT_COLOR,
          opacity: OPACITY,
        }}
      />
    </>
  );
};

export default TransparentOverlay;
