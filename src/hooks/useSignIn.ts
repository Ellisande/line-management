import { useFirebaseAuth } from "../context/firebaseAuthContext";

export const useSignIn = () => {
  const auth = useFirebaseAuth();
  if (auth) {
    return () =>
      // @ts-ignore
      auth.signInWithRedirect(new auth.app.firebase_.auth.GoogleAuthProvider());
  }
  return () => {};
};
