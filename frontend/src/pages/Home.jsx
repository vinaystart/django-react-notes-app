import { useState, useEffect } from "react";
import api from "../Api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api.get("/api/notes/")
      .then(res => setNotes(res.data))
      .catch(err => alert(err));
  };

  const createNote = (e) => {
    e.preventDefault();
    api.post("/api/notes/", { title, content })
      .then(() => {
        setTitle("");
        setContent("");
        getNotes();
      });
  };

  const deleteNote = (id) => {
    api.delete(`/api/notes/delete/${id}/`).then(getNotes);
  };

  const updateNote = (id, title, content) => {
    api.put(`/api/notes/update/${id}/`, { title, content })
      .then(getNotes);
  };

  return (
    <div className="dashboard">

      <div className="container">

        <h1 className="title">Notes Dashboard</h1>

        {/* NOTES GRID */}
        <div className="grid">
          {notes.map(note => (
            <Note
              key={note.id}
              note={note}
              onDelete={deleteNote}
              onUpdate={updateNote}
            />
          ))}
        </div>

        {/* CREATE PANEL */}
        <form className="create" onSubmit={createNote}>
          <h2>Create Note</h2>

          <input
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Content..."
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />

          <button>Create Note</button>
        </form>

      </div>
    </div>
  );
}

export default Home;
