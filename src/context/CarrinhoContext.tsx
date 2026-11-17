import { createContext, ReactNode, useContext, useState } from "react";

type Adicional = {
  nome: string;
  preco: number;
};

type Personalizacao = {
  leite: string;
  adicionais: Adicional[];
  retirar: string[];
  observacao: string;
};

type ProdutoCarrinho = {
  id: number;
  nome: string;
  preco: number;
  imagem: any;
  personalizacao: Personalizacao;
  precoUnitario: number;
};

type ItemCarrinho = ProdutoCarrinho & {
  itemId: string;
  quantidade: number;
};

type Pedido = {
  id: string;
  itens: ItemCarrinho[];
  total: number;
  pagamento: string;
  data: string;
  status: string;
};

type CarrinhoContextType = {
  itens: ItemCarrinho[];
  pedidos: Pedido[];
  adicionar: (produto: ProdutoCarrinho) => void;
  aumentar: (itemId: string) => void;
  diminuir: (itemId: string) => void;
  remover: (itemId: string) => void;
  limpar: () => void;
  registrarPedido: (pagamento: string) => void;
  total: number;
};

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(
  undefined,
);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  function adicionar(produto: ProdutoCarrinho) {
    const novoItem: ItemCarrinho = {
      ...produto,
      itemId: `${produto.id}-${Date.now()}-${Math.random()}`,
      quantidade: 1,
    };

    setItens((listaAtual) => [...listaAtual, novoItem]);
  }

  function aumentar(itemId: string) {
    setItens((listaAtual) =>
      listaAtual.map((item) =>
        item.itemId === itemId
          ? { ...item, quantidade: item.quantidade + 1 }
          : item,
      ),
    );
  }

  function diminuir(itemId: string) {
    setItens((listaAtual) =>
      listaAtual
        .map((item) =>
          item.itemId === itemId
            ? { ...item, quantidade: item.quantidade - 1 }
            : item,
        )
        .filter((item) => item.quantidade > 0),
    );
  }

  function remover(itemId: string) {
    setItens((listaAtual) =>
      listaAtual.filter((item) => item.itemId !== itemId),
    );
  }

  function limpar() {
    setItens([]);
  }

  function registrarPedido(pagamento: string) {
    if (itens.length === 0) return;

    const novoPedido: Pedido = {
      id: `PED-${Date.now()}`,
      itens: itens.map((item) => ({
        ...item,
        personalizacao: {
          ...item.personalizacao,
          adicionais: [...item.personalizacao.adicionais],
          retirar: [...item.personalizacao.retirar],
        },
      })),
      total,
      pagamento,
      data: new Date().toLocaleString("pt-BR"),
      status: "Confirmado",
    };

    setPedidos((listaAtual) => [novoPedido, ...listaAtual]);
    setItens([]);
  }

  const total = itens.reduce(
    (soma, item) => soma + item.precoUnitario * item.quantidade,
    0,
  );

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        pedidos,
        adicionar,
        aumentar,
        diminuir,
        remover,
        limpar,
        registrarPedido,
        total,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const contexto = useContext(CarrinhoContext);

  if (!contexto) {
    throw new Error(
      "useCarrinho precisa ser usado dentro de CarrinhoProvider.",
    );
  }

  return contexto;
}
