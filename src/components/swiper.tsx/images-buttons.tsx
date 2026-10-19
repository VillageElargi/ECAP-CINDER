import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface ImagesButtonsProps {
  imgIndex: number;
  length: number;
  setImgIndex: (index: number) => void;
}
const ImagesButtons = ({
  imgIndex,
  length,
  setImgIndex,
}: ImagesButtonsProps) => {
  const [pressedButton, setPressedButton] = useState<"prev" | "next" | null>(
    null,
  );

  return (
    <>
      {length > 1 && (
        <View style={styles.imgsIndex}>
          {Array.from({ length: length }, (_, x) => (
            <View
              key={x}
              style={[styles.imgDot, imgIndex == x && styles.imgDotActive]}
            />
          ))}
        </View>
      )}

      <TouchableOpacity
        activeOpacity={0.6}
        onPressIn={() => setPressedButton("prev")}
        onPressOut={() => setPressedButton(null)}
        onPress={() => setImgIndex(imgIndex - 1)}
        disabled={imgIndex === 0}
        style={[
          styles.imgsButtonPrev,
          imgIndex === 0 && styles.imgsButtonDisabled,
        ]}
      >
        {imgIndex != 0 && (
          <View
            style={{
              width: 60,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <ChevronLeft color="#fff9" />
          </View>
        )}
        <LinearGradient
          colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.6)"]}
          start={{ x: 1, y: 0.5 }}
          end={{ x: 0, y: 0.5 }}
          style={[
            styles.linear,
            pressedButton === "prev" && styles.imgsButtonPress,
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.6}
        onPressIn={() => setPressedButton("next")}
        onPressOut={() => setPressedButton(null)}
        onPress={() => setImgIndex(imgIndex + 1)}
        disabled={imgIndex === length - 1}
        style={[
          styles.imgsButtonNext,
          imgIndex === length - 1 && styles.imgsButtonDisabled,
        ]}
      >
        {imgIndex != length - 1 && (
          <View
            style={{
              width: 60,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <ChevronRight color="#fff9" />
          </View>
        )}

        <LinearGradient
          colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.6)"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[
            styles.linear,
            pressedButton === "next" && styles.imgsButtonPress,
          ]}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  imgsIndex: {
    width: "100%",
    position: "absolute",
    bottom: 10,
    zIndex: 60,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },

  linear: {
    width: "100%",
    height: "100%",
    position: "absolute",

    opacity: 0,
  },
  imgDot: {
    width: 7,
    height: 7,
    backgroundColor: "rgb(206, 206, 206)",
    borderRadius: 999,
  },
  imgDotActive: {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  imgsButtonPrev: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100%",
    width: 60,
    backgroundColor: "rgba(0, 0, 0, 0)",
    left: 0,
  },

  imgsButtonNext: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100%",
    width: 60,
    backgroundColor: "rgba(0, 0, 0, 0)",
    right: 0,
  },
  imgsButtonDisabled: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  imgsButtonPress: {
    opacity: 1,
  },
});

export default ImagesButtons;
