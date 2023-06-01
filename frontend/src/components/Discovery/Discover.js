import { useEffect, useState } from 'react';
import logo from '../../logo.svg';
import './Discovery.css';
import axios from "axios";

function Discovery() {
  const [profilesData, setProfilesData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:9000/discovery/")
    .then((res) => {
      const profiles = document.getElementById("profiles")
      profiles.innerHTML = ""
      for (let i = 0; i < res.data.result.length; i++) {
        if (res.data.result[i].public) {
          const profile = document.createElement("div");
          profile.className = "profile";
          const nameHeader = document.createElement("h2");
          nameHeader.innerHTML = res.data.result[i].name;
          profile.appendChild(nameHeader)
          profiles.appendChild(profile);
        }
      }
    })
  });

  return (
    <>
      <header>
        <div>
          <h1 id="title">Discovery</h1>
        </div>
      </header>
      <main>
        <div id="profiles">

        </div>
      </main>
    </>
  );
}

export default Discovery;
