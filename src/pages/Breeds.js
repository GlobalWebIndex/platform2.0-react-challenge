import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {Button, Grid,Divider,Segment,Dimmer,Loader,Image, Header} from 'semantic-ui-react'

function Breeds() {

  const [loading,setLoading]=useState(true)
  const [breeds,setBreeds] = useState([])

  const apiKey = process.env.REACT_APP_CAT_KEY

  const options = {
    method : 'GET',
    headers:{
    'Content-Type' : 'application/json',
    'x-api-key' : apiKey
    }
  }

  async function fetchBreeds() {
    setLoading(true)
      axios.get('https://api.thecatapi.com/v1/breeds',options)
      .then((response)=>{
        setLoading(false)
        setBreeds(response)})
      .catch((error)=>{
        setLoading(false)
        console.log(error)})
  }

  useEffect(()=>{
    fetchBreeds()
  },[])
  
  return (
    <div>
      <Divider horizontal></Divider>

      <Grid columns={8} >
        <Grid.Row >
            {!loading ? breeds.data.map((breed)=>
                <Grid.Column>
                  <div style={{marginBottom:10}} >
                      <Button className='buttonshad' style={{minWidth:80,minHeight:60,display: 'flex',alignItems: 'center' , justifyContent: 'center'}}
                      as={Link}
                      color="teal"
                      to={`/breeds/${breed.id}`}
                      >
                      {breed.name}
                      </Button>
                   </div>
                </Grid.Column>
             
            ):          
            <>
                <Loader active inline='centered' >  Loading</Loader>
            </>
              }
      </Grid.Row>
      </Grid>
    </div>
  )
}

export default Breeds