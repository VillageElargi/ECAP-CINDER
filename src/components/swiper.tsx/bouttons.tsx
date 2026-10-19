import { ProfileType } from "@/data/profiles";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ButtonsProps {
  nextProfile: (direction: "left" | "right") => void;
  setIsMatchViewer: (v: boolean) => void;
  activeMatch?: ProfileType;
  matchsTotal: number;
  unlockedMatches: number;
}

const Buttons = ({
  nextProfile,
  setIsMatchViewer,
  matchsTotal,
  activeMatch,
  unlockedMatches,
}: ButtonsProps) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <Text style={styles.matchsText}>
          {t("my_matches")} ({unlockedMatches}/{matchsTotal})
        </Text>
        <View style={styles.dotContainer}>
          {Array.from({ length: matchsTotal }, (_, x) => (
            <View
              key={x}
              style={[
                styles.imgDot,
                x + 1 <= unlockedMatches && styles.imgDotActive,
              ]}
            />
          ))}
        </View>
      </View>
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#FF4444" }]}
          onPress={() => nextProfile("left")}
          disabled={!!activeMatch}
        >
          <Text style={styles.actionButtonText}>🔥</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              borderStyle: "solid",
              borderColor: "rgb(255, 165, 2)",
              borderWidth: 3,
            },
          ]}
          onPress={() => setIsMatchViewer(true)}
        >
          <View style={styles.hidder}>
            <Text style={styles.actionButtonText}>⭐</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#007AFF" }]}
          onPress={() => nextProfile("right")}
          disabled={!!activeMatch}
        >
          <Text style={styles.actionButtonText}>❄️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  matchsText: {
    fontFamily: "Nunito",
    color: "#222",
  },
  container: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
  },
  hidder: {
    width: 68,
    height: 68,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginBottom: 20,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 2 },
  },
  actionButtonText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  imgDot: {
    width: 7,
    height: 7,
    backgroundColor: "rgb(206, 206, 206)",
    borderRadius: 999,
  },
  imgDotActive: {
    backgroundColor: "rgb(255, 71, 87)",
  },
  dotContainer: {
    flexDirection: "row",
    gap: 4,
  },
});

export default Buttons;
