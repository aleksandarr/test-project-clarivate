import { useNavigate } from 'react-router-dom';
import { type Item } from "../hooks/useListState";
import Header from "../components/Header";
import ListItems from '../components/ListItems';

const Dashboard = () => {
    const items: Item[] = (JSON.parse(localStorage.getItem('favorites') || '[]'));
    const navigate = useNavigate();

    const navigateToListPage = () => {
        navigate('/list');
    };

    return <div>
        <Header
            button={{
                onClick: navigateToListPage,
                label: 'Go to list page',
                id: 'navigateToListButton'
            }}
        />
        {items.length !== 0 ?
            <div id="dashboardListItems">
                <ListItems items={items} />
            </div>
            : <>
                <p>No favorites yet. </p>
                <p>Go to list page and choose favorite items</p>
                <button
                    onClick={navigateToListPage}>Go to list page</button>
            </>}
    </div >
}

export default Dashboard;