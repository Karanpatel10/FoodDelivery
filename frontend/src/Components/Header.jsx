import {
  Badge,
  Button,
  Container,
  Dropdown,
  Nav,
  Navbar,
} from "react-bootstrap";
import Main_logo from '../assets/image/assets/logo/logo.png'
import "../Components/HeaderStyle.css";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../Pages/Context/StoreContext";
import Cart from "../Pages/Cart/Cart";
import { toast } from "react-toastify";




const Header = ({ setShowLogin }) => {
  const [stickyscroll, setStickyscroll] = useState(false);
  const { token, setToken,cartItem,setPromo} = useContext(StoreContext);
  const [LPshow, setLPShow] = useState(false);

  
  const navigate=useNavigate();
  const userName=localStorage.getItem("username");
 
const Logout=()=>{
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('discountSlideShown');
  toast.error("Logout Successfully");
  setToken("");
  setPromo("");
  navigate("/");
}

const location=useLocation();
const isHome=location.pathname ==='/';


  const Scrollhandle = () => {
    const ScrollValue = document?.documentElement?.scrollTop;
    ScrollValue > 100 ? setStickyscroll(true) : setStickyscroll(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", Scrollhandle);
    return () => {
      window.removeEventListener("scroll", Scrollhandle);
    }
  }, []);

  return (
    <>
    
        <Navbar expand="lg" className={`d-flex align-items-center px-0 px-md-5 navbar_mainarea  ${stickyscroll || !isHome?'sticky':'tra_header'}`}>
          <Container fluid>
            {/* Toggle */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-4 d-lg-none" onClick={()=>setLPShow(!LPshow)}>
            </Navbar.Toggle>

          {!LPshow && <Navbar.Brand href="/" className="me-auto">
            <NavLink to="/">
              <img src={Main_logo} alt="logo" className="main_logo"/>
            </NavLink>
          </Navbar.Brand>}


            {/* Menu links */}
            <Navbar.Collapse id="basic-navbar-nav" className="me-5">
              <NavlinkDrop cartItem={cartItem} />
            </Navbar.Collapse>
          </Container>

        {/* Profile icon - OUTSIDE Navbar.Collapse */}
        
      </Navbar>
      
      {!LPshow  && <div className="profile-icon">
       {
        !token ? <Button onClick={()=>{setShowLogin(true)}} className='fs-5' variant="light">Login</Button>:
        <Dropdown>
            <Dropdown.Toggle
              id="dropdown-profile" className="border-0 fs-5" variant="light" >
              {userName ?(<span>Hi&nbsp;{userName}</span>):"Login"}
            </Dropdown.Toggle>
            <ProfileDropDown Logout={Logout}/>
          </Dropdown>
       } 
      </div>}
      </>
  );
};

export default Header;


// External component used inside

const ProfileDropDown=({Logout})=>{
  return(
            <Dropdown.Menu className="dropdown_profile" align="end">
              <Dropdown.Item as={NavLink} to='/profile'> <i className="bi bi-person-circle fs-2 me-3"></i> Profile</Dropdown.Item>
              <Dropdown.Item as={NavLink} to='/myorder'> <i className="bi bi-bag-check fs-2 me-3"></i>Orders</Dropdown.Item>
              <Dropdown.Item onClick={Logout}><i className="bi bi-box-arrow-right fs-2 me-3"></i>Logout</Dropdown.Item>
            </Dropdown.Menu>
  )
}

const NavlinkDrop=({cartItem=[]})=>{
  const totalItems = Object.values(cartItem).reduce((sum, qty) => sum + qty, 0);
  return(
    <Nav className="ms-auto my-4 mx-5 gap-4">
              <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
                <NavLink to="/menu" className="nav-link">
                  Menu
                </NavLink>
                <NavLink to="/about" className="nav-link">
                  About
                </NavLink>
                <NavLink to="/contact_us" className="nav-link">
                  Contact Us
                </NavLink>
                <NavLink to="/cart" className='nav-link position-relative p-0 m-0'>
                
                <i className="bi bi-cart3 fs-3"/>
                {totalItems>0 && (<Badge pill bg="warning" style={{
              position: 'absolute',
              top: '-5px',
              right: '-10px',
              color: 'black',
            }}>{totalItems}</Badge>)}
                </NavLink>
    </Nav>
  )
}