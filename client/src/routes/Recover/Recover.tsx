import "./Recovery.scss";

import { IconLogo } from "../../resources/icons/IconLogo/IconLogo";
import { RecoveryForm } from "../../layout/RecoveryForm/RecoveryForm";

export const Recover = () => {
  return (
    <section className="recovery">
      <div className="recoveryContainer">
        <div className="logoContainer">
          <IconLogo />
        </div>
        <h1 className="recoveryHeader">Recover Password</h1>
        <div className="recoveryDesc">Please enter your Email</div>
        <RecoveryForm />
      </div>
    </section>
  );
};
