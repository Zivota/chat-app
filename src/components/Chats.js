import React, { useEffect, useState } from "react";
import classes from "./Chats.module.css";
import axios from "axios";
import { ChatEngine } from "react-chat-engine";
import Button from "../UI/Button";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/auth-context";

const Chats = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);

  const logOutHandler = async () => {
    await signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // getting image for each user
  const getFile = async (url) => {
    const response = await fetch(url);
    // blob contains files like images etc and converts them into binary code
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    // getting already created users
    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID,
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        // here we're creating new user
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        // calling getFile function we created earlier and providing url we get through user object, then appending new field to our formdata function
        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);

          // sending post request to create new user providing formdata we created earlier
          axios
            .post("https://api.chatengine.io/users", formdata, {
              headers: {
                "private-key": process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY,
              },
            })
            .then(() => {
              setLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
  }, [user, navigate]);

  if (!user || loading) return "Loading...";

  return (
    <div className={classes.chats}>
      <div className={classes.nav}>
        <h1>ChatApp</h1>
        <Button onClick={logOutHandler} className={classes.btn}>
          Log Out
        </Button>
      </div>
      <ChatEngine
        height="calc(100vh - 5rem)"
        projectID={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
