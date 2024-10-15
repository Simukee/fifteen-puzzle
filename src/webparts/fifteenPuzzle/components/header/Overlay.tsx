import { mergeStyles, PrimaryButton, Text } from "@fluentui/react";
import { observer } from "mobx-react";
import * as React from "react";
import { IFifteenPuzzleProps } from "../FifteenPuzzle";
import * as strings from "FifteenPuzzleWebPartStrings";

export const Overlay: React.FC<IFifteenPuzzleProps> = observer((props: IFifteenPuzzleProps) => {

    const handleRestartClick = () => {
        props.store.shuffleTiles();
      };
    
      const overlayStyles = mergeStyles({
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        inset: "0px",
        zIndex: 1000,
      })
    
      const buttonStyles = mergeStyles({
        backgroundColor: props.store.semanticColors?.bodyBackground,
        color: props.store.semanticColors?.accentButtonBackground,
        height: "7%",
        width: "20%",
        fontWeight: "Bold",
        fontSize: "20px"
      })
    
      const textStyles = mergeStyles({
        textAlign: "center",
        color: props.store.semanticColors?.bodyBackground,
        fontWeight: "bold",
        fontSize: "36px",
        marginBottom: "20px"
      })
    return (
        <>
        <div className={overlayStyles}>
              <Text
                className={textStyles}
              >
                {strings.Greeting1} {props.store.movesCount} {strings.Greeting2}</Text>
              <PrimaryButton
                onClick={handleRestartClick}
                text={strings.PlayAgain}
                className={buttonStyles}
              />
            </div>
        </>
    )
});
