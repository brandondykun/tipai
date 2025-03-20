import { Pressable, View, Text, Dimensions } from "react-native";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "react-native-vision-camera";

type Props = {
  setScanning?: React.Dispatch<React.SetStateAction<boolean>>;
  camera?: React.RefObject<Camera>;
};

const dimensions = Dimensions.get("window");

const ScanButton = ({ setScanning, camera }: Props) => {
  return (
    <Pressable
      onPressIn={() => {
        setScanning && setScanning(true); // Move this before haptics
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        camera?.current?.focus({
          x: dimensions.width / 2,
          y: dimensions.height / 4,
        });
      }}
      onPressOut={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setScanning && setScanning(false);
      }}
      className="active:opacity-60"
    >
      <View className="bg-slate-200 border border-slate-400 relative justify-center items-center rounded-full h-24 w-24">
        <Ionicons name="scan" size={52} color="black" />
        <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center">
          <Text className="text-slate-950 text-[8px] uppercase">Scan</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ScanButton;
