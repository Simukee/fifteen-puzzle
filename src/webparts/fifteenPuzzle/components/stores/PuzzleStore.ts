import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { makeObservable, observable, computed, action } from "mobx";

export class PuzzleStore {
  @observable private _tiles: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
  @observable private _themeVariant: IReadonlyTheme | undefined;
  @observable private _width: number;
  @observable movesCounter: number = 0;
  @observable time: number = 0;
  @observable isTimerActive: boolean = false;
  @observable isStarted: boolean = false;
  private timerInterval: number | undefined;

  constructor() {
    this.shuffleTiles();
    makeObservable(this);
  }

  @computed
  public get tiles() {
    return this._tiles;
  }

  @computed
  public get themeVariant() {
    return this._themeVariant;
  }

  @computed
  public get semanticColors() {
    if (this._themeVariant)
      return this._themeVariant.semanticColors;

    return null;
  }

  @computed
  public get movesCount() {
    return this.movesCounter;
  }

  @computed
  public get isSolved(): boolean {
    return this.tiles.slice(0, -1).every((tile, i) => tile === i + 1);
  }

  @computed
  public get width() { // cia pasitvarkytt
    if (this._width < 330)
      return 1;
    else if (this._width <= 600)
      return 2;
    else
      return 3;
  }

  @action.bound
  public shuffleTiles(): number[] {
    const shuffledTiles = [...this.tiles];
    for (let i = shuffledTiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledTiles[i], shuffledTiles[j]] = [shuffledTiles[j], shuffledTiles[i]];
    }

    this.movesCounter = 0;
    this.resetTimer();
    
    this._tiles = shuffledTiles;

    if (!this._isSolvable(shuffledTiles)) {
      return shuffledTiles;
    } else {
      return this.shuffleTiles();
    }
  }

  @action.bound
  private canMoveTile(index: number): boolean {
    const emptyIndex = this.tiles.indexOf(0);
    const row = Math.floor(index / 4);
    const emptyRow = Math.floor(emptyIndex / 4);
    const col = index % 4;
    const emptyCol = emptyIndex % 4;

    return (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1);
  }

  @action
  public moveTile(index: number): boolean {
    if (this.canMoveTile(index)) {
      const emptyIndex = this.tiles.indexOf(0);
      [this.tiles[index], this.tiles[emptyIndex]] = [this.tiles[emptyIndex], this.tiles[index]];
      this.movesCounter += 1;

      if (this.movesCounter === 1) {
        this.startTimer();
      }

      if (this.isSolved) {
        this.stopTimer();
      }

      return true;
    }
    return false;
  }

  @action
  public setThemeVariant(themeVariant?: IReadonlyTheme) {
    this._themeVariant = themeVariant;
  }

  @action
  public setWidth(width: number) {
    this._width = width;
  }

  @action
  public startTimer(): void {
    if (!this.isTimerActive) {
      this.isTimerActive = true;
      this.timerInterval = window.setInterval(() => {
        this.time += 1;
      }, 1000);
    }
  }

  @action
  public stopTimer(): void {
    this.isTimerActive = false;
    if (this.timerInterval !== undefined) {
      window.clearInterval(this.timerInterval);
    }
  }

  @action
  public resetTimer(): void {
    this.time = 0;
    this.isTimerActive = false;
    if (this.timerInterval !== undefined) {
      window.clearInterval(this.timerInterval);
    }
  }

  private _isSolvable(tiles: number[]): boolean {
    const inversionCount = this._getInversionCount(tiles);
    const emptyIndex = tiles.indexOf(0);
    const emptyRowFromBottom = Math.floor(emptyIndex / 4) + 1;

    const emptyRowFromBottomIsOdd = (4 - emptyRowFromBottom) % 2 !== 0;
    return (inversionCount % 2 === 0 && emptyRowFromBottomIsOdd) ||
      (inversionCount % 2 !== 0 && !emptyRowFromBottomIsOdd);
  }

  private _getInversionCount(tiles: number[]): number {
    const flattenedTiles = tiles.filter(tile => tile !== 0);
    let inversionCount = 0;

    for (let i = 0; i < flattenedTiles.length - 1; i++) {
      for (let j = i + 1; j < flattenedTiles.length; j++) {
        if (flattenedTiles[i] > flattenedTiles[j]) {
          inversionCount++;
        }
      }
    }
    return inversionCount;
  }

  private padWithZero(number: number) {
    return number < 10 ? '0' + number : number.toString();
  }

  public formatTime(seconds: number) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    const formattedHours = this.padWithZero(h);
    const formattedMinutes = this.padWithZero(m);
    const formattedSeconds = this.padWithZero(s);

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
}
