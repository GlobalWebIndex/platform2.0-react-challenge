import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {useState,useEffect} from 'react';
import {Grid,Card,Button,Loader,Modal,Icon,Header,Container,Image,Row} from 'semantic-ui-react'
import CatCard from '../components/CatCard';

function Home() {
  const apiKey = process.env.REACT_APP_CAT_KEY

  const navigate = useNavigate()

  const options = {
    method : 'GET',
    headers:{
    'Content-Type' : 'application/json',
    'x-api-key' : apiKey
    }
  }

  const [data,setData] = useState([])
  const [loading,setLoading]=useState(true)
  const [disabled,setDisabled] = useState(false)

  function onClickRandom(e){
    e.preventDefault()
    fetchCats()
  }

  async function fetchCats(){
    setDisabled(true)
    setLoading(true)
    await axios.get('https://api.thecatapi.com/v1/images/search?limit=10',options)
      .then(response=>{
        setData((prevState)=>[...prevState,...response.data])
        setLoading(false)
        setDisabled(false)
      }).catch(error=>{
        setLoading(false)
        setDisabled(false)
        navigate('/error')
        console.log(error)
      })
  } 

  useEffect(()=>{
    fetchCats()
  },[])

  return (
    <>
    <section>
      <div>
      <Grid columns={4}  relaxed verticalAlign='middle'>
        <Grid.Row centered>
            {!loading ? data.map((cat)=>(
              <Grid.Column key={cat.id} >
                <Container style={{marginTop:10}}>
                  <Card>   
                    <CatCard page='home page'cat={cat}/>
                  </Card>
                </Container>
              </Grid.Column>   
            )): <>
                  <Loader active inline='centered'>Loading</Loader>
                </>}
          </Grid.Row>
        </Grid>
      </div>
    </section>
      <div style={{marginTop:20,marginBottom:30,display: 'flex',alignItems: 'center' , justifyContent: 'center'}}>
            <Button color='teal' onClick={onClickRandom}  size='big' disabled={disabled}>Load More</Button>
      </div>
    </>
  )
}

export default Home