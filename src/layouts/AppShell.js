import PropTypes from 'prop-types'
import Head from 'next/head'
import Link from 'next/link'
import navData from '@data/nav.json'
import NavBar from '@components/NavBar'


const AppShell = ({ title, children }) => {
  const homePath = navData.filter(item => item.name === "home")[0].path;

  return (
    <div className="container sm:container max-w-screen-xl mx-auto">
      <Head>
        <title>CatDish: {title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <NavBar logo={`logo`} />
        <Link href={homePath}><a>GO HOME</a></Link>
      </header>

      <main>
        {children}
      </main>

      <footer>
        Footer
        </footer>
    </div>
  )
}

AppShell.propTypes = {
  title: PropTypes.string
}

export default AppShell


