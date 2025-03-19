import { View, Text, StyleSheet } from "react-native";
import CurrencyInput from "react-native-currency-input";
import { Colors } from "@/constants/Colors";
import { formatCurrency } from "@/utils/utils";

type Props = {
  totalAmount: number;
  tip: string;
  total: string;
  currencyInputRef: React.RefObject<CurrencyInput>;
  setTotalAmount: (value: number) => void;
};

const TotalsSummary = ({
  totalAmount,
  tip,
  total,
  currencyInputRef,
  setTotalAmount,
}: Props) => {
  return (
    <View style={s.totalsContainer}>
      <View style={s.totalsRow}>
        <Text style={s.totalsTitle}>Bill Amount</Text>
        <View style={s.guideLine} />
        <CurrencyInput
          ref={currencyInputRef}
          style={s.totalsAmount}
          value={totalAmount}
          onChangeValue={(value) => setTotalAmount(value || 0)}
          prefix="$"
          delimiter=","
          separator="."
          precision={2}
          minValue={0}
          placeholder="$0.00"
          keyboardType="decimal-pad"
          selectionColor={Colors.lime[500]}
        />
      </View>
      <View style={s.totalsRow}>
        <Text style={s.totalsTitle}>Tip</Text>
        <View style={s.guideLine} />
        <Text style={s.totalsAmount}>{formatCurrency(tip)}</Text>
      </View>
      <View style={s.totalsRow}>
        <Text style={s.totalsTitle}>Total</Text>
        <View style={s.guideLine} />
        <Text style={s.totalsAmount}>{formatCurrency(total)}</Text>
      </View>
    </View>
  );
};

export default TotalsSummary;

const s = StyleSheet.create({
  totalsContainer: {
    marginBottom: 24,
    padding: 16,
    marginHorizontal: 16,
    backgroundColor: Colors.slate[900],
    borderRadius: 12,
    gap: 4,
  },
  totalsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  totalsTitle: {
    color: Colors.slate[400],
    fontSize: 18,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  totalsAmount: {
    color: Colors.slate[100],
    fontSize: 22,
    textAlign: "center",
  },
  guideLine: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.slate[800],
    opacity: 0.5,
    marginTop: 12,
  },
});
