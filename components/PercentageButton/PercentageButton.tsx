import { Pressable, Text, StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";
import { Colors } from "@/constants/Colors";

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
      style={({ pressed }) => [
        s.root,
        {
          opacity: pressed ? 0.5 : 1,
          borderWidth: 1,
          borderColor: isSelected ? Colors.lime[500] : "transparent",
          backgroundColor: isSelected ? Colors.slate[700] : Colors.slate[900],
        },
      ]}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      }}
    >
      <Text style={s.text}>{percentage * 100}%</Text>
    </Pressable>
  );
};

export default PercentageButton;

const s = StyleSheet.create({
  root: {
    backgroundColor: Colors.slate[800],
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    flex: 1,
    maxWidth: 120,
  },
  text: {
    color: Colors.slate[100],
    fontSize: 20,
    textAlign: "center",
  },
});
