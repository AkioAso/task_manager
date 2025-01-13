import { User } from '@/app/domain/User';
import { UserRepository } from '@/app/repository/UserRepository';
import { db, auth } from '@/firebaseConfig';  
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
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
    const userAuth = userCredential.user;
    const newUser = new User(name, birthday, email);
    const userRepository = new UserRepository(db);

    try {
      await userRepository.create(userAuth.uid, newUser);
      return NextResponse.json({ id: userAuth.uid }, { status: 200 });
    } catch (e) {
      console.error('Error during Firestore transaction: ', e);
      // If Firestore transaction fails, delete the created user
      await deleteUser(userAuth);
      return NextResponse.json({ error: 'Failed to complete Firestore transaction, user deleted' }, { status: 500 });
    }

  } catch (e) {  
    console.error('Error during user creation: ', e);  
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });  
  }  
}  