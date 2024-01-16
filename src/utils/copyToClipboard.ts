import { store } from "@root/store";
import { addNotification } from "@actions/notifications";

export default async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    store.dispatch(
      addNotification({
        error: false,
        content: "Link copied ✔",
        close: false,
        duration: 4000,
      })
    );
  } catch (error: any) {
    store.dispatch(
      addNotification({
        error: true,
        content: "Link failed to copy unexpectedly: " + error.message,
        close: false,
        duration: 0,
      })
    );
  }
};
