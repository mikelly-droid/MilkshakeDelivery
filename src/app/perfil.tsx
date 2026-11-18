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

export default function PerfilScreen() {
  const { usuario, atualizarUsuario, sair, pedidos } = useCarrinho();

  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState(usuario?.nome || "");
  const [email, setEmail] = useState(usuario?.email || "");

  function salvarAlteracoes() {
    if (!nome.trim() || !email.trim()) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert("E-mail inválido", "Digite um e-mail válido.");
      return;
    }

    atualizarUsuario(nome, email);
    setEditando(false);
    Alert.alert("Prontinho!", "Seus dados foram atualizados.");
  }

  function sairDaConta() {
    Alert.alert("Sair da conta", "Deseja realmente sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: () => {
          sair();
          router.replace("/login");
        },
      },
    ]);
  }

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.emoji}>🧋</Text>
        <Text style={styles.titulo}>Nenhuma conta conectada</Text>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => router.replace("/login")}
        >
          <Text style={styles.textoBotao}>Fazer login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🍓</Text>
      <Text style={styles.titulo}>Meu perfil</Text>
      <Text style={styles.subtitulo}>
        Suas informações no Milkshake Delivery
      </Text>

      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>
            {usuario.nome.charAt(0).toUpperCase()}
          </Text>
        </View>

        {editando ? (
          <>
            <Text style={styles.label}>Nome completo</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              placeholder="Seu nome"
            />

            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Seu e-mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TouchableOpacity style={styles.botao} onPress={salvarAlteracoes}>
              <Text style={styles.textoBotao}>Salvar alterações</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setNome(usuario.nome);
                setEmail(usuario.email);
                setEditando(false);
              }}
            >
              <Text style={styles.cancelar}>Cancelar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.nome}>{usuario.nome}</Text>
            <Text style={styles.email}>{usuario.email}</Text>

            <TouchableOpacity
              style={styles.botao}
              onPress={() => setEditando(true)}
            >
              <Text style={styles.textoBotao}>Editar meus dados ✏️</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.infoTitulo}>🧾 Meus pedidos</Text>
        <Text style={styles.infoTexto}>
          Você já realizou {pedidos.length}{" "}
          {pedidos.length === 1 ? "pedido" : "pedidos"}.
        </Text>

        <TouchableOpacity onPress={() => router.push("/pedidos")}>
          <Text style={styles.link}>Ver histórico de pedidos</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.botaoSair} onPress={sairDaConta}>
        <Text style={styles.textoSair}>Sair da conta ↗</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/menu")}>
        <Text style={styles.voltar}>Voltar ao menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdc1d8",
    alignItems: "center",
    justifyContent: "center",
    padding: 22,
  },
  emoji: {
    fontSize: 50,
    marginBottom: 8,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#460037",
  },
  subtitulo: {
    fontSize: 14,
    color: "#555",
    marginTop: 6,
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff8fb",
    borderRadius: 20,
    padding: 22,
    alignItems: "center",
    marginBottom: 15,
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 50,
    backgroundColor: "#790046",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  avatarTexto: {
    color: "#fff",
    fontSize: 38,
    fontWeight: "bold",
  },
  nome: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#460037",
  },
  email: {
    fontSize: 15,
    color: "#666",
    marginTop: 6,
    marginBottom: 18,
  },
  label: {
    alignSelf: "flex-start",
    color: "#460037",
    fontWeight: "bold",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e8b5cc",
    borderRadius: 10,
    padding: 13,
    marginBottom: 14,
    fontSize: 15,
  },
  botao: {
    width: "100%",
    backgroundColor: "#790046",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelar: {
    color: "#790046",
    fontWeight: "bold",
    marginTop: 15,
  },
  cardInfo: {
    width: "100%",
    backgroundColor: "#fff8fb",
    borderRadius: 15,
    padding: 18,
  },
  infoTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#460037",
  },
  infoTexto: {
    color: "#555",
    marginTop: 8,
  },
  link: {
    color: "#790046",
    fontWeight: "bold",
    marginTop: 12,
  },
  botaoSair: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#790046",
    padding: 13,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 18,
  },
  textoSair: {
    color: "#790046",
    fontWeight: "bold",
    fontSize: 16,
  },
  voltar: {
    color: "#460037",
    fontWeight: "bold",
    marginTop: 15,
  },
});
