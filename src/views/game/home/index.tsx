import NotificationValues from "@typings/NotificationValues";
import { useRef, useState } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import treasureMapNavContent from "@constants/treasureMapNavContent";
import { addNotification } from "@actions/notifications";
import Layout from "@components/partials/layout";
import Header from "@components/partials/header";
import Content from "@components/partials/content";
import Status from "@components/partials/status";
import MapNavigation from "@components/mapNavigation";
import MapConnections from "@components/mapConnections/MapConnectionsAssets";
import s from "./styles.module.css";
import backMap from "src/assets/images/NewMap/back-map.png";
import { Link } from "react-router-dom";
import InvitationModal from "@components/modals/invitation";

interface Props {
  addNotification: (notification: { error: boolean; content: string; close?: boolean; duration?: number }) => void;
}

const instructionSlides: React.ReactNode[] = [
  // Slide 1: Format
  <>
    <p>Visit the Learn and Earn page to get more info about the challenges and win more Dubl-U-nes as you go!</p>
    <ul>
      <li>Visit the business island to see the challenges (available from day 3 to 5 / hours 49 to 120 of the $4YT event)</li>
      <li>Click on the Raffle page to use your Dubl-U-nes</li>
    </ul>
  </>,
  // Slide 2: Welcome to the Game
  <>
    <p className={s.slideHeader}>Welcome to the Game!</p>
    <ul className={s.firstUl}>
      <li>Head to the profile page to see your 3 Dubl-U-nes for registering.</li>
    </ul>
    <p className={s.slideSubHeader}>What are Dubl-U-nes?</p>
    <ul>
      <li>Our virtual currency to use in our raffle and the Pre-Game!</li>
      <li>Refer friends to get more Dubl-U-nes!</li>
      <li>You will get 3 Dubl-U-nes and your friend will get 2 once they register and join the game.</li>
    </ul>
  </>,
  // Slide 3: Pre-Game (Learn & Earn)
  <>
    <p>Pre-Game (Learn &amp; Earn)</p>
    <ul>
      <li>Opens at 1:00 AM EST on Friday, September 4th, 2026.</li>
      <li>Visit the Learn &amp; Earn page to earn Dubl-U-nes before the challenges open.</li>
      <li>These questions can help you in the Main Challenges, and your answers can be referenced throughout the game.</li>
      <li>Once the Main Challenges open, you can still revisit and answer questions, but no more earning Dubl-U-nes!</li>
    </ul>
  </>,
  // Slide 4: Main Game (Business Island) + Raffle Time
  <>
    <p className={s.slideHeader}>Main Game (Business Island)</p>
    <ul className={s.firstUl}>
      <li>Opens at 12:00 PM NOON on Saturday, September 5th, 2026. Closes Tuesday, September 8th at 12:00 PM NOON.</li>
      <li>Apply what you learned in the Pre-Game and take a stab at a business challenge (submitted anonymously) for the chance to win money!</li>
    </ul>
    <p className={s.slideSubHeader}>Raffle Time</p>
    <ul>
      <li>Go to the Raffle Page to use your Dubl-U-nes for prize entries.</li>
      <li>The more entries you have, the more chances to win!</li>
    </ul>
  </>,
  // Slide 5: rendered inline
  null,
];  // <-- closing bracket of the array

const Home: React.FC<Props> = ({ addNotification }) => {
  const blockBtnRef = useRef<HTMLButtonElement>(null);
  const [viewed, setViewed] = useState(!!sessionStorage.getItem("block-instructions"));
  const [step, setStep] = useState(0);
  const [visitedSlides, setVisitedSlides] = useState<Set<number>>(new Set([0]));
  const [showInvitation, setShowInvitation] = useState(false);
  // Zoom and movement 
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const allSlidesViewed = visitedSlides.size === instructionSlides.length;

  const goToSlide = (index: number) => {
    setStep(index);
    setVisitedSlides((prev) => new Set(prev).add(index));
  };

  return (
    <Layout>
      <Header title={!viewed ? "Instructions" : "Treasure Map"} />
      <Content
        addCoins={!viewed ? "coins1" : "coins2"}
        {...(!viewed && { style: { padding: "30px 30px 14px 30px" } })}
      >
        {!viewed ? (
          <div className={s.notViewed}>
            {step === 4 ? (
              <div className={s.wrapUpSlide}>
                <p className={s.wrapUpTitle}>Wrap-Up</p>
                <p className={s.wrapUpHighlight}>September 12th at 2 PM ET</p>
                <p>Regardless of participation, join the event wrap-up to meet challenge partners, celebrate, and hear about the challenge results and raffle draw!</p>
                <p className={s.wrapUpWelcome}>All are welcome!</p>
                <button
                  className={s.invitationBtn}
                  onClick={() => setShowInvitation(true)}
                >
                  Get my Invitation
                </button>
              </div>
            ) : instructionSlides[step]}

            {/* Scroll markers */}
            <div className={s.scrollMarkers}>
              {instructionSlides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={step === index}
                  className={[
                    s.marker,
                    step === index ? s.markerActive : "",
                  ].join(" ")}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>

            <div>
              <button
                className={`${s.blockBtn} fade move`}
                ref={blockBtnRef}
                onClick={() => {
                  sessionStorage.setItem("block-instructions", "true");
                  addNotification({ error: false, content: "Instructions are now blocked ✔", duration: 4000 });
                  if (blockBtnRef.current) blockBtnRef.current.disabled = true;
                }}
              >
                Don't show this again
              </button>
              <button
                className="okBtn flip"
                disabled={!allSlidesViewed}
                onClick={() => {
                  sessionStorage.setItem("block-instructions", "true");
                  setViewed(true);
                }}
              />
            </div>
          </div>
        ) : (
          <>
            {/* Controls for moving and zooming */}
            <div className={s.mapControls}>
              <button onClick={() => setScale(prev => Math.min(prev + 0.1, 2))}></button>
              <button onClick={() => setScale(prev => Math.max(prev - 0.1, 0.5))}></button>
              <button onClick={() => setPos(prev => ({ ...prev, x: prev.x - 10 }))}></button>
              <button onClick={() => setPos(prev => ({ ...prev, x: prev.x + 10 }))}></button>
              <button onClick={() => setPos(prev => ({ ...prev, y: prev.y - 10 }))}></button>
              <button onClick={() => setPos(prev => ({ ...prev, y: prev.y + 10 }))}></button>
            </div>

            <div className={s.mapContainer} style={{ position: "relative", width: "100%", height: "410px" }}>
              {/* Background map */}
              <img
                src={backMap}
                alt="Treasure Map"
                style={{
                  position: "absolute",
                  top: `calc(50% + ${-15}px)`,
                  left: `calc(50% + ${-10}px)`,
                  transform: `translate(-50%, -50%) scale(${1.4})`,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  zIndex: 0,
                  transition: "transform 0.2s ease, top 0.2s ease, left 0.2s ease",
                }}
              />

              {/* Dotted line image assets */}
              <MapConnections />

              {/* Nodes */}
              {treasureMapNavContent.map(content => (
                <MapNavigation
                  key={content.id}
                  img={content.img}
                  to={content.to}
                  disableOn={content.disableOn}
                  position={content.position}
                  size={content.size}
                />
              ))}
            </div>
          </>
        )}
      </Content>

      {viewed && <Status />}
      <InvitationModal
        show={showInvitation}
        setShow={setShowInvitation}
      />

    </Layout>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  addNotification: (notification: any) => dispatch(addNotification(notification)),
});

export default connect(null, mapDispatchToProps)(Home);
