import "./style.css";
import trash from "../../assets/delete.png";
import { useState, useEffect } from "react";   
import { db } from "../../firebase.js";
import { collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";

export function Home() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const loadUsers = async () => {
      const snapshot = await getDocs(usersCollectionRef);
      const usersList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
    };
    loadUsers();
  }, []);

  const handleAddUser = async () => {
    if (!name || !age || !email) {
      alert("Preencha todos os campos!");
      return;
    }

    const docRef = await addDoc(usersCollectionRef, {
      name,
      age: Number(age),
      email,
    });

    setUsers([...users, { id: docRef.id, name, age: Number(age), email }]);
    setName("");
    setAge("");
    setEmail("");
  };

  const handleDeleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="tela"> 
      <div className="container">
        <h1>Cadastro de Usuários</h1>
        <div className="input-container">
          <input className="input"
            name="nome"
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input className="input"
            name="idade"
            type="number"
            placeholder="Idade"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <input className="input"
            name="email"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button onClick={handleAddUser}>Adicionar</button>

        <ul className="users-list">
          {users.map((user) => (
            <li key={user.id} className="user-item">
              <div className="user-info">
                <strong>{user.name}</strong> — {user.age} anos — {user.email}
              </div>
              <button
                className="delete-btn"
                onClick={() => handleDeleteUser(user.id)}
                aria-label={`Excluir ${user.name}`}
              >
                <img src={trash} alt="Excluir" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 
export default Home;