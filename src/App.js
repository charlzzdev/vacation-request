import React, { useState } from 'react';
import Login from './Login';
import GeneralView from './GeneralView';
import AdminView from './AdminView';

function App() {
      const [userInfo, setUserInfo] = useState({});

      return (
            <div className="App">
                  {
                        userInfo.hasOwnProperty('user') ? (
                              userInfo.user.uid === 'NhNHSSt9GkRUt4bTWsxhTJDdQGE2' ? <AdminView /> : <GeneralView userInfo={userInfo} />
                        ) : <Login setUserInfo={setUserInfo} />
                  }
            </div>
      );
}

export default App;
