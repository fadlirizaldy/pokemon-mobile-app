import { STAT_LABELS } from "@/constants/color";
import { StyleSheet, Text, View } from "react-native";

type StatBarProps = {
  name: string;
  value: number;
};

export default function StatusBar({ name, value }: StatBarProps) {
  const pct = Math.min(100, (value / 255) * 100);

  const color = value < 50 ? "#FF4D4D" : value < 90 ? "#F7C94B" : "#2DC76A";

  return (
    <View style={styles.container}>
      {/* Column 1 — Label */}
      <Text style={styles.label}>{STAT_LABELS[name] ?? name}</Text>

      {/* Column 2 — Value */}
      <Text style={styles.value}>{value}</Text>

      {/* Column 3 — Bar */}
      <View style={styles.barContainer}>
        <View
          style={[
            styles.bar,
            {
              width: `${pct}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
  },

  label: {
    width: 42,
    fontFamily: "monospace",
    fontSize: 11,
    color: "rgba(255,255,255,0.4)",
  },

  value: {
    width: 30,
    textAlign: "right",
    fontFamily: "monospace",
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
  },

  barContainer: {
    flex: 1,
    height: 6,
    overflow: "hidden",
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.1)",
  },

  bar: {
    height: "100%",
    borderRadius: 3,
  },
});
