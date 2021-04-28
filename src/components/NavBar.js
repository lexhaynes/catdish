import Link from 'next/link'
import Logo from '@components/Logo'
import useComponentVisible from '@hooks/useComponentVisible'
import navData from '@data/nav.json'

const navLinks = navData.filter(item => item.id !== "home");


const Navbar = () => {
    const {ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);


    const toggleMenu = () => setIsComponentVisible(!isComponentVisible)


    return (
        <header className={`navbar w-full py-2 transition duration-150 bg-white`} >
        <nav role="navigation" className="w-11/12 py-3 mx-auto" aria-label="main navigation">
          <div className="container flex justify-between items-center">
  
            <div className="navbar-left flex justify-between items-center">
              <div className="brand font-bold text-2xl">
                  <Link href="/" passHref>
                    <a>
                        <Logo />
                    </a>
                  </Link>
                 
              </div>
            </div>
  
          </div>

 
        </nav>
    </header>
    )
}


export default Navbar
