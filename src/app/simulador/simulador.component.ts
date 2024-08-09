import { Component } from '@angular/core';
import { TaxaJurosService } from './../taxa-juros.service';

@Component({
  selector: 'app-simulador',
  templateUrl: './simulador.component.html',
  styleUrls: ['./simulador.component.css'],
})
export class SimuladorComponent {
  valorInvestimento: number = 1000; // Valor mínimo de investimento
  tempoInvestimento: number = 1; // Tempo mínimo de investimento (em meses)
  valorTotalPoupanca: number = 0;
  valorTotalLCI: number = 0;
  alturaLCI: number = 100;
  tempoInvestimentoDisplay: number = 1;
  tempoInvestimentoEmMeses: number = 1;

  constructor(private taxaJurosService: TaxaJurosService) {
    this.taxaJurosService.loadConfig().subscribe({
      next: () => {
        this.calcularRetorno(); // Calcular valores iniciais após carregar a configuração
      },
      error: (error) => {
        console.error('Erro ao carregar config:', error);
      },
    });
  }

  calcularRetorno() {
    const taxaPoupanca = this.taxaJurosService.getTaxaPoupanca();
    const taxaLCI = this.taxaJurosService.getTaxaLCI();

    if (this.tempoInvestimento > 11) {
      this.tempoInvestimentoDisplay = Math.floor(this.tempoInvestimento / 12); // Exibe em anos
      this.tempoInvestimentoEmMeses = this.tempoInvestimento; // Mantém o cálculo em meses
    } else {
      this.tempoInvestimentoDisplay = this.tempoInvestimento;
      this.tempoInvestimentoEmMeses = this.tempoInvestimento;
    }

    this.valorTotalPoupanca =
      this.valorInvestimento *
      Math.pow(1 + taxaPoupanca, this.tempoInvestimentoEmMeses);
    this.valorTotalLCI =
      this.valorInvestimento *
      Math.pow(1 + taxaLCI, this.tempoInvestimentoEmMeses);

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
}
