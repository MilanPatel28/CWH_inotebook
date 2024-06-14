// In this file we will create a context and provider for notes
// We will create the states in the NoteState.js file
import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all Notes
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  // Add a Note
  const addNote = async (title, description, tag) => {

    // Using a FETCH API
    const response = await fetch(`http://localhost:5000/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    const note = json;
    setNotes(notes.concat(note));

    // console.log("Adding a new note");
    // const note = {
    //   _id: "61322f119553781a8ca8d0e08",
    //   user: "6131dc5e3e4037cd4734a0664",
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: "2021-09-03T14:20:09.668Z",
    //   __v: 0,
    // };
  };

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json);

    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);



  };
  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    // Using a FETCH API
    const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes)); // here we are creating a copy of notes array, so that we can edit it to show in the frontend. JSON.parse will convert the notes array into string and JSON.stringify will convert it back to array.

    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        newNotes[index].date = new Date().toLocaleString();
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
