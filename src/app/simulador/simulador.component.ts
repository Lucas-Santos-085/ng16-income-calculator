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
    const taxaPoupanca = 0.007;
    const taxaLCI = 0.01;

    const meses = this.tempoInvestimento;

    this.valorTotalPoupanca =
      this.valorInvestimento * Math.pow(1 + taxaPoupanca, meses);
    this.valorTotalLCI = this.valorInvestimento * Math.pow(1 + taxaLCI, meses);

    const retornoPoupanca = this.valorTotalPoupanca;
    const retornoLCI = this.valorTotalLCI;

    const alturaBase = 100;
    const maxAlturaLCI = 200;

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
