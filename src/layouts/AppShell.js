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

        <header>
          <Navbar />
        </header>

      <main className="w-full">
    
        <div className="sm:container max-w-screen-xl mx-auto my-6 min-h-screen-3/4">
          {children}
        </div>

        <Footer />
      </main>

    </>
  )
}

AppShell.propTypes = {
  title: PropTypes.string
}

export default AppShell


