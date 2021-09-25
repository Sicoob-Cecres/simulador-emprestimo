import { extendTheme, theme } from "@chakra-ui/react";

export const customTheme = extendTheme({
  ...theme,
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark"
  },
  colors: {
    turquesa: "#00AE9D",
    verdeClaro: "#C9D200",
    verdeMedio: {
      50: "#f2fee0",
      100: "#def6b8",
      200: "#caee8f",
      300: "#b7e763",
      400: "#a2e038",
      500: "#89c71f",
      600: "#699b15",
      700: "#4b6f0d",
      800: "#2c4204",
      900: "#0c1700",
    },
    verdeEscuro: {
      // "#003641"
      50: "#defdff",
      100: "#b3f2ff",
      200: "#86e8fd",
      300: "#5be0fc",
      400: "#3ed7fb",
      500: "#32bee2",
      600: "#2293b0",
      700: "#136a7e",
      800: "#00404d",
      900: "#00161d",
    },
    roxo: {
      50: "#eeecff",
      100: "#cbcaec",
      200: "#a8a7d9",
      300: "#8684c8",
      400: "#6361b8",
      500: "#49479D",
      600: "#39387c",
      700: "#28285a",
      800: "#171839",
      900: "#07071a",
    },
  },
  fonts: {
    heading: "Asap",
    body: "Asap",
  },
  styles: {
    global: {
      body: {
        bg: "gray.900",
        color: "gray.50",
        background: "linear-gradient(180deg, rgba(64,76,147,1) 0%, rgba(0,174,158,1) 100%) fixed",
      },
    },
  },
});
