import { ColorModeScript } from "@chakra-ui/react";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Asap:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
          <link rel="stylesheet" type="text/css" href="https://www.sicoob.com.br/diretorio/assets/sicoob_icon_svg-1.0.0.css" />
          <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        </Head>
        <body>
          <ColorModeScript initialColorMode="light" />
            <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
