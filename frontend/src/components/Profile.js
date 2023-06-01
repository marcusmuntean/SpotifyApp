
import {useEffect, useState} from "react";
import axios from 'axios';
import { db } from "./firebase.js";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
  where,
  query,
  updateDoc,
} from "firebase/firestore";
import { Button } from './Button';
import './HomeDesign.css';

function Profile() {
    const CLIENT_ID = "050284177ebc4d70b2889aff911336cb"
    const REDIRECT_URI = "http://localhost:3000/profile"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [artists, setArtists] = useState([])
    const [username, setUsername] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [publicView, setPublicView] =  useState([]);    

  

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        // getToken()


        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)

    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }
    

    const artistInfo = async (e) => {
        e.preventDefault()
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchKey,
                type: "artist"
            }
        })

        setArtists(data.artists.items)
    }

    const renderArtists = () => {
        return artists.map(artist => (
            <div key={artist.id}>
                {artist.images.length ? <img width={"30%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
                {artist.name}
            </div>
        ))
    }




    async function addNewUser(newName) {
        const userCollectionRef = collection(db, "Users");
        const userQuery = query(
        userCollectionRef,
        where("name", "==", newName)
        );

        const userSnapshot = await getDocs(userQuery);
        if (userSnapshot.docs.length <= 0) {
            await addDoc(collection(db, "Users"), {
                name: newName,
                public: true,
              });
          } else {
            console.log("already added");
          }
        
      }

     

      const [userList, setUserList] = useState([]);

      useEffect(() => {
        const getUserList = async () => {
          const UserColRef = collection(db, "Users");
          try {
            const data = await getDocs(UserColRef);
            const filteredData = data.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            console.log(filteredData);
            setUserList(filteredData);
          } catch (err) {
            console.log(err);
          }
        };
        getUserList();
      }, [updateUser]);

      async function updateUser(editUser, newStatus, userName) {
        try {
            let editS = editUser.filter((user) => user.name === userName);
            setPublicView(newStatus);
        
            await updateDoc(doc(db, "Users", editS[0].id), {
              public: newStatus
            });
            
          } catch (err) {
            console.error(err);
          }
        }



    const getUsername = () => {
        let url = "https://api.spotify.com/v1/me";
    
        axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((result) => {
            setUsername(result.id);
            setDisplayName(result.data.display_name);
            addNewUser(displayName);
          });
      };

     

    return (
        <div className="App">
            <header className="App-header">
                
                <div>
                {token ? 
                        <h1 {...getUsername ()}>{"Welcome, " + displayName +"!"}</h1>
                    :
                    <h2></h2> 
                    }
                 
                 {publicView ? 
                        <Button 
                        className='btns'
                        onClick={() => {updateUser(userList,false,displayName)}}          
                        buttonStyle='btn--primary'
                        buttonSize='btn--medium'
                        
                      >
                        Make Private
                      </Button>
                    :
                    <Button 
                        className='btns'
                        onClick={() => {updateUser(userList,true,displayName)}}          
                        buttonStyle='btn--primary'
                        buttonSize='btn--medium'
                        
                      >
                        Make Public
                      </Button>
                    }
                </div>

            
                <div>


                {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <Button 
                    className='btns'
                    onClick={logout}          
                    buttonStyle='btn--primary'
                    buttonSize='btn--medium'
                    
                  >
                    Log Out
                  </Button>
                }
                </div>

                
                
                

                {renderArtists()}

            </header>
        </div>
    );
}

export default Profile;


// {token ?
                    
//     <form onSubmit={artistInfo}>
//         <input type="text" onChange={e => setSearchKey(e.target.value)}/>
//         <button type={"submit"}>Search</button>
//     </form>
    

//     : <h2>Please login</h2> 

    
// }

{/* <Button 
                        className='btns'
                        onClick={logout}          
                        buttonStyle='btn--primary'
                        buttonSize='btn--medium'
                        
                      >
                        Make Private
                      </Button>  */}