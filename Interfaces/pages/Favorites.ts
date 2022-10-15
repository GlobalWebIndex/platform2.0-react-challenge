export interface FavoriteProps {
    id: number,
    user_id?: string,
    image_id?: string,
    sub_id?: string,
    created_at: string,
    image: {
        id: string,
        url: string
    }
};

export type FavoritesListProps = FavoriteProps[];