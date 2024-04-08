import { type Item } from "../hooks/useListState"
import ListItem from "./ListItem"
import { type FavoriteProps } from "./ItemTypes"


type ItemsListProps = {
    items: Item[];
    favoriteProps?: FavoriteProps;
};


const ItemsList: React.FC<ItemsListProps> = ({ items, favoriteProps }) => {
    return <div className='itemWrapper'>
        {items.map((item) =>
            <ListItem
                key={item.id}
                id={item.id}
                isFavorite={item.isFavorite}
                thumbnailUrl={item.thumbnailUrl}
                title={item.title}
                favoriteProps={favoriteProps}
            />

        )}
    </div>;
}

export default ItemsList;