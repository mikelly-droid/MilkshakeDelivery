import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useCarrinho } from "../context/CarrinhoContext";

const produtos = [
  {
    id: 1,
    nome: "Milkshake de Morango",
    categoria: "Frutados",
    preco: 12,
    descricao: "Milkshake de morango com cobertura e chantilly.",
    imagem: require("../../assets/images/morango.jpeg"),
  },
  {
    id: 2,
    nome: "Milkshake de Chocolate",
    categoria: "Chocolate",
    preco: 13,
    descricao: "Chocolate cremoso com calda e raspas de chocolate.",
    imagem: require("../../assets/images/chocolate.jpeg"),
  },
  {
    id: 3,
    nome: "Milkshake de Banana",
    categoria: "Frutados",
    preco: 12,
    descricao: "Milkshake de banana com textura suave e cremosa.",
    imagem: require("../../assets/images/banana.jpeg"),
  },
  {
    id: 4,
    nome: "Milkshake de Oreo",
    categoria: "Cremosos",
    preco: 15,
    descricao: "Milkshake com pedaços de biscoito Oreo.",
    imagem: require("../../assets/images/oreo.jpeg"),
  },
  {
    id: 5,
    nome: "Milkshake de Baunilha",
    categoria: "Cremosos",
    preco: 12,
    descricao: "Baunilha suave com chantilly e cobertura.",
    imagem: require("../../assets/images/baunilha.jpeg"),
  },
  {
    id: 6,
    nome: "Milkshake de Paçoca",
    categoria: "Especiais",
    preco: 14,
    descricao: "Uma combinação cremosa com o sabor da paçoca.",
    imagem: require("../../assets/images/pacoca.jpeg"),
  },

  {
    id: 7,
    nome: "Milkshake de Doce de Leite",
    categoria: "Especiais",
    preco: 15,
    descricao: "Doce de leite cremoso com cobertura especial.",
    imagem: require("../../assets/images/doceleite.jpeg"),
  },

  {
    id: 8,
    nome: "Milkshake de Ovomaltine",
    categoria: "Chocolate",
    preco: 15,
    descricao: "Milkshake de chocolate com crocância de Ovomaltine.",
    imagem: require("../../assets/images/ovo.jpeg"),
  },
  {
    id: 9,
    nome: "Milkshake de Frutas Vermelhas",
    categoria: "Frutados",
    preco: 16,
    descricao: "Uma mistura deliciosa de frutas vermelhas.",
    imagem: require("../../assets/images/frutasv.jpeg"),
  },

  {
    id: 10,
    nome: "Morango com Chocolate",
    categoria: "Especiais",
    preco: 16,
    descricao: "A combinação de morango com muito chocolate.",
    imagem: require("../../assets/images/mec.jpeg"),
  },

  {
    id: 11,
    nome: "Milkshake de Caramelo",
    categoria: "Especiais",
    preco: 15,
    descricao: "Milkshake cremoso com calda de caramelo.",
    imagem: require("../../assets/images/caramelo.jpeg"),
  },

  {
    id: 12,
    nome: "Cookies & Cream",
    categoria: "Cremosos",
    preco: 16,
    descricao: "Creme gelado com pedaços de biscoito e chocolate.",
    imagem: require("../../assets/images/ckok.jpeg"),
  },
];
const categorias = [
  { nome: "Todos", emoji: "🥤" },
  { nome: "Frutados", emoji: "🍓" },
  { nome: "Chocolate", emoji: "🍫" },
  { nome: "Cremosos", emoji: "🍦" },
  { nome: "Especiais", emoji: "✨" },
];

const tiposLeite = ["Integral", "Sem lactose", "Vegetal"];

const opcoesAdicionais = [
  { nome: "Chantilly extra", preco: 2 },
  { nome: "Granulado", preco: 1.5 },
  { nome: "Calda extra", preco: 2 },
  { nome: "Oreo", preco: 2.5 },
  { nome: "Morango", preco: 2.5 },
];

const opcoesRetirar = ["Chantilly", "Cobertura", "Granulado"];

