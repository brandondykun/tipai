import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Switch,
  Platform,
} from "react-native";
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
    <View style={s.root}>
      <View style={s.headerSection}>
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setShouldSplit((prev) => !prev);
          }}
        >
          <Text style={s.headerTitle}>Split the Bill?</Text>
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
          <View style={s.peopleSection}>
            <Text style={s.peopleSectionTitle}>How many people?</Text>
            <View style={s.peopleSectionButtons}>
              <Pressable
                onPress={() => {
                  setSplit((prev) => (prev > 1 ? prev - 1 : prev));
                  if (split > 1) {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }
                }}
                hitSlop={10}
                style={({ pressed }) => [
                  s.incrementButton,
                  {
                    opacity: split === 1 ? 0.5 : pressed ? 0.5 : 1,
                  },
                ]}
                disabled={split === 1}
              >
                <Text style={s.incrementButtonText}>-</Text>
              </Pressable>
              <Text style={s.numberOfPeopleText}>{split}</Text>
              <Pressable
                onPress={() => {
                  setSplit(split + 1);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
                style={({ pressed }) => [
                  s.incrementButton,
                  { opacity: pressed ? 0.5 : 1 },
                ]}
                hitSlop={10}
              >
                <Text style={s.incrementButtonText}>+</Text>
              </Pressable>
            </View>
          </View>
          <View>
            <Text style={s.eachPersonText}>Each person should contribute:</Text>
            <View style={s.eachPersonTotalsContainer}>
              <Text style={s.amountText}>
                {formatCurrency(splitAmount.toFixed(2))}
              </Text>
              <Text style={s.remainderText}>
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

const s = StyleSheet.create({
  root: {
    marginTop: 24,
    padding: 18,
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: {
    color: Colors.slate[400],
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  peopleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  peopleSectionTitle: {
    color: Colors.slate[200],
    fontSize: 22,
    fontWeight: "400",
  },
  peopleSectionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  incrementButton: {
    height: 32,
    width: 32,
    backgroundColor: Colors.slate[800],
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  incrementButtonText: {
    color: Colors.slate[100],
    fontSize: 24,
    marginTop: -2,
  },
  numberOfPeopleText: {
    color: Colors.slate[100],
    fontSize: 22,
    width: 40,
    textAlign: "center",
    fontWeight: "bold",
  },
  eachPersonText: {
    color: Colors.slate[400],
    fontSize: 18,
    marginTop: 6,
    fontWeight: "300",
  },
  eachPersonTotalsContainer: {
    flexDirection: "row",
    gap: 6,
    marginTop: 6,
    alignItems: "flex-end",
  },
  amountText: {
    color: Colors.slate[300],
    fontSize: 24,
  },
  remainderText: {
    color: Colors.slate[500],
    fontSize: 18,
    fontWeight: "300",
    marginBottom: 3,
  },
});
