import {useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App(){
  const [friends, setNewFriend] = useState(initialFriends)
  const [addFriend, setAddFriendButton] = useState(false)

  function AddNewFriend(newfriend){
    setNewFriend(friends => [...friends, newfriend])
  }
  
  function HandleAddFriendBtn(){
    setAddFriendButton(addFriend => !addFriend)
  }
  return (
    <div className="app">
      <div className="sidebar">
          <FriendsList friendList={friends}/>
          {addFriend && <AddFriendForm onAddNewFriend = {AddNewFriend}/>}
          <Button onClick={HandleAddFriendBtn}>{addFriend ? "Close" : "Add Friend"}</Button>
      </div>
      <BillForm />
    </div>
  )
}

function FriendsList({friendList}){
  return(
    <ul>
      {friendList.map(friend => (<Friends friend={friend} key={friend.id}/>))}
    </ul>
  )
}

function Friends({friend}){
  return(
    <li>
      <img src={friend.image} alt={friend.name}/>
      <h3>{friend.name}</h3>
      {friend.balance < 0 && <p className="red">You owe {friend.name} ${Math.abs(friend.balance)}</p>}
      {friend.balance > 0 && <p className="green">{friend.name} owes you ${Math.abs(friend.balance)}</p>}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button>Select</Button>
    </li>
    
  )
}
function AddFriendForm({onAddNewFriend}){
  const [name, setName] = useState("")
  const [image, setImage] = useState("https://i.pravatar.cc/48")

  function HandleNewFriend(e){
    e.preventDefault()

    const id = crypto.randomUUID()
    const newFriend = {id, name, image:`${image}?${id}`, balance:0}
    onAddNewFriend(newFriend)

    setName("")
    setImage("https://i.pravatar.cc/48")
  }
  return(
    <form className="form-add-friend" onSubmit={HandleNewFriend}>
      <label>🧑‍🤝‍🧑 Friend name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>

      <label>🖼️ Image URL</label>
      <input type="text" value={image} onChange={(e) => setImage(e.target.value)}/>

      <Button>Add</Button>
    </form>
  )
}

function BillForm(){
  return(
    <div className="form-split-bill">

    </div>
  )
}

function Button({children, onClick}){
  return <button className="button" onClick={onClick}>{children}</button>
}