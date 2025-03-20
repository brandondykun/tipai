import { Pressable, Text } from "react-native";
import * as Haptics from "expo-haptics";

type PercentageButtonProps = {
  percentage: number;
  onPress: () => void;
  selectedPercentage: number;
};

const PercentageButton = ({
  percentage,
  selectedPercentage,
  onPress,
}: PercentageButtonProps) => {
  const isSelected = percentage === selectedPercentage;

  return (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      }}
      className={`px-2 py-[5px] rounded-lg flex-1 max-w-18 border active:opacity-60 ${
        isSelected
          ? "bg-slate-700 border-lime-500"
          : "bg-slate-900 border-transparent"
      }`}
    >
      <Text className="text-slate-100 text-xl text-center">
        {percentage * 100}%
      </Text>
    </Pressable>
  );
};

export default PercentageButton;
