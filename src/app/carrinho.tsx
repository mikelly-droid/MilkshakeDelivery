import { useRouter } from "expo-router";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useCarrinho } from "../context/CarrinhoContext";

export default function CarrinhoScreen() {
  const router = useRouter();

  const { itens, adicionar, diminuir, remover, limpar, total } = useCarrinho();

  function finalizarPedido() {
    Alert.alert(
      "Confirmar pedido 💗",
      `Seu pedido ficou em R$ ${total.toFixed(2).replace(".", ",")}. Deseja confirmar?`,
      [
        {
          text: "Voltar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: () => {
            limpar();

            Alert.alert(
              "Pedido realizado! 🥤",
              "Seu pedido foi confirmado com sucesso!",
              [
                {
                  text: "Voltar ao cardápio",
                  onPress: () => router.replace("/menu"),
                },
              ],
            );
          },
        },
      ],
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.voltar}>‹ Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>Minha cestinha 🛒</Text>
        <Text style={styles.subtitulo}>Confira seus milkshakes favoritos!</Text>
      </View>

      {itens.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={styles.emojiVazio}>🥺</Text>
          <Text style={styles.tituloVazio}>Sua cestinha está vazia</Text>
          <Text style={styles.textoVazio}>
            Que tal escolher um milkshake delicioso?
          </Text>

          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => router.replace("/menu")}
          >
            <Text style={styles.textoBotao}>Explorar cardápio</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView style={styles.lista} showsVerticalScrollIndicator={false}>
            {itens.map((item) => (
              <View key={item.id} style={styles.card}>
                <Image
                  source={item.imagem}
                  style={styles.imagem}
                  resizeMode="cover"
                />

                <View style={styles.informacoes}>
                  <Text style={styles.nome}>{item.nome}</Text>

                  <Text style={styles.preco}>
                    R$ {item.preco.toFixed(2).replace(".", ",")}
                  </Text>

                  <View style={styles.controles}>
                    <TouchableOpacity
                      style={styles.botaoQuantidade}
                      onPress={() => diminuir(item.id)}
                    >
                      <Text style={styles.textoQuantidade}>−</Text>
                    </TouchableOpacity>

                    <Text style={styles.quantidade}>{item.quantidade}</Text>

                    <TouchableOpacity
                      style={styles.botaoQuantidade}
                      onPress={() => adicionar(item)}
                    >
                      <Text style={styles.textoQuantidade}>+</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => remover(item.id)}>
                      <Text style={styles.remover}>Remover</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.resumo}>
            <TouchableOpacity
              style={styles.limpar}
              onPress={() =>
                Alert.alert(
                  "Esvaziar cestinha?",
                  "Deseja remover todos os produtos?",
                  [
                    { text: "Cancelar", style: "cancel" },
                    {
                      text: "Sim, esvaziar",
                      onPress: limpar,
                    },
                  ],
                )
              }
            >
              <Text style={styles.textoLimpar}>Esvaziar cestinha</Text>
            </TouchableOpacity>

            <View style={styles.linhaTotal}>
              <Text style={styles.textoTotal}>Total do pedido</Text>
              <Text style={styles.valorTotal}>
                R$ {total.toFixed(2).replace(".", ",")}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.botaoFinalizar}
              onPress={finalizarPedido}
            >
              <Text style={styles.textoBotao}>Finalizar pedido 💗</Text>
            </TouchableOpacity>
          </View>
        </>
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
    fontSize: 24,
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
    paddingHorizontal: 15,
    paddingTop: 15,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 15,
    marginBottom: 13,
    padding: 10,
    borderWidth: 1,
    borderColor: "#f3dce7",
  },

  imagem: {
    width: 105,
    height: 115,
    borderRadius: 12,
  },

  informacoes: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: "center",
  },

  nome: {
    color: "#460037",
    fontSize: 14,
    fontWeight: "bold",
  },

  preco: {
    color: "#790046",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 7,
  },

  controles: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 10,
  },

  botaoQuantidade: {
    backgroundColor: "#fdc1d8",
    width: 27,
    height: 27,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  textoQuantidade: {
    color: "#790046",
    fontSize: 18,
    fontWeight: "bold",
  },

  quantidade: {
    color: "#460037",
    fontWeight: "bold",
  },

  remover: {
    color: "#b33b69",
    fontSize: 11,
    fontWeight: "bold",
  },

  resumo: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#f1dce6",
  },

  limpar: {
    alignSelf: "flex-end",
    marginBottom: 15,
  },

  textoLimpar: {
    color: "#b33b69",
    fontSize: 12,
    fontWeight: "bold",
  },

  linhaTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  textoTotal: {
    color: "#460037",
    fontSize: 16,
    fontWeight: "bold",
  },

  valorTotal: {
    color: "#790046",
    fontSize: 21,
    fontWeight: "bold",
  },

  botaoFinalizar: {
    backgroundColor: "#790046",
    padding: 16,
    borderRadius: 13,
    alignItems: "center",
  },

  textoBotao: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
  },

  vazio: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  emojiVazio: {
    fontSize: 65,
  },

  tituloVazio: {
    color: "#460037",
    fontSize: 19,
    fontWeight: "bold",
    marginTop: 15,
  },

  textoVazio: {
    color: "#927889",
    fontSize: 13,
    marginTop: 8,
    textAlign: "center",
  },

  botaoVoltar: {
    backgroundColor: "#790046",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginTop: 22,
  },
});
