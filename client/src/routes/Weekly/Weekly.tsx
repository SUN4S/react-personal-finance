import "./Weekly.scss";

import { WeeklyList } from "../../layout/WeeklyList/WeeklyList";

export const Weekly = () => {
  return (
    <div id="weekly">
      <div className="weeklyContent">
        <div className="weeklyBody">
          <WeeklyList />
        </div>
      </div>
    </div>
  );
};
