import { Component } from '@angular/core';

@Component({
  selector: 'app-simulador',
  templateUrl: './simulador.component.html',
  styleUrls: ['./simulador.component.css'],
})
export class SimuladorComponent {
  valorInvestimento: number = 1; // O valor do slider começa em 1 para mapear para 100
  tempoInvestimento: number = 1;
  valorTotalPoupanca: number = 0;
  valorTotalLCI: number = 0;
  alturaLCI: number = 100;
  tempoInvestimentoExibido: string = '1 mês';

  constructor() {
    this.calcularRetorno();
  }

  calcularRetorno() {
    const taxaPoupanca = 0.007;
    const taxaLCI = 0.01;

    const meses = this.converterSliderParaMeses(this.tempoInvestimento);
    const valorInvestimentoReal = this.converterSliderParaValor(
      this.valorInvestimento
    );

    this.valorTotalPoupanca =
      valorInvestimentoReal * Math.pow(1 + taxaPoupanca, meses);
    this.valorTotalLCI = valorInvestimentoReal * Math.pow(1 + taxaLCI, meses);

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

    this.atualizarTempoInvestimentoExibido(meses);
  }

  converterSliderParaMeses(sliderValue: number): number {
    switch (sliderValue) {
      case 1:
        return 1; // 1 mês
      case 2:
        return 3; // 3 meses
      case 3:
        return 6; // 6 meses
      case 4:
        return 9; // 9 meses
      case 15:
        return 120; // 10 anos
      case 16:
        return 240; // 20 anos
      default:
        return (sliderValue - 4) * 12; // 1 a 9 anos (sliderValue 5 a 14)
    }
  }

  converterSliderParaValor(sliderValue: number): number {
    if (sliderValue === 1) {
      return 30; // Inicialmente 30
    } else if (sliderValue === 2) {
      return 100; // Depois 100
    } else if (sliderValue <= 11) {
      return 100 + (sliderValue - 2) * 100; // 200 to 1000
    } else if (sliderValue <= 20) {
      return 1000 + (sliderValue - 11) * 1000; // 2000 to 10000
    } else {
      return 10000 + (sliderValue - 20) * 10000; // 20000 and beyond
    }
  }

  atualizarTempoInvestimentoExibido(meses: number) {
    switch (meses) {
      case 1:
        this.tempoInvestimentoExibido = `1 mês`;
        break;
      case 3:
        this.tempoInvestimentoExibido = `3 meses`;
        break;
      case 6:
        this.tempoInvestimentoExibido = `6 meses`;
        break;
      case 9:
        this.tempoInvestimentoExibido = `9 meses`;
        break;
      case 120:
        this.tempoInvestimentoExibido = `10 anos`;
        break;
      case 240:
        this.tempoInvestimentoExibido = `20 anos`;
        break;
      default:
        const anos = meses / 12;
        this.tempoInvestimentoExibido = `${anos} ano(s)`;
    }
  }
}
