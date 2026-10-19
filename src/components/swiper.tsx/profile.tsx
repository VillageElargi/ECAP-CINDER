import { ProfileType } from "@/data/profiles";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import ImagesButtons from "./images-buttons";
import ProfileInfos from "./profile-infos";

interface ProfileProps {
  animatedCardStyle: any;
  animatedTintStyle: any;
  profile: ProfileType;
  PROFILE_IMAGES: Record<string, any>;
}
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const Profile = ({
  animatedCardStyle,
  animatedTintStyle,
  profile,
  PROFILE_IMAGES,
}: ProfileProps) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [length, setLength] = useState(0);

  useEffect(() => {
    setImgIndex(0);
    setLength(profile.images.length);
  }, [profile]);

  return (
    <Animated.View style={[styles.card, animatedCardStyle]}>
      <Image
        source={PROFILE_IMAGES[profile.images[imgIndex]]}
        style={styles.image}
        contentFit="cover"
        cachePolicy="memory-disk"
        transition={150}
      />
      <ImagesButtons
        imgIndex={imgIndex}
        length={length}
        setImgIndex={setImgIndex}
      />
      <Animated.View
        pointerEvents="none"
        style={[styles.swipeTint, animatedTintStyle]}
      />
      <ProfileInfos profile={profile} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    alignItems: "center",
    justifyContent: "center",
  },

  topBar: {
    paddingTop: 40,
    paddingBottom: 10,
  },
  topBarTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF445A",
  },
  cardContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: SCREEN_WIDTH * 0.95,
    height: "95%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  swipeTint: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
  },
  profileInfo: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    padding: 20,
  },
  nameText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  bioText: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
  },
  hashtagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  hashtag: {
    backgroundColor: " rgba(43, 203, 186, 0.85)",
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: "hidden",
  },
  noMoreCards: {
    alignItems: "center",
  },
  noMoreText: {
    fontSize: 18,
    color: "#555",
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 8,
  },
  resetButtonText: {
    color: "#FFF",
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
    shadowOffset: { width: 0, height: 2 },
  },
  actionButtonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Profile;
