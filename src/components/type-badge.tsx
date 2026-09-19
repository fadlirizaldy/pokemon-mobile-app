import { getTypeColor } from "@/utils";
import { Text, View } from "react-native";

type Props = {
  type: string;
};

export default function TypeBadge({ type }: Props) {
  const color = getTypeColor(type);

  return (
    <View
      style={{
        backgroundColor: `${color.bg}33`,
        borderWidth: 1,
        borderColor: `${color.bg}55`,
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: 9,
          fontWeight: "600",
          textTransform: "uppercase",
        }}
      >
        {type}
      </Text>
    </View>
  );
}
