import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { Preloader } from 'react-materialize'

const AdminView = () => {
      const [vacationList, setVacationList] = useState([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            console.log('effect')
            firebase.firestore().collection('users').get().then(data => {
                  data.docs.forEach(doc => {
                        setVacationList(vacation => [
                              ...vacation,
                              {
                                    name: `${doc.data().lastName} ${doc.data().firstName}`,
                                    vacationDays: doc.data().vacationDays || []
                              }
                        ])
                  })
                  setLoading(false);
            })
      }, [])

      return (
            <div className="AdminView">
                  {
                        vacationList.length > 0 ? vacationList.map(vacation => (
                              vacation.vacationDays.length > 0 && <div key={vacation.name} className="admin-view-item">
                                    <h6 style={{ fontWeight: 700 }}>{vacation.name}</h6>
                                    <ul>
                                          {
                                                vacation.vacationDays.map(date => (
                                                      <li key={Math.random()}>{date.from} - {date.to}</li>
                                                ))
                                          }
                                    </ul>
                              </div>
                        )) : !loading && <h3>Senki sem kér szabadnapot jelenleg.</h3>
                  }
                  {loading && <Preloader flashing />}
            </div>
      )
}

export default AdminView