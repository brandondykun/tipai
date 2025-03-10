import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  totalAmount: number;
  scanning: boolean;
};

const AmountPreview = ({ totalAmount, scanning }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.text, { top: insets.top + 40 }]}>
      <View style={styles.textContainer}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#e2e8f0" }}>
          $ {totalAmount.toFixed(2)}
        </Text>
      </View>
      {/* {scanning && <Text>Scanning...</Text>} */}
    </View>
  );
};

export default AmountPreview;

const styles = StyleSheet.create({
  text: {
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  textContainer: {
    backgroundColor: "#020617",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
});
