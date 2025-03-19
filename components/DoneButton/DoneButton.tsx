import { Pressable } from "react-native";
import { Colors } from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
type Props = {
  setCameraVisible?: React.Dispatch<React.SetStateAction<boolean>>;
};

const DoneButton = ({ setCameraVisible }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.6 : 1,
          backgroundColor: Colors.slate[900],
          borderRadius: 100,
          padding: 2,
        },
      ]}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setCameraVisible && setCameraVisible(false);
      }}
    >
      <AntDesign name="checkcircle" size={38} color={Colors.lime[500]} />
    </Pressable>
  );
};

export default DoneButton;
