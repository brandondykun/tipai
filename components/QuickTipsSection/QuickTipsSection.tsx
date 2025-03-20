import React from "react";
import { View, Text } from "react-native";
import PercentageButton from "../PercentageButton/PercentageButton";

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
      <Text className="text-slate-500 uppercase font-bold tracking-widest mb-3 text-md">
        Quick Tips
      </Text>
      <View className="flex-1 min-w-[320px]">
        <View className="flex-row gap-2 justify-center">
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
