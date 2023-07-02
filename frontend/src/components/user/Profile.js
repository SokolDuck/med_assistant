import { useParams } from "react-router";

function Profile() {
    const { username } = useParams();

    return (
        <h1>{username} Profile</h1>
    )
}

export default Profile;
