import { useEffect, useState } from "react";
import {
  loadSingleSession,
  deleteSession,
  updateSession,
} from "../services/workoutSessions";
import { useParams, useNavigate } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import SingleSession from "../components/gainsSquad/SingleSession";

const SingleSessionPage = () => {
  const [session, setSession] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getSingleSession = async () => {
      const data = await loadSingleSession(id);

      if (!data) {
        setNotFound(true);
        return;
      }

      setSession(data);
      setNotFound(false);
    };

    getSingleSession();
  }, [id]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const handleSave = async (formData) => {
    setSaving(true);
    const updated = await updateSession(session.id, formData);
    setSaving(false);

    if (updated) {
      setSession(updated);
      setEditing(false);
    }
    // if updateSession failed it returns null — session stays as-is,
    // editing stays true so the user doesn't lose their edits
  };

  const handleDelete = async () => {
    const deleted = await deleteSession(session.id);

    if (deleted) {
      navigate("/history");
    }
  };

  if (notFound) {
    return <NotFoundPage searchedName={id} />;
  }

  if (!session) {
    return <p>spinner...</p>;
  }

  return (
    <>
      <SingleSession
        session={session}
        editing={editing}
        saving={saving}
        onEdit={handleEdit}
        onCancelEdit={handleCancelEdit}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </>
  );
};

export default SingleSessionPage;