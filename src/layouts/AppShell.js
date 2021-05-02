import PropTypes from 'prop-types'
import Head from 'next/head'
import Footer from '@components/Footer'
import styles from '@styles/AppShell.module.scss'

const AppShell = ({ title, children }) => {

  return (
    <div className={`${styles.background} ${styles['sans-serif-text']} text-gray-700`}>
      <Head>
        <title>CatDish: {title}</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&&display=swap" rel="stylesheet" />
</Head>
      <main className="w-full">
  
        <div className="mx-auto min-h-screen-3/4">
          {children}
        </div>

        <Footer />
      </main>

    </div>
  )
}

AppShell.propTypes = {
  title: PropTypes.string
}

export default AppShell


