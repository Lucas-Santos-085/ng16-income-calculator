import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaxaJurosService {
  private configUrl = 'assets/config.json';
  private taxaPoupanca!: number;
  private taxaLCI!: number;

  constructor(private http: HttpClient) {
    this.loadConfig().subscribe();
  }

  loadConfig(): Observable<void> {
    return new Observable<void>((observer) => {
      this.http.get(this.configUrl).subscribe({
        next: (config: any) => {
          this.taxaPoupanca = config.taxaPoupanca;
          this.taxaLCI = config.taxaLCI;
          console.log('Config carregado:', config); // Log para depuração
          observer.next();
        },
        error: (error) => {
          console.error('Erro ao carregar config:', error); // Log de erro
          observer.error(error);
        },
        complete: () => {
          observer.complete();
        },
      });
    });
  }

  getTaxaPoupanca(): number {
    return this.taxaPoupanca;
  }

  getTaxaLCI(): number {
    return this.taxaLCI;
  }
}
