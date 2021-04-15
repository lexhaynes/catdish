import { Navbar as BSNavbar, Nav, NavDropdown } from 'react-bootstrap';
import Button from '@components/Button';
import { getNavPath } from '@utils/data'
import styles from '@styles/Navbar.module.scss'


const Logo = () => {
    return <span className={styles.logo}>CatDish</span>
  }
  

const Navbar = () => {
    const homePath = getNavPath("home");

    return (
        <BSNavbar expand="sm" className={` ${styles.navbar} border-b border-gray-300`}>
           <div className="container mx-auto">
                <BSNavbar.Brand href={homePath}>
                    <Logo />
                </BSNavbar.Brand>
                <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BSNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                    <NavDropdown title="More Links" className="mr-4">
                        {
                            <>
                            <NavDropdown.Item href={`/`}>{`Link 1`}</NavDropdown.Item>
                            <NavDropdown.Item href={`/`}>{`Link 2`}</NavDropdown.Item>
                            <NavDropdown.Item href={`/`}>{`Link 3`}</NavDropdown.Item>
                            </>
  
                        }
        
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/about">About</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Button variant="primary">Get Updates!</Button>
                </BSNavbar.Collapse>
           </div>
        </BSNavbar>
    )
}


export default Navbar
