import {
  View,
  Text,
  Modal,
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import DoneButton from "../DoneButton/DoneButton";
import ScanButton from "../ScanButton/ScanButton";

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const InfoModal = ({ visible, setVisible }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      style={{ flex: 1 }}
    >
      <View style={s.scrollViewWrapper}>
        <ScrollView
          contentContainerStyle={s.scrollViewContent}
          style={{ backgroundColor: Colors.slate[900], marginTop: insets.top }}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
        >
          <View style={{ alignItems: "flex-start", paddingTop: 8 }}>
            <Pressable
              style={s.closeButton}
              onPress={() => setVisible(false)}
              hitSlop={20}
            >
              <AntDesign name="close" size={20} color={Colors.slate[900]} />
            </Pressable>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.helpHeader}>Help</Text>
            <Text style={s.headerText}>
              To scan your bill, follow these steps:
            </Text>

            <View style={s.section}>
              <View style={s.sectionHeader}>
                <SectionNumber number={1} />
                <Text style={s.sectionHeaderText}>Align the Bill Amount</Text>
              </View>
              <Text style={s.sectionHelperText}>
                Line the bill amount up with the guide lines in the center of
                the white scanning rectangle.
              </Text>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={require("../../assets/images/scan_example.png")}
                  style={{ width: 280, height: 170, borderRadius: 16 }}
                />
              </View>
            </View>

            <View style={s.section}>
              <View style={s.sectionHeader}>
                <SectionNumber number={2} />
                <Text style={s.sectionHeaderText}>
                  Press and Hold Scan Button
                </Text>
              </View>
              <Text style={s.sectionHelperText}>
                Press and hold the scan button at the bottom of the screen.
              </Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 24,
                }}
              >
                <ScanButton />
              </View>
              <Text style={s.sectionHelperText}>
                When the screen turns green, it's scanning. Hold still while it
                is scanning the amount.
              </Text>
              <View style={{ alignItems: "center", marginBottom: 24 }}>
                <Image
                  source={require("../../assets/images/scanning_example.png")}
                  style={{ width: 280, height: 240, borderRadius: 16 }}
                />
              </View>
              <Text style={s.sectionHelperText}>
                If the amount in the scanning rectangle isn't perfectly focused,
                that's okay. When the camera starts scanning, it will try to
                auto focus the text in the scanning rectangle.
              </Text>
            </View>

            <View style={s.section}>
              <View style={s.sectionHeader}>
                <SectionNumber number={3} />
                <Text style={s.sectionHeaderText}>Release the Scan Button</Text>
              </View>
              <Text style={s.sectionHelperText}>
                After 1-3 seconds, the scanned amount will display in the top
                center of the screen. When the correct amount is displayed,
                release the scan button.
              </Text>
              <View style={{ alignItems: "center", marginBottom: 24 }}>
                <Image
                  source={require("../../assets/images/scan_complete_example.png")}
                  style={{ width: 280, height: 240, borderRadius: 16 }}
                />
              </View>
              <Text style={s.sectionHelperText}>
                If an incorrect amount is displayed, keep scanning and try to
                center the amount in the scanning rectangle. When it's correct,
                then release the scan button.
              </Text>
            </View>

            <View style={s.section}>
              <View style={s.sectionHeader}>
                <SectionNumber number={4} />
                <Text style={s.sectionHeaderText}>Press the Done Button</Text>
              </View>
              <Text style={s.sectionHelperText}>
                Once the amount is scanned, press the done button to close the
                camera and go back to the tip calculator screen.
              </Text>
              <View style={{ alignItems: "center" }}>
                <DoneButton />
              </View>
            </View>
          </View>

          <View style={{ marginBottom: 24 }}>
            <Text style={s.subHeading}>Tip</Text>
            <Text style={s.detailInfoText}>
              If the scanned amount is incorrect, try moving the device closer,
              so the amount appears larger in the scanning rectangle. This is
              especially helpful if there is other text nearby.
            </Text>
          </View>
          <View>
            <Text style={s.subHeading}>Pro Tip</Text>
            <Text style={s.detailInfoText}>
              If your amount won't fit in the rectangular box or other text is
              nearby, use the expand or collapse button in the top right to
              change the size of the scanning rectangle.
            </Text>
            <View style={s.collapseIconsContainer}>
              <MaterialCommunityIcons
                name="arrow-collapse-horizontal"
                size={34}
                color={Colors.slate[300]}
              />
              <MaterialCommunityIcons
                name="arrow-expand-horizontal"
                size={34}
                color={Colors.slate[300]}
              />
            </View>
          </View>
          <View
            style={[
              s.closeButtonContainer,
              {
                paddingBottom: insets.bottom + 12,
              },
            ]}
          >
            <Pressable onPress={() => setVisible(false)}>
              <Text style={s.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default InfoModal;

const s = StyleSheet.create({
  scrollViewWrapper: {
    flex: 1,
    backgroundColor: Colors.slate[900],
  },
  scrollViewContent: {
    padding: 24,
    paddingTop: 0,
    flexGrow: 1,
  },
  helpHeader: {
    color: Colors.slate[400],
    fontSize: 20,
    textAlign: "center",
    marginBottom: 24,
    textTransform: "uppercase",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  section: {
    marginBottom: 72,
  },
  scanButton: {
    backgroundColor: Colors.slate[200],
    width: 80,
    height: 80,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.slate[400],
  },
  sectionHeader: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    marginBottom: 24,
  },
  sectionHeaderText: {
    color: Colors.slate[100],
    fontSize: 24,
  },
  sectionHelperText: {
    color: Colors.slate[300],
    fontSize: 18,
    marginBottom: 24,
    fontWeight: "300",
  },
  closeButton: {
    backgroundColor: Colors.slate[200],
    height: 30,
    width: 30,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -8,
  },
  headerText: {
    color: Colors.slate[300],
    fontSize: 20,
    fontWeight: "300",
    textAlign: "center",
    marginBottom: 36,
  },
  subHeading: {
    color: Colors.slate[500],
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  detailInfoText: {
    color: Colors.slate[200],
    fontSize: 16,
    fontWeight: "300",
  },
  collapseIconsContainer: {
    flexDirection: "row",
    gap: 24,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 12,
  },
  closeButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 72,
  },
  closeButtonText: {
    color: Colors.slate[100],
    fontSize: 24,
    textDecorationLine: "underline",
  },
});

const SectionNumber = ({ number }: { number: number }) => {
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <View
        style={{
          backgroundColor: Colors.lime[500],
          height: 35,
          width: 35,
          borderRadius: 40,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: Colors.slate[950],
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {number}
        </Text>
      </View>
    </View>
  );
};
