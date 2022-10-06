import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Header,Grid,Loader,Image,Button} from 'semantic-ui-react'
import FavoriteImage from '../components/FavoriteImage'
import {useNavigate} from 'react-router-dom'

function Favorites() {

  const [favorites,setFavorites] = useState([])
  const [loading,setLoading] = useState(true)

  const navigate = useNavigate()

  const apiKey = process.env.REACT_APP_CAT_KEY

  const options = {
    method : 'GET',
    headers:{
    'Content-Type' : 'application/json',
    'x-api-key' : apiKey
    }
  }

  function fetchData(){
    setLoading(true)
    axios.get(`https://api.thecatapi.com/v1/favourites/?sub_id=user-`,options)
      .then((response)=>{
        setLoading(false)
        setFavorites(response.data.filter((element, index) => {
        return response.data.indexOf(element) === index;
  }))})
      .catch((error)=>{
        setLoading(false)
        navigate('/error')
        console.log(error)})
}

 
  function onClickRemoveFavorite(e,catId){
    e.preventDefault()
    setLoading(true)
     axios.delete(
        `https://api.thecatapi.com/v1/favourites/${catId}`,options)
        .then((response)=>{
        const index=favorites.findIndex((obj)=>obj.id===catId)
        favorites.splice(index,1)
        setFavorites(favorites)
        setLoading(false)
        })
        .catch((error)=>{
          setLoading(false)
          console.log(error)})
  }


  useEffect(()=>{
    fetchData()
  },[])

  return (
    <div>
      <Grid columns={2}  relaxed verticalAlign='middle'>
        <Grid.Row centered>
          {favorites.length>0 ? favorites.map((cat)=>(
            <>
              <Grid.Column key={cat.id}>
                <FavoriteImage cat={cat} onClickRemoveFavorite={onClickRemoveFavorite}/>
              </Grid.Column>
            </>
        )):favorites.length===0 && !loading ?         
              <Header as='h4'>You do not have any cats listed as favorite.</Header>
          : <Loader active inline='centered' >  Loading</Loader>
        }
        </Grid.Row>
        </Grid>
    </div>
  )
}

export default Favorites