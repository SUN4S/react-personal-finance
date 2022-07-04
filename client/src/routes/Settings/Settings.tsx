import "./Settings.scss";

import { Button } from "../../components/Button/Button";
import { DeleteContainer } from "../../layout/DeleteContainer/DeleteContainer";
import { PasswordChangeForm } from "../../layout/PasswordChangeForm/PasswordChangeForm";

export const Settings = () => {
  return (
    <section className="settings">
      <div className="settingsContent">
        <div className="settingsHeader">
          <h2>Account Settings</h2>
        </div>
        <div className="settingsBody">
          <div className="leftSide">
            <PasswordChangeForm />
            <DeleteContainer />
          </div>
          <div className="rightSide">
            <h2>Right side</h2>
          </div>
        </div>
      </div>
    </section>
  );
};
