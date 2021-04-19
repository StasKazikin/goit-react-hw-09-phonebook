import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from '../redux/auth';

const styles = {
  form: {
    width: 320,
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 15,
  },
};

// const mapDispatchToProps = {
//   onLogin: authOperations.logIn,
// };

// export default connect(null, mapDispatchToProps)(LoginView);

export default function LoginView() {
  const dispatch = useDispatch();
  const onLogin = user => dispatch(authOperations.logIn(user));

  // state = {
  //   email: '',
  //   password: '',
  // };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const handleInputEmail = e => setEmail(e.target.value);
  // const handleInputPassword = e => setPassword(e.target.value);

  const handleInput = event => {
    const { name, value } = event.target;

    name === 'email' ? setEmail(value) : setPassword(value);
  };

  const reset = () => {
    // this.setState({ email: '', password: '' });
    setEmail('');
    setPassword('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    // dispatch(authOperations.logIn({ email, password }));

    onLogin({ email, password });

    reset();
  };

  return (
    <div>
      <h1>Страница логина</h1>

      <form onSubmit={handleSubmit} style={styles.form} autoComplete="off">
        <label style={styles.label}>
          Почта
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInput}
          />
        </label>

        <label style={styles.label}>
          Пароль
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleInput}
          />
        </label>

        <button type="submit">Войти</button>
      </form>
    </div>
  );
}
