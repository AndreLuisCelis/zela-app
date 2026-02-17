import { Injectable, signal, computed, inject, Resource } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Reports } from "../models/report.interface";
import { SponsorOption } from "../models/sponsor-option.interface";
import { AuthService } from "./auth";
import { firstValueFrom, tap } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class ZelaService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = `${environment.apiUrl}/reports`;

  private _reports = signal<Reports[]>([]);
  reports = computed(() => this._reports());

  constructor() {
    this.loadReports();
  }

  async loadReports() {
    try {
      const reports = await firstValueFrom(this.http.get<Reports[]>(this.apiUrl));
      this._reports.set(reports);
    } catch (error) {
      console.error('Erro ao carregar reports:', error);
    }
  }

  async addReport(data: Partial<Reports>) {
    try {
      const newReport = await firstValueFrom(this.http.post<Reports>(this.apiUrl, data));
      this._reports.update(list => [newReport, ...list]);
      return newReport;
    } catch (error) {
      console.error('Erro ao adicionar report:', error);
      throw error;
    }
  }

  async addSupport(id: string) {
    try {
      await firstValueFrom(this.http.patch(`${this.apiUrl}/${id}/support`, {}));
      this._reports.update(list =>
        list.map(r => r._id === id ? { ...r, supportCount: r.supportCount + 1 } : r)
      );
    } catch (error) {
      console.error('Erro ao apoiar report:', error);
    }
  }

  async patrocinar(reportId: string, option: SponsorOption) {
    const user = this.authService.currentUserValue;
    if (!user || user.balance < option.cost) return false;

    try {
      const response = await firstValueFrom(
        this.http.patch<{ message: string, report: Reports, balance: number }>(
          `${this.apiUrl}/${reportId}/sponsor`,
          { option }
        )
      );

      if (response && response.report) {
        this._reports.update(list =>
          list.map(r => r._id === reportId ? response.report : r)
        );

        // Atualizar saldo do usuário
        this.authService.updateUser({
          ...user,
          balance: response.balance
        });

        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao patrocinar report:', error);
      return false;
    }
  }
}
