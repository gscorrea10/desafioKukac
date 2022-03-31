import fs from 'fs'
import promptSync from 'prompt-sync'

import { Veiculo, Carro, Moto } from './veiculo'

const prompt = promptSync({ sigint: true })

const criarVeiculo = (): Veiculo | void  => {
  const tipo = prompt('Informe o tipo do seu veiculo (C para carro | M para moto): ')
  const modelo = prompt('Informe o modelo do seu veiculo: ')
  const anoDeFabricacao = prompt('Informe o ano de fabricação do seu veiculo: ')
  const marca = prompt('Informe a marca do seu veiculo: ')
  
  if (tipo === 'C') {
    const quantidadeDePortas = prompt('Informe a quantidade de portas do seu veiculo (2 ou 4): ')
    const carro = new Carro(modelo, Number(anoDeFabricacao), marca, Number(quantidadeDePortas))
    return carro
  }

  if (tipo === 'M') {
    const quantidadeDePassageiros = prompt('Informe a quantidade de passageiros (1 ou 2): ')
    const moto = new Moto(modelo, Number(anoDeFabricacao), marca, Number(quantidadeDePassageiros))
    return moto
  }
}

const veiculo = criarVeiculo()

fs.writeFile('veiculo.json', JSON.stringify(veiculo, undefined, 2), 'utf-8', (err) => {
  if (err) throw err
  console.log('Veiculo salvo')
})
