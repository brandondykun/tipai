import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import Slider from "@react-native-community/slider";

import { useState } from "react";
import CameraModal from "@/components/CameraModal/CameraModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PercentageButton from "@/components/PercentageButton/PercentageButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import SplitSection from "@/components/SplitSection/SplitSection";
import { ImageResult } from "expo-image-manipulator";
import { Colors } from "@/constants/Colors";
import QuickPercentSection from "@/components/QuickPercentSection/QuickPercentSection";
const dimensions = Dimensions.get("window");

export default function HomeScreen() {
  const [cameraVisible, setCameraVisible] = useState(false);
  const [totalAmount, setTotalAmount] = useState<number>(0.0);
  const [tipPercentage, setTipPercentage] = useState<number>(0.2);
  const insets = useSafeAreaInsets();
  // const tabBarHeight = useBottomTabBarHeight();
  const [images, setImages] = useState<ImageResult[]>([]);

  const tip = (totalAmount * tipPercentage).toFixed(2);
  const total = (totalAmount + Number(tip)).toFixed(2);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: insets.top + 24,
        paddingBottom: insets.bottom + 24,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ marginBottom: 36 }}>
        <Text style={s.screenHeader}>Tip Calculator</Text>
        <View style={s.totalsContainer}>
          <View style={s.totalsRow}>
            <Text style={s.totalsTitle}>Bill Amount</Text>
            <View style={s.guideLine} />
            <Text style={s.totalsAmount}>${totalAmount.toFixed(2)}</Text>
          </View>
          <View style={s.totalsRow}>
            <Text style={s.totalsTitle}>Tip</Text>
            <View style={s.guideLine} />
            <Text style={s.totalsAmount}>${tip}</Text>
          </View>
          <View style={s.totalsRow}>
            <Text style={s.totalsTitle}>Total</Text>
            <View style={s.guideLine} />
            <Text style={s.totalsAmount}>${total}</Text>
          </View>
        </View>
        <QuickPercentSection
          tipPercentage={tipPercentage}
          setTipPercentage={setTipPercentage}
        />
        {/* <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 8,
            paddingHorizontal: 6,
          }}
        >
          <PercentageButton
            percentage={0.0}
            selectedPercentage={tipPercentage}
            onPress={() => setTipPercentage(0.0)}
          />
          <PercentageButton
            percentage={0.05}
            selectedPercentage={tipPercentage}
            onPress={() => setTipPercentage(0.05)}
          />
          <PercentageButton
            percentage={0.1}
            selectedPercentage={tipPercentage}
            onPress={() => setTipPercentage(0.1)}
          />
          <PercentageButton
            percentage={0.15}
            selectedPercentage={tipPercentage}
            onPress={() => setTipPercentage(0.15)}
          />
          <PercentageButton
            percentage={0.2}
            selectedPercentage={tipPercentage}
            onPress={() => setTipPercentage(0.2)}
          />
          <PercentageButton
            percentage={0.25}
            selectedPercentage={tipPercentage}
            onPress={() => setTipPercentage(0.25)}
          />
          <PercentageButton
            percentage={0.3}
            selectedPercentage={tipPercentage}
            onPress={() => setTipPercentage(0.3)}
          />
          <PercentageButton
            percentage={0.35}
            selectedPercentage={tipPercentage}
            onPress={() => setTipPercentage(0.35)}
          />
          <PercentageButton
            percentage={0.4}
            selectedPercentage={tipPercentage}
            onPress={() => setTipPercentage(0.4)}
          />
        </ScrollView> */}
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            marginBottom: 12,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Text style={{ color: Colors.slate[400], fontSize: 20 }}>
            Tip Percentage:
          </Text>
          <Text style={{ color: Colors.slate[100], fontSize: 20, width: 42 }}>
            {(tipPercentage * 100).toFixed(0)}%
          </Text>
        </View>
        <Slider
          style={{ width: dimensions.width - 48, height: 40 }}
          minimumValue={0}
          maximumValue={0.4}
          step={0.01}
          value={tipPercentage}
          minimumTrackTintColor={Colors.slate[200]}
          maximumTrackTintColor={Colors.slate[800]}
          onValueChange={(value) =>
            setTipPercentage(parseFloat(value.toFixed(2)))
          }
        />
      </View>

      <SplitSection totalAmount={Number(total)} />
      <View
        style={{
          marginTop: 24,
          paddingHorizontal: 16,
          flex: 1,
          justifyContent: "flex-end",
          gap: 36,
        }}
      >
        <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
          <Text
            style={{
              textAlign: "center",
              color: Colors.slate[400],
              textDecorationLine: "underline",
              fontSize: 18,
            }}
          >
            Manually Enter Bill Amount
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: "#65a30d",
              padding: 8,
              borderRadius: 100,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              opacity: pressed ? 0.6 : 1,
            },
          ]}
          onPress={() => setCameraVisible(true)}
        >
          <Ionicons name="scan" size={24} color="#020617" />
          <Text style={{ color: "#020617", fontSize: 22 }}>Scan My Bill</Text>
        </Pressable>
      </View>
      {/* <View>
        {images.map((image) => {
          return (
            <Image
              key={image.uri}
              source={{ uri: image.uri }}
              style={{
                width: width,
                height: image.height * (width / image.width),
              }}
            />
          );
        })}
      </View> */}
      <CameraModal
        cameraVisible={cameraVisible}
        setCameraVisible={setCameraVisible}
        totalAmount={totalAmount}
        setTotalAmount={setTotalAmount}
        setImages={setImages}
      />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  screenHeader: {
    color: "#94a3b8",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  totalsContainer: {
    marginBottom: 24,
    padding: 16,
    marginHorizontal: 16,
    backgroundColor: "#0f172a",
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
    color: "#94a3b8",
    fontSize: 18,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  totalsAmount: {
    color: "#f1f5f9",
    fontSize: 22,
    textAlign: "center",
  },
  guideLine: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#1e293b",
    opacity: 0.5,
    marginTop: 12,
  },
});
