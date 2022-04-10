import React from 'react';

const ImageDetails = ({pickedImage, breeds}) => {

    return(
        <div className='imageDetailsContainer'>
            <img src={pickedImage?.url}  className="img-fluid"/>
                    
            {pickedImage?.breeds && pickedImage?.breeds.map((breed) => {
                return (
                    <div id="my-modal-description" key={breed?.id}>
                        <h4>Breed: {breed?.name}</h4>
                        <h6>Description</h6>
                        <p>{breed?.description}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default ImageDetails;