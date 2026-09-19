import { IPokemon } from "@/constants/type.model";
import { StyleSheet, Text, View } from "react-native";

type InfoContentProps = {
  pokemon: IPokemon;
  c: {
    bg: string;
  };
};

export default function InfoContent({ pokemon, c }: InfoContentProps) {
  const profileItems = [
    {
      label: "Height",
      value: `${(pokemon.height / 10).toFixed(1)} m`,
    },
    {
      label: "Weight",
      value: `${(pokemon.weight / 10).toFixed(1)} kg`,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Profile */}
      <Text style={styles.sectionTitle}>Profile</Text>

      {/* Height & Weight Grid */}
      <View style={styles.profileGrid}>
        {profileItems.map((item) => (
          <View
            key={item.label}
            style={[
              styles.profileCard,
              {
                backgroundColor: `${c.bg}15`,
                borderColor: `${c.bg}25`,
              },
            ]}
          >
            <Text style={styles.profileLabel}>{item.label}</Text>

            <Text style={styles.profileValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      {/* Abilities */}
      <Text style={styles.abilitiesTitle}>Abilities</Text>

      {pokemon.abilities.map((a) => (
        <View key={a.ability.name} style={styles.abilityCard}>
          <Text style={styles.abilityName}>
            {a.ability.name.replace("-", " ")}
          </Text>

          {a.is_hidden && <Text style={styles.hiddenLabel}>Hidden</Text>}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 12,
  },

  sectionTitle: {
    marginBottom: 4,
    fontFamily: "monospace",
    fontSize: 10,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.3)",
  },

  profileGrid: {
    flexDirection: "row",
    gap: 8,
  },

  profileCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
  },

  profileLabel: {
    marginBottom: 4,
    fontFamily: "monospace",
    fontSize: 10,
    color: "rgba(255,255,255,0.3)",
  },

  profileValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  abilitiesTitle: {
    marginTop: 8,
    marginBottom: 4,
    fontFamily: "monospace",
    fontSize: 10,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.3)",
  },

  abilityCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  abilityName: {
    fontSize: 14,
    color: "#FFFFFF",
    textTransform: "capitalize",
  },

  hiddenLabel: {
    fontFamily: "monospace",
    fontSize: 9,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.3)",
  },
});
