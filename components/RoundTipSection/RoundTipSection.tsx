import { View, Text, Pressable } from "react-native";
import { Colors } from "@/constants/Colors";
import * as Haptics from "expo-haptics";
import AntDesign from "@expo/vector-icons/AntDesign";

type Props = {
  roundTip: "up" | "down" | null;
  setRoundTip: React.Dispatch<React.SetStateAction<"up" | "down" | null>>;
  totalAmount: number;
  roundedTip: number;
  tip: string;
  setRoundTotal: (value: React.SetStateAction<"up" | "down" | null>) => void;
};

const RoundTipSection = ({
  roundTip,
  setRoundTip,
  totalAmount,
  roundedTip,
  tip,
  setRoundTotal,
}: Props) => {
  // If the tip is already rounded to the nearest dollar, disable the round buttons
  const alreadyRounded = !roundTip && tip.endsWith("00");

  return (
    <View className="flex-row justify-between items-center mb-6 px-6">
      <View>
        <Text className="text-slate-300 text-xl">Round Tip?</Text>
        {roundTip ? (
          <Text className="text-slate-500 font-light text-lg">
            Rounded Tip Percentage:{" "}
            {((roundedTip / totalAmount) * 100).toFixed(2)}%
          </Text>
        ) : (
          <Text className="text-slate-500 font-light text-lg">
            Round tip to nearest dollar.
          </Text>
        )}
      </View>
      <View className="flex-row gap-2">
        <Pressable
          onPress={() => {
            setRoundTotal(null);
            setRoundTip((prev) => (prev === "up" ? null : "up"));
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
          }}
          hitSlop={10}
          className={`h-9 w-9 bg-slate-800 justify-center items-center rounded-lg border ${
            roundTip === "up" ? "border-lime-500" : "border-slate-800"
          } ${alreadyRounded ? "opacity-50" : "opacity-100"} active:opacity-60`}
          disabled={alreadyRounded}
          testID="round-tip-up-button"
        >
          <AntDesign name="caretup" size={12} color={Colors.slate[100]} />
        </Pressable>
        <Pressable
          onPress={() => {
            setRoundTotal(null);
            setRoundTip((prev) => (prev === "down" ? null : "down"));
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
          }}
          hitSlop={10}
          className={`h-9 w-9 bg-slate-800 justify-center items-center rounded-lg border ${
            roundTip === "down" ? "border-lime-500" : "border-slate-800"
          } ${alreadyRounded ? "opacity-50" : "opacity-100"} active:opacity-60`}
          disabled={alreadyRounded}
          testID="round-tip-down-button"
        >
          <AntDesign name="caretdown" size={12} color={Colors.slate[100]} />
        </Pressable>
      </View>
    </View>
  );
};

export default RoundTipSection;
