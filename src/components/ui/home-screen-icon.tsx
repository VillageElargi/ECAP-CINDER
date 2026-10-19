import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

export default function CinderHeader() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  const flameScale = useRef(new Animated.Value(1)).current;
  const flameRotate = useRef(new Animated.Value(0)).current;
  const glowPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(flameScale, {
            toValue: 1.15,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(flameScale, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
        ]),

        Animated.sequence([
          Animated.timing(flameRotate, {
            toValue: -0.12,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(flameRotate, {
            toValue: 0.12,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(flameRotate, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),

        Animated.sequence([
          Animated.timing(glowPulse, {
            toValue: 1.4,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(glowPulse, {
            toValue: 0.9,
            duration: 1400,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  }, []);

  const spin = flameRotate.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-90deg", "90deg"],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.flameContainer}>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.glowBehind,
            {
              transform: [{ scale: Animated.multiply(flameScale, glowPulse) }],
              opacity: glowPulse.interpolate({
                inputRange: [0.9, 1.4],
                outputRange: [0.7, 0.25],
              }),
            },
          ]}
        />

        <Animated.View
          style={{
            transform: [{ scale: flameScale }, { rotate: spin }],
          }}
        >
          <Text style={styles.flame}>🔥</Text>
        </Animated.View>
      </View>

      <Text style={styles.title}>Cinder</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  flameContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    height: 110,
    width: 110,
  },
  flame: {
    fontSize: 80,
    backgroundColor: "transparent",
  },
  glowBehind: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  flameGlowEmoji: {
    fontSize: 80,
    textShadowColor: "rgba(255, 68, 90, 0.85)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 35,
    color: "transparent",
  },
  title: {
    fontFamily: "Nunito",
    fontSize: 48,
    fontWeight: "900",
    letterSpacing: -1.5,
    color: "rgb(255, 71, 87)",
    textShadowColor: "rgba(255, 71, 87, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 30,
  },
});
