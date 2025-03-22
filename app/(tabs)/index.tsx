import { useState, useRef, useEffect } from "react";
import { View, ScrollView, Platform } from "react-native";
import { ImageResult } from "expo-image-manipulator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CurrencyInput from "react-native-currency-input";

import CameraModal from "@/components/CameraModal/CameraModal";
import SplitSection from "@/components/SplitSection/SplitSection";
import QuickTipsSection from "@/components/QuickTipsSection/QuickTipsSection";
import RoundTipSection from "@/components/RoundTipSection/RoundTipSection";
import SliderSection from "@/components/SliderSection/SliderSection";
import RoundTotalSection from "@/components/RoundTotalSection/RoundTotalSection";
import TotalsSummary from "@/components/TotalsSummary/TotalsSummary";
import BottomButtons from "@/components/BottomButtons/BottomButtons";

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
  // This is the top of the bottom buttons needed for the scroll view bottom padding
  const [bottomButtonsTop, setBottomButtonsTop] = useState<number>(0);

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
    <View className="flex-1 relative">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: Platform.OS === "ios" ? 8 : 16,
          paddingBottom: bottomButtonsTop + 48,
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
      <BottomButtons
        scrollViewRef={scrollViewRef}
        currencyInputRef={currencyInputRef}
        setCameraVisible={setCameraVisible}
        setBottomButtonsTop={setBottomButtonsTop}
      />
    </View>
  );
};

export default HomeScreen;
