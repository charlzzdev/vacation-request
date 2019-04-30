import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { Preloader } from 'react-materialize'

const AdminView = () => {
      const [vacationList, setVacationList] = useState([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            firebase.firestore().collection('users').onSnapshot(data => {
                  setVacationList([]);
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
      }, []);

      const handleDecision = (decision, name, indexInVacationDays) => {
            firebase.firestore().collection('users')
                  .where('firstName', '==', name.split(' ')[1])
                  .where('lastName', '==', name.split(' ')[0])
                  .get().then(data => {
                        data.docs.forEach(doc => {
                              let result = [
                                    ...doc.data().vacationDays
                              ];
                              result[indexInVacationDays] = {
                                    ...doc.data().vacationDays[indexInVacationDays],
                                    status: decision
                              };
                              
                              firebase.firestore().collection('users').doc(doc.id).update({
                                    vacationDays: result
                              });
                        })
                  })
      }

      return (
            <div className="AdminView">
                  {
                        vacationList.length > 0 ? vacationList.map(vacation => (
                              vacation.vacationDays.length > 0 && <div key={vacation.name} className="admin-view-item">
                                    <h6 style={{ fontWeight: 700 }}>{vacation.name}</h6>
                                    <ul>
                                          {
                                                vacation.vacationDays.map((date, i) => (
                                                      <li key={Math.random()} style={{
                                                            background: date.status === 'approved' ? '#2ad61a80' : date.status === 'denied' ? '#d61a1a80' : '#fcf01180'
                                                      }}>
                                                            {date.from} - {date.to}
                                                            <i className="far fa-check-circle"
                                                                  onClick={() => handleDecision('approved', vacation.name, i)}
                                                            ></i>
                                                            <i className="far fa-times-circle"
                                                                  onClick={() => handleDecision('denied', vacation.name, i)}
                                                            ></i>
                                                      </li>
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