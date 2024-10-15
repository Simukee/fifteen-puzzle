import * as React from 'react';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

interface IColorProps {
  themeVariant: IReadonlyTheme | undefined;
}

export const ColorPallete: React.FC<IColorProps> = ({ themeVariant }) => {
  // Ensure that themeVariant is defined before accessing its properties
  if (!themeVariant || !themeVariant.semanticColors) {
    return null;  // Return null if themeVariant is undefined or semanticColors is missing
  }

  const { semanticColors } = themeVariant;

  const colors = Object.keys(semanticColors).map((colorTitle) => ({
    colorCode: semanticColors[colorTitle as keyof typeof semanticColors], 
    colorTitle,
  }));

  return (
    <div>
      <div>{"Palette"}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {colors.map((color) => (
          <div
            key={color.colorTitle}
            style={{
              backgroundColor: color.colorCode,
              width: "80px",
              height: "80px",
              overflowWrap: "break-word",
              color: colors[0].colorCode
            }}
          >
            {color.colorCode} <br />
            {color.colorTitle}
          </div>
        ))}
      </div>
    </div>
  );
};
