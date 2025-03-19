import { View, Text, StyleSheet, Pressable } from "react-native";
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
    <View style={[s.root, { bottom: insets.bottom + 24 }]}>
      <View>
        <Text style={s.helpText}>Press and hold to Scan</Text>
      </View>
      <View style={s.controls}>
        <View style={s.buttonContainer}>
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
        <View style={s.buttonContainer}>
          <ScanButton setScanning={setScanning} camera={camera} />
        </View>
        <View style={s.buttonContainer}>
          <DoneButton setCameraVisible={setCameraVisible} />
        </View>
      </View>
    </View>
  );
};

export default BottomControls;

const s = StyleSheet.create({
  root: {
    position: "absolute",
    left: 16,
    right: 16,
    gap: 4,
  },
  controls: {
    backgroundColor: Colors.slate[950],
    paddingVertical: 12,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.slate[800],
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  helpText: {
    textAlign: "center",
    color: Colors.slate[200],
  },
});
