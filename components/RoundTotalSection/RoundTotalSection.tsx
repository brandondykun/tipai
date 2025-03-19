import { View, Text, Pressable, StyleSheet } from "react-native";
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
    <View style={s.root}>
      <View>
        <Text style={s.title}>Round Total?</Text>
        {roundTotal ? (
          <Text style={s.roundedText}>
            Rounded Tip Percentage:{" "}
            {((roundedTip / totalAmount) * 100).toFixed(2)}%
          </Text>
        ) : (
          <Text style={s.secondaryText}>Round total to nearest dollar.</Text>
        )}
      </View>
      <View style={s.buttonsContainer}>
        <Pressable
          onPress={() => {
            setRoundTip(null);
            setRoundTotal((prev) => (prev === "up" ? null : "up"));
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
          }}
          hitSlop={10}
          style={[
            s.incrementButton,
            {
              borderColor:
                roundTotal === "up" ? Colors.lime[500] : Colors.slate[800],
              borderWidth: 1,
              opacity: totalAlreadyRounded ? 0.5 : 1,
            },
          ]}
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
          style={[
            s.incrementButton,
            {
              borderColor:
                roundTotal === "down" ? Colors.lime[500] : Colors.slate[800],
              borderWidth: 1,
              opacity: totalAlreadyRounded ? 0.5 : 1,
            },
          ]}
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

const s = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    alignItems: "center",
    marginBottom: 36,
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
