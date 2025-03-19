import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { formatCurrency } from "@/utils/utils";
import { Colors } from "../../constants/Colors";

type Props = {
  totalAmount: number;
};

const AmountPreview = ({ totalAmount }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[s.root, { top: insets.top + 40 }]}>
      <View style={s.textContainer}>
        <Text style={s.text}>{formatCurrency(totalAmount.toFixed(2))}</Text>
      </View>
    </View>
  );
};

export default AmountPreview;

const s = StyleSheet.create({
  root: {
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  textContainer: {
    backgroundColor: Colors.slate[950],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.slate[800],
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.slate[50],
  },
});
