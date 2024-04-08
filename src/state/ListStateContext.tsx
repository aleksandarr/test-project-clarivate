import { createContext } from 'react';
import { ListState } from '../hooks/useListState';

const ListStateContext = createContext<[ListState, (newState: Partial<ListState> | ((prevState: ListState) => Partial<ListState>)) => void] | undefined>(undefined);

export default ListStateContext;
