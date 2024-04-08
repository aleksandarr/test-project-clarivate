import { type Item } from "../hooks/useListState"
import { type FavoriteProps } from "./ItemTypes"
import Card from "./Card"


const ListItem: React.FC<Pick<Item, "id" | "thumbnailUrl" | "title" | "isFavorite"> & {
    favoriteProps?: FavoriteProps
}> = ({ id,
    thumbnailUrl,
    title,
    isFavorite,
    favoriteProps }) =>
        <Card>
            <p>{id}</p>
            <img className="listItemImage" src={thumbnailUrl} alt={title} />
            <p>{title}</p>
            {favoriteProps?.showButton &&
                <button
                    className="favoriteButton"
                    id={`favoriteButton_${id}`}
                    onClick={() => favoriteProps?.onClick(id)}>
                    {isFavorite ? '🩶' : '❤️'}
                </button>}
        </Card>

export default ListItem;