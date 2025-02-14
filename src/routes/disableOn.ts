const routeDisableOn: Readonly<Record<string, ReadonlyArray<string>>> = {
  "/learn": ["reviewStart", "winnersAnnounced"],
  "/raffle": ["reviewStart", "winnersAnnounced"],
  "/businesses": ["reviewStart", "winnersAnnounced"],
  "/results": ["gameStart"]
};

export default routeDisableOn;
