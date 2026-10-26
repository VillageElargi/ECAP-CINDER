import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LanguageDropdown from "./language-switcher";
import HomeScreenIcon from "./ui/home-screen-icon";
import TutorialScreen from "./ui/tutorial";

interface HomeScreenProps {
  setIsOnMainPage: (v: boolean) => void;
}

const HomeScreen = ({ setIsOnMainPage }: HomeScreenProps) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1a1a2e", "#12213e", "#0f3460"]}
        locations={[0, 0.5, 1]}
        start={{ x: 0.1, y: 0.0 }}
        end={{ x: 0.9, y: 1.0 }}
        style={styles.linear}
      >
        <View style={styles.topBar}>
          <LanguageDropdown />
        </View>
        <View style={styles.content}>
          <HomeScreenIcon />

          <View style={styles.decoContainer}>
            <View style={styles.decoLine} />
            <Text style={styles.decoText}>❄️</Text>
            <View style={styles.decoLine} />
          </View>

          <Text style={styles.text}>{t("slogan")}</Text>
          <TutorialScreen />
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => setIsOnMainPage(true)}
          >
            <Text style={styles.buttonText}>{t("start")} 🔥</Text>
          </TouchableOpacity>
          <Text style={styles.discrete}>Swipe · Classify · Match</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  linear: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
  },
  content: {
    width: "100%",
    padding: 10,
    gap: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  topBar: {
    width: "100%",
    paddingTop: 42,
    paddingBottom: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  decoContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  decoLine: {
    width: 60,
    height: 1,
    backgroundColor: "rgba(230, 230, 230, 0.3)",
  },
  decoText: {
    fontSize: 24,
  },
  text: {
    color: "#e6e6e6",
    fontSize: 18,
    fontFamily: "Nunito",
    fontWeight: "500",
    marginBottom: 10,
  },
  startButton: {
    alignItems: "center",
    backgroundColor: "#FF445A",
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    marginTop: 30,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  discrete: {
    marginTop: 30,
    textTransform: "uppercase",
    color: "#ffffff33",
    textAlign: "center",
    width: "100%",
  },
});

export default HomeScreen;
