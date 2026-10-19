import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface FinishPageProps {
  onClose: () => void;
}

const FinishPage = ({ onClose }: FinishPageProps) => {
  const { t } = useTranslation();
  return (
    <View style={styles.noMoreCards}>
      <Text style={styles.finishedEmoji}>🎉</Text>

      <Text style={styles.noMoreText}>{t("nothing_more")}</Text>

      <Text style={styles.finishedDescription}>{t("explore_all")}</Text>

      <TouchableOpacity style={styles.resetButton} onPress={onClose}>
        <Text style={styles.resetButtonText}>{t("see_matches")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  noMoreCards: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    width: "100%",
  },
  finishedEmoji: {
    fontSize: 56,
    marginBottom: 12,
  },
  noMoreText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
    textAlign: "center",
  },
  finishedDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },

  resetButton: {
    backgroundColor: "#333",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  resetButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FinishPage;
