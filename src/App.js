import React, { useState } from 'react';
import Login from './Login';
import GeneralView from './GeneralView';

function App() {
      const [userInfo, setUserInfo] = useState({});

      return (
            <div className="App">
                  {
                        userInfo.hasOwnProperty('user') ? <GeneralView userInfo={userInfo} /> : <Login setUserInfo={setUserInfo} />
                  }
            </div>
      );
}

export default App;
