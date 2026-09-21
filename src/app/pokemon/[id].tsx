import InfoContent from "@/components/info-content";
import StatusBar from "@/components/status-bar";
import TypeBadge from "@/components/type-badge";
import { IPokemon } from "@/constants/type.model";
import { getTypeColor } from "@/utils";
import { fetchPokemon } from "@/utils/api";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function PokemonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [pokemon, setPokemon] = useState<IPokemon | null>(null);
  const [tab, setTab] = useState<"stats" | "info">("stats");

  const primary = useMemo(() => {
    return pokemon?.types[0].type.name;
  }, [pokemon]);

  const c = useMemo(() => {
    return getTypeColor(primary || "normal");
  }, [primary]);

  useEffect(() => {
    if (!id) return;

    fetchPokemon(id).then(setPokemon);
  }, [id]);

  if (!pokemon) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#0D0D1A",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator color="#F7C94B" />
      </View>
    );
  }

  const image =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.other.home?.front_default ||
    pokemon.sprites.front_default;

  return (
    <View style={{ flex: 1, backgroundColor: "#0D0D1A" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}

        <View style={{ padding: 20 }}>
          <Pressable onPress={() => router.back()}>
            <Text
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 14,
                marginBottom: 20,
              }}
            >
              ‹ Back
            </Text>
          </Pressable>

          <Text
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: 10,
            }}
          >
            #{String(pokemon.id).padStart(3, "0")}
          </Text>

          <Text
            style={{
              color: "#fff",
              fontSize: 28,
              fontWeight: "700",
              textTransform: "capitalize",
              marginTop: 4,
            }}
          >
            {pokemon.name}
          </Text>

          <View
            style={{ alignSelf: "flex-start", flexDirection: "row", gap: 4 }}
          >
            {pokemon?.types.map((t) => (
              <TypeBadge key={t.type.name} type={t.type.name} />
            ))}
          </View>

          {image && (
            <Image
              source={{ uri: image }}
              style={{
                width: 220,
                height: 220,
                alignSelf: "center",
              }}
              resizeMode="contain"
            />
          )}
        </View>

        {/* Stats / Info tabs */}

        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: 12,
            padding: 4,
          }}
        >
          <Pressable
            onPress={() => setTab("stats")}
            style={{
              flex: 1,
              paddingVertical: 10,
              alignItems: "center",
              borderRadius: 8,
              backgroundColor:
                tab === "stats" ? "rgba(247,201,75,0.2)" : "transparent",
            }}
          >
            <Text style={{ color: "#fff" }}>Stats</Text>
          </Pressable>

          <Pressable
            onPress={() => setTab("info")}
            style={{
              flex: 1,
              paddingVertical: 10,
              alignItems: "center",
              borderRadius: 8,
              backgroundColor:
                tab === "info" ? "rgba(247,201,75,0.2)" : "transparent",
            }}
          >
            <Text style={{ color: "#fff" }}>Info</Text>
          </Pressable>
        </View>

        {/* Content */}
        <View style={{ padding: 20 }}>
          {tab === "stats" ? (
            <View>
              <Text
                style={{
                  color: "rgba(255,255,255,0.3)",
                  fontSize: 14,
                  fontWeight: "700",
                }}
              >
                Base Stats
              </Text>
              <View style={{ flexDirection: "column", gap: 8, marginTop: 12 }}>
                {pokemon.stats.map((stat) => (
                  <StatusBar
                    key={stat.stat.name}
                    name={stat.stat.name}
                    value={stat.base_stat}
                  />
                ))}
              </View>

              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: 20,
                  gap: 4,
                  backgroundColor: `${c.bg}22`,
                  borderColor: `${c.bg}33`,
                  width: "100%",
                  borderRadius: 16,
                  overflow: "hidden",
                  borderWidth: 1,
                  paddingVertical: 12,
                }}
              >
                <Text
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontSize: 14,
                    fontWeight: "700",
                  }}
                >
                  Base Exp:
                </Text>
                <Text style={{ color: "#fff", fontSize: 14 }}>
                  {pokemon.base_experience}
                </Text>
              </View>
            </View>
          ) : (
            <InfoContent pokemon={pokemon} c={c} />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
