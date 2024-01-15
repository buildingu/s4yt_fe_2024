import { addNotification } from "@actions/notifications";

export default async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    // FIXME: Can't use action here.
    addNotification({
      error: false,
      content: "Link copied ✔",
      close: false,
      duration: 4000,
    });
  } catch (error: any) {
    addNotification({
      error: true,
      content: "Link failed to copy unexpectedly: " + error.message,
      close: false,
      duration: 0,
    });
  }
};
