import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user.model';
import { AuthService } from '../../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Clan, Discipline, Type } from '../../../../models/vtes.model';
import { IconService } from '../../../../services/icon.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-card',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './upload-card.component.html',
  styleUrl: './upload-card.component.scss',
})
export class UploadCardComponent implements OnInit {
  constructor(
    public authSvc: AuthService,
    public iconSvc: IconService,
    public dialog: MatDialog,

  ) {}

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
    this.disciplineSelected[discipline] = !this.disciplineSelected[discipline];
    this.onDisciplinesChange();
  }

  onDisciplinesChange(): void {
    this.selectedDisciplines = Object.keys(this.disciplineSelected)
      .filter(discipline => this.disciplineSelected[discipline as Discipline])
      .map(discipline => discipline as Discipline);
  }

  getClanUrl(clanName: Clan): string {
    const clan = this.clanImages.find(item => item.name.replace(/\s/g, '') === clanName.replace(/\s/g, ''));
    return clan ? clan.url : '';
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.clanImages = this.clans.map(clan => ({
      name: clan,
      url: `https://static.krcg.org/svg/clan/${clan.toLowerCase().replace(/\s/g, '')}.svg`
    }));
  }
}
