import React from "react";
import { View, Text } from "react-native";
import PercentageButton from "../PercentageButton/PercentageButton";
import { Colors } from "@/constants/Colors";

type Props = {
  tipPercentage: number;
  setTipPercentage: (percentage: number) => void;
};

const QuickPercentSection = ({ tipPercentage, setTipPercentage }: Props) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text
        style={{
          color: Colors.slate[500],
          fontSize: 14,
          marginBottom: 12,
          textTransform: "uppercase",
          letterSpacing: 1,
          fontWeight: "700",
        }}
      >
        Quick Tips
      </Text>
      <View style={{ gap: 8, flex: 1, minWidth: 300 }}>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <PercentageButton
            percentage={0.05}
            selectedPercentage={tipPercentage}
            onPress={() => setTipPercentage(0.05)}
          />
          <PercentageButton
            percentage={0.1}
            selectedPercentage={tipPercentage}
            onPress={() => setTipPercentage(0.1)}
          />
          <PercentageButton
            percentage={0.15}
            selectedPercentage={tipPercentage}
            onPress={() => setTipPercentage(0.15)}
          />
          <PercentageButton
            percentage={0.2}
            selectedPercentage={tipPercentage}
            onPress={() => setTipPercentage(0.2)}
          />
        </View>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <PercentageButton
            percentage={0.25}
            selectedPercentage={tipPercentage}
            onPress={() => setTipPercentage(0.25)}
          />
          <PercentageButton
            percentage={0.3}
            selectedPercentage={tipPercentage}
            onPress={() => setTipPercentage(0.3)}
          />
          <PercentageButton
            percentage={0.35}
            selectedPercentage={tipPercentage}
            onPress={() => setTipPercentage(0.35)}
          />
          <PercentageButton
            percentage={0.4}
            selectedPercentage={tipPercentage}
            onPress={() => setTipPercentage(0.4)}
          />
        </View>
      </View>
    </View>

    // <ScrollView
    //   horizontal
    //   showsHorizontalScrollIndicator={false}
    //   contentContainerStyle={{
    //     gap: 8,
    //     paddingHorizontal: 6,
    //   }}
    // >
    //   <PercentageButton
    //     percentage={0.0}
    //     selectedPercentage={tipPercentage}
    //     onPress={() => setTipPercentage(0.0)}
    //   />
    //   <PercentageButton
    //     percentage={0.05}
    //     selectedPercentage={tipPercentage}
    //     onPress={() => setTipPercentage(0.05)}
    //   />
    //   <PercentageButton
    //     percentage={0.1}
    //     selectedPercentage={tipPercentage}
    //     onPress={() => setTipPercentage(0.1)}
    //   />
    //   <PercentageButton
    //     percentage={0.15}
    //     selectedPercentage={tipPercentage}
    //     onPress={() => setTipPercentage(0.15)}
    //   />
    //   <PercentageButton
    //     percentage={0.2}
    //     selectedPercentage={tipPercentage}
    //     onPress={() => setTipPercentage(0.2)}
    //   />
    //   <PercentageButton
    //     percentage={0.25}
    //     selectedPercentage={tipPercentage}
    //     onPress={() => setTipPercentage(0.25)}
    //   />
    //   <PercentageButton
    //     percentage={0.3}
    //     selectedPercentage={tipPercentage}
    //     onPress={() => setTipPercentage(0.3)}
    //   />
    //   <PercentageButton
    //     percentage={0.35}
    //     selectedPercentage={tipPercentage}
    //     onPress={() => setTipPercentage(0.35)}
    //   />
    //   <PercentageButton
    //     percentage={0.4}
    //     selectedPercentage={tipPercentage}
    //     onPress={() => setTipPercentage(0.4)}
    //   />
    // </ScrollView>
  );
};

export default QuickPercentSection;
