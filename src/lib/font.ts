import localFont from "next/font/local";

export const insSans = localFont({
  src: "../app/fonts/InstrumentSans-VariableFont_wdth,wght.ttf",
  variable: "--font-ins-sans",
  weight: "400 700",
  preload: true,
});
