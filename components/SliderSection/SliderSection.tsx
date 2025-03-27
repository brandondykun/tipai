import { View, Text, Pressable, Dimensions } from "react-native";
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
    <View className="justify-center items-center px-4">
      <View className="flex-row items-center gap-2 mb-4">
        <Text className="text-slate-500 text-2xl">Tip Percentage:</Text>
        <Text className="text-slate-100 w-15 text-2xl">
          {(tipPercentage * 100).toFixed(0)}%
        </Text>
      </View>
      <View className="flex-row items-center gap-4 justify-between px-0">
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
          className={`h-9 w-9 bg-slate-800 justify-center items-center rounded-lg active:opacity-50 ${
            tipPercentage === 0 ? "opacity-50" : "opacity-100"
          }`}
          disabled={tipPercentage === 0}
        >
          <Text className="text-slate-100 text-2xl -mt-[1px]">-</Text>
        </Pressable>
        <Slider
          style={{ flex: 1, height: 40 }}
          minimumValue={0}
          maximumValue={0.4}
          step={0.01}
          value={sliderValue}
          minimumTrackTintColor={Colors.slate[300]}
          maximumTrackTintColor={Colors.slate[900]}
          onValueChange={(value) =>
            setTipPercentage(parseFloat(value.toFixed(2)))
          }
          onSlidingComplete={(value) =>
            setSliderValue(parseFloat(value.toFixed(2)))
          }
          thumbTintColor={Colors.slate[200]}
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
          className="h-9 w-9 bg-slate-800 justify-center items-center rounded-lg active:opacity-50"
          disabled={tipPercentage === 1}
        >
          <Text className="text-slate-100 text-2xl -mt-[1px]">+</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SliderSection;
