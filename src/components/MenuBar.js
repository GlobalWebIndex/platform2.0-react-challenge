import React,{useState} from 'react'
import { Input, Menu ,Item} from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import logo from '../img/cat.png'
import '../App.css'


function MenuBar() {


    const pathname = window.location.pathname;
    const path = pathname==0 ? 'home':pathname.slice(1).split("/").slice(0,1).join()
    const [activeItem,setActiveItem]= useState(path)
    const handleItemClick = (e, { name }) => {setActiveItem(name)}

    return (

      <Menu className="menu" secondary  size="massive" color="teal"> 
         <Item.Image  style={{top:"+0px"}} size='tiny' active={activeItem === 'home'} 
                    as={Link} to="/"
                    src={logo}
              />
        <Menu.Menu position="right">
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />
          <Menu.Item
            name='breeds'
            as={Link}
            to="/breeds"
            active={activeItem === 'breeds'}
            onClick={handleItemClick}
            
          />
          <Menu.Item
            name='favorite'
            active={activeItem === 'favorite'}
            onClick={handleItemClick}
            as={Link}
            to="/favorite"
          />
        </Menu.Menu>
      </Menu>
    
    )
}

export default MenuBar