import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Sexo {
 codsexo?: number;
 nomesexo: string;
}

@Injectable({
 providedIn: 'root'
})
export class SexoService {
 private apiUrl = 'http://localhost:8081/sexos';
 constructor(private http: HttpClient) { }
 getSexos(): Observable<Sexo[]> {
 return this.http.get<Sexo[]>(this.apiUrl);
 }
 getSexo(id: number): Observable<Sexo> {
 return this.http.get<Sexo>(`${this.apiUrl}/${id}`);
 }
 createSexo(sexo: Sexo): Observable<Sexo> {
 return this.http.post<Sexo>(this.apiUrl, sexo);
 }
 updateSexo(id: number, sexo: Sexo): Observable<Sexo> {
 return this.http.put<Sexo>(`${this.apiUrl}/${id}`, sexo);
 }
 deleteSexo(id: number): Observable<void> {
 return this.http.delete<void>(`${this.apiUrl}/${id}`);
 }
}