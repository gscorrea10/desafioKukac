export interface Veiculo {
  modelo: string
  anoDeFabricacao: number
  marca: string
  quantidadeDePortas?: number
}

export class Carro implements Veiculo {
  modelo: string
  anoDeFabricacao: number
  marca: string
  quantidadeDePortas: number

  constructor (modelo: string, anoDeFabricacao: number, marca: string, quantidadeDePortas: number) {
    this.modelo = modelo
    this.anoDeFabricacao = anoDeFabricacao
    this.marca = marca
    this.quantidadeDePortas = quantidadeDePortas
  }
}

export class Moto implements Veiculo {
  modelo: string
  anoDeFabricacao: number
  marca: string
  passageiros: number
  rodas!: 2

  constructor (modelo: string, anoDeFabricacao: number, marca: string, passageiros: number) {
    this.modelo = modelo
    this.anoDeFabricacao = anoDeFabricacao
    this.marca = marca
    this.passageiros = passageiros
  }
}
