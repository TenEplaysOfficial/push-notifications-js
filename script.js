const notifyBtn = document.querySelector("#notify");
let interval;
let notification;

notifyBtn.addEventListener("click", () => {
  Notification.requestPermission().then((permission) => {
    if (permission == "granted") {
      notification = new Notification("Example", {
        body: "This is more text for example" + Math.random(),
        icon: "icon.png",
        tag: "Example",
      });
      notification.addEventListener("error", (e) => {
        console.error();
      });
    }
  });
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    const leaveDate = new Date();
    interval = setInterval(() => {
      notification = new Notification("Come back", {
        body: `You have been gone for ${Math.round(
          (new Date() - leaveDate) / 1000
        )} secs, come back!`,
        tag: "Come back",
      });
      notification.addEventListener("error", (e) => {
        console.error(e);
      });
    }, 100);
  } else {
    if (interval) {
      clearInterval(interval);
    }
    if (notification) {
        notification.close();
      }
  }
});
