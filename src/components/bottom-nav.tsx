import { NAV_ITEMS } from "@/constants/menu";
import { Href, usePathname, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View
      className="flex-row border-t"
      style={{
        borderColor: "rgba(255,255,255,0.08)",
        backgroundColor: "rgba(10,10,20,0.95)",
      }}
    >
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <Pressable
            key={item.id}
            onPress={() => router.push(item.href as Href)}
            className="flex-1 items-center gap-1 py-3"
            style={{
              opacity: isActive ? 1 : 0.35,
            }}
          >
            <Text className="text-xl">{item.icon}</Text>

            <Text
              className="font-mono text-[9px] uppercase tracking-widest"
              style={{
                color: isActive ? "#F7C94B" : "#FFFFFF",
              }}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
