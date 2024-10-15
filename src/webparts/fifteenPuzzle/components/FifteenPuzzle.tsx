import * as React from "react";
import { observer } from "mobx-react";
import styles from "./FifteenPuzzle.module.scss";
import { Board } from "./board/Board";
import { PuzzleStore } from "./stores/PuzzleStore";
import { Header } from "./header/Header";
import { Overlay } from "./header/Overlay";
//import { ColorPallete } from "./ColorPallete";

export interface IFifteenPuzzleProps {
  store: PuzzleStore;
}

const FifteenPuzzle: React.FC<IFifteenPuzzleProps> = observer((props: IFifteenPuzzleProps) => {

  return (
    <section className={styles.fifteenPuzzle}>
      <div className="container">
        <div>
          <Header store={props.store} />
          <Board store={props.store} />

          {props.store.isSolved && (
            <Overlay store={props.store}/>
          )}
        </div>
      </div>
      {/* { <div>
        <ColorPallete themeVariant={props.store.themeVariant} />
      </div> } */}
    </section>
  );
});

export default FifteenPuzzle;
