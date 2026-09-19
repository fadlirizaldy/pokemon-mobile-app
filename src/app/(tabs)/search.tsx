import { PokemonCard } from "@/components/pokemon-card";
import { IPokemon } from "@/constants/type.model";
import { fetchPokemon } from "@/utils/api";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<IPokemon | null>(null);
  const [error, setError] = useState("");
  const [searching, setSearching] = useState(false);

  const search = async () => {
    const q = query.trim().toLowerCase();

    if (!q) return;

    setSearching(true);
    setError("");
    setResult(null);

    try {
      const pokemon = await fetchPokemon(q);
      setResult(pokemon);
    } catch {
      setError(`No Pokémon found for "${q}"`);
    } finally {
      setSearching(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Find</Text>

        <Text style={styles.title}>Search</Text>
      </View>

      {/* Search */}
      <View style={styles.searchSection}>
        <View style={styles.searchRow}>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Name or number..."
            placeholderTextColor="rgba(255,255,255,0.3)"
            onSubmitEditing={search}
            returnKeyType="search"
            style={styles.input}
          />

          <Pressable
            onPress={search}
            style={({ pressed }) => [
              styles.goButton,
              pressed && styles.goButtonPressed,
            ]}
          >
            <Text style={styles.goText}>Go</Text>
          </Pressable>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Loading */}
        {searching && (
          <View style={styles.loading}>
            <ActivityIndicator size="small" color="rgba(255,255,255,0.7)" />
          </View>
        )}

        {/* Error */}
        {error !== "" && (
          <View style={styles.messageContainer}>
            <Text style={styles.error}>{error}</Text>
          </View>
        )}

        {/* Result */}
        {result && (
          <View style={styles.resultCard}>
            <PokemonCard
              pokemon={result}
              index={0}
              onPress={() => router.push(`/pokemon/${result.id}`)}
            />
          </View>
        )}

        {/* Empty */}
        {!result && !searching && !error && (
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyIconText}>⌕</Text>
            </View>

            <Text style={styles.emptyText}>
              Search by name or{"\n"}Pokédex number
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // ─────────────────────────────────────────────
  // Screen
  // ─────────────────────────────────────────────

  container: {
    flex: 1,
    backgroundColor: "#0D0D1A",
  },

  // ─────────────────────────────────────────────
  // Header
  // ─────────────────────────────────────────────

  header: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 16,
  },

  eyebrow: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 10,
    fontWeight: "500",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 4,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: -0.5,
  },

  // ─────────────────────────────────────────────
  // Search section
  // ─────────────────────────────────────────────

  searchSection: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  input: {
    flex: 1,

    height: 48,

    paddingHorizontal: 16,

    borderRadius: 12,

    backgroundColor: "rgba(255,255,255,0.08)",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",

    color: "#FFFFFF",

    fontSize: 14,
  },

  goButton: {
    height: 48,

    paddingHorizontal: 18,

    borderRadius: 12,

    backgroundColor: "#F7C94B",

    alignItems: "center",
    justifyContent: "center",
  },

  goButtonPressed: {
    opacity: 0.7,
  },

  goText: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "700",
  },

  // ─────────────────────────────────────────────
  // Content
  // ─────────────────────────────────────────────

  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    flexGrow: 1,
  },

  // ─────────────────────────────────────────────
  // Loading
  // ─────────────────────────────────────────────

  loading: {
    paddingTop: 48,
    alignItems: "center",
    justifyContent: "center",
  },

  // ─────────────────────────────────────────────
  // Error
  // ─────────────────────────────────────────────

  messageContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 48,
  },

  error: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 14,
    textAlign: "center",
  },

  // ─────────────────────────────────────────────
  // Result
  // ─────────────────────────────────────────────

  resultCard: {
    marginTop: 4,
  },

  // ─────────────────────────────────────────────
  // Empty state
  // ─────────────────────────────────────────────

  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    paddingBottom: 80,
  },

  emptyIcon: {
    width: 64,
    height: 64,

    borderRadius: 32,

    backgroundColor: "rgba(255,255,255,0.05)",

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 12,
  },

  emptyIconText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 28,
  },

  emptyText: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
});
