import Head from 'next/head';
import Link from 'next/link';
import Nav from './Nav';
import { LayoutProps } from '../types/components';

const Layout = ({ children, home }: LayoutProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>d CMS</title>
        <meta name="description" content="A decentralized content management system." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div className="">
        <main>{children}</main>
        {!home && (
          <div className="">
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default Layout
