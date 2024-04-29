import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user.model';
import { AuthService } from '../../../../services/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Clan, Discipline, Type } from '../../../../models/vtes.model';
import { IconService } from '../../../../services/icon.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomCardsService } from '../../../../services/custom-cards.service';

@Component({
  selector: 'app-upload-card',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './upload-card.component.html',
  styleUrl: './upload-card.component.scss',
})
export class UploadCardComponent implements OnInit {
  constructor(
    public authSvc: AuthService,
    public iconSvc: IconService,
    public dialog: MatDialog,
    public customCardSvc: CustomCardsService
  ) {}

  updateCardForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    author: new FormControl(''),
    disciplines: new FormControl([]),
    clan: new FormControl('not defined'),
    capacity: new FormControl('1'),
    group: new FormControl('not defined'),
    type: new FormControl('not defined'),
    isPublic: new FormControl('true'),
    description: new FormControl('not defined'),
    image: new FormControl(''),
  });

  public searchGroup: string = '';
  public searchClan: string = '';
  public searchCapacity = null;
  public selectedTypes: Type[] = [];
  public disciplineImages = this.iconSvc.disciplineImages;
  public disciplineSelected: { [key: string]: boolean } = {};
  public clanImages = this.iconSvc.clanImages;


  public types = Object.values(Type);
  public clans = Object.values(Clan);

  user: User[] = [];
  public selectedDisciplines: Discipline[] = [];

  getCurrentUser(): User | null {
    return this.authSvc.getCurrentUser();
  }

  toggleOpacity(event: MouseEvent): void {
    const target = event.target as HTMLImageElement;
    if (target.classList.contains('icon-filter')) {
      target.classList.toggle('clicked');
      this.updateDisciplineSelection(target.alt as Discipline);
    }
  }

  updateDisciplineSelection(discipline: Discipline): void {
    this.updateCardForm.value.disciplines[discipline] = !this.updateCardForm.value.disciplines[discipline];
    this.onDisciplinesChange();
  }

  onDisciplinesChange(): void {
    this.selectedDisciplines = Object.keys(this.updateCardForm.value.disciplines)
      .filter(discipline => this.updateCardForm.value.disciplines[discipline as Discipline])
      .map(discipline => discipline as Discipline);
  }

  getClanUrl(clanName: Clan): string {
    const clan = this.clanImages.find(item => item.name.replace(/\s/g, '') === clanName.replace(/\s/g, ''));
    return clan ? clan.url : '';
  }

  uploadCard(): void {
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.clanImages = this.clans.map(clan => ({
      name: clan,
      url: `https://static.krcg.org/svg/clan/${clan.toLowerCase().replace(/\s/g, '')}.svg`
    }));

  }
}
