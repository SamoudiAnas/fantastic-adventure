import { getAuth } from "firebase-admin/auth";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let adminApp = getApps().at(0) ?? undefined;

if (!adminApp) {
  adminApp = initializeApp(
    {
      credential: cert(
        JSON.parse(process.env.PRIVATE_FIREBASE_SERVICE_ACCOUNT ?? "") as any,
      ),
    },
    "admin-app",
  );
}

const auth = getAuth(adminApp);
const db = getFirestore(adminApp);

export { auth, db };
