import React, { useEffect, useState } from 'react'
import './auth.scss'
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { app } from '../../config/firebase/firebaseConfig';
import { setDoc, doc, getFirestore, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Auth = ({
    title,
    isRegister
}) => {   

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const db = getFirestore(app)
    const navigate = useNavigate()

    provider.setCustomParameters({
        prompt: 'select_account'
    });

    const [credentials, setCredentials] = useState({})
    const [user, setUser] = useState(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                console.log('User is signed in:', currentUser);
                navigate('/')
            } else {
                setUser(null);
                console.log('No user is signed in.');
            }
        });

        return () => unsubscribe();
    }, [auth]);

    const handleChange = e => {
        const {name, value} = e.target
        setCredentials(prev => ({...prev, [name]: value}))
    }

    const handleEmailPasswordButton = (e) => {

        e.preventDefault()
        const {email, password, name} = credentials
        if (isRegister) {
            createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
        
                // Store user data in Firestore
                await setDoc(doc(db, 'users', user.uid), {
                    uid: user.uid,
                    name: name,
                    email: user.email,
                    createdAt: new Date(),
                });
        
                console.log('User signed up and stored:', user);
            })
            .catch((error) => {
                console.error('Error signing up:', error);
                alert(error.message)
            });

        } else {
            signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;

                // Retrieve user data from Firestore
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    console.log('User data:', userDoc.data());
                } else {
                    console.log('No such document!');
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            });

        }

    }

    const handleGoogleButton = () => {
        signInWithPopup(auth, provider)
        .then(async (result) => {
            const user = result.user;

            // Check if user data already exists in Firestore
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                // Store user data in Firestore if it doesn't exist
                await setDoc(userDocRef, {
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    createdAt: new Date(),
                });
                console.log('New user signed in with Google and stored:', user);
            } else {
                console.log('User already exists:', userDoc.data());
            }
        })
    
            .catch((error) => {
            console.error('Error signing in with Google:', error);
        });
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h1 className="title">{title}</h1>
                <form className="form" onSubmit={handleEmailPasswordButton} >

                    
                {isRegister && <div className="form-group">
                    <label htmlFor="name" className="label">Name</label>
                    <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className="input"
                    name='name'
                    onChange={handleChange}
                    required
                    />
                </div>}
                <div className="form-group">
                    <label htmlFor="email" className="label">Email</label>
                    <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="input"
                    name='email'
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="label">Password</label>
                    <input
                    id="password"
                    type="password"
                    name='password'
                    placeholder="Enter your password"
                    onChange={handleChange}
                    className="input"
                    />
                </div>
                <div className="button-group">
                    <button
                    type="submit"
                    className="btn btn-email"
                    >
                    Sign {isRegister ? 'up' : 'in'} with email
                    </button>
                    <button
                    type="button"
                    className="btn btn-google"
                    onClick={handleGoogleButton}
                    >
                    Sign {isRegister ? 'up' : 'in'}  with Google
                    </button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default Auth