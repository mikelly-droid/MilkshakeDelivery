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

export default function CadastroScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  function handleCadastro() {
    if (!nome.trim() || !email.trim() || !senha || !confirmarSenha) {
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

    if (senha !== confirmarSenha) {
      Alert.alert("Senhas diferentes", "As senhas não coincidem.");
      return;
    }

    Alert.alert("Cadastro realizado!", "Sua conta foi criada com sucesso!", [
      {
        text: "Continuar",
        onPress: () => router.replace("/menu"),
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🧋</Text>

      <Text style={styles.title}>Crie sua conta!</Text>

      <Text style={styles.subtitle}>
        Cadastre-se para aproveitar nossos milkshakes!
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
      />

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
        placeholder="Crie uma senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirme sua senha"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Criar conta 🛵</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>Já possui uma conta?</Text>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.loginButton}>Fazer login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffa9ca",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  emoji: {
    fontSize: 55,
    marginBottom: 10,
  },
  title: {
    fontSize: 29,
    fontWeight: "bold",
    color: "#460037",
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 25,
    color: "#383636",
  },
  input: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
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
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
  loginText: {
    marginTop: 22,
    fontSize: 15,
    color: "#292727",
  },
  loginButton: {
    color: "#3a0035",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 8,
  },
});
