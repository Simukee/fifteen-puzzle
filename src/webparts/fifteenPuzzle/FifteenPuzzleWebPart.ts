import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme, ThemeChangedEventArgs, ThemeProvider } from '@microsoft/sp-component-base';

import FifteenPuzzle, { IFifteenPuzzleProps } from './components/FifteenPuzzle';
import { PuzzleStore } from './components/stores/PuzzleStore';

export interface IFifteenPuzzleWebPartProps {
  description: string;
}

export default class FifteenPuzzleWebPart extends BaseClientSideWebPart<IFifteenPuzzleWebPartProps> {

  private _puzzleStore: PuzzleStore;
  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;

  public render(): void {
    const element: React.ReactElement<IFifteenPuzzleProps> = React.createElement(
      FifteenPuzzle,
      {
        store: this._puzzleStore
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
    this._themeVariant = this._themeProvider.tryGetTheme();
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);

    await super.onInit();
    
    this._puzzleStore = new PuzzleStore();
    this._puzzleStore.setThemeVariant(this._themeVariant);
    this._puzzleStore.setWidth(this.width);
  }

  protected onAfterResize(newWidth: number): void {
    this._puzzleStore.setWidth(newWidth);
  }
  

  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
    this._puzzleStore.setThemeVariant(this._themeVariant);

    this.render();
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          displayGroupsAsAccordion: true,
          groups: [

          ]
        }
      ]
    };
  }
}
