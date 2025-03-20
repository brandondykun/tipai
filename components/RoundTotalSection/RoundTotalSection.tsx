import { View, Text, Pressable } from "react-native";
import { Colors } from "../../constants/Colors";
import * as Haptics from "expo-haptics";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  roundTotal: "up" | "down" | null;
  setRoundTotal: React.Dispatch<React.SetStateAction<"up" | "down" | null>>;
  totalAmount: number;
  roundedTip: number;
  setRoundTip: React.Dispatch<React.SetStateAction<"up" | "down" | null>>;
  totalAlreadyRounded: boolean;
};

const RoundTotalSection = ({
  roundTotal,
  setRoundTotal,
  totalAmount,
  roundedTip,
  setRoundTip,
  totalAlreadyRounded,
}: Props) => {
  return (
    <View className="flex-row justify-between items-center mb-10 px-6">
      <View>
        <Text className="text-slate-400 text-xl">Round Total?</Text>
        {roundTotal ? (
          <Text className="text-slate-500 font-light text-lg">
            Rounded Tip Percentage:{" "}
            {((roundedTip / totalAmount) * 100).toFixed(2)}%
          </Text>
        ) : (
          <Text className="text-slate-500 font-light text-lg">
            Round total to nearest dollar.
          </Text>
        )}
      </View>
      <View className="flex-row gap-2">
        <Pressable
          onPress={() => {
            setRoundTip(null);
            setRoundTotal((prev) => (prev === "up" ? null : "up"));
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
          }}
          hitSlop={10}
          className={`h-9 w-9 bg-slate-800 justify-center items-center rounded-lg border ${
            roundTotal === "up" ? "border-lime-500" : "border-slate-800"
          } ${
            totalAlreadyRounded ? "opacity-50" : "opacity-100"
          } active:opacity-60`}
          disabled={totalAlreadyRounded}
          testID="round-total-up-button"
        >
          <AntDesign name="caretup" size={12} color={Colors.slate[100]} />
        </Pressable>
        <Pressable
          onPress={() => {
            setRoundTip(null);
            setRoundTotal((prev) => (prev === "down" ? null : "down"));
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
          }}
          hitSlop={10}
          className={`h-9 w-9 bg-slate-800 justify-center items-center rounded-lg border ${
            roundTotal === "down" ? "border-lime-500" : "border-slate-800"
          } ${
            totalAlreadyRounded ? "opacity-50" : "opacity-100"
          } active:opacity-60`}
          disabled={totalAlreadyRounded}
          testID="round-total-down-button"
        >
          <AntDesign name="caretdown" size={12} color={Colors.slate[100]} />
        </Pressable>
      </View>
    </View>
  );
};

export default RoundTotalSection;
