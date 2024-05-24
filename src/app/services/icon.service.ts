//src/app/services/icon.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icon } from '../models/icon.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  constructor(
    private http: HttpClient
  ) {}

  private apiUrl = environment.apiUrl + '/uploads/icons' || 'https://localhost/icon';

  createIcon(icon: Icon):Observable<Icon>{
    return this.http.post<Icon>(`${this.apiUrl}/create`, icon);
  }

  getIcons(): Observable<Icon[]> {
    return this.http.get<Icon[]>(`${this.apiUrl}`);
  }

  getIconsByType(type: string, name:string): Observable<Icon[]> {
    return this.http.get<Icon[]>(`${this.apiUrl}/${type}/${name}`);
  }

  getIconsByName(name: string): Observable<Icon[]> {
    return this.http.get<Icon[]>(`${this.apiUrl}/getIconByName/${name}`);
  }

  /*----------------------------------------------------------------------------------------------------------------------------------------------------*/

  getCapacityCostImage(capacityCost: number | undefined): any {
    if (capacityCost) {
      switch (capacityCost) {
        case 1:
          return '/assets/img/icons-vtes/others/capacity/capacity.png';
        case 2:
          return '/assets/img/icons-vtes/others/capacity/capacity2.png';
        case 3:
          return '/assets/img/icons-vtes/others/capacity/capacity3.png';
        case 4:
          return '/assets/img/icons-vtes/others/capacity/capacity4.png';
        case 5:
          return '/assets/img/icons-vtes/others/capacity/capacity5.png';
        case 6:
          return '/assets/img/icons-vtes/others/capacity/capacity6.png';
        case 7:
          return '/assets/img/icons-vtes/others/capacity/capacity7.png';
        case 8:
          return '/assets/img/icons-vtes/others/capacity/capacity8.png';
        case 9:
          return '/assets/img/icons-vtes/others/capacity/capacity9.png';
        case 10:
          return '/assets/img/icons-vtes/others/capacity/capacity10.png';
        case 11:
          return '/assets/img/icons-vtes/others/capacity/capacity11.png';
        default:
          return '';
      }
    } else {
      return '';
    }
  }

  getBloodCostImage(bloodCost: string | undefined): string {
    if (bloodCost) {
      switch (bloodCost) {
        case '1':
          return '/assets/img/icons-vtes/others/costBlood-1.png';
        case '2':
          return '/assets/img/icons-vtes/others/costBlood-2.png';
        case '3':
          return '/assets/img/icons-vtes/others/costBlood-3.png';
        case '4':
          return '/assets/img/icons-vtes/others/costBlood-4.png';
        default:
          return '';
      }
    } else {
      return '';
    }
  }

  getPoolCostImage(poolCost: string | undefined): string {
    if (poolCost) {
      switch (poolCost) {
        case '1':
          return 'https://static.krcg.org/svg/icon/pool1.svg';
        case '2':
          return 'https://static.krcg.org/svg/icon/pool2.svg';
        case '3':
          return 'https://static.krcg.org/svg/icon/pool3.svg';
        case '4':
          return 'https://static.krcg.org/svg/icon/pool4.svg';
        case '5':
          return 'https://static.krcg.org/svg/icon/pool5.svg';
        case '6':
          return 'https://static.krcg.org/svg/icon/pool6.svg';
        default:
          return '';
      }
    } else {
      return '';
    }
  }

  disciplineImages = [
    {name: 'abo',type: 'inf',url: 'https://static.krcg.org/svg/disc/inf/abo.svg',},
    {name: 'ani',type: 'inf',url: 'https://static.krcg.org/svg/disc/inf/ani.svg',},
    {name: 'aus',type: 'inf',url: 'https://static.krcg.org/svg/disc/inf/aus.svg',},
    {name: 'tha',type: 'inf',url: 'https://static.krcg.org/svg/disc/inf/tha.svg',},
    {name: 'cel',type: 'inf',url: 'https://static.krcg.org/svg/disc/inf/cel.svg',},
    {name: 'chi',type: 'inf',url: 'https://static.krcg.org/svg/disc/inf/chi.svg',},
    {name: 'dai',type: 'inf',url: 'https://static.krcg.org/svg/disc/inf/dai.svg',},
    {name: 'dem',type: 'inf',url: 'https://static.krcg.org/svg/disc/inf/dem.svg',},
    {name: 'dom',type: 'inf',url: 'https://static.krcg.org/svg/disc/inf/dom.svg',},
    {name: 'for',type: 'inf',url: 'https://static.krcg.org/svg/disc/inf/for.svg',},
    {name: 'mel',type: 'inf',url: 'https://static.krcg.org/svg/disc/inf/mel.svg',},
    {name: 'myt',type: 'inf',url: 'https://static.krcg.org/svg/disc/inf/myt.svg',},
    {name: 'nec',type: 'inf',url: 'https://static.krcg.org/svg/disc/inf/nec.svg',},
    {name: 'obe',type: 'inf',url: 'https://static.krcg.org/svg/disc/inf/obe.svg',},
    {name: 'obf',type: 'inf',url: 'https://static.krcg.org/svg/disc/inf/obf.svg',},
    {name: 'obt',type: 'inf',url: 'https://static.krcg.org/svg/disc/inf/obt.svg',},
    {name: 'pot',type: 'inf',url: 'https://static.krcg.org/svg/disc/inf/pot.svg',},
    {name: 'pre',type: 'inf',url: 'https://static.krcg.org/svg/disc/inf/pre.svg',},
    {name: 'pro',type: 'inf',url: 'https://static.krcg.org/svg/disc/inf/pro.svg',},
    {name: 'qui',type: 'inf',url: 'https://static.krcg.org/svg/disc/inf/qui.svg',},
    {name: 'san',type: 'inf',url: 'https://static.krcg.org/svg/disc/inf/san.svg',},
    {name: 'ser',type: 'inf',url: 'https://static.krcg.org/svg/disc/inf/ser.svg',},
    {name: 'spi',type: 'inf',url: 'https://static.krcg.org/svg/disc/inf/spi.svg',},
    {name: 'tem',type: 'inf',url: 'https://static.krcg.org/svg/disc/inf/tem.svg',},
    {name: 'thn',type: 'inf',url: 'https://static.krcg.org/svg/disc/inf/thn.svg',},
    {name: 'val',type: 'inf',url: 'https://static.krcg.org/svg/disc/inf/val.svg',},
    {name: 'vic',type: 'inf',url: 'https://static.krcg.org/svg/disc/inf/vic.svg',},
    {name: 'vis',type: 'inf',url: 'https://static.krcg.org/svg/disc/inf/vis.svg',},

    {name: 'def',type: 'others',url: 'https://static.krcg.org/svg/disc/inf/def.svg',},
    {name: 'inn',type: 'others',url: 'https://static.krcg.org/svg/disc/inf/inn.svg',},
    {name: 'jus',type: 'others',url: 'https://static.krcg.org/svg/disc/inf/jus.svg',},
    {name: 'mar',type: 'others',url: 'https://static.krcg.org/svg/disc/inf/mar.svg',},
    {name: 'red',type: 'others',url: 'https://static.krcg.org/svg/disc/inf/red.svg',},
    {name: 'vin',type: 'others',url: 'https://static.krcg.org/svg/disc/inf/vin.svg',},
    {name: 'ven',type: 'others',url: 'https://static.krcg.org/svg/disc/inf/ven.svg',},

    // {name: 'fli',type: 'others',url: 'https://static.krcg.org/svg/disc/inf/flight.svg',},
    // {name: 'mal',type: 'others',url: 'https://static.krcg.org/svg/disc/inf/mal.svg',},
    // {name: 'str',type: 'others',url: 'https://static.krcg.org/svg/disc/inf/str.svg',},

    {name: 'ABO',type: 'sup',url: 'https://static.krcg.org/svg/disc/sup/abo.svg',},
    {name: 'ANI',type: 'sup',url: 'https://static.krcg.org/svg/disc/sup/ani.svg',},
    {name: 'AUS',type: 'sup',url: 'https://static.krcg.org/svg/disc/sup/aus.svg',},
    {name: 'THA',type: 'sup',url: 'https://static.krcg.org/svg/disc/sup/tha.svg',},
    {name: 'CEL',type: 'sup',url: 'https://static.krcg.org/svg/disc/sup/cel.svg',},
    {name: 'CHI',type: 'sup',url: 'https://static.krcg.org/svg/disc/sup/chi.svg',},
    {name: 'DAI',type: 'sup',url: 'https://static.krcg.org/svg/disc/sup/dai.svg',},
    {name: 'DEM',type: 'sup',url: 'https://static.krcg.org/svg/disc/sup/dem.svg',},
    {name: 'DOM',type: 'sup',url: 'https://static.krcg.org/svg/disc/sup/dom.svg',},
    {name: 'FOR',type: 'sup',url: 'https://static.krcg.org/svg/disc/sup/for.svg',},
    {name: 'MEL',type: 'sup',url: 'https://static.krcg.org/svg/disc/sup/mel.svg',},
    {name: 'MYT',type: 'sup',url: 'https://static.krcg.org/svg/disc/sup/myt.svg',},
    {name: 'NEC',type: 'sup',url: 'https://static.krcg.org/svg/disc/sup/nec.svg',},
    {name: 'OBE',type: 'sup',url: 'https://static.krcg.org/svg/disc/sup/obe.svg',},
    {name: 'OBF',type: 'sup',url: 'https://static.krcg.org/svg/disc/sup/obf.svg',},
    {name: 'OBT',type: 'sup',url: 'https://static.krcg.org/svg/disc/sup/obt.svg',},
    {name: 'POT',type: 'sup',url: 'https://static.krcg.org/svg/disc/sup/pot.svg',},
    {name: 'PRE',type: 'sup',url: 'https://static.krcg.org/svg/disc/sup/pre.svg',},
    {name: 'PRO',type: 'sup',url: 'https://static.krcg.org/svg/disc/sup/pro.svg',},
    {name: 'QUI',type: 'sup',url: 'https://static.krcg.org/svg/disc/sup/qui.svg',},
    {name: 'SAN',type: 'sup',url: 'https://static.krcg.org/svg/disc/sup/san.svg',},
    {name: 'SER',type: 'sup',url: 'https://static.krcg.org/svg/disc/sup/ser.svg',},
    {name: 'SPI',type: 'sup',url: 'https://static.krcg.org/svg/disc/sup/spi.svg',},
    {name: 'TEM',type: 'sup',url: 'https://static.krcg.org/svg/disc/sup/tem.svg',},
    {name: 'THN',type: 'sup',url: 'https://static.krcg.org/svg/disc/sup/thn.svg',},
    {name: 'VAL',type: 'sup',url: 'https://static.krcg.org/svg/disc/sup/val.svg',},
    {name: 'VIC',type: 'sup',url: 'https://static.krcg.org/svg/disc/sup/vic.svg',},
    {name: 'VIS',type: 'sup',url: 'https://static.krcg.org/svg/disc/sup/vis.svg',},
  ];

  disciplinesNames = [
    { name: 'abombwe' },
    { name: 'animalism' },
    { name: 'auspex' },
    { name: 'bloodsorcery' },
    { name: 'celerity' },
    { name: 'chimerstry' },
    { name: 'daimoinon' },
    { name: 'dementation' },
    { name: 'dominate' },
    { name: 'fortitude' },
    { name: 'melpominee' },
    { name: 'mytherceria' },
    { name: 'necromancy' },
    { name: 'obeah' },
    { name: 'obfuscate' },
    { name: 'obtenebration' },
    { name: 'potence' },
    { name: 'presence' },
    { name: 'protean' },
    { name: 'quietus' },
    { name: 'sanguinus' },
    { name: 'serpentis' },
    { name: 'spiritus' },
    { name: 'temporis' },
    { name: 'thanatosis' },
    { name: 'valeren' },
    { name: 'vicissitude' },
    { name: 'visceratika' },
    { name: 'defense' },
    { name: 'innocence' },
    { name: 'judgment' },
    { name: 'martyrdom' },
    { name: 'redemption' },
    { name: 'vision' },
    { name: 'vengeance' },
  ];
  
  clanImages = [
  {name: 'abominations', url: 'https://static.krcg.org/svg/clan/abominations.svg'},
  {name: 'ahrimanes', url: 'https://static.krcg.org/svg/clan/ahrimanes.svg'},
  {name: 'akunanse', url: 'https://static.krcg.org/svg/clan/akunanse.svg'},
  {name: 'avenger', url: 'https://static.krcg.org/svg/clan/avenger.svg'},
  {name: 'baali', url: 'https://static.krcg.org/svg/clan/baali.svg'},
  {name: 'banuhaqim', url: 'https://static.krcg.org/svg/clan/banuhaqim.svg'},
  {name: 'bloodbrother', url: 'https://static.krcg.org/svg/clan/bloodbrother.svg'},
  {name: 'brujah', url: 'https://static.krcg.org/svg/clan/brujah.svg'},
  {name: 'brujahantitribu', url: 'https://static.krcg.org/svg/clan/brujahantitribu.svg'},
  {name: 'caitiff      ', url: 'https://static.krcg.org/svg/clan/caitiff.svg'},
  {name: 'daughtersofcacophony', url: 'https://static.krcg.org/svg/clan/daughtersofcacophony.svg'},
  {name: 'defender', url: 'https://static.krcg.org/svg/clan/defender.svg'},
  {name: 'gangrel', url: 'https://static.krcg.org/svg/clan/gangrel.svg'},
  {name: 'gangrelantitribu', url: 'https://static.krcg.org/svg/clan/gangrelantitribu.svg'},
  {name: 'gargoyles', url: 'https://static.krcg.org/svg/clan/gargoyles.svg'},
  {name: 'giovanni', url: 'https://static.krcg.org/svg/clan/giovanni.svg'},
  {name: 'guruhi', url: 'https://static.krcg.org/svg/clan/guruhi.svg'},
  {name: 'Harbingers of Skulls', url: 'https://static.krcg.org/svg/clan/harbingersofskulls.svg'},
  {name: 'innocent', url: 'https://static.krcg.org/svg/clan/innocent.svg'},
  {name: 'ishtarri', url: 'https://static.krcg.org/svg/clan/ishtarri.svg'},
  {name: 'judge', url: 'https://static.krcg.org/svg/clan/judge.svg'},
  {name: 'kiasyd', url: 'https://static.krcg.org/svg/clan/kiasyd.svg'},
  {name: 'lasombra', url: 'https://static.krcg.org/svg/clan/lasombra.svg'},
  {name: 'malkavian', url: 'https://static.krcg.org/svg/clan/malkavian.svg'},
  {name: 'malkavianantitribu', url: 'https://static.krcg.org/svg/clan/malkavianantitribu.svg'},
  {name: 'martyr', url: 'https://static.krcg.org/svg/clan/martyr.svg'},
  {name: 'ministry', url: 'https://static.krcg.org/svg/clan/ministry.svg'},
  {name: 'nagaraja', url: 'https://static.krcg.org/svg/clan/nagaraja.svg'},
  {name: 'nosferatu', url: 'https://static.krcg.org/svg/clan/nosferatu.svg'},
  {name: 'nosferatuantitribu', url: 'https://static.krcg.org/svg/clan/nosferatuantitribu.svg'},
  {name: 'osebo', url: 'https://static.krcg.org/svg/clan/osebo.svg'},
  {name: 'pander', url: 'https://static.krcg.org/svg/clan/pander.svg'},
  {name: 'ravnos', url: 'https://static.krcg.org/svg/clan/ravnos.svg'},
  {name: 'redeemer', url: 'https://static.krcg.org/svg/clan/redeemer.svg'},
  {name: 'salubri', url: 'https://static.krcg.org/svg/clan/salubri.svg'},
  {name: 'salubriantitribu', url: 'https://static.krcg.org/svg/clan/salubriantitribu.svg'},
  {name: 'samedi', url: 'https://static.krcg.org/svg/clan/samedi.svg'},
  {name: 'toreador', url: 'https://static.krcg.org/svg/clan/toreador.svg'},
  {name: 'toreadorantitribu', url: 'https://static.krcg.org/svg/clan/toreadorantitribu.svg'},
  {name: 'tremere', url: 'https://static.krcg.org/svg/clan/tremere.svg'},
  {name: 'tremereantitribu', url: 'https://static.krcg.org/svg/clan/tremereantitribu.svg'},
  {name: 'truebrujah', url: 'https://static.krcg.org/svg/clan/truebrujah.svg'},
  {name: 'tzimisce', url: 'https://static.krcg.org/svg/clan/tzimisce.svg'},
  {name: 'ventrue', url: 'https://static.krcg.org/svg/clan/ventrue.svg'},
  {name: 'ventrueantitribu', url: 'https://static.krcg.org/svg/clan/ventrueantitribu.svg'},
  {name: 'visionary', url: 'https://static.krcg.org/svg/clan/visionary.svg'},

  ]
}
