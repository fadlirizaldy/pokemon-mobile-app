import { IPokemon } from "@/constants/type.model";
import { getTypeColor } from "@/utils";
import { Image, Pressable, Text, View } from "react-native";
import TypeBadge from "./type-badge";

type PokemonCardProps = {
  pokemon: IPokemon;
  onPress: () => void;
  index: number;
};

export function PokemonCard({ pokemon, onPress }: PokemonCardProps) {
  const primary = pokemon.types[0].type.name;
  const c = getTypeColor(primary);

  const img =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;

  return (
    <Pressable
      onPress={onPress}
      className="w-full overflow-hidden rounded-2xl"
      style={{
        backgroundColor: `${c.bg}22`,
        borderWidth: 1,
        borderColor: `${c.bg}33`,
      }}
    >
      <View className="flex-row items-center gap-3 p-3">
        <View
          className="h-16 w-16 shrink-0 items-center justify-center rounded-xl"
          style={{
            backgroundColor: `${c.bg}20`,
          }}
        >
          {img ? (
            <Image
              source={{ uri: img }}
              accessibilityLabel={pokemon.name}
              className="h-14 w-14"
              resizeMode="contain"
            />
          ) : (
            <View className="h-10 w-10 rounded-full bg-white/10" />
          )}
        </View>

        <View className="min-w-0 flex-1">
          <Text className="mb-0.5 font-mono text-[10px] text-white/30">
            #{String(pokemon.id).padStart(3, "0")}
          </Text>

          <Text className="text-sm font-semibold capitalize text-white">
            {pokemon.name}
          </Text>

          <View className="mt-1 flex-row flex-wrap gap-1">
            {pokemon.types.map((t) => (
              <TypeBadge key={t.type.name} type={t.type.name} />
            ))}
          </View>
        </View>

        <Text className="text-lg text-white/20">{">"}</Text>
      </View>
    </Pressable>
  );
}

export function SkeletonCard() {
  return (
    <View className="h-[88px] w-full overflow-hidden rounded-2xl bg-white/5" />
  );
}
