import { IPokemon } from "@/constants/type.model";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import TypeBadge from "./type-badge";

interface IResultCardProps {
  result: IPokemon;
  img?: string;
  c: {
    bg: string;
    text: string;
    glow: string;
  };
}

const ResultCard = ({ result, img, c }: IResultCardProps) => {
  return (
    <Pressable
      onPress={() => router.push(`/pokemon/${result.id}`)}
      style={[
        stylesCard.card,
        {
          backgroundColor: `${c.bg}18`,
          borderColor: `${c.bg}44`,
        },
      ]}
    >
      <View style={stylesCard.content}>
        {img && (
          <View style={stylesCard.imageContainer}>
            {/* Glow */}
            <Image
              source={{ uri: img }}
              accessibilityLabel=""
              resizeMode="contain"
              style={[
                stylesCard.imageGlow,
                {
                  tintColor: c.glow,
                },
              ]}
            />

            {/* Actual image */}
            <Image
              source={{ uri: img }}
              accessibilityLabel={result.name}
              resizeMode="contain"
              style={stylesCard.image}
            />
          </View>
        )}

        <View style={stylesCard.info}>
          <Text style={stylesCard.id}>
            #{String(result.id).padStart(3, "0")}
          </Text>

          <Text style={stylesCard.name}>{result.name}</Text>

          <View style={stylesCard.types}>
            {result.types.map((t) => (
              <TypeBadge key={t.type.name} type={t.type.name} />
            ))}
          </View>
        </View>

        <Text style={stylesCard.hint}>Tap to view details →</Text>
      </View>
    </Pressable>
  );
};

const stylesCard = StyleSheet.create({
  card: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 16,
    borderWidth: 1,
  },

  content: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: 24,
    gap: 12,
  },

  imageContainer: {
    width: 128,
    height: 128,
    position: "relative",
  },

  imageGlow: {
    position: "absolute",
    width: 128,
    height: 128,
    opacity: 0.7,
    transform: [{ scale: 1.15 }],
  },

  image: {
    width: 128,
    height: 128,
  },

  info: {
    alignItems: "center",
  },

  id: {
    marginBottom: 4,
    color: "rgba(255,255,255,0.3)",
    fontSize: 10,
    fontFamily: "monospace",
  },

  name: {
    marginBottom: 8,
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    textTransform: "capitalize",
  },

  types: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },

  hint: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 12,
  },
});

export default ResultCard;
