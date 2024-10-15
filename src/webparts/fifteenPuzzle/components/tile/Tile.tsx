import * as React from "react";
import { PuzzleStore } from "../stores/PuzzleStore";
import { mergeStyles, PrimaryButton, Stack } from "@fluentui/react";

interface ITileProps {
    store: PuzzleStore;
    index: number;
    tile: number;
}

export const Tile: React.FC<ITileProps> = (props: ITileProps) => {

    const tileStyles = mergeStyles({
        backgroundColor: props.store.semanticColors?.accentButtonBackground,
        height: "100%",
        width: "100%",
        color: props.store.semanticColors?.bodyBackground,
        fontWeight: "Bold",
        minWidth: "51px",
        minHeight: "51px",
        fontSize: props.store.width === 1 ? "14px" : props.store.width === 2 ? "40px" : "100px"
    });

    const emptyTileStyles = mergeStyles({
        backgroundColor: props.store.semanticColors?.bodyBackground,
        height: "100%",
        width: "100%",
    });

    return (
        <Stack key={props.index} style={{padding: "2px"}}>
            {props.tile !== 0 ?
                (
                    <PrimaryButton className={tileStyles} onClick={() => props.store.moveTile(props.index)}>
                        {props.tile}
                    </PrimaryButton>
                ) :
                (
                    <div className={emptyTileStyles}></div>
                )}
        </Stack>
    );
}