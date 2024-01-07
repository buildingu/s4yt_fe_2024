export default <T extends Record<string, any>>(
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  setCurrentData: React.Dispatch<React.SetStateAction<T>>
) => {
  const target = e.target;
  const name = target.getAttribute("name");
  // const isPlayerData =
  //   [
  //     "education_id",
  //     "grade_id",
  //     "country_iso",
  //     "state_iso",
  //     "city_id",
  //     "instagram",
  //   ].indexOf(key) === -1
  //     ? false
  //     : true;

  target.removeAttribute("data-valid");
  target.removeAttribute("matching-passwords");

  setCurrentData((prev) => ({
    ...prev,
    [name!]:
      name!.split("_")[1] === "id" ? parseInt(target.value) : target.value,
  }));

  // setData(
  //   isPlayerData
  //     ? {
  //         ...data,
  //         player: {
  //           ...data.player,
  //           [key]: !isNaN(node.value) ? parseInt(node.value) : node.value,
  //         },
  //       }
  //     : {
  //         ...data,
  //         [key]: !isNaN(node.value) ? parseInt(node.value) : node.value,
  //       }
  // );
};
