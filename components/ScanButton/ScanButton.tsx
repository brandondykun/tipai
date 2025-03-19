import { Pressable, View, Text, StyleSheet, Dimensions } from "react-native";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
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
      style={({ pressed }) => pressed && { opacity: 0.6 }}
    >
      <View style={s.scanButton}>
        <Ionicons name="scan" size={52} color="black" />
        <View style={s.scanButtonTextContainer}>
          <Text style={s.buttonText}>Scan</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ScanButton;

const s = StyleSheet.create({
  scanButton: {
    backgroundColor: Colors.slate[200],
    width: 80,
    height: 80,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.slate[400],
    position: "relative",
  },
  scanButtonTextContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: Colors.slate[950],
    fontSize: 8,
    textTransform: "uppercase",
  },
});
