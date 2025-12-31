import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

export interface ProductHierarchy {
  [macroCategory: string]: {
    [category: string]: {
      [microCategory: string]: string[];
    };
  };
}

export interface CappingRule {
  level: string;
  name: string;
  displayName: string;
  threshold: number;
  priority: number;
  macroCategory?: string;
  category?: string;
  microCategory?: string;
  department?: string;
  createdAt: string;
}

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HierarchyService {
  private apiUrl = `${environment.apiUrl}/hierarchy`;


  hierarchy = signal<ProductHierarchy | null>(null);
  rules = signal<CappingRule[]>([]);

  constructor(private http: HttpClient) {
    this.loadRules();
  }

  fetchHierarchy() {
    return this.http.get<ProductHierarchy>(this.apiUrl).pipe(
      tap(data => this.hierarchy.set(data)),
      catchError(error => {
        console.error('Error fetching hierarchy:', error);
        // Fallback or error handling
        return of(null);
      })
    );
  }

  private loadRules() {
    const saved = localStorage.getItem('grocerAppState');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.rules) {
          this.rules.set(parsed.rules);
        }
      } catch (e) {
        console.error('Error loading rules from storage', e);
      }
    }
  }

  saveRules(rules: CappingRule[]) {
    this.rules.set(rules);
    localStorage.setItem('grocerAppState', JSON.stringify({ rules }));
  }

  addRule(rule: CappingRule) {
    const updated = [...this.rules(), rule];
    this.saveRules(updated);
  }

  deleteRule(createdAt: string) {
    const updated = this.rules().filter(r => r.createdAt !== createdAt);
    this.saveRules(updated);
  }
}
