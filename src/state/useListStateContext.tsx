import { useContext } from 'react';
import ListStateContext from './ListStateContext';

export const useListStateContext = () => {
    const context = useContext(ListStateContext);
    if (context === undefined) {
        throw new Error('useListState must be used within a ListStateProvider');
    }
    return context;
};
