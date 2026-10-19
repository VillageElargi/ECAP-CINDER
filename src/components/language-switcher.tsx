import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const LANGUAGES = [
  { code: "fr", label: "FR", flag: "🇫🇷" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "de", label: "DE", flag: "🇩🇪" },
  { code: "it", label: "IT", flag: "🇮🇹" },
];

export default function LanguageDropdown() {
  const { i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const currentLang =
    LANGUAGES.find((lang) => i18n.language.startsWith(lang.code)) ||
    LANGUAGES[0];

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code);
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdownButton}
        activeOpacity={0.8}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.dropdownButtonText}>{currentLang.flag}</Text>
        <Text style={styles.dropdownButtonText}>{currentLang.label}</Text>
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsVisible(false)}
        >
          <View style={styles.dropdownMenu}>
            <FlatList
              data={LANGUAGES}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => {
                const isActive = currentLang.code === item.code;
                return (
                  <TouchableOpacity
                    style={[styles.menuItem, isActive && styles.menuItemActive]}
                    activeOpacity={0.7}
                    onPress={() => handleSelect(item.code)}
                  >
                    <Text style={styles.menuItemText}>{item.flag}</Text>
                    <Text style={styles.menuItemText}>{item.label}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#f5f7fa",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  dropdownButtonText: {
    fontFamily: "Nunito",
    fontSize: 16,
    fontWeight: "700",
    color: "575757",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  dropdownMenu: {
    position: "absolute",
    top: 35,
    right: 10,
    width: 140,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(200, 200, 200)",
  },
  menuItemActive: {
    backgroundColor: "rgba(126, 126, 126, 0.25)",
  },
  menuItemText: {
    fontFamily: "Nunito",
    fontSize: 16,
    fontWeight: "600",
    color: "#575757",
  },
});
