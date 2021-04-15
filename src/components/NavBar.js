import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const NavBar = ({logo}) => {
    return (
    
        <Navbar expand="sm">    
           <div className="container">
                <Navbar.Brand href={'/'} className="logo">{logo}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">                                 
                    <Button classList="ml-2" variant="primary">Get Updates!</Button>
                </Navbar.Collapse>
           </div>
        </Navbar>
    )
}

export default NavBar
