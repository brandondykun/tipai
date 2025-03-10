import React from "react";
import { Dimensions, View } from "react-native";

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
  return (
    <>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: (dimensions.width - rectWidth) * 2,
          backgroundColor: scanning ? "#65a30d80" : "#02061780",
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 0,
          left: (dimensions.width - rectWidth) * 2,
          bottom: 0,
          right: 0,
          backgroundColor: scanning ? "#65a30d80" : "#02061780",
        }}
      />
      <View
        style={{
          position: "absolute",
          top: rectTop + rectHeight,
          right: (dimensions.width - rectWidth) / 2,
          bottom: 0,
          left: (dimensions.width - rectWidth) / 2,
          backgroundColor: scanning ? "#65a30d80" : "#02061780",
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 0,
          right: (dimensions.width - rectWidth) / 2,
          bottom: dimensions.height - rectTop,
          left: (dimensions.width - rectWidth) / 2,
          backgroundColor: scanning ? "#65a30d80" : "#02061780",
        }}
      />
    </>
  );
};

export default TransparentOverlay;
