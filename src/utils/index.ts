import { TYPE_COLORS } from "@/constants/color";

export const getTypeColor = (type: string) =>
  TYPE_COLORS[type] ?? { bg: "#444", text: "#fff", glow: "#44444455" };
