import React, { useState, useEffect } from "react";
import "./style.css"
import Firebase from "./firebase.png";
import db from "./firebaseConfig";
import {collection , getDocs , addDoc , updateDoc , doc , deleteDoc} from "firebase/firestore";

const ToDo = () => {
    const [input, setinput] = useState("");
    const [Data, setData] = useState([]);
    const [toggle, settoggle] = useState("false");
    const [id, setid] = useState("");

    const userCollection=collection(db,"list");
    const getData = async () => {
        const data = await getDocs(userCollection);
        setData(data.docs.map((listdata)=>({...listdata.data(),id:listdata.id})));
    };
    useEffect(() => {
        getData();
    },[]);


    const SetData =   (event) => {
        event.preventDefault();
        if (input === "") {
            alert("Enter the Data");
        }
        else {
            addDoc(userCollection,{todo:input});
            setinput("");
            getData();
        }

    }
    const updateData = (data,id) => {
        setid(id);
        setinput(data);
        settoggle("true");
    }
    const UpdateButton = async (event) => {
        event.preventDefault();
        let userDoc=doc(db,"list",id);
        let updatedData={todo:input};
        await updateDoc(userDoc,updatedData);
        setinput("");
        getData();
        settoggle("false");
    }
    const delateData =  async (id) => {
        let userDoc=doc(db,"list",id);
        await deleteDoc(userDoc);
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
                        (toggle === "false") ? (<button type="submit" onClick={SetData}>Save🖊️</button>) : (<button type="submit" onClick={UpdateButton}>Update✏️</button>)
                    }
                </form>
            </div>
            <div className="Content">
                <h1>List</h1>
            </div>
            <div className="ListItem">
                <ul>
                    {
                        Data.map((data) => {
                            return (
                                <React.Fragment>
                                    <div className="Note">
                                        <li>{data.todo}</li>
                                        <button onClick={() => { updateData(data.todo,data.id) }}>Update</button>
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
