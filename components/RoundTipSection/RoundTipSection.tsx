import { View, Text, Pressable, StyleSheet } from "react-native";
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
    <View style={s.root}>
      <View>
        <Text style={s.title}>Round Tip?</Text>
        {roundTip ? (
          <Text style={s.roundedText}>
            Rounded Tip Percentage:{" "}
            {((roundedTip / totalAmount) * 100).toFixed(2)}%
          </Text>
        ) : (
          <Text style={s.secondaryText}>Round tip to nearest dollar.</Text>
        )}
      </View>
      <View style={s.buttonsContainer}>
        <Pressable
          onPress={() => {
            setRoundTotal(null);
            setRoundTip((prev) => (prev === "up" ? null : "up"));
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
          }}
          hitSlop={10}
          style={[
            s.incrementButton,
            {
              borderColor:
                roundTip === "up" ? Colors.lime[500] : Colors.slate[800],
              borderWidth: 1,
              opacity: alreadyRounded ? 0.5 : 1,
            },
          ]}
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
          style={[
            s.incrementButton,
            {
              borderColor:
                roundTip === "down" ? Colors.lime[500] : Colors.slate[800],
              borderWidth: 1,
              opacity: alreadyRounded ? 0.5 : 1,
            },
          ]}
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

const s = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    color: Colors.slate[300],
    fontSize: 18,
  },
  secondaryText: {
    color: Colors.slate[500],
    fontSize: 16,
    fontWeight: "300",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  incrementButton: {
    height: 32,
    width: 32,
    backgroundColor: Colors.slate[800],
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  roundedText: {
    color: Colors.slate[500],
    fontSize: 16,
  },
});
