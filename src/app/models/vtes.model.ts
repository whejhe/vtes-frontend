//src/app/models/vtes.model.ts

export interface Card {
  id:               number;
  _name:            string;
  url:              string;
  types:            Type[];
  clans?:           Clan[];
  capacity?:        number;
  disciplines?:     Discipline[];
  card_text:        string;
  _set:             string;
  artists:          string[];
  group?:           string;
  ordered_sets:     string[];
  name_variants?:   string[];
  name:             string;
  printed_name:     string;
  rulings?:         Rulings;
  title?:           Title;
  has_advanced?:    boolean;
  adv?:             boolean;
  text_change?:     boolean;
  aka?:             string[];
  has_evolution?:   boolean;
  is_evolution?:    boolean;
  banned?:          Date;
  pool_cost?:       PoolCost;
  flavor_text?:     string;
  capacity_change?: string;
  multidisc?:       boolean;
  blood_cost?:      string;
  combo?:           boolean;
  conviction_cost?: string;
  burn_option?:     boolean;
  traits?:          Traits;
  traits_library?: string[];
  sect?:             Sect;
  disciplineNames?: string[];
  combat?:           Combat;
  hability?:       Hability;
}

export enum PoolCost{
  zero = "0",
  one = "1",
  two = "2",
  three = "3",
  four = "4",
  five = "5",
  six = "6",
}

export enum Sect {
  Camarilla = "Camarilla",
  Sabbat = "Sabbat",
  Anarch = "Anarch",
  Independent = "Independent",
  Laibon = "Laibon",
}

export enum Clan {
  Abomination = "Abomination",
  Ahrimane = "Ahrimane",
  Akunanse = "Akunanse",
  Avenger = "Avenger",
  Baali = "Baali",
  BanuHaqim = "Banu Haqim",
  BloodBrother = "Blood Brother",
  Brujah = "Brujah",
  BrujahAntitribu = "Brujah antitribu",
  Caitiff = "Caitiff",
  DaughterOfCacophony = "Daughter of Cacophony",
  Defender = "Defender",
  Gangrel = "Gangrel",
  GangrelAntitribu = "Gangrel antitribu",
  Gargoyle = "Gargoyle",
  Giovanni = "Giovanni",
  Guruhi = "Guruhi",
  HarbingerOfSkulls = "Harbinger of Skulls",
  Innocent = "Innocent",
  Ishtarri = "Ishtarri",
  Judge = "Judge",
  Kiasyd = "Kiasyd",
  Lasombra = "Lasombra",
  Malkavian = "Malkavian",
  MalkavianAntitribu = "Malkavian antitribu",
  Martyr = "Martyr",
  Ministry = "Ministry",
  Nagaraja = "Nagaraja",
  Nosferatu = "Nosferatu",
  NosferatuAntitribu = "Nosferatu antitribu",
  Osebo = "Osebo",
  Pander = "Pander",
  Ravnos = "Ravnos",
  Redeemer = "Redeemer",
  Salubri = "Salubri",
  SalubriAntitribu = "Salubri antitribu",
  Samedi = "Samedi",
  Toreador = "Toreador",
  ToreadorAntitribu = "Toreador antitribu",
  Tremere = "Tremere",
  TremereAntitribu = "Tremere antitribu",
  TrueBrujah = "True Brujah",
  Tzimisce = "Tzimisce",
  Ventrue = "Ventrue",
  VentrueAntitribu = "Ventrue antitribu",
  Visionary = "Visionary",
}


export enum Discipline {
  abo = 'abo',
  ani = 'ani',
  aus = 'aus',
  tha = 'tha',
  cel = 'cel',
  chi = 'chi',
  dai = 'dai',
  dem = 'dem',
  dom = 'dom',
  for = 'for',
  mel = 'mel',
  myt = 'myt',
  nec = 'nec',
  obe = 'obe',
  obf = 'obf',
  obt = 'obt',
  pot = 'pot',
  pre = 'pre',
  pro = 'pro',
  qui = 'qui',
  san = 'san',
  ser = 'ser',
  spi = 'spi',
  tem = 'tem',
  thn = 'thn',
  val = 'val',
  vic = 'vic',
  vis = 'vis',
  def = 'def',
  inn = 'inn',
  jus = 'jus',
  mar = 'mar',
  red = 'red',
  vin = 'vin',
  ven = 'ven',
  fli = 'fli',
  mal = 'mal',
  str = 'str',
  ABO = 'ABO',
  ANI = 'ANI',
  AUS = 'AUS',
  THA = 'THA',
  CEL = 'CEL',
  CHI = 'CHI',
  DAI = 'DAI',
  DEM = 'DEM',
  DOM = 'DOM',
  FOR = 'FOR',
  MEL = 'MEL',
  MYT = 'MYT',
  NEC = 'NEC',
  OBE = 'OBE',
  OBF = 'OBF',
  OBT = 'OBT',
  POT = 'POT',
  PRE = 'PRE',
  PRO = 'PRO',
  QUI = 'QUI',
  SAN = 'SAN',
  SER = 'SER',
  SPI = 'SPI',
  TEM = 'TEM',
  THN = 'THN',
  VAL = 'VAL',
  VIC = 'VIC',
  VIS = 'VIS'
}


export interface Rulings {
  text:  string[];
  links: { [key: string]: string };
}


