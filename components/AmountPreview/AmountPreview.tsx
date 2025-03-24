import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { formatCurrency } from "@/utils/utils";

type Props = {
  totalAmount: number;
};

const AmountPreview = ({ totalAmount }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ top: insets.top + 40 }}
      className={`absolute left-0 right-0 justify-center items-center z-10`}
    >
      <View className="bg-slate-950 px-4 py-2 rounded-lg border border-slate-800">
        <Text className="text-slate-100 text-2xl leading-7 font-bold">
          {formatCurrency(totalAmount.toString())}
        </Text>
      </View>
    </View>
  );
};

export default AmountPreview;
