// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const useFetchDocument = (docColletion, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean | null>(null);

  useEffect(() => {
    const loadDocument = async () => {
      setLoading(true);

      try {
        const docRef = await doc(db, docColletion, id);
        const docSnap = await getDoc(docRef);

        setDocument(docSnap.data());
      } catch (error: any) {
        setError(error.message);
      }
      setLoading(false);
    };

    loadDocument();
  }, [docColletion, id]);

  return { document, loading, error };
};
