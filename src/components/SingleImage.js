import React from 'react'
import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate ,useLocation} from 'react-router-dom';
import {Grid,Card,Label,Button,Modal,Flag,Icon,Header,Container,Image,Row} from 'semantic-ui-react'
import axios from 'axios';

function SingleImage() {
    const apiKey = process.env.REACT_APP_CAT_KEY
    const location = useLocation()
    let history = useNavigate();
    const { cat } = location.state
    const options = {
      method : 'GET',
      headers:{
      'Content-Type' : 'application/json',
      'x-api-key' : apiKey
      }
    }
    const [open, setOpen] = useState(false)
    // const id = cat.match.params.id;
    const navigate = useNavigate()
    if(cat.breeds){
        console.log(cat.breeds[0],"CAT BREEDS")
    }
   
         
     function onClickAddFavorite(e,catId){
        e.preventDefault()
        console.log(apiKey,"apikeyyyyy")
        var rawBody = JSON.stringify({ 
            "image_id": catId,
            "sub_id":"user-"
             });
       

         axios.post(
            `https://api.thecatapi.com/v1/favourites`, 
            rawBody,options
                
            ).then((response)=>console.log(response))
            .catch((error)=>console.log(error))
    }

    return (
    <>
        <Modal
        onClose={() => {
            
            setOpen(false)
            navigate('/')}}
        onOpen={() => {
            // navigate({ pathname: `/cat/${cat.id}`, cat: { cat } })
            setOpen(true)}}
        open={open}
        
        trigger={<Button>
            
        <Image src={cat.url} style={{Width: 200,Height: 200,minWidth:200,minHeight:200,maxHeight:200,minHeight:200}}/>
        </Button>}
        >
        <Modal.Content >
            <div >
            {cat.breeds[0]!==undefined ? (
                <>
                <div class="projcard projcard-blue">
                    <div class="projcard-innerbox">
                        <img class="projcard-img" src={cat.url} />
                        <div class="projcard-textbox">
                        <div class="projcard-title">{cat.breeds[0].name.toUpperCase()}</div>
                        <div class="projcard-subtitle">{cat.breeds[0].temperament}</div>
                        <div class="projcard-bar"></div>
                        <div class="projcard-description">{cat.breeds[0].description}</div>
                        <div class="projcard-tagbox">
                            <span class="projcard-tag"><Flag size='medium' name={cat.breeds[0].country_code.toLowerCase()}></Flag>{cat.breeds[0].origin}</span>
                            <span class="projcard-tag">{cat.breeds[0].weight.metric} KG</span>
                            
                        </div>
                        </div>
                    </div>
	            </div>
                <div style={{display: 'flex',alignItems: 'center' , justifyContent: 'center'}}>
                    <Button icon color="teal" labelPosition='center' onClick={(e)=>{onClickAddFavorite(e,cat.id)}}>
                        <Icon name='heart' />
                            Favorite
                    </Button>
                    <Button 
                        as={Link}
                        color="teal"
                        to={`/breeds/${cat.breeds[0].id}`}
                        >{cat.breeds[0].name} Page
                    </Button>
                </div>
                </>
            ):
            <>
                <div class="projcard projcard-blue">
                        <div class="projcard-innerbox">
                            <img class="projcard-img" src={cat.url} />
                            <div class="projcard-textbox">
                            <div class="projcard-description">Unfortunately,there is no further info about this cat.</div>
                            </div>
                        </div>
                    </div>
                <div style={{display: 'flex',alignItems: 'center' , justifyContent: 'center'}}>
                <Button icon color="teal" labelPosition='center' onClick={(e)=>{onClickAddFavorite(e,cat.id)}}>
                    <Icon name='heart' />
                        Favorite
                </Button>
                </div>
             </>
            }
            </div> 
        </Modal.Content>
    </Modal>
  </>
  )
}

export default SingleImage