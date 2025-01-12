import { auth } from '@/firebaseConfig';  
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NextRequest, NextResponse } from 'next/server';  
  
export async function POST(req: NextRequest) {  
  try {  
    const { email, password } = await req.json();  

    console.log('email:', email);
    console.log('password:', password);
  
    // Check if the required fields are present  
    if (!email || !password) {  
      return NextResponse.json({ error: 'Email, password, name, and age are required' }, { status: 400 });  
    }  
  
    // Create user with Firebase Auth  
    const userCredential = await signInWithEmailAndPassword(auth, email, password);  
    console.log(userCredential);
    const user = userCredential.user;
    const idToken = await user.getIdToken();
  
    // If transaction was successful, return the user id  
    return NextResponse.json({ uid: user.uid, idToken: idToken, refreshToken: user.refreshToken }, { status: 200 });  

  } catch (e) {  
    console.error('Error during user creation: ', e);  
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });  
  }  
}  