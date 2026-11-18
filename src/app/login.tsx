import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useCarrinho } from "../context/CarrinhoContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { entrar } = useCarrinho();

  function handleLogin() {
    if (!email.trim() || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert("E-mail inválido", "Digite um e-mail válido.");
      return;
    }
    if (senha.length < 6) {
      Alert.alert(
        "Senha inválida",
        "A senha precisa ter pelo menos 6 caracteres.",
      );
      return;
    }
    const logado = entrar(email, senha);
    if (!logado) {
      Alert.alert(
        "Não foi possível entrar",
        "Confira seu e-mail e senha ou crie uma conta.",
      );
      return;
    }
    Alert.alert("Login realizado!", "Bem-vindo(a) ao Milkshake Delivery!", [
      {
        text: "Continuar",
        onPress: () => router.replace("/menu"),
      },
    ]);
  }

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
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Sua senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
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
