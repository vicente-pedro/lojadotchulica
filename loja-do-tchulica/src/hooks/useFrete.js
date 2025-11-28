export function useFrete() {
  const calcularFrete = async (cepDestino) => {
    try {
      const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cepDestino}`);

      if (!response.ok) {
        throw new Error("CEP inválido");
      }

      const data = await response.json();

      if (!data.state) {
        throw new Error("CEP inválido");
      }

      const estado = data.state.toUpperCase();
      let valor = 0;
      let prazo = 0;

      if (estado === "SP") {
        valor = 12;
        prazo = 3;
      } else if (["RJ", "MG", "PR"].includes(estado)) {
        valor = 18;
        prazo = 5;
      } else {
        valor = 24;
        prazo = 8;
      }

      return {
        valor: valor.toFixed(2).replace(".", ","),
        prazo
      };
    } catch (error) {
      console.error("Erro ao calcular frete:", error);
      return { valor: null, prazo: null };
    }
  };

  return { calcularFrete };
}
