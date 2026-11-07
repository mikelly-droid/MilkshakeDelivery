import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá! 👋</Text>

        <Text style={styles.title}>O que deseja tomar hoje?</Text>
      </View>

      <View style={styles.banner}>
        <Text style={styles.offer}>
          Oferta do dia: Milkshake de morango com 20% de desconto! 🍓
        </Text>

        <Text style={styles.bannerTitle}>Milkshake de morango</Text>

        <Text style={styles.bannerSubtitle}>
          Delicioso milkshake de morango com chantilly e calda de chocolate.
        </Text>

        <Text style={styles.bannerText}>
          Aproveite essa oferta por tempo limitado! ⏰
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Peça agora</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b7bdfa",
    paddingHorizontal: 20,
  },

  header: {
    marginBottom: 50,
    marginTop: 25,
  },

  greeting: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
  },

  banner: {
    backgroundColor: "#f7f2dada",
    padding: 20,
    borderRadius: 10,
  },

  offer: {
    color: "#c00000",
    fontSize: 15,
    fontWeight: "bold",
  },

  bannerTitle: {
    color: "#000000",
    fontSize: 21,
    fontWeight: "bold",
    marginTop: 10,
  },

  bannerSubtitle: {
    color: "#383636",
    fontSize: 16,
    marginTop: 8,
  },

  bannerText: {
    color: "#292727",
    fontSize: 13,
    marginTop: 10,
  },

  button: {
    backgroundColor: "#0b0a6b",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: "flex-start",
  },

  buttonText: {
    color: "#f8f3f3",
    fontWeight: "bold",
    textAlign: "center",
  },
});
