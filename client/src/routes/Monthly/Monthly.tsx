import "./Monthly.scss";

import { MonthlyList } from "../../layout/MonthlyList/MonthlyList";

export const Monthly = () => {
  return (
    <div id="monthly">
      <div className="monthlyContent">
        <div className="monthlyBody">
          <MonthlyList />
        </div>
      </div>
    </div>
  );
};
