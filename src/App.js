import React, { useState } from 'react';
import Login from './Login';
import { DatePicker } from 'react-materialize';

function App() {
      const [userInfo, setUserInfo] = useState({});
      const dateOptions = {
            firstDay: 1,
            format: 'yyyy. mmm. d.',
            i18n: {
                  cancel: 'Mégse',
                  months: ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'],
                  monthsShort: ['Jan', 'Feb', 'Márc', 'Ápr', 'Máj', 'Jún', 'Júl', 'Aug', 'Szept', 'Okt', 'Nov', 'Dec'],
                  weekdays: ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'],
                  weekdaysShort: ['Vas', 'Hét', 'Kedd', 'Szer', 'Csüt', 'Pén', 'Szom'],
                  weekdaysAbbrev: ['Va', 'Hé', 'Ke', 'Sze', 'Cs', 'Pé', 'Szo']
            }
      };

      return (
            <div className="App">
                  {
                        userInfo.hasOwnProperty('user') ? (
                              <div>
                                    logged in {console.log(userInfo)}
                                    <DatePicker options={dateOptions} />
                                    <DatePicker options={dateOptions} />
                              </div>
                        ) : <Login setUserInfo={setUserInfo} />
                  }
            </div>
      );
}

export default App;
