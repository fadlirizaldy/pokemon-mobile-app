export const TYPE_COLORS: Record<
  string,
  { bg: string; text: string; glow: string }
> = {
  fire: { bg: "#FF4D1A", text: "#fff", glow: "#FF4D1A55" },
  water: { bg: "#3D9BE9", text: "#fff", glow: "#3D9BE955" },
  grass: { bg: "#2DC76A", text: "#fff", glow: "#2DC76A55" },
  electric: { bg: "#F7C94B", text: "#111", glow: "#F7C94B55" },
  psychic: { bg: "#FF5FA0", text: "#fff", glow: "#FF5FA055" },
  ice: { bg: "#74D4F4", text: "#111", glow: "#74D4F455" },
  dragon: { bg: "#6B3FF6", text: "#fff", glow: "#6B3FF655" },
  dark: { bg: "#2E2E4A", text: "#fff", glow: "#2E2E4A88" },
  fairy: { bg: "#FF9ECD", text: "#111", glow: "#FF9ECD55" },
  fighting: { bg: "#CE3F3F", text: "#fff", glow: "#CE3F3F55" },
  poison: { bg: "#A040A0", text: "#fff", glow: "#A040A055" },
  ground: { bg: "#C4A24B", text: "#111", glow: "#C4A24B55" },
  rock: { bg: "#8B7355", text: "#fff", glow: "#8B735555" },
  bug: { bg: "#8CB230", text: "#fff", glow: "#8CB23055" },
  ghost: { bg: "#5E4B8B", text: "#fff", glow: "#5E4B8B55" },
  steel: { bg: "#8B9BB4", text: "#111", glow: "#8B9BB455" },
  flying: { bg: "#7B9DF0", text: "#fff", glow: "#7B9DF055" },
  normal: { bg: "#A4A4A4", text: "#111", glow: "#A4A4A455" },
};

export const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SpA",
  "special-defense": "SpD",
  speed: "SPE",
};
