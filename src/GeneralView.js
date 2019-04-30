import React, { useState, useEffect } from 'react'
import { DatePicker, Button, TextInput, Preloader } from 'react-materialize'
import firebase from 'firebase/app'
import 'firebase/firestore'

const GeneralView = ({ userInfo }) => {
      const [newUser, setNewUser] = useState(false);
      const [userData, setUserData] = useState({});
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            firebase.firestore().doc(`users/${userInfo.user.email}`).onSnapshot(user => {
                  if (user.data() === undefined) {
                        setNewUser(true);
                  } else {
                        setUserData({
                              firstName: user.data().firstName,
                              lastName: user.data().lastName,
                              vacationDays: user.data().vacationDays
                        });
                  }
                  setLoading(false);
            })
      }, [userInfo.user.email]);

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

      const handleNameSubmit = (e) => {
            e.preventDefault();
            if (e.target[0].value !== '' && e.target[1].value !== '') {
                  const nameObj = {
                        firstName: e.target[1].value,
                        lastName: e.target[0].value
                  };
                  setUserData(nameObj);
                  firebase.firestore().collection('users').doc(userInfo.user.email).set(nameObj);
                  setNewUser(false);
            }
      }

      const handleVacationSubmit = async (e) => {
            e.preventDefault();
            let vacationDays = [];
            await firebase.firestore().doc(`users/${userInfo.user.email}`).get()
                  .then(user => {
                        vacationDays = user.data().vacationDays || [];
                  })

            const fromDate = document.getElementById('from-date').value;
            const toDate = document.getElementById('to-date').value;
            fromDate !== '' && toDate !== '' && await firebase.firestore().doc(`users/${userInfo.user.email}`).update({
                  vacationDays: [
                        ...vacationDays,
                        {
                              from: fromDate,
                              to: toDate
                        }
                  ]
            });
      }

      return (
            <>
                  {
                        newUser ?
                              <form className="name-form" onSubmit={handleNameSubmit}>
                                    <h5>Kérlek add meg a vezeték- és keresztneved.</h5>
                                    <TextInput type="text" label="Vezetéknév" />
                                    <TextInput type="text" label="Keresztnév" />
                                    <Button>Ok</Button>
                              </form>
                              :
                              <>
                                    <form className="GeneralView" onSubmit={handleVacationSubmit}>
                                          <div className="info-text">Szabadnap kezelés <strong>{userData.lastName} {userData.firstName}</strong> számára</div>
                                          <div className="date-wrapper">
                                                <DatePicker label="Ettől" options={dateOptions} id="from-date" />
                                                <DatePicker label="Eddig" options={dateOptions} id="to-date" />
                                          </div>
                                          <Button>Szabadnap kérelmezése</Button>
                                    </form>

                                    <div className="info-text">Kivett szabadnapok listája</div>
                                    <ul className="personal-vacation-list">
                                          {
                                                userData.vacationDays ? userData.vacationDays.map(date => (
                                                      <li key={date.from} style={{
                                                            background: date.status === 'approved' ? '#2ad61a80' : date.status === 'denied' ? '#d61a1a80' : '#fcf01180'
                                                      }}>{date.from} - {date.to}</li>
                                                )) : !loading && <li>Még nem kértél szabadnapot.</li>
                                          }
                                          {loading && <Preloader flashing />}
                                    </ul>
                              </>
                  }
            </>
      )
}

export default GeneralView
