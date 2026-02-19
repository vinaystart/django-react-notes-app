import { useState } from "react";

function Note({ note, onDelete, onUpdate }) {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    return (
        <div className="note-card">

            {editing ? (
                <>
                    <input value={title} onChange={e => setTitle(e.target.value)} />
                    <textarea value={content} onChange={e => setContent(e.target.value)} />

                    <div className="actions">
                        <button
                            className="save"
                            onClick={() => {
                                onUpdate(note.id, title, content);
                                setEditing(false);
                            }}
                        >
                            Save
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>

                    <div className="actions">
                        <button onClick={() => setEditing(true)}>Edit</button>
                        <button className="danger" onClick={() => onDelete(note.id)}>Delete</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Note;
