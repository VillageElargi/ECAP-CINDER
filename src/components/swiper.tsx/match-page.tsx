import { ProfileType } from "@/data/profiles";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MatchPageProps {
  profiles: ProfileType[];
  matches: number[];
  PROFILE_IMAGES: Record<string, any>;
  onClose: () => void;
}
const MatchPage = ({
  matches,
  profiles,
  PROFILE_IMAGES,
  onClose,
}: MatchPageProps) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      {matches.length > 0 ? (
        <View style={styles.finalMatches}>
          {profiles
            .filter((profile) => matches.includes(profile.id))
            .map((profile) => (
              <View key={profile.id} style={styles.finalMatchItem}>
                {profile.images?.[0] && PROFILE_IMAGES[profile.images[0]] && (
                  <Image
                    source={PROFILE_IMAGES[profile.images[0]]}
                    style={styles.finalMatchImage}
                    contentFit="cover"
                    cachePolicy="memory-disk"
                    transition={150}
                  />
                )}

                <View style={styles.finalMatchDetails}>
                  <Text style={styles.finalMatchName}>{t(profile.name)}</Text>
                  <Text style={styles.finalMatchBio}>
                    {t(profile.bio).slice(0, 60)}
                    {t(profile.bio).length > 60 && "..."}
                  </Text>
                </View>
              </View>
            ))}
        </View>
      ) : (
        <>
          <Text style={styles.title}>{t("calm")}</Text>
          <Text style={styles.text}>{t("continue_swipe")}</Text>
        </>
      )}

      <TouchableOpacity style={styles.continueButton} onPress={onClose}>
        <Text style={styles.continueButtonText}>{t("back_to_swipe")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    display: "flex",
    alignItems: "center",
  },
  finalMatches: {
    width: "100%",
    marginBottom: 24,
  },
  title: {
    fontFamily: "Nunito",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: -1.5,
    color: "rgb(255, 71, 87)",
  },
  text: {
    fontFamily: "Nunito",
    fontSize: 18,
    fontWeight: "500",
    opacity: 0.75,
    textAlign: "center",
  },

  finalMatchItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 8,
  },
  finalMatchImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  finalMatchName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  finalMatchDetails: {
    flex: 1,
  },
  finalMatchBio: {
    fontSize: 14,
    color: "#666",
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
});

export default MatchPage;
