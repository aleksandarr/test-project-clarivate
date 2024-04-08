import { type Item } from "../hooks/useListState"

export type FavoriteProps = {
    onClick: (id: Item['id']) => void;
    showButton: boolean;
}