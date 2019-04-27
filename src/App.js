import React, { useState } from 'react';
import Login from './Login';

function App() {
      const [userInfo, setUserInfo] = useState({});

      return (
            <div className="App">
                  {
                        userInfo.hasOwnProperty('user') ? (
                              <div>
                                    logged in {console.log(userInfo)}
                              </div>
                        ) : <Login setUserInfo={setUserInfo} />
                  }
            </div>
      );
}

export default App;
