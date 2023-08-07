import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  getHeroes(): Observable<Hero[]> {
    const heroes = this.httpClient.get<Hero[]>(`http://127.0.0.1:5000/heroes`);
    this.messageService.add('HeroService: fetched heroes')
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    const hero = this.httpClient.get<Hero>(`http://127.0.0.1:5000/details/${id.toString()}`);
    this.messageService.add(`HeroService: fetched hero id=${id}`)
    return hero.pipe(
        // If the status code is 400, return an error
        catchError((error: HttpErrorResponse) => {
            if (error.status === 400) {
                this.messageService.add(`HeroService: HERO DOES NOT EXIST`)
                throw new Error ('Bad request');
            } else {
                throw error;
            }
        })
    );
  }

  updateHero(id: number, hero: Hero): Observable<Hero> {
    this.messageService.add(`HeroService: updating hero`)
    return this.httpClient.put<Hero>(`http://127.0.0.1:5000/details/${id.toString()}`, hero);
  }

  addHero(hero: Hero): Observable<Hero> {
    this.messageService.add(`HeroService: adding hero, refreshing`)
    return this.httpClient.post<Hero>(`http://127.0.0.1:5000/heroes`, hero)
  }

  deleteHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: deleting hero, refreshing`)
    return this.httpClient.delete<Hero>(`http://127.0.0.1:5000/delete/${id.toString()}`)
  }

  searchHero(term: string): Observable<Hero[]> {
    this.messageService.add(`HeroService: searching hero, refreshing`)
    if (!term.trim()) {
      return of([]);
    }
    return this.httpClient.get<Hero[]>(`http://127.0.0.1:5000/heroes/?name=${term.toString()}`)
  }

  constructor(private messageService: MessageService, private httpClient: HttpClient) { }
}