export enum Title {
  Archbishop = "Archbishop",
  Baron = "Baron",
  Bishop = "Bishop",
  Cardinal = "Cardinal",
  InnerCircle = "Inner Circle",
  Justicar = "Justicar",
  Magaji = "Magaji",
  Primogen = "Primogen",
  Prince = "Prince",
  Priscus = "Priscus",
  Regent = "Regent",
  The1Vote = "1 vote",
  The2Votes = "2 votes",
}

export enum Combat {
  dodge = "dodge",
  strength = "strength",
  maneuver = "maneuver",
  additionalStrike = "additional strike",
  aggravated = "aggravated",
  prevent ="prevent",
  press = "press",
  CombatEnd = "combat end",
  EnterCombat = "enter combat"
}

export enum Type {
  Action = "Action",
  ActionModifier = "Action Modifier",
  Ally = "Ally",
  Combat = "Combat",
  Conviction = "Conviction",
  Equipment = "Equipment",
  Event = "Event",
  Imbued = "Imbued",
  Master = "Master",
  PoliticalAction = "Political Action",
  Power = "Power",
  Reaction = "Reaction",
  Retainer = "Retainer",
  Vampire = "Vampire",
}

export enum Hability {
  Bleed = "Bleed",
  Strength = "Strength",
  Vote = "Vote",
  Stealth = "Stealth",
  Aggravated = "Aggravated",
  Press = "Press",
  CombatEnd = "Combat end",
  EnterCombat = "Enter combat",
  Intercept = "Intercept",
  Dodge = "Dodge",
  Prevent = "Prevent",
  Maneuver = "Maneuver",
  AdditionalStrike = "Additional strike",
  Reduce = "Reduce",
  Unlock = "Unlock",
  BlackHand = "Black hand",
  Seraph = "Seraph",
  Infernal = "Infernal",
  RedList = "Red list",
  Flight = "Flight",
  Advancement = "Advancement",
}

export enum Traits {
  Intercept = "Intercept",
  Stealth = "Stealth",
  Bleed = "Bleed",
  Strength = "Strength",
  Vote = "Vote",
  Title = "Title",
  Dodge = "Dodge",
  Maneuver = "Maneuver",
  AdditionalStrike = "Additional strike",
  Aggravated = "Aggravated",
  Prevent = "Prevent",
  Press = "Press",
  CombatEnd = "Combat end",
  MultiType = "Multi-type",
  MultiDiscipline = "Multi-discipline",
  EnterCombat = "Enter combat",
  CreateVampire = "Create Vampire",
  BoodToUnControlled = "Bood to Uncontrolled",
  BounceBleed = "Bounce Bleed",
  ReduceBleed = "Reduce Bleed",
  Unlock_Wake = "Unlock / Wake",
  BlackHand = "Black hand",
  Seraph = "Seraph",
  Infernal = "Infernal",
  BurnOption = "Burn option",
  RedList = "Red list",
  Flight = "Flight",
  Advancement = "Advancement",
  Banned = "Banned",
}

//Dentro de interface Card
export enum DisciplineName {
  abombwe = 'abombwe',
  animalism = 'animalism',
  auspex = 'auspex',
  bloodsorcery = 'bloodsorcery',
  celerity = 'celerity',
  chimerstry = 'chimerstry',
  daimoinon = 'daimoinon',
  dementation = 'dementation',
  dominate = 'dominate',
  fortitude = 'fortitude',
  melpominee = 'melpominee',
  mytherceria = 'mytherceria',
  necromancy = 'necromancy',
  obeah = 'obeah',
  obfuscate = 'obfuscate',
  obtenebration = 'obtenebration',
  potence = 'potence',
  presence = 'presence',
  protean = 'protean',
  quietus = 'quietus',
  sanguinus = 'sanguinus',
  serpentis = 'serpentis',
  spiritus = 'spiritus',
  temporis = 'temporis',
  thanatosis = 'thanatosis',
  valeren = 'valeren',
  vicissitude = 'vicissitude',
  visceratika = 'visceratika',


  vision = 'vision',
  vengeance = 'vengeance',
  defense = 'defense',
  innocence = 'innocence',
  judgment = 'judgment',
  martyrdom = 'martyrdom',
  redemption = 'redemption',

  abombwesup = 'abombwesup',
  animalismsup = 'animalismsup',
  auspexsup = 'auspexsup',
  bloodsorcerysup = 'bloodsorcerysup',
  celeritysup = 'celeritysup',
  chimerstrysup = 'chimerstrysup',
  daimoinonsup = 'daimoinonsup',
  dementationsup = 'dementationsup',
  dominatesup = 'dominatesup',
  fortitudesup = 'fortitudesup',
  melpomineesup = 'melpomineesup',
  mytherceriasup = 'mytherceriasup',
  necromancysup = 'necromancysup',
  obeahsup = 'obeahsup',
  obfuscatesup = 'obfuscatesup',
  obtenebrationsup = 'obtenebrationsup',
  potencesup = 'potencesup',
  presencesup = 'presencesup',
  proteansup = 'proteansup',
  quietussup = 'quietussup',
  sanguinussup = 'sanguinussup',
  serpentissup = 'serpentissup',
  spiritussup = 'spiritussup',
  temporissup = 'temporissup',
  thanatosissup = 'thanatosissup',
  valerensup = 'valerensup',
  vicissitudesup = 'vicissitudesup',
  visceratikasup = 'visceratikasup',
}
