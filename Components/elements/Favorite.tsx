import { HeartIcon as HeartFullIcon } from "@heroicons/react/24/solid";
import { AppContext } from "context/AppProvider";
import { ContextProps } from "interfaces/context/Context";
import { useContext, useState } from "react";
import { FavoriteProps } from "interfaces/elements/Favorite";
import { fetchData } from "helpers/net/fetchData";
import { endpoints } from "configuration/endpoints";
import { constants } from "configuration/constants";

export const Favorite = ({ imageId }: FavoriteProps) => {
    const [disabled, setDisabled] = useState(false);
    const { favorites, addToFavorites, removeFromFavorites } = useContext<ContextProps>(AppContext);
    const favorite = Array.isArray(favorites) && favorites.find((item) => item.imageId === imageId);

    //call the api service to add to favorites; if successful, update our internal state
    const handleAddToFavorites = async () => {
        const result = await fetchData({method: "post", data: {image_id: imageId, sub_id: constants.sub_id}, endpoint: endpoints.favorite, onStart: () => setDisabled(true), onEnd: () => setDisabled(false), apikey: constants.apikey});

        if(imageId && result?.message === "SUCCESS" && typeof addToFavorites === "function")
            addToFavorites({ imageId: imageId, favoriteId: result?.id });
    };

    //call the api service to remove from favorites; if successful, update our internal state
    const handleRemoveFromFavorites = async () => {
        const id = (favorite) && favorite?.favoriteId;
        const result = await fetchData({method: "delete", endpoint: `${endpoints.favorite}${id}`, onStart: () => setDisabled(true), onEnd: () => setDisabled(false), apikey: constants.apikey});

        if(imageId && id && result?.message === "SUCCESS" && typeof removeFromFavorites === "function")
            removeFromFavorites({ imageId: imageId, favoriteId: id });
    };

    return (
        <div className={`hover:scale-120 transition-transform absolute top-4 left-4 cursor-pointer z-10 ${(disabled) && "pointer-events-none scale-90"}`} onClick={() => {(!favorite) ? handleAddToFavorites() : handleRemoveFromFavorites() }}>
            <HeartFullIcon className={`drop-shadow-lg ${(!favorite) ? "text-white" : "text-red-600"}`} width={32} height={32} />
        </div>
    )
};