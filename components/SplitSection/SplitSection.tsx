import { View, Text, Pressable, Switch, Platform } from "react-native";
import { useState } from "react";
import { Colors } from "../../constants/Colors";
import React from "react";
import * as Haptics from "expo-haptics";
import { formatCurrency } from "@/utils/utils";

type Props = {
  totalAmount: number;
};

const SplitSection = ({ totalAmount }: Props) => {
  const [shouldSplit, setShouldSplit] = useState<boolean>(false);
  const [split, setSplit] = useState<number>(1);

  // if bill is not split (split = 1), the split amount is the total amount
  // this will ensure there are never remainder cents when the bill is not split
  const splitAmount =
    split > 1 ? Math.floor((totalAmount / split) * 100) / 100 : totalAmount;
  const splitRemainder = Math.round((totalAmount - splitAmount * split) * 100);

  return (
    <View className="mt-7 p-5">
      <View className="flex-row justify-between items-center mb-6">
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setShouldSplit((prev) => !prev);
          }}
        >
          <Text className="text-slate-400 font-bold uppercase tracking-widest text-xl">
            Split the Bill?
          </Text>
        </Pressable>
        <Switch
          value={shouldSplit}
          onValueChange={setShouldSplit}
          trackColor={{
            true: Platform.OS === "ios" ? Colors.lime[500] : Colors.slate[500],
            false:
              Platform.OS === "ios" ? Colors.slate[800] : Colors.slate[700],
          }}
          thumbColor={
            Platform.OS === "ios"
              ? Colors.slate[50]
              : shouldSplit
              ? Colors.lime[500]
              : Colors.slate[400]
          }
          testID="split-switch"
        />
      </View>
      {shouldSplit ? (
        <>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-slate-200 text-2xl">How many people?</Text>
            <View className="flex-row items-center gap-2">
              <Pressable
                onPress={() => {
                  setSplit((prev) => (prev > 1 ? prev - 1 : prev));
                  if (split > 1) {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }
                }}
                hitSlop={10}
                className={`bg-slate-800 rounded-lg h-8 w-8 justify-center items-center active:opacity-50 ${
                  split === 1 ? "opacity-50" : ""
                }`}
                disabled={split === 1}
              >
                <Text className="text-slate-100 text-2xl -mt-[2px]">-</Text>
              </Pressable>
              <Text className="text-slate-100 text-2xl font-bold text-center w-12">
                {split}
              </Text>
              <Pressable
                onPress={() => {
                  setSplit(split + 1);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
                hitSlop={10}
                className="bg-slate-800 rounded-lg h-8 w-8 justify-center items-center active:opacity-50"
              >
                <Text className="text-slate-100 text-2xl -mt-[2px]">+</Text>
              </Pressable>
            </View>
          </View>
          <View>
            <Text className="text-slate-400 text-xl font-light">
              Each person should contribute:
            </Text>
            <View className="flex-row gap-2 mt-1 items-end">
              <Text className="text-slate-300 text-3xl">
                {formatCurrency(splitAmount.toFixed(2))}
              </Text>
              <Text className="text-slate-500 text-xl mb-[2px]">
                (Remainder: {splitRemainder}¢)
              </Text>
            </View>
          </View>
        </>
      ) : null}
    </View>
  );
};

export default SplitSection;
