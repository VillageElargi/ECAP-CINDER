import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LanguageDropdown from "../language-switcher";

type TopBarProps = {
  onReset: () => void;
};

const TopBar = ({ onReset }: TopBarProps) => {
  return (
    <View style={styles.topBar}>
      <TouchableOpacity
        onLongPress={onReset}
        delayLongPress={10000}
        activeOpacity={0.7}
        style={styles.logo}
      >
        <Text style={styles.icon}>🔥</Text>
        <Text style={styles.title}>Cinder</Text>
        <Text style={styles.icon}>❄️</Text>
      </TouchableOpacity>

      <LanguageDropdown />
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    width: "100%",
    paddingTop: 42,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  logo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontFamily: "Nunito",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: -1.5,
    paddingTop: 3,
    color: "rgb(255, 71, 87)",
  },
  icon: {
    fontSize: 16,
  },
});

export default TopBar;
