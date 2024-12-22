import { db } from '@/firebaseConfig';  
import { collection, addDoc } from 'firebase/firestore';  
import { NextRequest, NextResponse } from 'next/server';  
  
export async function POST(req: NextRequest) {  
  try {  
    const { name, age } = await req.json();  
  
    // Check if the required fields are present  
    if (!name || !age) {  
      return NextResponse.json({ error: 'Name and age are required' }, { status: 400 });  
    }  
  
    const docRef = await addDoc(collection(db, 'users'), {  
      name,  
      age  
    });  
  
    return NextResponse.json({ id: docRef.id }, { status: 200 });  
  } catch (e) {  
    console.error('Error adding document: ', e);  
    return NextResponse.json({ error: 'Failed to add document' }, { status: 500 });  
  }  
}  