import { ReactNode } from 'react';
import { useListState as useListStateHook } from '../hooks/useListState';
import ListStateContext from './ListStateContext';

interface ListStateProviderProps {
    children: ReactNode;
}

export const ListStateProvider = ({ children }: ListStateProviderProps) => {
    const [listState, setListState] = useListStateHook();

    return (
        <ListStateContext.Provider value={[listState, setListState]}>
            {children}
        </ListStateContext.Provider>
    );
};
