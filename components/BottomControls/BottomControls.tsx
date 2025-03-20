import { View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "react-native-vision-camera";
import { Colors } from "../../constants/Colors";
import DoneButton from "../DoneButton/DoneButton";
import ScanButton from "../ScanButton/ScanButton";

type Props = {
  setScanning: React.Dispatch<React.SetStateAction<boolean>>;
  camera: React.RefObject<Camera>;
  setCameraVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setInfoModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const BottomControls = ({
  setScanning,
  camera,
  setCameraVisible,
  setInfoModalVisible,
}: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ bottom: insets.bottom + 24 }}
      className="absolute gap-1 left-5 right-5"
    >
      <View>
        <Text className="text-slate-200 text-center">
          Press and hold to Scan
        </Text>
      </View>
      <View className="bg-slate-950 py-4 rounded-full border border-slate-800 flex-row">
        <View className="flex-1 justify-center items-center">
          <Pressable
            onPress={() => setInfoModalVisible(true)}
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
          >
            <Ionicons
              name="information-circle-outline"
              size={36}
              color={Colors.slate[400]}
            />
          </Pressable>
        </View>
        <View className="flex-1 justify-center items-center">
          <ScanButton setScanning={setScanning} camera={camera} />
        </View>
        <View className="flex-1 justify-center items-center">
          <DoneButton setCameraVisible={setCameraVisible} />
        </View>
      </View>
    </View>
  );
};

export default BottomControls;
