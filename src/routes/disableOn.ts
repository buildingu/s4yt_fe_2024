const routeDisableOn: Readonly<Record<string, ReadonlyArray<string>>> = {
  "/learn": ["gameStart", "reviewStart", "winnersAnnounced"],
  "/raffle": ["reviewStart", "winnersAnnounced"],
  "/businesses": ["preGame", "reviewStart", "winnersAnnounced"],
  "/results": ["preGame", "gameStart", "reviewStart"]
};

export default routeDisableOn;
