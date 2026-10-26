import { Heart, Redo2, ShieldCheck, Undo2 } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

export default function TutorialScreen() {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("tutorial.title")}</Text>
      <Text style={styles.subtitle}>{t("tutorial.sub")}</Text>

      <View style={styles.step}>
        <View style={[styles.iconBox, styles.green]}>
          <Redo2 size={28} color="#16A34A" />
        </View>
        <View style={styles.content}>
          <Text style={styles.stepTitle}>{t("tutorial.right-t")}</Text>
          <Text style={styles.description}>{t("tutorial.right-d")}</Text>
        </View>
      </View>

      <View style={styles.step}>
        <View style={[styles.iconBox, styles.red]}>
          <Undo2 size={28} color="#DC2626" />
        </View>
        <View style={styles.content}>
          <Text style={styles.stepTitle}>{t("tutorial.left-t")}</Text>
          <Text style={styles.description}>{t("tutorial.left-d")}</Text>
        </View>
      </View>

      <View style={styles.matchCard}>
        <View style={styles.matchIcon}>
          <Heart size={24} color="#FFFFFF" fill="#FFFFFF" />
        </View>
        <View style={styles.content}>
          <Text style={styles.matchTitle}>{t("tutorial.find-t")}</Text>
          <Text style={styles.matchDescription}>{t("tutorial.find-d")}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <ShieldCheck size={18} color="#16A34A" />
        <Text style={styles.footerText}>{t("tutorial.last")}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#9b9b9b",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  step: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 16,
    paddingHorizontal: 30,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  green: {
    backgroundColor: "#DCFCE7",
  },
  red: {
    backgroundColor: "#FEE2E2",
  },
  content: {
    // flex: 1,
    // backgroundColor: "red",
  },
  stepTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
    color: "#9b9b9b",
  },
  matchCard: {
    width: "100%",
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 22,
    gap: 16,
    marginTop: 8,
  },
  matchIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#E11D48",
    alignItems: "center",
    justifyContent: "center",
  },
  matchTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 6,
  },
  matchDescription: {
    fontSize: 13,
    lineHeight: 20,
    color: "#9b9b9b",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: "#9b9b9b",
  },
});
