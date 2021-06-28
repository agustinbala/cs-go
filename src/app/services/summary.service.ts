import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { CONFIG } from "./config";
import { ExpensesResponse } from "./response/expenses-response";
import { InventoryResponse } from "./response/inventory-response";

@Injectable({
  providedIn: "root",
})
export class SummaryService {
  constructor(private http: HttpClient) {}

  async getInventoryValue(): Promise<InventoryResponse> {
    const url = environment.csmoneyUrl;
    return this.http.get<InventoryResponse>(url).toPromise();
  }

  async getLast(): Promise<ExpensesResponse> {
    const url = environment.api + "/expenses/last";
    return this.http.get<ExpensesResponse>(url).toPromise();
  }
}
