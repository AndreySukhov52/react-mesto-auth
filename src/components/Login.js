import {useState} from 'react';

export default function Login({onLogin}) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handlePasswordInput = evt => {
    setPassword(evt.target.value);
  };

  const handleEmailInput = evt => {
    setEmail(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
   onLogin(email, password);
  };

  return (
    <section className='login'>
      <h3 className='register__title'>Вход</h3>
      <form className='register__form' onSubmit={handleSubmit}>
        <input className='register__input' type='email' placeholder='Email' value={email} onChange={handleEmailInput} required></input>
        <span className="popup__input-error"></span>
        <input className='register__input' type='password' placeholder='Пароль' value={password} onChange={handlePasswordInput} required></input>
        <span className="popup__input-error"></span>
        <button className='register__submit-button' type='submit'>Войти</button>
      </form>
    </section>
  );
};