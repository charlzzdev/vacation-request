import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { TextInput, Button } from 'react-materialize'

const Login = ({ setUserInfo }) => {
      const handleSubmit = (e) => {
            e.preventDefault();
            firebase.auth().signInWithEmailAndPassword(e.target[0].value, e.target[1].value)
                  .then(data => setUserInfo(data));
      }

      return (
            <form className="Login" onSubmit={handleSubmit}>
                  <h1>Bejelentkezés</h1>
                  <TextInput type="email" label="E-mail" />
                  <TextInput type="password" label="Jelszó" />
                  <Button>Bejelentkezés</Button>
            </form>
      )
}

export default Login
