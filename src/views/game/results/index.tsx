import type { ChallengeWinner, PartnerMain, RaffleWinner, WinnersReduxState } from "@reducers/winners";

import { useLayoutEffect } from "react";
import { connect } from "react-redux";

import { getWinners } from "@actions/winners";

import Layout from "@components/partials/layout";
import Header from "@components/partials/header";
import Content from "@components/partials/content";
import Status from "@components/partials/status";
import Spinner from "@components/loaders/spinner";
import Carousel from "@components/carousel";
import Image from "@components/Image";

import s from "./styles.module.css";

interface Props {
  partners: WinnersReduxState["partners"];
  getWinners: () => Promise<void>;
}

const CURRENT_YEAR = new Date().getFullYear(); // TODO: Prob remove and just say 2025, but get the banner image first.

const Results: React.FC<Props> = ({ partners, getWinners }) => {
  useLayoutEffect(() => {
    if (!(partners.main.length && partners.other.length)) getWinners();
  }, []);

  return (
    <Layout>
      <Header title="Event Results" />
      <Content
        addCoins="coins3"
        addFeather="left"
        style={{ paddingBlock: "1.25rem 1rem" }}
      >
        <div className={s.container}>
          <div className={s.banner}>
            <img
              src="/images/eventResults/img_thankyou.png"
              alt={`Thank you for Supporting $4YT ${CURRENT_YEAR}`}
            />
          </div>

          <Carousel
            aria-label="Event Winners"
            items={[...partners.main, null]}
            numPerSlide={1}
            className={s.carousel}
            {...(partners.main.length + (partners.other.length ? 1 : 0) && {
              indicator: <Indicators partners={partners.main} />,
            })}
          >
            {({ entry, i }) =>
              partners.main.length && partners.other.length ? (
                <div
                  key={i}
                  className={s.partnerWinners}
                  data-type={entry === null ? "other" : "main"}
                >
                  {entry === null ? (
                    partners.other.map((item, i) => (
                      <RaffleItem
                        image_src={item.image_src}
                        winners={item.winners.raffle}
                        index={i}
                      />
                    ))
                  ) : (
                    <>
                      <section
                        aria-label={`${entry.name}'s Challenge Winners`}
                        className={s.challenge}
                      >
                        <Image src={entry.logo} alt={entry.name} />
                        {entry.winners.challenge?.length > 0 && (
                          <ul>
                            {entry.winners.challenge.map((winner, i) => (
                              <Winner key={i} winner={winner} />
                            ))}
                          </ul>
                        )}
                      </section>

                      {entry.winners.raffle?.length > 0 && (
                        <section
                          aria-label={`${entry.name}'s Raffle Winners`}
                          className={s.raffle}
                        >
                          {entry.winners.raffle.map((item, i) => (
                            <RaffleItem
                              image_src={item.image_src}
                              winners={item.users}
                              index={i}
                            />
                          ))}
                        </section>
                      )}

                      {!entry.winners.challenge?.length && !entry.winners.raffle?.length && ( 
                        <p>No Winners</p>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <Spinner
                  size="82px"
                  style={{
                    border: "solid 9px #9c9c9c",
                    borderTop: "solid 9px #242424",
                    marginInline: "auto"
                  }}
                />
              )
            }
          </Carousel>
        </div>
      </Content>
      <Status />
    </Layout>
  );
};

const Winner: React.FC<{ winner: RaffleWinner | ChallengeWinner }> = ({ winner }) => {
  return (
    <li className={s.winner}>
      <h3>
        {"award" in winner && <span className={s.prize}>${winner.award}: </span>}
        {winner.name}
      </h3>
      <p>
        {winner.region && `${winner.region}, `}
        {winner.country}
      </p>
    </li>
  )
};

const RaffleItem: React.FC<{
  image_src: string;
  winners: RaffleWinner[];
  index: number;
}> = ({ image_src, winners, index }) => {
  return (
    <div className={s.item}>
      <Image src={image_src!} alt={`Raffle Item ${index + 1}`} />
      <ul>
        {winners.map((winner, i) => (
          <Winner key={i} winner={winner} />
        ))}
      </ul>
    </div>
  );
};

const Indicators: React.FC<{
  partners: PartnerMain[];
  currentSlide?: number;
  goToSlide?: (index: number) => void;
}> = ({ partners, currentSlide, goToSlide }) => {
  return (
    <div>
      {[...partners, null].map((business, i) => {
        const slide = i + 1;
        return (
          <button
            key={i}
            aria-pressed={currentSlide === slide}
            onClick={() => goToSlide!(slide)}
          >
            <Image
              src={business?.logo || "/images/eventResults/others.webp"}
              alt={business?.name || "Other"}
            />
          </button>
        );
      })}
    </div>
  );
};

const mapStateToProps = ({ winners }: { winners: WinnersReduxState }) => ({
  partners: winners.partners
});
const mapDispatchToProps = (dispatch: any) => ({
  getWinners: () => dispatch(getWinners())
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
