import { ProfileType } from "@/data/profiles";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

interface ProfileInfosProps {
  profile: ProfileType;
}

const ProfileInfos = ({ profile }: ProfileInfosProps) => {
  const { t } = useTranslation();
  return (
    <View style={styles.profileInfo}>
      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.6)"]}
        start={{ x: 0.5, y: 0.0 }}
        end={{ x: 0.5, y: 1.0 }}
        style={styles.linear}
      >
        <Text style={styles.nameText}>{t(profile.name)}</Text>
        {profile?.hashtags?.length ? (
          <View style={styles.hashtagsContainer}>
            {profile.hashtags.map((tag) => (
              <Text key={tag} style={styles.hashtag}>
                {t(tag)}
              </Text>
            ))}
          </View>
        ) : null}

        <Text style={styles.bioText}>{t(profile.bio)}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  linear: {
    width: "100%",
    height: "100%",
    padding: 20,
    paddingBottom: 25,
  },
  profileInfo: {
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  nameText: {
    fontSize: 17,
    fontFamily: "Nunito",
    fontWeight: "700",
    color: "#fff",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  bioText: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
    fontFamily: "Nunito",
    fontWeight: "500",
  },
  hashtagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  hashtag: {
    fontFamily: "Nunito",
    fontWeight: "600",
    backgroundColor: " rgba(43, 203, 186, 0.85)",
    color: "#fff",
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 999,
    overflow: "hidden",
  },
});

export default ProfileInfos;
