import Head from 'next/head';

export default function CustomHead({ title, description }) {
  return (
    <Head>
      <title>{title ? `${title} | RoboVestX` : 'RoboVestX'}</title>
      <meta name="description" content={description || "Robo Copy Trading and Investment Platform"} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
