import {
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  Timestamp,
} from "firebase/firestore";
import React, { useEffect, useRef } from "react";
import { db } from "../../firebase.config";
import {
  setAreClientsLoading,
  setClients,
} from "../../rtk/slices/clients-slice";
import { setClasses } from "../../rtk/slices/classes-slice";
import {
  setAreStudentsLoading,
  setStudents,
} from "../../rtk/slices/students-slice";
import { useDispatch, useSelector } from "react-redux";
import { setCampaigns } from "../../rtk/slices/campaigns-slice";
import { setReplies } from "../../rtk/slices/utils-slice";
import { setAreUsersLoading, setUsers } from "../../rtk/slices/users-slice";
import {
  setAreSessionsLoading,
  setSessions,
} from "../../rtk/slices/sessions-slice";
import { timestampToDate } from "../../utils/dataCleaning";

const ServerListener = () => {
  const dispatch = useDispatch();

  const unsubscribeCollection = (
    collectionName,
    stateSetter,
    loadingSetter
  ) => {
    return onSnapshot(collection(db, collectionName), (snapshot) => {
      const collectionDocs = snapshot.docs
        ?.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => b.leadId - a.leadId);

      dispatch(
        stateSetter(
          collectionDocs.map((document) => {
            if (document.createdAt) {
              const serialisedDoc = {
                ...document,
                createdAt: timestampToDate(document.createdAt),
              };
              if (serialisedDoc.convertedAt) {
                serialisedDoc.convertedAt = timestampToDate(
                  serialisedDoc.convertedAt
                );
              }
              return serialisedDoc;
            } else {
              return document;
            }
          })
        )
      );

      loadingSetter && dispatch(loadingSetter(false));
    });
  };

  const unsubscribeDoc = (document, part, stateSetter) => {
    return onSnapshot(doc(db, document, part), (snapshot) => {
      const documentSubDocs = snapshot.data().value;
      dispatch(stateSetter(documentSubDocs || []));
    });
  };

  useEffect(() => {
    const unsubscribeClients = unsubscribeCollection(
      "clients",
      setClients,
      setAreClientsLoading
    );
    const unsubscribeStudents = unsubscribeCollection(
      "students",
      setStudents,
      setAreStudentsLoading
    );
    const unsubscribeSessions = unsubscribeCollection(
      "sessions",
      setSessions,
      setAreSessionsLoading
    );
    const unsubscribeUsers = unsubscribeCollection(
      "users",
      setUsers,
      setAreUsersLoading
    );

    const unsubscribeClasses = unsubscribeDoc("utils", "classes", setClasses);
    const unsubscribeCampaigns = unsubscribeDoc(
      "utils",
      "campaigns",
      setCampaigns
    );
    const unsubscribeReplies = unsubscribeDoc("utils", "replies", setReplies);

    return () => {
      unsubscribeClients();
      unsubscribeStudents();
      unsubscribeSessions();
      unsubscribeUsers();

      unsubscribeClasses();
      unsubscribeCampaigns();
      unsubscribeReplies();
    };
  }, []);

  const clientsStore = useSelector((state) => state.clients);
  const { clients, isArchiveIncluded } = clientsStore;

  useEffect(() => {
    if (isArchiveIncluded) {
      getDocs(collection(db, "clientsArchive")).then((snapshot) => {
        const archiveDocs = snapshot.docs
          ?.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            archived: true,
          }))
          .sort((a, b) => b.leadId - a.leadId);

        dispatch(
          setClients(
            [...clients, ...archiveDocs].sort((a, b) => b.leadId - a.leadId)
          )
        );
      });
    } else {
      dispatch(setClients(clients.filter((client) => !client.archived)));
    }
  }, [isArchiveIncluded]);

  return <div id="server-listener"></div>;
};

export default ServerListener;
