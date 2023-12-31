import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {
  @Input() hero?: Hero;

  constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location, private messageService: MessageService) { }

  ngOnInit() {
    this.getHero()
  }

  getHero(): void { 
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.heroService.updateHero(id, this.hero).subscribe();
      this.messageService.add(`HeroDetailComponent: updated hero`)
    }
  }
}
