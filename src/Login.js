import React, { useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { TextInput, Button, Preloader } from 'react-materialize'

const Login = ({ setUserInfo }) => {
      const [loading, setLoading] = useState(false);

      const handleSubmit = (e) => {
            e.preventDefault();
            setLoading(true);
            firebase.auth().signInWithEmailAndPassword(e.target[0].value, e.target[1].value)
                  .then(data => {
                        setUserInfo(data);
                        setLoading(false);
                  });
      }

      return (
            <form className="Login" onSubmit={handleSubmit}>
                  <h1>Bejelentkezés</h1>
                  <TextInput type="email" label="E-mail" />
                  <TextInput type="password" label="Jelszó" />
                  <Button>Bejelentkezés</Button>
                  <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
                        {loading && <Preloader flashing />}
                  </div>
            </form>
      )
}

export default Login
