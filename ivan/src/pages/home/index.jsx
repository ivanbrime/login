import "./styles.css";
import trash from "../../assets/trash.svg";
import { useState, useEffect, use } from "react";   
import { db } from "../../firebase.js  ";
import { collection, addDocs, deleteDoc, doc } from "firebase/firestore";

export function Home() {
  const [name, setname] = useState("");
    const [age, setage] = useState("");
    const [email, setemail] = useState("");
    const [users, setusers] = useState([]);

    const usersCollectionRef = collection(db, "users");
useEffect(() => {
  const loadUsers = async () => {
    const snapshot = await getDocs(usersCollection);
    const usersList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setusers(usersList);
    };
    loadUsers();
}, []);

    const handleAddUser = async () => {
      console.log("botao clicado");
        await addDocs(usersCollectionRef, { name: name, age: Number(age), email: email });
        if (name && age && email) return alert("preencha todos os campos");
        const newUser = { name, age: Number(age), email };
        setusers([...users, newUser]);
        setname("");
        setage("");
        setemail("");
    };
    const handleDeleteUser = async (id) => {
      const userDoc = doc(db, "users", id);
      await deleteDoc(userDoc);
      setusers(users.filter((user) => user.id !== id));
    }
    return ( 
        <div className="container"></div>)