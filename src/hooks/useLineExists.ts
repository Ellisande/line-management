import { useLineName } from "../context/lineNameContext";
import { useFirestore } from "../context/firestoreContext";
import { useEffect, useState } from "react";

export const useLineExists = (): boolean => {
    const db = useFirestore();
    const lineName = useLineName();
    const [exists, setExists] = useState(
        false
    );
    useEffect(() => {
        if (!db || !lineName) {
            return () => { };
        }
        return db
            .collection(`lines`)
            .doc(lineName)
            .onSnapshot(doc => {
                setExists(doc.exists)
            });
    }, [db, lineName]);
    return exists;
};
