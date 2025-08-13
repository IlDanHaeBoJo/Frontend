export const colors = {
  white: "#ffffff",
  gray100: "#F2F2F2",
  gray200: "#E6E6E6",
  gray300: "#CCCCCC",
  gray400: "#B2B2B2",
  gray500: "#808080",
  gray600: "#666666",
  gray700: "#333333",
  gray800: "#1A1A1A",
  black: "#000000",

  indigoGray1: "#9999B2",
  indigoGray2: "#808099",
  indigoGray3: "#33334D",
  indigoGray4: "#1A1A33",

  whiteBlue: "#FAFAFF",

  cloudBlue1: "#F2F7FF",
  cloudBlue2: "#E5EDFF",
  cloudBlue3: "#D9E5F2",

  lavenderBlue1: "#F0F2F5",
  lavenderBlue2: "#E5EBFA",
  lavenderBlue3: "#CCD9FF",

  red: "#E53333",
  darkRed: "#CC3333",
  green: "#29A645",
  blue: "#3366CC",
  darkBlue: "#254E99",
} as const;
export type ColorToken = keyof typeof colors;
