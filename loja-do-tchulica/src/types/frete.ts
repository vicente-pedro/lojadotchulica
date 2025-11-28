export interface FreteParams {
  sCepOrigem: string;
  sCepDestino: string;
  nVlPeso: string;
  nCdFormato?: string;
  nVlComprimento?: string;
  nVlAltura?: string;
  nVlLargura?: string;
  nVlDiametro?: string;
  nCdServico: string[];
  nVlValorDeclarado?: string;
}

export interface FreteResponse {
  Codigo: string;
  Valor: string;
  PrazoEntrega: string;
}
