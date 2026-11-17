import { useRouter } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useCarrinho } from "../context/CarrinhoContext";

export default function PedidosScreen() {
  const router = useRouter();
  const { pedidos } = useCarrinho();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace("/menu")}>
          <Text style={styles.voltar}>‹ Voltar ao cardápio</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>Meus pedidos 🥤</Text>
        <Text style={styles.subtitulo}>Acompanhe suas compras favoritas!</Text>
      </View>

      {pedidos.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={styles.emoji}>🛍️</Text>
          <Text style={styles.tituloVazio}>Você ainda não fez pedidos</Text>
          <Text style={styles.textoVazio}>
            Seus pedidos confirmados aparecerão aqui.
          </Text>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => router.replace("/menu")}
          >
            <Text style={styles.textoBotao}>Explorar cardápio</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.lista} showsVerticalScrollIndicator={false}>
          {pedidos.map((pedido) => (
            <View key={pedido.id} style={styles.card}>
              <View style={styles.cabecalhoCard}>
                <Text style={styles.numeroPedido}>Pedido {pedido.id}</Text>
                <Text style={styles.status}>{pedido.status}</Text>
              </View>

              <Text style={styles.data}>{pedido.data}</Text>

              <View style={styles.divisor} />

              {pedido.itens.map((item) => (
                <View key={item.itemId} style={styles.item}>
                  <Text style={styles.nomeProduto}>
                    {item.quantidade}x {item.nome}
                  </Text>

                  <Text style={styles.preco}>
                    R${" "}
                    {(item.precoUnitario * item.quantidade)
                      .toFixed(2)
                      .replace(".", ",")}
                  </Text>
                </View>
              ))}

              <View style={styles.divisor} />

              <Text style={styles.pagamento}>
                Pagamento: {pedido.pagamento}
              </Text>

              <View style={styles.totalLinha}>
                <Text style={styles.totalTexto}>Total</Text>
                <Text style={styles.totalValor}>
                  R$ {pedido.total.toFixed(2).replace(".", ",")}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff8fb",
  },
  header: {
    backgroundColor: "#fdc1d8",
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  voltar: {
    color: "#790046",
    fontSize: 15,
    fontWeight: "bold",
  },
  titulo: {
    color: "#460037",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
  },
  subtitulo: {
    color: "#790046",
    fontSize: 13,
    marginTop: 5,
  },
  lista: {
    flex: 1,
    padding: 15,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 17,
    padding: 17,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#f3dce7",
  },
  cabecalhoCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  numeroPedido: {
    color: "#460037",
    fontSize: 14,
    fontWeight: "bold",
    flex: 1,
  },
  status: {
    color: "#fff",
    backgroundColor: "#790046",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    fontSize: 11,
    fontWeight: "bold",
  },
  data: {
    color: "#927889",
    fontSize: 12,
    marginTop: 8,
  },
  divisor: {
    height: 1,
    backgroundColor: "#f1dce6",
    marginVertical: 13,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 10,
  },
  nomeProduto: {
    color: "#460037",
    fontSize: 13,
    flex: 1,
  },
  preco: {
    color: "#790046",
    fontSize: 13,
    fontWeight: "bold",
  },
  pagamento: {
    color: "#927889",
    fontSize: 12,
  },
  totalLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  totalTexto: {
    color: "#460037",
    fontSize: 16,
    fontWeight: "bold",
  },
  totalValor: {
    color: "#790046",
    fontSize: 19,
    fontWeight: "bold",
  },
  vazio: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  emoji: {
    fontSize: 60,
  },
  tituloVazio: {
    color: "#460037",
    fontSize: 19,
    fontWeight: "bold",
    marginTop: 15,
    textAlign: "center",
  },
  textoVazio: {
    color: "#927889",
    fontSize: 13,
    marginTop: 8,
    textAlign: "center",
  },
  botao: {
    backgroundColor: "#790046",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginTop: 22,
  },
  textoBotao: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
