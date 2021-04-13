import PropTypes from 'prop-types'
import Head from 'next/head'
import Link from 'next/link'
import navData from '@data/nav.json'

const Page = ({ title, children }) => {
    const homePath = navData.filter(item => item.name === "home")[0].path;

    return (
      <div>
        <Head>
          <title>CatDish: {title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <header>
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

  Page.propTypes = {
    title: PropTypes.string
}

  export default Page


