import BottomNav from "@/components/bottom-nav";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function TabsLayout() {
  return (
    <View className="flex-1 bg-[#0A0A14]">
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />

      <BottomNav />
    </View>
  );
}
