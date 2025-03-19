import { View, Text, Pressable, Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import * as Haptics from "expo-haptics";
import Slider from "@react-native-community/slider";

type Props = {
  tipPercentage: number;
  setTipPercentage: (value: React.SetStateAction<number>) => void;
  setSliderValue: (value: React.SetStateAction<number>) => void;
  sliderValue: number;
};

const SliderSection = ({
  tipPercentage,
  setTipPercentage,
  setSliderValue,
  sliderValue,
}: Props) => {
  const dimensions = Dimensions.get("window");

  return (
    <View style={s.root}>
      <View style={s.tipPercentageContainer}>
        <Text style={s.tipPercentageLabel}>Tip Percentage:</Text>
        <Text style={s.tipPercentage}>{(tipPercentage * 100).toFixed(0)}%</Text>
      </View>
      <View style={s.mainContent}>
        <Pressable
          onPress={() => {
            if (tipPercentage > 0) {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setTipPercentage((prev) =>
                prev > 0 ? parseFloat((prev - 0.01).toFixed(2)) : prev
              );
              setSliderValue((prev) =>
                prev > 0 ? parseFloat((prev - 0.01).toFixed(2)) : prev
              );
            }
          }}
          hitSlop={10}
          style={({ pressed }) => [
            s.incrementButton,
            { opacity: pressed ? 0.5 : 1 },
          ]}
          disabled={tipPercentage === 0}
        >
          <Text style={s.incrementButtonText}>-</Text>
        </Pressable>
        <Slider
          style={{ width: dimensions.width - 130, height: 40 }}
          minimumValue={0}
          maximumValue={0.4}
          step={0.01}
          value={sliderValue}
          minimumTrackTintColor={Colors.slate[300]}
          maximumTrackTintColor={Colors.slate[800]}
          onValueChange={(value) =>
            setTipPercentage(parseFloat(value.toFixed(2)))
          }
          onSlidingComplete={(value) =>
            setSliderValue(parseFloat(value.toFixed(2)))
          }
          thumbTintColor={Colors.slate[50]}
        />
        <Pressable
          onPress={() => {
            if (tipPercentage < 1) {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setTipPercentage((prev) =>
                prev < 1 ? parseFloat((prev + 0.01).toFixed(2)) : prev
              );
              setSliderValue((prev) =>
                prev < 1 ? parseFloat((prev + 0.01).toFixed(2)) : prev
              );
            }
          }}
          hitSlop={10}
          style={({ pressed }) => [
            s.incrementButton,
            { opacity: pressed ? 0.5 : 1 },
          ]}
          disabled={tipPercentage === 1}
        >
          <Text style={s.incrementButtonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SliderSection;

const s = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  tipPercentageContainer: {
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tipPercentageLabel: {
    color: Colors.slate[400],
    fontSize: 20,
  },
  tipPercentage: {
    color: Colors.slate[100],
    fontSize: 20,
    width: 50,
  },
  mainContent: {
    paddingHorizontal: 16,
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  incrementButton: {
    height: 32,
    width: 32,
    backgroundColor: Colors.slate[800],
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  incrementButtonText: {
    color: Colors.slate[100],
    fontSize: 24,
    marginTop: -2,
  },
});
