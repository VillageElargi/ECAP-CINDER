import { Asset } from "expo-asset";
import { useCallback, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import { profiles } from "@/data/profiles";

import { PROFILE_IMAGES } from "@/constants/profile-images";
import { IMAGES_TO_PRELOAD } from "@/constants/swiper-config";
import { useSwipeGesture } from "@/hooks/use-swipe-gesture";
import { useSwiperGame } from "@/hooks/use-swiper-game";
import { getProfileImageSource } from "@/utils/get-profile-image";
// import { DevSettings } from "react-native";
import * as Updates from "expo-updates";
import Buttons from "./bouttons";
import FinishPage from "./finish-page";
import TopBar from "./header";
import MatchModal from "./match-modal";
import MatchPage from "./match-page";
import Profile from "./profile";
import WarningModal from "./warning-modal";

const Swiper = () => {
  const game = useSwiperGame();

  const {
    queue,
    currentIndex,
    currentProfile,
    isFinished,
    isMatchViewer,
    setIsMatchViewer,
    activeMatch,
    unlockedMatches,
    nextProfile,
    resetGame,
    closeMatch,
    openMatchesAndCloseModal,
    matchsTotal,
    warning,
    setWarning,
  } = game;

  const { gesture, animatedCardStyle, animatedTintStyle, resetPosition } =
    useSwipeGesture(
      nextProfile,
      currentIndex < queue.length ? queue[currentIndex] : undefined,
    );

  useEffect(() => {
    const nextSources = queue
      .slice(currentIndex, currentIndex + IMAGES_TO_PRELOAD)
      .map((index) => getProfileImageSource(profiles[index]))
      .filter((source): source is number => source !== undefined);

    if (nextSources.length > 0) {
      void Asset.loadAsync([...new Set(nextSources)]).catch((error) => {
        console.warn("Préchargement des images impossible", error);
      });
    }
  }, [queue, currentIndex]);

  // const handleReset = useCallback(() => {
  //   resetGame();
  //   resetPosition();
  // }, [resetGame, resetPosition]);

  const handleReset = useCallback(async () => {
    await Updates.reloadAsync();
  }, []);

  // const handleReset = () => {
  //   DevSettings.reload();
  // };

  const handleNextProfile = useCallback(
    (direction: "left" | "right") => {
      nextProfile(direction);
    },
    [nextProfile],
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <TopBar onReset={handleReset} />
      <WarningModal visible={warning} onClose={() => setWarning(false)} />

      <View style={styles.cardContainer}>
        {isMatchViewer ? (
          <MatchPage
            matches={unlockedMatches}
            profiles={profiles}
            PROFILE_IMAGES={PROFILE_IMAGES}
            onClose={() => setIsMatchViewer(false)}
          />
        ) : !isFinished && currentProfile ? (
          <GestureDetector gesture={gesture}>
            <View style={styles.profileWrapper}>
              <Profile
                animatedCardStyle={animatedCardStyle}
                animatedTintStyle={animatedTintStyle}
                profile={currentProfile}
                PROFILE_IMAGES={PROFILE_IMAGES}
              />
            </View>
          </GestureDetector>
        ) : (
          <FinishPage onClose={() => setIsMatchViewer(true)} />
        )}
      </View>

      {!isFinished && !isMatchViewer && (
        <Buttons
          nextProfile={handleNextProfile}
          setIsMatchViewer={setIsMatchViewer}
          activeMatch={activeMatch}
          matchsTotal={matchsTotal}
          unlockedMatches={unlockedMatches.length}
        />
      )}

      <MatchModal
        activeMatch={activeMatch}
        PROFILE_IMAGES={PROFILE_IMAGES}
        closeMatch={closeMatch}
        seeMatches={openMatchesAndCloseModal}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  profileWrapper: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default Swiper;
