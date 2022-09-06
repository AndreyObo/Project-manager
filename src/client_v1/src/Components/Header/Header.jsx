
import './header.css'
import logo from './img/logo.png'


const Header = () => {
 
    return (
        <div className="header">
           <img src={logo}/>
           <span className="logotext">Система управления проектами</span>
        </div>
    );
  };
  
  export default Header;