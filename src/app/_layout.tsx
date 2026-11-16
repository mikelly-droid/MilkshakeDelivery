import { Stack } from "expo-router";
import { CarrinhoProvider } from "../context/CarrinhoContext";

export default function RootLayout() {
  return (
    <CarrinhoProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="menu" />
        <Stack.Screen name="carrinho" />
      </Stack>
    </CarrinhoProvider>
  );
}
