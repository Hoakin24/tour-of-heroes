import { Component } from '@angular/core';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({name} as Hero).subscribe();
    this.messageService.add(`HeroComponent: added hero, refreshing`)
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero.id).subscribe();
    this.messageService.add(`HeroComponent: deleted hero, refreshing`)
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}
