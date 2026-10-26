import * as Haptics from "expo-haptics";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface WarningModalProps {
  visible: boolean;
  onClose: () => void;
}

const WarningModal = ({ visible, onClose }: WarningModalProps) => {
  const { t } = useTranslation();
  useEffect(() => {
    if (visible) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
  }, [visible]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.icon}>⚠️</Text>
          <Text style={styles.title}>{t("warning-t")}</Text>
          <Text style={styles.message}>{t("warning-d")}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>{t("close")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    elevation: 5,
  },
  icon: { fontSize: 40, marginBottom: 10 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1F2937",
  },
  message: {
    fontSize: 15,
    color: "#4B5563",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  closeButton: {
    backgroundColor: "#EF4444",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: { color: "white", fontSize: 16, fontWeight: "600" },
});

export default WarningModal;
