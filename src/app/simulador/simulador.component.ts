import { Component } from '@angular/core';

@Component({
  selector: 'app-simulador',
  templateUrl: './simulador.component.html',
  styleUrls: ['./simulador.component.css'],
})
export class SimuladorComponent {
  valorInvestimento: number = 1000;
  tempoInvestimento: number = 1;
  valorTotalPoupanca: number = 0;
  valorTotalLCI: number = 0;
  alturaLCI: number = 100;

  constructor() {
    this.calcularRetorno();
  }

  calcularRetorno() {
    const taxaPoupanca = 0.007; // 0.7% ao mês
    const taxaLCI = 0.01; // 1% ao mês

    const meses = this.tempoInvestimento;

    // Calculo do valor total investido + retorno com juros compostos
    this.valorTotalPoupanca =
      this.valorInvestimento * Math.pow(1 + taxaPoupanca, meses);
    this.valorTotalLCI = this.valorInvestimento * Math.pow(1 + taxaLCI, meses);

    const retornoPoupanca = this.valorTotalPoupanca - this.valorInvestimento;
    const retornoLCI = this.valorTotalLCI - this.valorInvestimento;

    const alturaBase = 100; // Altura fixa da barra da poupança
    const maxAlturaLCI = 400; // Altura máxima da barra do LCI

    if (retornoLCI === retornoPoupanca) {
      this.alturaLCI = alturaBase;
    } else {
      const escala = retornoLCI / retornoPoupanca;
      this.alturaLCI = Math.min(escala * alturaBase, maxAlturaLCI);
    }
  }

  ngOnChanges() {
    this.calcularRetorno();
  }
}
