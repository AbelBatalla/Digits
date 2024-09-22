import React from "react";
import Auth from "../Auth/Auth";
import Login from "../Auth/Login/Login";
import ProfileForm from "../Profiles/ProfileForm";
import ProfileSelector from "../Profiles/ProfileSelector";

const Home = () => {
    return (
    <>
        <h1>Home</h1>
        <ProfileSelector />
        <ProfileForm />
    </>
)
};
export default Home;