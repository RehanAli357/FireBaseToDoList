import React, { useState, useEffect } from "react";
import "./style.css"
import db from "./firebaseConfig";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import Firebase from "./firebase.png";

const ToDo = () => {
    const [input, setinput] = useState("");
    const [data, setdata] = useState([]);
    const [toggle, settoggle] = useState("false");
    const [id, setid] = useState("");

    const userCollectionRef = collection(db, "data");

    const getData = async () => {
        const data = await getDocs(userCollectionRef);
        setdata(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    useEffect(() => {
        getData();
    }, []);
    const SaveData = async (event) => {
        event.preventDefault();
        if (input === "") {
            alert("Enter the Data");
        }
        else {
            await addDoc(userCollectionRef, { todo: input });
            setinput("");
            getData();
        }

    }
    const updateData = (ID, data) => {
        setinput(data);
        settoggle("true")
        setid(ID);
    }
    const SetUpdateData = async () => {
        settoggle("true");
        let dataDoc = doc(db, "data", id);
        let updatedata = { todo: input };
        await updateDoc(dataDoc, updatedata);
        getData();

    }
    const delateData = async (id) => {
        const dataDoc = doc(db, "data", id);
        await deleteDoc(dataDoc);
        getData();
    }

    return (
        <React.Fragment>
            <div className="Heading">
                <img src={Firebase} alt="" />
                <h1>ToDoList📝</h1>
            </div>
            <div className="Form">
                <form>
                    <input placeholder="Enter Data" value={input} onChange={(event) => { setinput(event.target.value); }} />
                    {
                        (toggle === "false") ? (<button type="submit" onClick={SaveData}>Save🖊️</button>) : (<button type="submit" onClick={SetUpdateData}>Update✏️</button>)
                    }
                </form>
            </div>
            <div className="Content">
                <h1>List</h1>
            </div>
            <div className="ListItem">
                <ul>
                    {
                        data.map((data) => {
                            return (
                                <React.Fragment>
                                    <div className="Note">
                                        <li key={data.id}>{data.todo}</li>
                                        <button onClick={() => { updateData(data.id, data.todo) }}>Update</button>
                                        <button onClick={() => { delateData(data.id) }}>Delete</button>
                                    </div>

                                </React.Fragment>
                            );
                        })
                    }
                </ul>
            </div>

        </React.Fragment>
    );
}
export default ToDo;
