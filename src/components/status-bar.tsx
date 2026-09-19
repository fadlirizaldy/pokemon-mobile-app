import { STAT_LABELS } from "@/constants/color";
import { Text, View } from "react-native";

type StatBarProps = {
  name: string;
  value: number;
};

export default function StatusBar({ name, value }: StatBarProps) {
  const pct = Math.min(100, (value / 255) * 100);

  const color = value < 50 ? "#FF4D4D" : value < 90 ? "#F7C94B" : "#2DC76A";

  return (
    <View className="flex-row items-center gap-3">
      <Text className="w-9 shrink-0 font-mono text-[11px] text-white/40">
        {STAT_LABELS[name] ?? name}
      </Text>

      <Text className="w-7 shrink-0 text-right font-mono text-[12px] text-white/70">
        {value}
      </Text>

      <View className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
        <View
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            backgroundColor: color,
          }}
        />
      </View>
    </View>
  );
}
