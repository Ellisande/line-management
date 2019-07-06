import { useFirestore } from "../context/firestoreContext";
import { useCallback } from "react";
import { defaultLinePreferences } from "../Line";
import { useAuthenticated } from "./useAuthenticated";

export interface Appender {
    (newLineName: string): Promise<void>;
}

export const useLineCreator = () => {
    const firestore = useFirestore();
    const userId = useAuthenticated();
    const updater: Appender = useCallback(
        (lineName) => {
            if (!firestore) {
                return Promise.resolve(undefined);
            }
            const ref = firestore.collection(`lines`).doc(lineName);
            const newLine = {
                ...defaultLinePreferences,
                owner: userId
            }
            return ref.set(newLine);
        },
        [firestore, userId]
    );

    return updater;
};