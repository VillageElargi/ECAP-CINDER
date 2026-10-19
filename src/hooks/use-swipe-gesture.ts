import { useEffect } from "react";
import { Dimensions } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

type Direction = "left" | "right";

export function useSwipeGesture(
  nextProfile: (direction: Direction) => void,
  profileKey: number | undefined,
) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateX.value = 0;
    translateY.value = 0;
  }, [profileKey, translateX, translateY]);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      if (event.translationX > SWIPE_THRESHOLD) {
        translateX.value = withSpring(SCREEN_WIDTH + 100);
        runOnJS(nextProfile)("right");
      } else if (event.translationX < -SWIPE_THRESHOLD) {
        translateX.value = withSpring(-SCREEN_WIDTH - 100);
        runOnJS(nextProfile)("left");
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${translateX.value / 15}deg` },
    ],
  }));

  const animatedTintStyle = useAnimatedStyle(() => ({
    backgroundColor:
      translateX.value < 0 ? "rgba(255, 0, 0, 0.35)" : "rgba(0, 255, 0, 0.35)",
    opacity: interpolate(
      Math.abs(translateX.value),
      [0, SWIPE_THRESHOLD],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  }));

  return {
    gesture,
    animatedCardStyle,
    animatedTintStyle,
    resetPosition: () => {
      translateX.value = 0;
      translateY.value = 0;
    },
  };
}
