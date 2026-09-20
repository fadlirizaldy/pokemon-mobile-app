import TypeBadge from "@/components/type-badge";
import { IPokemon } from "@/constants/type.model";
import { getTypeColor } from "@/utils";
import { fetchPokemon } from "@/utils/api";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
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

  const img = useMemo(() => {
    return (
      result?.sprites.other["official-artwork"].front_default ||
      result?.sprites.front_default
    );
  }, [result]);

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

  const primary = useMemo(() => {
    return result?.types[0].type.name;
  }, [result]);

  const c = useMemo(() => {
    return getTypeColor(primary || "normal");
  }, [primary]);

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

          <Pressable onPress={search} style={styles.goButton}>
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
