import { useState } from 'react';

export type Item = {
    albumId: number;
    id: number;
    thumbnailUrl: string;
    title: string;
    url: string;
    isFavorite?: boolean
};

export type ListState = {
    items: Item[];
    page: number;
    scrollPosition: number;
}

export const useListState = (): [ListState, (newState: Partial<ListState> | ((prevState: ListState) => Partial<ListState>)) => void] => {
    const initialState: ListState = {
        items: [],
        page: 1,
        scrollPosition: 0,
    };


    const [state, setState] = useState<ListState>(initialState);


    const setListState = (newState: Partial<ListState> | ((prevState: ListState) => Partial<ListState>)) => {
        setState((prevState) => {
            const updatedState: Partial<ListState> = typeof newState === 'function' ? newState(prevState) : { ...prevState, ...newState };
            return { ...prevState, ...updatedState };
        });
    };

    return [state, setListState];
};
