// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import ErrorBoundary from '../components/ErrorBoundary';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ErrorBoundary>
  );
}
