import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useListStateContext } from '../state/useListStateContext';
import { z } from 'zod';
import { type Item } from "../hooks/useListState"
import Header from "../components/Header";
import ListItems from "../components/ListItems"

const ListPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>();
    const [{ items, page, scrollPosition }, setListState] = useListStateContext();
    const loader = useRef(null);


    const fetchItems = async () => {
        if (loading) {
            return;
        }

        setError(null);
        setLoading(true);

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`);
            const newData = await response.json();
            const updatedItems = [...items, ...newData];
            const rawFavorites = localStorage.getItem('favorites') || '[]';

            const favoriteItemSchema = z.object({
                id: z.number(),
            });

            const favoritesSchema = z.array(favoriteItemSchema);
            const favorites = favoritesSchema.parse(JSON.parse(rawFavorites));


            setListState((prevState) => ({
                ...prevState,
                items: updatedItems.map(i => ({
                    ...i,
                    isFavorite: favorites.some((f) => i.id === f.id),
                })),
                page: prevState.page + 1,
            }));
        } catch (error) {
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !loading && !error) {
                fetchItems();
            }
        }, { threshold: 0.1 });

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    useEffect(() => {
        window.scrollTo(0, scrollPosition);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleFavorite = (itemId: number) => {
        const updatedItems = items.map(item => {
            if (item.id === itemId) {
                return { ...item, isFavorite: !item.isFavorite };
            }
            return item;
        });
        setListState(prevState => ({ ...prevState, items: updatedItems }));
        saveFavoritesToLocalStorage(updatedItems)
    };

    const saveFavoritesToLocalStorage = (items: Item[]) => {
        const favorites = items.filter(item => item.isFavorite);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    };


    return (
        <div>
            <Header
                button={{
                    onClick: () => {
                        setListState((prevState) => ({ ...prevState, scrollPosition: window.pageYOffset }));
                        navigate('/')
                    },
                    label: '← Back to Dashboard',
                    id: 'backToDashboardButton'
                }}
            />
            <div className='itemWrapper'>
                <ListItems
                    items={items}
                    favoriteProps={{
                        onClick: (id) => toggleFavorite(id),
                        showButton: true
                    }} />
                {loading && <p>Loading more items...</p>}
                <div ref={loader} className="loader"></div>
                {error &&
                    <>
                        <p className="error">{error}</p>
                        <button onClick={() => fetchItems()} >
                            Reload
                        </button>
                    </>
                }
            </div>
        </div >
    );
};


export default ListPage;
