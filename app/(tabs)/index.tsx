import { useState, useRef, useEffect } from "react";
import { View, Text, ScrollView, Pressable, Platform } from "react-native";
import { ImageResult } from "expo-image-manipulator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CurrencyInput from "react-native-currency-input";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Colors } from "@/constants/Colors";
import CameraModal from "@/components/CameraModal/CameraModal";
import SplitSection from "@/components/SplitSection/SplitSection";
import QuickTipsSection from "@/components/QuickTipsSection/QuickTipsSection";
import RoundTipSection from "@/components/RoundTipSection/RoundTipSection";
import SliderSection from "@/components/SliderSection/SliderSection";
import RoundTotalSection from "@/components/RoundTotalSection/RoundTotalSection";
import TotalsSummary from "@/components/TotalsSummary/TotalsSummary";

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);

  const [cameraVisible, setCameraVisible] = useState(false);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [tipPercentage, setTipPercentage] = useState<number>(0.2);
  const [sliderValue, setSliderValue] = useState<number>(0.2);
  const [images, setImages] = useState<ImageResult[]>([]);
  const currencyInputRef = useRef<CurrencyInput>(null);
  const [roundTip, setRoundTip] = useState<"up" | "down" | null>(null);
  const [roundTotal, setRoundTotal] = useState<"up" | "down" | null>(null);

  let roundedTip = Number(totalAmount) * tipPercentage;

  if (roundTip === "up") {
    roundedTip = Math.ceil(Number(totalAmount) * tipPercentage);
  } else if (roundTip === "down") {
    roundedTip = Math.floor(Number(totalAmount) * tipPercentage);
  } else if (roundTotal === "up") {
    // get the total amount
    const total = Number(totalAmount) + Number(totalAmount) * tipPercentage;
    // get the rounded total amount (round up)
    const roundedTotal = Math.ceil(total);
    // get the difference
    const difference = roundedTotal - total;
    // add difference to tip
    roundedTip = roundedTip + difference;
  } else if (roundTotal === "down") {
    // get the total amount
    const total = Number(totalAmount) + Number(totalAmount) * tipPercentage;
    // get the rounded total amount (round down)
    const roundedTotal = Math.floor(total);
    // get the difference
    const difference = total - roundedTotal;
    // add difference to tip
    roundedTip = roundedTip - difference;
  }

  const tip = roundedTip.toFixed(2);
  const total = (Number(totalAmount) + Number(tip)).toFixed(2);

  useEffect(() => {
    // any time the tip percentage changes, reset the round tip
    setRoundTip(null);
    setRoundTotal(null);
  }, [tipPercentage]);

  useEffect(() => {
    if (roundTotal) {
      setRoundTip(null);
    }
    if (roundTip) {
      setRoundTotal(null);
    }
  }, [roundTotal, roundTip]);

  const totalAlreadyRounded = !roundTotal && total.endsWith("00");

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: Platform.OS === "ios" ? 8 : 16,
        paddingBottom: insets.bottom + 24,
      }}
      style={{ marginTop: insets.top }}
      showsVerticalScrollIndicator={false}
      ref={scrollViewRef}
    >
      <View style={{ marginBottom: 36 }}>
        <TotalsSummary
          totalAmount={totalAmount}
          tip={tip}
          total={total}
          currencyInputRef={currencyInputRef}
          setTotalAmount={setTotalAmount}
        />
        <RoundTipSection
          roundTip={roundTip}
          setRoundTip={setRoundTip}
          totalAmount={totalAmount}
          roundedTip={roundedTip}
          tip={tip}
          setRoundTotal={setRoundTotal}
        />
        <RoundTotalSection
          roundTotal={roundTotal}
          setRoundTotal={setRoundTotal}
          totalAmount={totalAmount}
          roundedTip={roundedTip}
          setRoundTip={setRoundTip}
          totalAlreadyRounded={totalAlreadyRounded}
        />
        <QuickTipsSection
          tipPercentage={tipPercentage}
          setTipPercentage={setTipPercentage}
          setSliderValue={setSliderValue}
        />
      </View>
      <SliderSection
        tipPercentage={tipPercentage}
        setTipPercentage={setTipPercentage}
        setSliderValue={setSliderValue}
        sliderValue={sliderValue}
      />
      <SplitSection totalAmount={Number(total)} />
      <View
        style={{
          marginTop: 36,
          paddingHorizontal: 16,
          flex: 1,
          justifyContent: "flex-end",
          gap: 36,
        }}
      >
        <Pressable
          className="active:opacity-50"
          onPress={() => {
            scrollViewRef.current?.scrollTo({
              y: 0,
              animated: true,
            });
            currencyInputRef.current?.focus();
          }}
        >
          <Text className="text-slate-400 text-center underline text-xl">
            Manually Enter Bill Amount
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setCameraVisible(true)}
          className="bg-lime-500 p-2 rounded-full flex-row items-center justify-center gap-2 mx-4 active:opacity-60"
        >
          <Ionicons name="scan" size={24} color={Colors.slate[950]} />
          <Text style={{ color: Colors.slate[950], fontSize: 22 }}>
            Scan My Bill
          </Text>
        </Pressable>
      </View>
      {/* <View>
        {images.map((image) => {
          return (
            <Image
              key={image.uri}
              source={{ uri: image.uri }}
              style={{
                width: dimensions.width,
                height: image.height * (dimensions.width / image.width),
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
};

export default HomeScreen;
