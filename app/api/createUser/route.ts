import { db, auth } from '@/firebaseConfig';  
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';  
import { doc, runTransaction } from 'firebase/firestore';  
import { NextRequest, NextResponse } from 'next/server';  
  
export async function POST(req: NextRequest) {  
  try {  
    const { email, password, name, birthday } = await req.json();
  
    // Check if the required fields are present  
    if (!email || !password || !name || !birthday) {  
      return NextResponse.json({ error: 'Email, password, name, and age are required' }, { status: 400 });  
    }  
  
    // Create user with Firebase Auth  
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);  
    const user = userCredential.user;  
  
    try {  
      // Start a transaction  
      await runTransaction(db, async (transaction) => {  
        // Create a reference to the new user document  
        const userDocRef = doc(db, 'users', user.uid);  
  
        // Set user data in Firestore  
        transaction.set(userDocRef, {  
          name,  
          birthday,  
          email,  
        });  
      });  
  
      // If transaction was successful, return the user id  
      return NextResponse.json({ id: user.uid }, { status: 200 });  
    } catch (e) {  
      console.error('Error during Firestore transaction: ', e);  
  
      // If Firestore transaction fails, delete the created user  
      await deleteUser(user);  
  
      return NextResponse.json({ error: 'Failed to complete Firestore transaction, user deleted' }, { status: 500 });  
    }  
  } catch (e) {  
    console.error('Error during user creation: ', e);  
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });  
  }  
}  