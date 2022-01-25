import React, { useContext } from 'react';
import appContext from '../context/appContext';

function Home() {
    let {userId} = useContext(appContext);
    return (
        <div>
            this is Home {userId || 'not available'}
        </div>
    );
}

export default Home;
