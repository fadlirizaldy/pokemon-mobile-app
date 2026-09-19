import { IPokemon } from "@/constants/type.model";
import { getTypeColor } from "@/utils";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import TypeBadge from "./type-badge";

export function PokemonCard({
  pokemon,
  onPress,
  index,
}: {
  pokemon: IPokemon;
  onPress: () => void;
  index: number;
}) {
  const primary = pokemon.types[0].type.name;
  const c = getTypeColor(primary);

  const img =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: `${c.bg}22`,
          borderColor: `${c.bg}33`,
        },
      ]}
    >
      <View style={styles.content}>
        {/* Pokemon image */}
        <View
          style={[
            styles.imageContainer,
            {
              backgroundColor: `${c.bg}20`,
            },
          ]}
        >
          {img ? (
            <Image
              source={{ uri: img }}
              style={styles.pokemonImage}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.imagePlaceholder} />
          )}
        </View>

        {/* Pokemon info */}
        <View style={styles.info}>
          <Text style={styles.id}>#{String(pokemon.id).padStart(3, "0")}</Text>

          <Text style={styles.name} numberOfLines={1}>
            {pokemon.name}
          </Text>

          {/* Types */}
          <View style={styles.types}>
            {pokemon.types.map((t) => (
              <TypeBadge key={t.type.name} type={t.type.name} />
            ))}
          </View>
        </View>

        {/* Arrow */}
        <Text style={styles.arrow}>›</Text>
      </View>
    </Pressable>
  );
}

function SkeletonCard() {
  return <View style={styles.skeletonCard} />;
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
  },

  content: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  imageContainer: {
    width: 64,
    height: 64,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  pokemonImage: {
    width: 56,
    height: 56,
  },

  imagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
  },

  info: {
    flex: 1,
    minWidth: 0,
  },

  id: {
    fontSize: 10,
    color: "rgba(255,255,255,0.3)",
    marginBottom: 2,
    fontFamily: "monospace",
  },

  name: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "capitalize",
  },

  types: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginTop: 4,
  },

  arrow: {
    color: "rgba(255,255,255,0.2)",
    fontSize: 28,
    fontWeight: "300",
  },

  skeletonCard: {
    width: "100%",
    height: 88,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.06)",
    overflow: "hidden",
  },
});
