import PropTypes from 'prop-types'
import Head from 'next/head'
import Navbar from '@components/Navbar'
import Footer from '@components/Footer'

const AppShell = ({ title, children }) => {

  return (
    <>
      <Head>
        <title>CatDish: {title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full">
        <header>
          <Navbar />
        </header>

        <main className="sm:container max-w-screen-xl mx-auto my-6">
          {children}
        </main>

        <Footer />
      </div>

    </>
  )
}

AppShell.propTypes = {
  title: PropTypes.string
}

export default AppShell


