import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Create beautiful digital signatures with our free signature maker tool" />
        <meta name="keywords" content="signature maker, digital signature, online signature, signature generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}