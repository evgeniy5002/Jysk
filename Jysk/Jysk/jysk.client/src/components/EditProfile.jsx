import BodySection from "./BodySection";
import "../styles/components/EditProfile.scss";

export default function EditProfile() {
    return (
        <BodySection noBorder>
            <div className="edit-profile-form">
                <div className="heading">
                    <span>Edit Profile</span>
                </div>
                
                <form>
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Surname" />
                    <input type="email" placeholder="Email" />
                    <input type="text" placeholder="Phone number" />
                    <div className="options">
                        <button className="save-btn">Save</button>
                        <button className="cancel-btn">Cancel</button>
                        <button className="delete-acount-btn">Delete Account</button>
                    </div>
                </form>
            </div>
        </BodySection>
    );
}