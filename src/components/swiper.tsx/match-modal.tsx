import { ProfileType } from "@/data/profiles";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MatchModalProps {
  activeMatch?: ProfileType;
  PROFILE_IMAGES: Record<string, any>;
  closeMatch: () => void;
  seeMatches: () => void;
}

const MatchModal = ({
  activeMatch,
  PROFILE_IMAGES,
  closeMatch,
  seeMatches,
}: MatchModalProps) => {
  const { t } = useTranslation();
  return (
    <Modal
      visible={!!activeMatch}
      transparent
      animationType="fade"
      onRequestClose={closeMatch}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.matchCard}>
          <Text style={styles.matchEmoji}>💖</Text>

          <Text style={styles.matchTitle}>{t("thats_match")}</Text>

          <Text style={styles.matchSubtitle}>{t("good_job")}</Text>

          {activeMatch?.images?.[0] &&
            PROFILE_IMAGES[activeMatch.images[0]] && (
              <Image
                source={PROFILE_IMAGES[activeMatch.images[0]]}
                style={styles.matchImage}
                contentFit="cover"
                cachePolicy="memory-disk"
                transition={150}
              />
            )}

          <Text style={styles.matchName}>{t(activeMatch?.name ?? "")}</Text>

          {!!activeMatch?.bio && (
            <Text style={styles.matchBio}>{t(activeMatch.bio)}</Text>
          )}

          {activeMatch?.hashtags?.length ? (
            <View style={styles.hashtags}>
              {activeMatch.hashtags.map((tag) => (
                <Text key={tag} style={styles.hashtag}>
                  {t(tag)}
                </Text>
              ))}
            </View>
          ) : null}

          <TouchableOpacity style={styles.continueButton} onPress={seeMatches}>
            <Text style={styles.continueButtonText}>{t("see_matches")} ❤️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetButton} onPress={closeMatch}>
            <Text style={styles.resetButtonText}>{t("back_to_swipe")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  matchCard: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#FFF",
    borderRadius: 28,
    padding: 24,
    alignItems: "center",
    elevation: 12,
  },
  matchEmoji: {
    fontSize: 54,
    marginBottom: 8,
  },
  matchTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF3B75",
    textAlign: "center",
  },
  matchSubtitle: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  matchImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 16,
    borderWidth: 4,
    borderColor: "#FFE0EA",
  },
  matchName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
  },
  matchBio: {
    fontSize: 14,
    lineHeight: 21,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
  },
  hashtags: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 12,
    gap: 8,
  },
  hashtag: {
    color: "#FF3B75",
    backgroundColor: "#FFF0F5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    overflow: "hidden",
    fontSize: 12,
  },
  continueButton: {
    width: "100%",
    backgroundColor: "#FF3B75",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 24,
  },
  continueButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  resetButton: {
    width: "100%",
    alignItems: "center",
    borderColor: "#333",
    borderStyle: "solid",
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 12,
  },
  resetButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MatchModal;
