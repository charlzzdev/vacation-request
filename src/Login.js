import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

const Login = ({ setUserInfo }) => {
      const handleSubmit = (e) => {
            e.preventDefault();
            firebase.auth().signInWithEmailAndPassword(e.target[0].value, e.target[1].value)
                  .then(data => setUserInfo(data));
      }

      return (
            <form className="Login" onSubmit={handleSubmit}>
                  <h1>Bejelentkezés</h1>
                  <div className="input-field">
                        <label>E-mail</label>
                        <input type="text" name="email" autoFocus />
                  </div>
                  <div className="input-field">
                        <label>Jelszó</label>
                        <input type="password" name="password" />
                  </div>
                  <button className="btn">Bejelentkezés</button>
            </form>
      )
}

export default Login
