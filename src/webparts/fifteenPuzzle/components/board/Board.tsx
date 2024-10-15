import * as React from "react";
import { observer } from "mobx-react";
import { IFifteenPuzzleProps } from "../FifteenPuzzle";
import { Tile } from "../tile/Tile";
import styles from "../FifteenPuzzle.module.scss";
import { Stack } from "@fluentui/react";


export const Board: React.FC<IFifteenPuzzleProps> = observer((props: IFifteenPuzzleProps) => {
  return (
    <>
      <Stack className={styles.gameContainer}>
        {props.store.tiles.map((tile, index) => (
          <Tile store={props.store} index={index} tile={tile} />
        ))}
      </Stack>
    </>
  );
});
