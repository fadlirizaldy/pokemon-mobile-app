import { Text } from "react-native";
import { getTypeColor } from "../utils";

export default function TypeBadge({ type }: { type: string }) {
  const c = getTypeColor(type);
  return (
    <Text
      className="type-badge text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full"
      style={{ backgroundColor: c.bg, color: c.text }}
    >
      {type}
    </Text>
  );
}
