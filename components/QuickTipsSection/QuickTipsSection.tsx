import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PercentageButton from "../PercentageButton/PercentageButton";
import { Colors } from "@/constants/Colors";

type Props = {
  tipPercentage: number;
  setTipPercentage: (percentage: number) => void;
  setSliderValue: React.Dispatch<React.SetStateAction<number>>;
};

const QuickTipsSection = ({
  tipPercentage,
  setTipPercentage,
  setSliderValue,
}: Props) => {
  const handlePress = (percentage: number) => {
    setTipPercentage(percentage);
    setSliderValue(percentage);
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Text style={s.titleText}>Quick Tips</Text>
      <View style={s.wrapperContainer}>
        <View style={s.content}>
          <PercentageButton
            percentage={0.05}
            selectedPercentage={tipPercentage}
            onPress={() => handlePress(0.05)}
          />
          <PercentageButton
            percentage={0.1}
            selectedPercentage={tipPercentage}
            onPress={() => handlePress(0.1)}
          />
          <PercentageButton
            percentage={0.15}
            selectedPercentage={tipPercentage}
            onPress={() => handlePress(0.15)}
          />
          <PercentageButton
            percentage={0.2}
            selectedPercentage={tipPercentage}
            onPress={() => handlePress(0.2)}
          />
          <PercentageButton
            percentage={0.25}
            selectedPercentage={tipPercentage}
            onPress={() => handlePress(0.25)}
          />
        </View>
      </View>
    </View>
  );
};

export default QuickTipsSection;

const s = StyleSheet.create({
  titleText: {
    color: Colors.slate[500],
    fontSize: 14,
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: "700",
  },
  wrapperContainer: {
    flex: 1,
    minWidth: 330,
  },
  content: {
    flexDirection: "row",
    gap: 8,
  },
});
