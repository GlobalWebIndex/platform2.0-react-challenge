import React from 'react'
import error from '../img/error.png'
import {Container,Header,Image} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
function Error() {
  return (
    <>
      <Container>
        <Header as='h1' textAlign='center'>Unfortunately,there was an unexpected error.</Header>
            <div style={{marginTop:20,marginBottom:30,display: 'flex',alignItems: 'center' , justifyContent: 'center'}}>
              <Image style={{top:"+0px"}} size='big'   fluid name='home'
                          as={Link} to="/"
                          src={error} />
            </div>
      </Container>
    </>
  )
}

export default Error