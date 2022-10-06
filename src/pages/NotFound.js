import React from 'react'
import notfound from '../img/notfound.jpg'
import {Container,Header,Image} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
function NotFound() {
  return (
    <>
      <Container>
        <Header as='h1' textAlign='center'>Oops,invalid url.</Header>
            <div style={{marginTop:20,marginBottom:30,display: 'flex',alignItems: 'center' , justifyContent: 'center'}}>
              <Image style={{top:"+0px"}} size='big' fluid name='home'
                          as={Link} to="/"
                          src={notfound} />
            </div>
      </Container>
    </>
  )
}

export default NotFound