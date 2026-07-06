import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import {
  getFullActivationRequiredMessage,
  getFullActivationStatusLabel,
  isFullActivationApproved,
  type FullActivationService,
} from "./fullActivationPolicy";

type FullActivationGateProps = {
  service: FullActivationService;
  children: React.ReactNode;
};

export default function FullActivationGate({
  service,
  children,
}: FullActivationGateProps) {
  if (isFullActivationApproved()) {
    return <>{children}</>;
  }

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.badge}>{getFullActivationStatusLabel()}</Text>
        <Text style={styles.title}>Требуется полная активация Sabi</Text>
        <Text style={styles.text}>{getFullActivationRequiredMessage(String(service))}</Text>

        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push("/profile/verification" as never)}
        >
          <Text style={styles.primaryButtonText}>Открыть KYC/AML и selfie</Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => router.replace("/home" as never)}
        >
          <Text style={styles.secondaryButtonText}>Вернуться на главный экран</Text>
        </Pressable>

        <Text style={styles.note}>
          Этот экран не выполняет платежи, провайдерские операции, KYC-решения или серверные изменения.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#04120D",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },
  card: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 28,
    backgroundColor: "rgba(14, 28, 46, 0.92)",
    borderWidth: 1,
    borderColor: "rgba(119,226,140,0.18)",
    padding: 20,
  },
  badge: {
    alignSelf: "flex-start",
    color: "#77E28C",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  title: {
    color: "#F5FBFF",
    fontSize: 24,
    fontWeight: "900",
    lineHeight: 30,
  },
  text: {
    color: "#A8C3D7",
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "700",
    marginTop: 12,
  },
  primaryButton: {
    minHeight: 50,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#77E28C",
    marginTop: 18,
  },
  primaryButtonText: {
    color: "#04120D",
    fontSize: 15,
    fontWeight: "900",
  },
  secondaryButton: {
    minHeight: 48,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    marginTop: 10,
  },
  secondaryButtonText: {
    color: "#F5FBFF",
    fontSize: 14,
    fontWeight: "900",
  },
  note: {
    color: "rgba(245,251,255,0.58)",
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "700",
    marginTop: 14,
  },
});
