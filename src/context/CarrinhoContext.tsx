import { createContext, ReactNode, useContext, useState } from "react";

type ProdutoCarrinho = {
  id: number;
  nome: string;
  preco: number;
  imagem: any;
};
type ItemCarrinho = ProdutoCarrinho & {
  quantidade: number;
};
type CarrinhoContextType = {
  itens: ItemCarrinho[];
  adicionar: (produto: ProdutoCarrinho) => void;
  diminuir: (id: number) => void;
  remover: (id: number) => void;
  limpar: () => void;
  total: number;
};
const CarrinhoContext = createContext<CarrinhoContextType | undefined>(
  undefined,
);
export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  function adicionar(produto: ProdutoCarrinho) {
    setItens((listaAtual) => {
      const jaExiste = listaAtual.find((item) => item.id === produto.id);

      if (jaExiste) {
        return listaAtual.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item,
        );
      }

      return [...listaAtual, { ...produto, quantidade: 1 }];
    });
  }

  function diminuir(id: number) {
    setItens((listaAtual) =>
      listaAtual
        .map((item) =>
          item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item,
        )
        .filter((item) => item.quantidade > 0),
    );
  }

  function remover(id: number) {
    setItens((listaAtual) => listaAtual.filter((item) => item.id !== id));
  }

  function limpar() {
    setItens([]);
  }

  const total = itens.reduce(
    (soma, item) => soma + item.preco * item.quantidade,
    0,
  );

  return (
    <CarrinhoContext.Provider
      value={{ itens, adicionar, diminuir, remover, limpar, total }}
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
