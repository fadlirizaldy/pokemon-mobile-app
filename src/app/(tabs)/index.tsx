import { PokemonCard } from "@/components/pokemon-card";
import { IPokemon } from "@/constants/type.model";
import { fetchList, fetchPokemon } from "@/utils/api";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function HomeScreen() {
  const [loaded, setLoaded] = useState<IPokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadBatch = useCallback(async (off: number) => {
    try {
      const items = await fetchList(20, off);

      if (items.length < 20) {
        setHasMore(false);
      }

      const details = await Promise.all(
        items.map((item) => fetchPokemon(item.name)),
      );

      setLoaded((prev) => [...prev, ...details]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    loadBatch(0);
  }, [loadBatch]);

  const loadMore = () => {
    if (loadingMore || !hasMore || loading) return;

    setLoadingMore(true);

    const newOffset = offset + 20;

    setOffset(newOffset);
    loadBatch(newOffset);
  };

  const handleSelect = (pokemon: IPokemon) => {
    router.push(`/pokemon/${pokemon.id}`);
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="small" color="#F7C94B" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Pokédex</Text>

        <Text style={styles.title}>All Pokémon</Text>
      </View>

      <FlatList
        data={loaded}
        keyExtractor={(pokemon) => String(pokemon.id)}
        renderItem={({ item, index }) => (
          <PokemonCard
            pokemon={item}
            index={index % 20}
            onPress={() => handleSelect(item)}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <View style={styles.footer}>
              <ActivityIndicator size="small" color="rgba(255,255,255,0.7)" />
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D1A",
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },

  eyebrow: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 10,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 4,
  },

  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
  },

  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 8,
  },

  footer: {
    paddingVertical: 20,
    alignItems: "center",
  },

  loading: {
    flex: 1,
    backgroundColor: "#0D0D1A",
    alignItems: "center",
    justifyContent: "center",
  },
});
