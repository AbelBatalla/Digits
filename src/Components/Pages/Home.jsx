import React from "react";
import Auth from "../Auth/Auth";
import Login from "../Auth/Login/Login";
import ProfileForm from "../Profiles/ProfileForm";
import ProfileSelector from "../Profiles/ProfileSelector";
import ProfileFormModal from "../Modal/ProfileFormModal";

const Home = () => {
    return (
    <>
        <h1>Home</h1>
        <ProfileSelector />
        <ProfileFormModal text={"create a profile"}/>
    </>
)
};
export default Home;