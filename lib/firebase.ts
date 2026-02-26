import { getApp, getApps, initializeApp } from 'firebase/app';
import { browserLocalPersistence, getAuth, setPersistence, type Auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

function requireEnv(value: string | undefined, label: string): string {
  if (!value) {
    throw new Error(`Missing required Firebase environment variable: ${label}`);
  }

  return value;
}

const firebaseApiKey = requireEnv(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? process.env.FIREBASE_API_KEY,
  'NEXT_PUBLIC_FIREBASE_API_KEY (or FIREBASE_API_KEY)'
);

const firebaseAuthDomain = requireEnv(
  process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? process.env.FIREBASE_AUTH_DOMAIN,
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN (or FIREBASE_AUTH_DOMAIN)'
);

const firebaseProjectId = requireEnv(
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? process.env.FIREBASE_PROJECT_ID,
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID (or FIREBASE_PROJECT_ID)'
);

const firebaseStorageBucket = requireEnv(
  process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? process.env.FIREBASE_STORAGE_BUCKET,
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET (or FIREBASE_STORAGE_BUCKET)'
);

const firebaseMessagingSenderId = requireEnv(
  process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? process.env.FIREBASE_MESSAGING_SENDER_ID,
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID (or FIREBASE_MESSAGING_SENDER_ID)'
);

const firebaseAppId = requireEnv(
  process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? process.env.FIREBASE_APP_ID,
  'NEXT_PUBLIC_FIREBASE_APP_ID (or FIREBASE_APP_ID)'
);

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: firebaseAuthDomain,
  projectId: firebaseProjectId,
  storageBucket: firebaseStorageBucket,
  messagingSenderId: firebaseMessagingSenderId,
  appId: firebaseAppId,
};

export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);


let authInstance: Auth | null = null;

export function getFirebaseAuth(): Auth {
  if (!authInstance) {
    authInstance = getAuth(app);

    if (typeof window !== 'undefined') {
      void setPersistence(authInstance, browserLocalPersistence);
    }
  }

  return authInstance;
}

export const auth = typeof window === 'undefined' ? null : getFirebaseAuth();
