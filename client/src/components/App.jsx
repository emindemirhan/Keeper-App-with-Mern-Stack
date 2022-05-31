

import React, { useState, useEffect  } from "react";

import Header from "./Heading";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

const url = "https://mysterious-tundra-50505.herokuapp.com";

function App() {
  const [notes, setNotes] = useState([]);



  useEffect(() => {
    axios.get(url+"/")
      .then((res) => {
        // console.log(res.data);
        setNotes(res.data)
      })
      .catch((err) => console.error(err));
  }, []);




  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
axios.post(url+"/add", newNote)
.catch((err)=> console.log(err));


  }

  
  
 

  function deleteNote(object) {

    setNotes(notes.filter((_, index) => index !== object.id));
    
    axios.post(url+"/delete", {title: object.title, content: object.content})
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
