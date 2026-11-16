import { router } from "expo-router";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🍓</Text>

      <Text style={styles.title}>Bem-vindo(a)!</Text>

      <Text style={styles.subtitle}>
        Entre na sua conta e peça seu milkshake favorito!
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Seu e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput style={styles.input} placeholder="Sua senha" secureTextEntry />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/menu")}
      >
        <Text style={styles.buttonText}>Entrar 🛵</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>Ainda não tem uma conta?</Text>

      <TouchableOpacity onPress={() => router.push("/cadastro")}>
        <Text style={styles.registerButton}>Criar minha conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdc1d8",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  emoji: {
    fontSize: 65,
    marginBottom: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#460037",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
    color: "#383636",
  },
  input: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: "100%",
    backgroundColor: "#790046",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  registerText: {
    marginTop: 25,
    fontSize: 15,
    color: "#292727",
  },
  registerButton: {
    color: "#3a0035",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 8,
  },
});
