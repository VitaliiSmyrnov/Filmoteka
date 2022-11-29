import Notiflix from 'notiflix';

import {
  openModalAuth,
  closeLoginBtn,
  closeRegBtn,
  closeResultBtn,
  modalAuth, headerLibrary } from './refs';

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBtKaEcUEQWN44AziiICiZMjqUTd7DBtqw",
  authDomain: "filmoteka-22213.firebaseapp.com",
  projectId: "filmoteka-22213",
  storageBucket: "filmoteka-22213.appspot.com",
  messagingSenderId: "751406234414",
  appId: "1:751406234414:web:e23b0d4cf2395f6aeb98bf"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

if (headerLibrary) {
  headerLibrary.addEventListener('click', e => {
    if (!auth.currentUser) {
      e.preventDefault();
      Notiflix.Notify.warning('Please log in or register to get access to your library');
    }
  });
}

openModalAuth.addEventListener('click', toggleModal);
closeLoginBtn.addEventListener('click', toggleModal);
closeRegBtn.addEventListener('click', toggleModal);
closeResultBtn.addEventListener('click', toggleModal);

function toggleModal() {
  modalAuth.classList.toggle('is-hidden');
  document.getElementById('register-div').style.display = 'none';
  document.getElementById('login-div').style.display = 'inline';
  document.getElementById('result-box').style.display = 'none';
}

onAuthStateChanged(auth, user => {
  if (auth.currentUser !== null) {
    openModalAuth.style.display = 'none';
    document.getElementById('auth-btn-icon').style.display = 'none';
    document.getElementById('log-out-btn').style.display = 'block';
    document.getElementById('log-out-btn').innerHTML =
      'LOG OUT';
  } else {
    openModalAuth.style.display = 'inline';
    document.getElementById('auth-btn-icon').style.display = 'inline';
  }
});

document.getElementById('reg-btn').addEventListener('click', function () {
  document.getElementById('register-div').style.display = 'inline';
  document.getElementById('login-div').style.display = 'none';
});
document.getElementById('log-btn').addEventListener('click', function () {
  document.getElementById('register-div').style.display = 'none';
  document.getElementById('login-div').style.display = 'inline';
});

document.getElementById('login-btn').addEventListener('click', function () {
  const loginEmail = document.getElementById('login-email').value;
  const loginPassword = document.getElementById('login-password').value;
  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then(userCredential => {
      const user = userCredential.user;
      document.getElementById('result-box').style.display = 'inline';
      document.getElementById('login-div').style.display = 'none';
      document.getElementById('result').innerHTML = 'Welcome back!'; 
      document.getElementById('result-box').style.textAlign = 'center';
      openModalAuth.style.display = 'none';
      document.getElementById('auth-btn-icon').style.display = 'none';
      document.getElementById('log-out-btn').style.display = 'block';
      document.getElementById('log-out-btn').innerHTML = 'LOG OUT';
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById('result-box').style.display = 'inline';
      document.getElementById('login-div').style.display = 'none';
      document.getElementById('result').innerHTML =
        'Something went wrong.<br>' +
        'Please check your email or password.';
      document.getElementById('result').style.textAlign = 'center';
    });
});

document.getElementById('register-btn').addEventListener('click', function () {
  const registerEmail = document.getElementById('register-email').value;
  const registerPassword = document.getElementById('register-password').value;
  createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
    .then(userCredential => {
      const user = userCredential.user;
      document.getElementById('result-box').style.display = 'inline';
      document.getElementById('register-div').style.display = 'none';
      document.getElementById('result').innerHTML =
        'Successful registration!';
      document.getElementById('result').style.textAlign = 'center';
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById('result-box').style.display = 'inline';
      document.getElementById('register-div').style.display = 'none';
      document.getElementById('result').innerHTML =
        'Oops! <br> Something went wrong!<br>' +
        'Check your email or password please.';
      document.getElementById('result-box').style.textAlign = 'center';
    });
});

document.getElementById('log-out-btn').addEventListener('click', function () {
  signOut(auth)
    .then(() => {
      document.getElementById('result-box').style.display = 'none';
      document.getElementById('login-div').style.display = 'inline';
      openModalAuth.style.display = 'inline';
      document.getElementById('auth-btn-icon').style.display = 'inline';
      document.getElementById('log-out-btn').style.display = 'none';
    })
    .catch(error => {
      document.getElementById('result').innerHTML =
        'Sorry! <br> Something is wrong.<br>';
      document.getElementById('result').style.textAlign = 'center';
    });
});