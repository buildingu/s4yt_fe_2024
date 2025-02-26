export default <T extends Record<string, any>>(
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  setCurrentData?: React.Dispatch<React.SetStateAction<T>>
) => {
  const target = e.target;
  const name = target.getAttribute("name");

  target.removeAttribute("aria-invalid");
  target.removeAttribute("matching-passwords");

  if (setCurrentData)
    setCurrentData((prev) => ({
      ...prev,
      [name!]:
        name! !== "player_id" && name!.split("_")[1] === "id"
          ? parseInt(target.value)
          : target.value,
    }));
};
