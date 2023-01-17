import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  limit,
} from "firebase/firestore";

export const useFetchDocuments = (
  docColletion,
  tags: null | string = null,
  search: null | string = null,
  limitedPost: null | boolean = null,
  qtyPosts: null | number = null,
  uid = null
) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean | null>(null);

  useEffect(() => {
    async function loadData() {
      const collectionRef = await collection(db, docColletion);

      try {
        let q;

        if (tags && limitedPost)
          q = await query(
            collectionRef,
            where("tags", "array-contains", tags),
            orderBy("createdAt", "desc"),
            limit(qtyPosts)
          );
        else if (tags)
          q = await query(
            collectionRef,
            where("tags", "array-contains", tags),
            orderBy("createdAt", "desc")
          );
        else if (search)
          q = await query(
            collectionRef,
            where("keywords", "array-contains", search),
            orderBy("createdAt", "desc")
          );
        else if (limitedPost)
          q = await query(
            collectionRef,
            orderBy("createdAt", "desc"),
            limit(qtyPosts)
          );
        else if (uid)
          q = await query(
            collectionRef,
            where("uid", "==", uid),
            orderBy("createdAt", "desc")
          );
        else q = await query(collectionRef, orderBy("createdAt", "desc"));

        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });
        setLoading(false);
      } catch (error: any) {
        console.log(error);
        setError(error.message);

        setLoading(false);
      }
    }
    loadData();
  }, [docColletion, tags, search, limitedPost, qtyPosts, uid]);

  return { documents, loading, error };
};
