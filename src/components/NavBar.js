import Logo from '@components/Logo'
import styles from '@styles/TabPage.module.scss'
import Link from 'next/link'
import classnames from 'tailwindcss-classnames'

const Navbar = ({ links }) => {

    return (
      <header className={classnames('z-50', 'pt-3', 'bg-white', 'top-0', 'flex', 'flex-col', 'md:flex-row',
          {
              [styles.border + ' sticky'] : links,
              ['h-16'] : !links
          }
      )}>
        {/* header left */}
        <div className='-mt-1  ml-4 md:absolute'>
            <Link href="/" passhref>
                <Logo  />   
            </Link>
        </div>

        { /* header right */
            links && <div className='sm:w-7/12 md:w-5/12 mx-auto'>
                            {links}
                        </div>
        }
    </header>
    )
}
  

export default Navbar
