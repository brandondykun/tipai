import {
  View,
  Pressable,
  Text,
  ScrollView,
  TextInput,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import * as Haptics from "expo-haptics";
import { useEffect, useRef } from "react";
type BottomButtonsProps = {
  scrollViewRef: React.RefObject<ScrollView>;
  currencyInputRef: React.RefObject<TextInput>;
  setCameraVisible: (visible: boolean) => void;
  setBottomButtonsTop: React.Dispatch<React.SetStateAction<number>>;
};

const BottomButtons = ({
  scrollViewRef,
  currencyInputRef,
  setCameraVisible,
  setBottomButtonsTop,
}: BottomButtonsProps) => {
  const insets = useSafeAreaInsets();

  const ref = useRef<View>(null);
  const bottomPosition = insets.bottom < 50 ? 50 : insets.bottom + 12;

  return (
    <View
      className="absolute right-0 left-0 z-10 justify-center items-center"
      style={{ bottom: bottomPosition }}
      ref={ref}
      onLayout={(event) => {
        setBottomButtonsTop(event.nativeEvent.layout.height + bottomPosition);
      }}
    >
      <View className="bg-slate-900 rounded-full flex-row gap-[2px] p-[2px]">
        <Pressable
          className="bg-slate-300 py-2 rounded-tl-full rounded-bl-full px-6 flex-row gap-2 items-center active:opacity-60"
          onPress={() => {
            scrollViewRef.current?.scrollTo({
              y: 0,
              animated: true,
            });
            currencyInputRef.current?.focus();
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
        >
          <MaterialCommunityIcons
            name="keyboard-variant"
            size={26}
            color={Colors.slate[900]}
          />
          <Text className="text-slate-900 text-sm font-bold uppercase">
            Type
          </Text>
        </Pressable>
        <Pressable
          className="bg-lime-500 py-2 rounded-tr-full rounded-br-full px-6 flex-row gap-2 items-center active:opacity-60"
          onPress={() => {
            setCameraVisible(true);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
        >
          <Ionicons name="scan" size={22} color={Colors.slate[950]} />
          <Text className="text-slate-950 text-sm font-bold uppercase">
            Scan
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default BottomButtons;
