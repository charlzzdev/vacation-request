import React from 'react'

const Login = () => {
      return (
            <form className="Login">
                  <h1>Bejelentkezés</h1>
                  <div className="input-field">
                        <label>E-mail</label>
                        <input type="text" name="email" />
                  </div>
                  <div className="input-field">
                        <label>Jelszó</label>
                        <input type="password" />
                  </div>
                  <button className="btn">Bejelentkezés</button>
            </form>
      )
}

export default Login
