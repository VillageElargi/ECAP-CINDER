import { Dimensions } from "react-native";

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

export const MAX_ERRORS = 4;
export const SWIPES_BEFORE_MATCH = 3;
export const IMAGES_TO_PRELOAD = 3;
