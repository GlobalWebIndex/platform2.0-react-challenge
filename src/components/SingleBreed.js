import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useParams,useNavigate,Link } from 'react-router-dom'
import {Header,Button,Grid,Loader, Table,Rating, Segment,Flag} from 'semantic-ui-react'
import CatCard from './CatCard'

function SingleBreed() {

  const [loading,setLoading]=useState(true)
  const [breeds,setBreed] = useState([])

  const navigate = useNavigate()

  const apiKey = process.env.REACT_APP_CAT_KEY
  const params= useParams()

  var id = params.id

  const options = {
    method : 'GET',
    headers:{
    'Content-Type' : 'application/json',
    'x-api-key' : apiKey
    }
  }
  async function fetchSingleBreed() {
    setLoading(true)
      axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${id}&limit=10`,options)
      .then((response)=>{
        setLoading(false)
        setBreed(response.data)})
      .catch((error)=>{
        setLoading(false)
        navigate('/error')
        console.log(error)})
    
  }
  useEffect(()=>{
    fetchSingleBreed()
  },[])

  return (
    <div>
      {!loading ? (
      <Grid columns={6} textAlign='center'>

        <div class="projcard projcard-blue">
          <div class="projcard-innerbox">
            <img class="projcard-img" src={breeds[0].url} />
            <div class="projcard-textbox">
              <div class="projcard-title">{breeds[0].breeds[0].name.toUpperCase()}</div>
              <div class="projcard-subtitle">{breeds[0].breeds[0].temperament}</div>
              <div class="projcard-bar"></div>
              <div class="projcard-description">{breeds[0].breeds[0].description}</div>
              <div class="projcard-tagbox">
                <span class="projcard-tag"><Flag size='medium' name={breeds[0].breeds[0].country_code.toLowerCase()}></Flag>{breeds[0].breeds[0].origin}</span>
                <span class="projcard-tag">{breeds[0].breeds[0].weight.metric} KG</span>
              </div>   
              <Button className='breedbutton' color='teal' floated='right'>
                  <a href={breeds[0].breeds[0].wikipedia_url} style={{ color: 'white' }}>Wikipedia</a>
                </Button>
                <Button className='breedbutton' color='teal' floated='right'>
                  <a href={breeds[0].breeds[0].vetstreet_url} style={{ color: 'white' }}>Vetstreet</a>
                </Button>
            </div>
          </div>
	      </div>
            
        <Segment className='segment'>
        <Table celled padded style={{minWidth:1000}}>
          <Table.Header style={{minWidth:1000}}>
            <Table.Row>
              <Table.HeaderCell textAlign='center'>Adaptability</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Affection Level</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Child Friendly</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Dog Friendly</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Energy Level</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Grooming</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Health Issues</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row textAlign='center'>
              <Table.Cell>
                <Rating  icon='heart' color='teal' defaultRating={breeds[0].breeds[0].adaptability} maxRating={5} disabled/>
              </Table.Cell>
              <Table.Cell>
                <Rating icon='heart' defaultRating={breeds[0].breeds[0].affection_level} maxRating={5} disabled/>
              </Table.Cell>
              <Table.Cell>
                <Rating icon='heart' defaultRating={breeds[0].breeds[0].child_friendly} maxRating={5} disabled/>
              </Table.Cell>
              <Table.Cell>
                <Rating icon='heart' defaultRating={breeds[0].breeds[0].dog_friendly} maxRating={5} disabled/>
              </Table.Cell>
              <Table.Cell>
                <Rating icon='heart' defaultRating={breeds[0].breeds[0].energy_level} maxRating={5} disabled/>
              </Table.Cell>
              <Table.Cell>
                <Rating icon='heart' defaultRating={breeds[0].breeds[0].grooming} maxRating={5} disabled/>
              </Table.Cell>
              <Table.Cell>
                <Rating icon='heart' defaultRating={breeds[0].breeds[0].health_issues} maxRating={5} disabled/>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        </Segment>

        <Segment>
        <Table celled padded style={{minWidth:1000}}>
          <Table.Header>
            <Table.Row >
              <Table.HeaderCell textAlign='center'>Intelligence</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Shedding Level</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Social Needs</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Hypoallergic</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Hairless</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Stranger Friendly</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Vocalisation</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row textAlign='center'>
              <Table.Cell>
                <Rating  icon='heart' color='teal' defaultRating={breeds[0].breeds[0].intelligence} maxRating={5} disabled/>
              </Table.Cell>
              <Table.Cell>
                <Rating icon='heart' defaultRating={breeds[0].breeds[0].shedding_level} maxRating={5} disabled/>
              </Table.Cell>
              <Table.Cell>
                <Rating icon='heart' defaultRating={breeds[0].breeds[0].social_needs} maxRating={5} disabled/>
              </Table.Cell>
              <Table.Cell>
                <Rating icon='heart' defaultRating={breeds[0].breeds[0].hypoallergic} maxRating={5} disabled/>
              </Table.Cell>
              <Table.Cell>
                <Rating icon='heart' defaultRating={breeds[0].breeds[0].hairless} maxRating={5} disabled/>
              </Table.Cell>
              <Table.Cell>
                <Rating icon='heart' defaultRating={breeds[0].breeds[0].stranger_friendly} maxRating={5} disabled/>
              </Table.Cell>
              <Table.Cell>
                <Rating icon='heart' defaultRating={breeds[0].breeds[0].vocalisation} maxRating={5} disabled/>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        </Segment>

        <Grid.Row columns={4}>
            {breeds.map((breed)=>
              <Grid.Column>
                    <CatCard cat={breed}/>
              </Grid.Column>
            )}
        </Grid.Row>
        </Grid>
        ):<>
          <Loader active inline='centered' >  Loading</Loader>
        </>}
  </div>
  )
}

export default SingleBreed