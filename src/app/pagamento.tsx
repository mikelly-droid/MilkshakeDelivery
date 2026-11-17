import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useCarrinho } from "../context/CarrinhoContext";

export default function PagamentoScreen() {
  const router = useRouter();
  const { itens, total, registrarPedido } = useCarrinho();

  const [pagamento, setPagamento] = useState("");

  const opcoes = [
    { nome: "Pix", emoji: "📱", descricao: "Pagamento via Pix" },
    { nome: "Cartão de crédito", emoji: "💳", descricao: "Crédito" },
    { nome: "Cartão de débito", emoji: "💳", descricao: "Débito" },
    { nome: "Dinheiro", emoji: "💵", descricao: "Pagamento na entrega" },
  ];

  function confirmarPedido() {
    if (!pagamento) {
      Alert.alert("Atenção", "Escolha uma forma de pagamento.");
      return;
    }

    if (itens.length === 0) {
      Alert.alert("Cestinha vazia", "Adicione produtos antes de continuar.");
      router.replace("/menu");
      return;
    }

    registrarPedido(pagamento);

    Alert.alert(
      "Pedido confirmado! 💗",
      "Seu pedido foi registrado com sucesso.",
      [
        {
          text: "Ver meus pedidos",
          onPress: () => router.replace("/pedidos"),
        },
      ],
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.conteudo}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.voltar}>← Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>Finalizar pedido 💗</Text>
        <Text style={styles.subtitulo}>Escolha como deseja pagar</Text>

        <View style={styles.card}>
          <Text style={styles.tituloCard}>Resumo do pedido</Text>

          {itens.map((item) => (
            <View key={item.itemId} style={styles.linha}>
              <Text style={styles.texto}>
                {item.quantidade}x {item.nome}
              </Text>
              <Text style={styles.texto}>
                R${" "}
                {(item.precoUnitario * item.quantidade)
                  .toFixed(2)
                  .replace(".", ",")}
              </Text>
            </View>
          ))}

          <View style={styles.divisor} />

          <View style={styles.linha}>
            <Text style={styles.totalTexto}>Total</Text>
            <Text style={styles.totalValor}>
              R$ {total.toFixed(2).replace(".", ",")}
            </Text>
          </View>
        </View>

        <Text style={styles.tituloSecao}>Forma de pagamento</Text>

        {opcoes.map((opcao) => (
          <TouchableOpacity
            key={opcao.nome}
            style={[
              styles.opcao,
              pagamento === opcao.nome && styles.opcaoSelecionada,
            ]}
            onPress={() => setPagamento(opcao.nome)}
          >
            <Text style={styles.emoji}>{opcao.emoji}</Text>

            <View style={styles.infoOpcao}>
              <Text style={styles.nomeOpcao}>{opcao.nome}</Text>
              <Text style={styles.descricao}>{opcao.descricao}</Text>
            </View>

            <Text style={styles.selecao}>
              {pagamento === opcao.nome ? "●" : "○"}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.botao} onPress={confirmarPedido}>
          <Text style={styles.textoBotao}>Confirmar pedido</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdc1d8",
  },
  conteudo: {
    padding: 22,
    paddingTop: 45,
    paddingBottom: 40,
  },
  voltar: {
    color: "#790046",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  titulo: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#460037",
  },
  subtitulo: {
    color: "#790046",
    fontSize: 15,
    marginTop: 6,
    marginBottom: 22,
  },
  card: {
    backgroundColor: "#fff8fb",
    padding: 18,
    borderRadius: 18,
    marginBottom: 25,
  },
  tituloCard: {
    color: "#460037",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 10,
  },
  texto: {
    color: "#460037",
    fontSize: 14,
    flex: 1,
  },
  divisor: {
    height: 1,
    backgroundColor: "#e9c4d5",
    marginVertical: 10,
  },
  totalTexto: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#460037",
  },
  totalValor: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#790046",
  },
  tituloSecao: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#460037",
    marginBottom: 13,
  },
  opcao: {
    backgroundColor: "#fff8fb",
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  opcaoSelecionada: {
    borderColor: "#790046",
  },
  emoji: {
    fontSize: 25,
    marginRight: 13,
  },
  infoOpcao: {
    flex: 1,
  },
  nomeOpcao: {
    color: "#460037",
    fontSize: 15,
    fontWeight: "bold",
  },
  descricao: {
    color: "#777",
    fontSize: 12,
    marginTop: 3,
  },
  selecao: {
    color: "#790046",
    fontSize: 22,
    fontWeight: "bold",
  },
  botao: {
    backgroundColor: "#790046",
    padding: 17,
    borderRadius: 15,
    alignItems: "center",
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
