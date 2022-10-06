import React from 'react'
import {useState,useEffect} from 'react';
import { Link ,useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {Button,Modal,Flag,Icon,Image} from 'semantic-ui-react'
import axios from 'axios';

function CatCard({cat,page}) {

    const apiKey = process.env.REACT_APP_CAT_KEY
    const [open, setOpen] = useState(false)

    let location = useLocation();
    let navigate = useNavigate();
    

    const options = {
      method : 'GET',
      headers:{
      'Content-Type' : 'application/json',
      'x-api-key' : apiKey
      }
    }
         
     function onClickAddFavorite(e,catId){
        e.preventDefault()
        
        var rawBody = JSON.stringify({ 
            "image_id": catId,
            "sub_id":"user-"
             });
       
         axios.post(
            `https://api.thecatapi.com/v1/favourites`, 
            rawBody,options)
            .then((response)=>console.log(response))
            .catch((error)=>{
                navigate('/error')
                console.log(error)})
    }

  return (
    <>
    <Modal
        onClose={(e) => {
            e.stopPropagation();
            navigate(location);
            setOpen(false)}}
        onOpen={() => {
            setOpen(true)}}
        open={open}
        trigger={<Button as={Link} to={`/images/${cat.id}`} state={{ cat: cat ,background:location}} className='buttonshad'>      
            <Image src={cat.url} style={{Width: 200,Height: 200,minWidth:200,minHeight:200,maxHeight:200,minHeight:200}}/>
            </Button>}
    >
        <Modal.Content >
            {cat.breeds[0] ? (
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
                    {page==='home page' && 
                        <Button 
                        as={Link}
                        color="teal"
                        to={`/breeds/${cat.breeds[0].id}`}
                        >{cat.breeds[0].name} Page
                        </Button>}   
                </div>
                </>
            ):
            <>
                <div class="projcard projcard-blue">
                        <div class="projcard-innerbox">
                            <img class="projcard-img" src={cat.url} />
                            <div class="projcard-textbox">
                            <div class="projcard-description">Unfortunately, there is no further info about this cat.</div>
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
        </Modal.Content>
    </Modal>
  </>
  )
}

export default CatCard