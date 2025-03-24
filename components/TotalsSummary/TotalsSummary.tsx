import { View, Text } from "react-native";
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
    <View className="mb-8 p-4 mx-4 gap-2 rounded-xl bg-slate-900 border border-slate-800">
      <View className="flex-row items-center justify-between gap-2">
        <Text className="text-slate-200 uppercase text-xl tracking-wider font-bold">
          Bill Amount
        </Text>
        <View className="flex-1 h-[1px] bg-slate-800 opacity-50 mt-4" />
        <CurrencyInput
          ref={currencyInputRef}
          className="text-slate-100 text-2xl leading-7"
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
          testID="bill-amount-input"
        />
      </View>
      <View className="flex-row items-center justify-between gap-2">
        <Text className="text-slate-200 uppercase text-xl tracking-wider font-bold">
          Tip
        </Text>
        <View className="flex-1 h-[1px] bg-slate-800 opacity-50 mt-4" />
        <Text className="text-slate-100 text-2xl" testID="tip-value">
          {formatCurrency(tip)}
        </Text>
      </View>
      <View className="flex-row items-center justify-between gap-2">
        <Text className="text-slate-200 uppercase text-xl tracking-wider font-bold">
          Total
        </Text>
        <View className="flex-1 h-[1px] bg-slate-800 opacity-50 mt-4" />
        <Text className="text-slate-100 text-2xl" testID="total-value">
          {formatCurrency(total)}
        </Text>
      </View>
    </View>
  );
};

export default TotalsSummary;
