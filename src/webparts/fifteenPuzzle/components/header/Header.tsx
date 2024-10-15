import { Icon, mergeStyles, PrimaryButton, Stack, Text } from "@fluentui/react";
import { observer } from "mobx-react";
import * as React from "react";
import { IFifteenPuzzleProps } from "../FifteenPuzzle";
import * as strings from "FifteenPuzzleWebPartStrings";

export const Header: React.FC<IFifteenPuzzleProps> = observer((props: IFifteenPuzzleProps) => {

    const buttonStyles = mergeStyles({
        textTransform: "uppercase",
        fontWeight: "bold",
        backgroundColor: props.store.semanticColors?.bodyText,
        borderColor: props.store.semanticColors?.bodyText,
        ":hover": {
            backgroundColor: props.store.semanticColors?.bodyTextChecked,
            borderColor: props.store.semanticColors?.bodyTextChecked,
        },
        ":active": {
            backgroundColor: props.store.semanticColors?.bodyTextChecked,
            borderColor: props.store.semanticColors?.bodyTextChecked,
        }
    })

    const headerStyles = mergeStyles({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
    })

    const headingStyles = mergeStyles({
        textAlign: "center",
        color: props.store.semanticColors?.bodyText,
        fontWeight: "bold",
    })

    const iconStyles = mergeStyles({
        marginRight: "10px"
    })

    return (
        <>
            <div className={headerStyles}>
                <Stack>
                    <PrimaryButton
                        className={buttonStyles}
                        onClick={props.store.shuffleTiles}
                    >
                        <Icon
                            iconName="Refresh"
                            className={iconStyles}
                        />
                        {strings.Shuffle}
                    </PrimaryButton>
                </Stack>
                <Stack horizontalAlign="end">
                    <Text className={headingStyles}>
                        {props.store.formatTime(props.store.time)} <Icon iconName="AlarmClock" />
                    </Text>
                    <Text className={headingStyles}>
                        {props.store.movesCount} <Icon iconName="Move" />
                    </Text>
                </Stack>
            </div>
        </>
    );
});
