import { View, Text, Pressable, StyleSheet, Switch } from "react-native";
import { useState } from "react";
import { Colors } from "../../constants/Colors";
import React from "react";
import * as Haptics from "expo-haptics";
type Props = {
  totalAmount: number;
};
const SplitSection = ({ totalAmount }: Props) => {
  const [shouldSplit, setShouldSplit] = useState<boolean>(false);
  const [split, setSplit] = useState<number>(1);

  const splitAmount = Math.floor((totalAmount / split) * 100) / 100;
  const splitRemainder = Math.round((totalAmount - splitAmount * split) * 100);

  return (
    <View style={s.root}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            color: Colors.slate[400],
            fontSize: 18,
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          Split the Bill?
        </Text>
        <Switch
          value={shouldSplit}
          onValueChange={setShouldSplit}
          trackColor={{
            true: Colors.lime[500],
            false: Colors.slate[800],
          }}
        />
      </View>
      {shouldSplit ? (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                color: Colors.slate[200],
                fontSize: 22,
                fontWeight: "400",
              }}
            >
              How many people?
            </Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
            >
              <Pressable
                onPress={() => {
                  setSplit((prev) => (prev > 1 ? prev - 1 : prev));
                  if (split > 1) {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
                  }
                }}
                hitSlop={10}
                style={[
                  s.incrementButton,
                  {
                    opacity: split === 1 ? 0.5 : 1,
                  },
                ]}
                disabled={split === 1}
              >
                <Text
                  style={{
                    color: Colors.slate[100],
                    fontSize: 24,
                    marginTop: -2,
                  }}
                >
                  -
                </Text>
              </Pressable>
              <Text
                style={{
                  color: Colors.slate[100],
                  fontSize: 24,
                  fontWeight: "bold",
                  width: 40,
                  textAlign: "center",
                }}
              >
                {split}
              </Text>
              <Pressable
                onPress={() => {
                  setSplit(split + 1);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
                }}
                style={s.incrementButton}
                hitSlop={10}
              >
                <Text
                  style={{
                    color: Colors.slate[100],
                    fontSize: 24,
                    marginTop: -2,
                  }}
                >
                  +
                </Text>
              </Pressable>
            </View>
          </View>
          <View>
            <Text
              style={{
                color: Colors.slate[400],
                fontSize: 18,
                marginTop: 6,
                fontWeight: "300",
              }}
            >
              Each person should pay:
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 6,
                marginTop: 6,
                alignItems: "flex-end",
              }}
            >
              <Text style={{ color: "#cbd5e1", fontSize: 24 }}>
                ${splitAmount.toFixed(2)}
              </Text>
              <Text
                style={{
                  color: Colors.slate[500],
                  fontSize: 18,
                  fontWeight: "300",
                  marginBottom: 3,
                }}
              >
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
  incrementButton: {
    height: 36,
    width: 36,
    backgroundColor: Colors.slate[800],
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
