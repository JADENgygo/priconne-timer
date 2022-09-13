import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import type { AppProps } from 'next/app'
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>プリコネタイマー</title>
      </Head>
      <div className="content">
        <Component {...pageProps} />
        <footer>
          <div className="bg-secondary bg-opacity-25 text-center pt-3 pb-3">
            <div>
              <a href="https://twitter.com/@JADENgygo" className="me-3 link-dark">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="https://priconne-portfolio.vercel.app" className="link-dark">
                プリコネツール
              </a>
            </div>
            <div>画像: &copy; Cygames, Inc.</div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default MyApp
