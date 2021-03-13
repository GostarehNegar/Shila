import { Subject } from "rxjs";
const subject = new Subject();
const publish = (ev) => subject.next(ev);
const subscribe = (c) => subject.subscribe({ next: (ev) => c(ev) });
function checkNotificationPromise() {
  try {
    Notification.requestPermission().then();
  } catch (e) {
    return false;
  }

  return true;
}

const EventNames = {
  EntityAdded: "entityadded",
};
const Events = {
  Names: EventNames,
  EntityAdded: (e) => ({ type: EventNames.EntityAdded, payload: e }),
};

class EventBus {
  static publish = (ev) => subject.next(ev);
  static subscribe = (c) => subject.subscribe({ next: (ev) => c(ev) });
  static Events = Events;
}
subject.subscribe((ev) => {
  //console.warn("bus:",ev)
return " "
  if (
    ev.type === EventNames.EntityAdded &&
    ev.payload &&
    ev.payload.type === "phonecall"
  ) {
    // console.log(`iiiiiiiiiiiiiin${ev.payload.payload}`);
    //console.warn("new phone call");
    var elapsed = 1; // (new Date() - new Date(ev.payload.payload.time))/1000;
    if (elapsed < 2 * 60) {
      checkNotificationPromise();
      var text = "";
      var fullName =
        (ev.payload.payload.firstName || " ") +
        " " +
        (ev.payload.payload.lastName || " ");
      if (fullName === "   ") {
        text = "Not Found";
      }else{
        text = fullName;
      }

      var notification = new Notification("To do list", {
        body: text
      });
      notification.onclick = (event) => {
        event.preventDefault();
        window.open(`/contact/${ev.payload.payload.callerId}`);
      };
    }
  }
});

export default EventBus;