export default function MenuScreen() {
  const router = useRouter();
  const { adicionar, itens } = useCarrinho();
  const [pesquisa, setPesquisa] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [modalVisivel, setModalVisivel] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<
    (typeof produtos)[number] | null
  >(null);
  const [leiteSelecionado, setLeiteSelecionado] = useState("Integral");
  const [adicionaisSelecionados, setAdicionaisSelecionados] = useState<
    { nome: string; preco: number }[]
  >([]);
  const [ingredientesRetirados, setIngredientesRetirados] = useState<string[]>(
    [],
  );
  const [observacao, setObservacao] = useState("");
  const [categoriaTemporaria, setCategoriaTemporaria] = useState("Todos");
  const [ordemTemporaria, setOrdemTemporaria] = useState("padrao");
  const [ordem, setOrdem] = useState("padrao");
  const produtosFiltrados = produtos
    .filter((produto) => {
      const correspondePesquisa = produto.nome
        .toLowerCase()
        .includes(pesquisa.toLowerCase());
      const correspondeCategoria =
        categoriaSelecionada === "Todos" ||
        produto.categoria === categoriaSelecionada;
      return correspondePesquisa && correspondeCategoria;
    })

    .sort((a, b) => {
      if (ordem === "menor") {
        return a.preco - b.preco;
      }
      if (ordem === "maior") {
        return b.preco - a.preco;
      }
      return a.id - b.id;
    });

  function abrirFiltros() {
    setCategoriaTemporaria(categoriaSelecionada);
    setOrdemTemporaria(ordem);
    setModalVisivel(true);
  }

  function aplicarFiltros() {
    setCategoriaSelecionada(categoriaTemporaria);
    setOrdem(ordemTemporaria);
    setModalVisivel(false);
  }
  function limparFiltros() {
    setCategoriaTemporaria("Todos");
    setOrdemTemporaria("padrao");
    setCategoriaSelecionada("Todos");
    setOrdem("padrao");
    setPesquisa("");
    setModalVisivel(false);
  }

  function selecionarProduto(produto: (typeof produtos)[number]) {
    setProdutoSelecionado(produto);
    setLeiteSelecionado("Integral");
    setAdicionaisSelecionados([]);
    setIngredientesRetirados([]);
    setObservacao("");
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.titulo}>Olá! O que vamos pedir hoje?</Text>
          <Text style={styles.subtitulo}>Escolha seu sabor favorito 💗</Text>
        </View>
        <View style={styles.areaPesquisa}>
          <View style={styles.caixaPesquisa}>
            <Text style={styles.lupa}>🔎</Text>
            <TextInput
              style={styles.inputPesquisa}
              placeholder="Pesquisar milkshake..."
              placeholderTextColor="#9b7588"
              value={pesquisa}
              onChangeText={setPesquisa}
            />
          </View>
          <TouchableOpacity style={styles.botaoFiltro} onPress={abrirFiltros}>
            <Text style={styles.textoFiltro}>☷ Filtros</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>Destaques do dia 💕</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={styles.banner}
              onPress={() => setPesquisa("Morango")}
            >
              <Image
                source={require("../../assets/images/morango.jpeg")}
                style={styles.imagemBanner}
              />
              <View style={styles.textoBanner}>
                <Text style={styles.bannerPequeno}>QUERIDINHO DA CASA</Text>
                <Text style={styles.bannerTitulo}>Morango 🍓</Text>
                <Text style={styles.bannerDescricao}>Uma delícia cremosa!</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.banner}
              onPress={() => setPesquisa("Chocolate")}
            >
              <Image
                source={require("../../assets/images/chocolate.jpeg")}
                style={styles.imagemBanner}
              />
              <View style={styles.textoBanner}>
                <Text style={styles.bannerPequeno}>PARA OS APAIXONADOS</Text>
                <Text style={styles.bannerTitulo}>Chocolate 🍫</Text>
                <Text style={styles.bannerDescricao}>
                  Muito sabor em cada gole!
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={styles.secao}>
          <Text style={styles.tituloSecao}>Categorias</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categorias.map((categoria) => (
              <TouchableOpacity
                key={categoria.nome}
                style={[
                  styles.categoria,
                  categoriaSelecionada === categoria.nome &&
                    styles.categoriaSelecionada,
                ]}
                onPress={() => setCategoriaSelecionada(categoria.nome)}
              >
                <Text style={styles.emojiCategoria}>{categoria.emoji}</Text>
                <Text
                  style={[
                    styles.textoCategoria,
                    categoriaSelecionada === categoria.nome &&
                      styles.textoCategoriaSelecionada,
                  ]}
                >
                  {categoria.nome}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.secao}>
          <View style={styles.linhaTitulo}>
            <Text style={styles.tituloSecao}>Nosso cardápio 🥤</Text>
            <Text style={styles.quantidade}>
              {produtosFiltrados.length} opções
            </Text>
          </View>
          <View style={styles.gradeProdutos}>
            {produtosFiltrados.map((produto) => (
              <View key={produto.id} style={styles.cardProduto}>
                <Image
                  source={produto.imagem}
                  style={styles.imagemProduto}
                  resizeMode="cover"
                />
                <View style={styles.conteudoProduto}>
                  <Text style={styles.nomeProduto}>{produto.nome}</Text>
                  <Text style={styles.categoriaProduto}>
                    {produto.categoria}
                  </Text>
                  <Text style={styles.descricaoProduto}>
                    {produto.descricao}
                  </Text>
                  <View style={styles.linhaPreco}>
                    <Text style={styles.preco}>
                      R$ {produto.preco.toFixed(2).replace(".", ",")}
                    </Text>
                    <TouchableOpacity
                      style={styles.botaoOpcoes}
                      onPress={() => selecionarProduto(produto)}
                    >
                      <Text style={styles.textoBotaoOpcoes}>Ver opções +</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
          {produtosFiltrados.length === 0 && (
            <View style={styles.semResultado}>
              <Text style={styles.semResultadoEmoji}>🥺</Text>
              <Text style={styles.semResultadoTitulo}>
                Nenhum milkshake encontrado
              </Text>
              <Text style={styles.semResultadoTexto}>
                Tente pesquisar outro sabor ou mudar os filtros.
              </Text>
              <TouchableOpacity
                style={styles.botaoLimpar}
                onPress={limparFiltros}
              >
                <Text style={styles.textoBotaoLimpar}>
                  Ver todos os sabores
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.menuInferior}>
        <TouchableOpacity
          style={styles.itemMenu}
          onPress={() => {
            setPesquisa("");
            limparFiltros();
          }}
        >
          <Text style={styles.iconeMenu}>🏠</Text>
          <Text style={styles.textoMenuAtivo}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemMenu}
          onPress={() => router.push("/pedidos")}
        >
          <Text style={styles.iconeMenu}>🧾</Text>
          <Text style={styles.textoMenu}>Pedidos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemMenu}
          onPress={() => router.push("/carrinho")}
        >
          <Text style={styles.iconeMenu}>🛒</Text>
          <Text style={styles.textoMenu}>
            Cestinha ({itens.reduce((soma, item) => soma + item.quantidade, 0)})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemMenu}
          onPress={() => router.push("/perfil")}
        >
          <Text style={styles.iconeMenu}>👤</Text>
          <Text style={styles.textoMenu}>Perfil</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisivel}

        transparent

        animationType="slide"

        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.fundoModal}>
          <View style={styles.conteudoModal}>
            <View style={styles.cabecalhoModal}>
              <Text style={styles.tituloModal}>Filtrar cardápio</Text>

              <TouchableOpacity onPress={() => setModalVisivel(false)}>
                <Text style={styles.fecharModal}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.tituloFiltro}>Escolha uma categoria</Text>

            <View style={styles.opcoesCategorias}>
              {categorias.map((categoria) => (
                <TouchableOpacity
                  key={categoria.nome}

                  style={[
                    styles.opcaoCategoria,

                    categoriaTemporaria === categoria.nome &&
                      styles.opcaoSelecionada,
                  ]}

                  onPress={() => setCategoriaTemporaria(categoria.nome)}
                >
                  <Text
                    style={[
                      styles.textoOpcaoCategoria,

                      categoriaTemporaria === categoria.nome &&
                        styles.textoOpcaoSelecionada,
                    ]}
                  >
                    {categoria.emoji} {categoria.nome}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.tituloFiltro}>Organizar por preço</Text>

            <TouchableOpacity
              style={styles.opcaoOrdem}

              onPress={() => setOrdemTemporaria("padrao")}
            >
              <Text style={styles.textoOrdem}>Ordem padrão</Text>
              <Text style={styles.marcacao}>
                {ordemTemporaria === "padrao" ? "🔘" : "⚪"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.opcaoOrdem}
              onPress={() => setOrdemTemporaria("menor")}
            >
              <Text style={styles.textoOrdem}>Menor preço primeiro</Text>
              <Text style={styles.marcacao}>
                {ordemTemporaria === "menor" ? "🔘" : "⚪"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.opcaoOrdem}
              onPress={() => setOrdemTemporaria("maior")}
            >
              <Text style={styles.textoOrdem}>Maior preço primeiro</Text>
              <Text style={styles.marcacao}>
                {ordemTemporaria === "maior" ? "🔘" : "⚪"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botaoAplicar}
              onPress={aplicarFiltros}
            >
              <Text style={styles.textoBotaoAplicar}>Aplicar filtros</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botaoLimparModal}
              onPress={limparFiltros}
            >
              <Text style={styles.textoLimparModal}>Limpar filtros</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={produtoSelecionado !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setProdutoSelecionado(null)}
      >
        <View style={styles.fundoModal}>
          <View style={styles.conteudoModal}>
            <View style={styles.cabecalhoModal}>
              <Text style={styles.tituloModal}>
                Personalize seu milkshake 💗
              </Text>

              <TouchableOpacity onPress={() => setProdutoSelecionado(null)}>
                <Text style={styles.fecharModal}>✕</Text>
              </TouchableOpacity>
            </View>

            {produtoSelecionado && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.nomeProduto}>
                  {produtoSelecionado.nome}
                </Text>

                <Text style={styles.tituloFiltro}>🥛 Tipo de leite</Text>

                {tiposLeite.map((leite) => (
                  <TouchableOpacity
                    key={leite}
                    style={styles.opcaoOrdem}
                    onPress={() => setLeiteSelecionado(leite)}
                  >
                    <Text style={styles.textoOrdem}>{leite}</Text>
                    <Text style={styles.marcacao}>
                      {leiteSelecionado === leite ? "🔘" : "⚪"}
                    </Text>
                  </TouchableOpacity>
                ))}

                <Text style={styles.tituloFiltro}>🍫 Adicionais</Text>

                {opcoesAdicionais.map((adicional) => (
                  <TouchableOpacity
                    key={adicional.nome}
                    style={styles.opcaoOrdem}
                    onPress={() => {
                      const jaSelecionado = adicionaisSelecionados.some(
                        (item) => item.nome === adicional.nome,
                      );

                      if (jaSelecionado) {
                        setAdicionaisSelecionados(
                          adicionaisSelecionados.filter(
                            (item) => item.nome !== adicional.nome,
                          ),
                        );
                      } else {
                        setAdicionaisSelecionados([
                          ...adicionaisSelecionados,
                          adicional,
                        ]);
                      }
                    }}
                  >
                    <Text style={styles.textoOrdem}>
                      {adicional.nome} (+ R${" "}
                      {adicional.preco.toFixed(2).replace(".", ",")})
                    </Text>

                    <Text style={styles.marcacao}>
                      {adicionaisSelecionados.some(
                        (item) => item.nome === adicional.nome,
                      )
                        ? "☑️"
                        : "⬜"}
                    </Text>
                  </TouchableOpacity>
                ))}

                <Text style={styles.tituloFiltro}>🚫 Retirar ingredientes</Text>

                {opcoesRetirar.map((ingrediente) => (
                  <TouchableOpacity
                    key={ingrediente}
                    style={styles.opcaoOrdem}
                    onPress={() => {
                      if (ingredientesRetirados.includes(ingrediente)) {
                        setIngredientesRetirados(
                          ingredientesRetirados.filter(
                            (item) => item !== ingrediente,
                          ),
                        );
                      } else {
                        setIngredientesRetirados([
                          ...ingredientesRetirados,
                          ingrediente,
                        ]);
                      }
                    }}
                  >
                    <Text style={styles.textoOrdem}>{ingrediente}</Text>

                    <Text style={styles.marcacao}>
                      {ingredientesRetirados.includes(ingrediente)
                        ? "☑️"
                        : "⬜"}
                    </Text>
                  </TouchableOpacity>
                ))}

                <Text style={styles.tituloFiltro}>📝 Alguma observação?</Text>

                <TextInput
                  style={styles.inputPesquisa}
                  placeholder="Ex.: pouco chantilly, mais calda..."
                  placeholderTextColor="#9b7588"
                  value={observacao}
                  onChangeText={setObservacao}
                  multiline
                />

                <Text style={styles.preco}>
                  Preço: R${" "}
                  {(
                    (produtoSelecionado?.preco ?? 0) +
                    adicionaisSelecionados.reduce(
                      (soma, item) => soma + item.preco,
                      0,
                    )
                  )
                    .toFixed(2)
                    .replace(".", ",")}
                </Text>

                <TouchableOpacity
                  style={styles.botaoAplicar}
                  onPress={() => {
                    if (!produtoSelecionado) return;

                    const precoFinal =
                      produtoSelecionado.preco +
                      adicionaisSelecionados.reduce(
                        (soma, item) => soma + item.preco,
                        0,
                      );

                    adicionar({
                      ...produtoSelecionado,
                      personalizacao: {
                        leite: leiteSelecionado,
                        adicionais: adicionaisSelecionados,
                        retirar: ingredientesRetirados,
                        observacao: observacao,
                      },
                      precoUnitario: precoFinal,
                    });

                    setProdutoSelecionado(null);

                    Alert.alert(
                      "Adicionado à cestinha! 💗",
                      `${produtoSelecionado.nome} foi adicionado ao seu pedido.`,
                    );
                  }}
                >
                  <Text style={styles.textoBotaoAplicar}>
                    Adicionar à cestinha 💗
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
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

    paddingHorizontal: 20,

    paddingTop: 55,

    paddingBottom: 25,

    borderBottomLeftRadius: 25,

    borderBottomRightRadius: 25,
  },

  logo: {
    fontSize: 23,

    fontWeight: "bold",

    color: "#460037",
  },

  localizacao: {
    color: "#790046",

    fontSize: 12,

    marginTop: 5,
  },

  titulo: {
    color: "#460037",

    fontSize: 23,

    fontWeight: "bold",

    marginTop: 25,
  },

  subtitulo: {
    color: "#790046",

    fontSize: 14,

    marginTop: 5,
  },

  areaPesquisa: {
    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 15,

    marginTop: 20,

    gap: 10,
  },

  caixaPesquisa: {
    flex: 1,

    height: 48,

    backgroundColor: "#ffffff",

    borderRadius: 13,

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 12,

    borderWidth: 1,

    borderColor: "#f2d6e3",
  },

  lupa: {
    fontSize: 17,

    marginRight: 8,
  },

  inputPesquisa: {
    flex: 1,

    color: "#460037",

    fontSize: 13,
  },

  botaoFiltro: {
    backgroundColor: "#790046",

    height: 48,

    paddingHorizontal: 13,

    borderRadius: 13,

    justifyContent: "center",
  },

  textoFiltro: {
    color: "#ffffff",

    fontWeight: "bold",

    fontSize: 13,
  },

  secao: {
    marginTop: 25,

    paddingHorizontal: 15,
  },

  tituloSecao: {
    color: "#460037",

    fontSize: 19,

    fontWeight: "bold",

    marginBottom: 13,
  },

  banner: {
    width: 285,

    height: 145,

    backgroundColor: "#fdc1d8",

    borderRadius: 18,

    marginRight: 12,

    flexDirection: "row",

    overflow: "hidden",
  },

  imagemBanner: {
    width: 120,
    height: "100%",
  },

  textoBanner: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  bannerPequeno: {
    color: "#790046",
    fontSize: 9,
    fontWeight: "bold",
  },

  bannerTitulo: {
    color: "#460037",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 7,
  },

  bannerDescricao: {
    color: "#790046",
    fontSize: 11,
    marginTop: 5,
  },

  categoria: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 17,
    marginRight: 9,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f0d5e1",
  },

  categoriaSelecionada: {
    backgroundColor: "#790046",
    borderColor: "#790046",
  },

  emojiCategoria: {
    fontSize: 22,
  },

  textoCategoria: {
    color: "#790046",
    fontSize: 12,
    marginTop: 5,
    fontWeight: "600",
  },

  textoCategoriaSelecionada: {
    color: "#ffffff",
  },

  linhaTitulo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  quantidade: {
    color: "#9b7588",
    fontSize: 12,
    marginBottom: 13,
  },

  gradeProdutos: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  cardProduto: {
    width: "48.5%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 15,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#f3dce7",
  },

  imagemProduto: {
    width: "100%",
    height: 175,
  },

  conteudoProduto: {
    padding: 10,
  },

  nomeProduto: {
    color: "#460037",
    fontSize: 14,
    fontWeight: "bold",
    minHeight: 36,
  },

  categoriaProduto: {
    color: "#b45c88",
    fontSize: 11,
    marginTop: 3,
    fontWeight: "600",
  },

  descricaoProduto: {
    color: "#777777",
    fontSize: 11,
    marginTop: 7,
    minHeight: 43,
  },

  linhaPreco: {
    marginTop: 9,
    gap: 8,
  },

  preco: {
    color: "#790046",
    fontSize: 17,
    fontWeight: "bold",
  },

  botaoOpcoes: {
    backgroundColor: "#790046",
    borderRadius: 9,
    paddingVertical: 9,
    alignItems: "center",
  },

  textoBotaoOpcoes: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "bold",
  },

  semResultado: {
    alignItems: "center",
    paddingVertical: 35,
  },
  semResultadoEmoji: {
    fontSize: 40,
  },
  semResultadoTitulo: {
    color: "#460037",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
  },
  semResultadoTexto: {
    color: "#777777",
    fontSize: 12,
    textAlign: "center",
    marginTop: 7,
  },
  botaoLimpar: {
    backgroundColor: "#790046",
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
  },
  textoBotaoLimpar: {
    color: "#ffffff",
    fontWeight: "bold",
  },

  menuInferior: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "#f1dce6",
  },
  itemMenu: {
    alignItems: "center",
    flex: 1,
  },
  iconeMenu: {
    fontSize: 21,
  },
  textoMenu: {
    color: "#927889",
    fontSize: 10,
    marginTop: 4,
  },
  textoMenuAtivo: {
    color: "#790046",
    fontSize: 10,
    fontWeight: "bold",
    marginTop: 4,
  },
  fundoModal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  conteudoModal: {
    backgroundColor: "#fff8fb",
    padding: 22,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 35,
  },
  cabecalhoModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  tituloModal: {
    color: "#460037",
    fontSize: 21,
    fontWeight: "bold",
  },
  fecharModal: {
    color: "#790046",
    fontSize: 22,
    fontWeight: "bold",
  },
  tituloFiltro: {
    color: "#460037",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 5,
  },
  opcoesCategorias: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9,
    marginBottom: 22,
  },
  opcaoCategoria: {
    paddingVertical: 11,
    paddingHorizontal: 13,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ead3df",
  },
  opcaoSelecionada: {
    backgroundColor: "#790046",
    borderColor: "#790046",
  },
  textoOpcaoCategoria: {
    color: "#790046",
    fontSize: 12,
    fontWeight: "600",
  },
  textoOpcaoSelecionada: {
    color: "#ffffff",
  },
  opcaoOrdem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 13,
    borderRadius: 11,
    marginBottom: 8,
  },
  textoOrdem: {
    color: "#460037",
    fontSize: 13,
  },
  marcacao: {
    fontSize: 16,
  },
  botaoAplicar: {
    backgroundColor: "#790046",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 18,
  },
  textoBotaoAplicar: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 15,
  },
  botaoLimparModal: {
    alignItems: "center",
    padding: 12,
    marginTop: 5,
  },
  textoLimparModal: {
    color: "#790046",
    fontWeight: "bold",
    fontSize: 13,
  },
});
