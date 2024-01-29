import { connect } from "react-redux";
import { db } from "@root/firebase";
import { ref, update, onValue } from "firebase/database";

import s from "./styles.module.css";
import { UserReduxState } from "@root/redux/reducers/user";
import UserCredentials from "@root/typings/UserCredentials";
import { useEffect, useState } from "react";
import AreYouSureModal from "@root/components/modals/areYouSure/AreYouSureModal";

interface Props {
  playerCheck: any;
  data: {
    date: string;
    time: string;
    method: string;
  };
  name: string;
  user?: UserCredentials;
}

const MeetUp: React.FC<Props> = ({ playerCheck, data, user, name }) => {
  const [meetChoice, setMeetChoice] = useState<string>("");
  const [disabledButton, setDisabledButton] = useState<boolean>(false);

  const encodedEmail = user?.email.replace(/\./g, ",");
  const userRef = ref(db, "users/" + encodedEmail + "/meetings/");

  useEffect(() => {
    const checkIfFieldExists = async () => {
      try {
        const unsubscribe = onValue(userRef, (snapshot) => {
          const meeting = snapshot.val();
          if (meeting && meeting[name]) {
            console.log("exists");
            setDisabledButton(true);
          } else {
            setDisabledButton(false);
          }
        });
        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error("Error checking data:", error);
      }
    };
    checkIfFieldExists();
  }, [userRef]);

  const handleFirebaseSubmit = async () => {
    try {
      await update(userRef, {
        [name]: {
          meetChoice,
          date: `${data.date}, ${data.time}`,
        },
      });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  return (
    <div className={s.optionsView}>
      <div className={s.meetUp}>
        <h2>I'm setting up a meeting on:</h2>
        <p>
          {data?.date} at {data?.time} EST
        </p>
        <div className={s.meetOptions}>
          <div>
            <input
              type="radio"
              id="confirmRadio"
              name="meetupGroup"
              value="No"
              disabled={playerCheck || disabledButton}
              onClick={() =>
                setMeetChoice("I'd love to, but I can't make that time")
              }
            />
            <label htmlFor="confirmRadio">
              I'd love to, but I can't make that time
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="rejectRadio"
              name="meetupGroup"
              value="Yes"
              disabled={playerCheck || disabledButton}
              onClick={() => setMeetChoice("I'm in")}
            />
            <label htmlFor="rejectRadio">I'm in</label>
          </div>
        </div>
        <AreYouSureModal
          label={"Are you sure?"}
          text={`Once you submit your choice, you will not be able to change it later. Your current choice is: ${meetChoice}. Is this correct?`}
          func={handleFirebaseSubmit}
          disabledProps={playerCheck || disabledButton || meetChoice === ""}
          buttonClass={s.meetSubmit}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }: { user: UserReduxState }) => ({
  user: user.credentials,
});

export default connect(mapStateToProps, null)(MeetUp);
