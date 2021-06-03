import { Page, Text } from "@geist-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <Page>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Text h1>StaticShield</Text>
    </Page>
  );
}
