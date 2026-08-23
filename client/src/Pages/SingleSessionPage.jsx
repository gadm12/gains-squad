import { useEffect, useState } from "react";

import {
  loadSingleSession,
  deleteSession,
  updateSession,
} from "../services/workoutSessions";

import {
  createSet,
  updateSet,
  deleteSet,
} from "../services/workoutSets";

import { loadExerciseLibrary } from "../services/exerciseLibrary";

import { useParams, useNavigate } from "react-router-dom";

import NotFoundPage from "./NotFoundPage";

import SingleSession from "../components/gainsSquad/SingleSession";
import WorkoutSetForm from "../components/gainsSquad/WorkoutSetForm";
import WorkoutSetsList from "../components/gainsSquad/WorkoutSetsList";

const SingleSessionPage = () => {
  const [session, setSession] = useState(null);

  const [exercises, setExercises] = useState([]); // <= add

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

  // Load saved Django exercises
  useEffect(() => {
    const getExercises = async () => {
      const data = await loadExerciseLibrary();

      setExercises(data);
    };

    getExercises();
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    navigate("/history");
  };

  const handleSave = async (formData) => {
    setSaving(true);

    const updated = await updateSession(
      session.id,
      formData,
    );

    setSaving(false);

    if (updated) {
      navigate("/history");
    }
  };

  const handleDelete = async () => {
    const deleted = await deleteSession(session.id);

    if (deleted) {
      navigate("/history");
    }
  };

  const handleCreateSet = async (setData) => {
    const created = await createSet(session.id, setData);

    if (!created) {
      return;
    }

    // Reload session so new set + training volume show
    const refreshed = await loadSingleSession(session.id);

    setSession(refreshed);
  };

  const handleUpdateSet = async (setId, setData) => {
    const updated = await updateSet(setId, setData);

    if (!updated) {
      return;
    }

    const refreshed = await loadSingleSession(session.id);

    setSession(refreshed);
  };

  const handleDeleteSet = async (setId) => {
    const deleted = await deleteSet(setId);

    if (!deleted) {
      return;
    }

    const refreshed = await loadSingleSession(session.id);

    setSession(refreshed);
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

      <WorkoutSetsList
        sets={session.sets}
        onUpdate={handleUpdateSet}
        onDelete={handleDeleteSet}
      />

      <WorkoutSetForm
        exercises={exercises}
        onSubmit={handleCreateSet}
      />
    </>
  );
};

export default SingleSessionPage;
