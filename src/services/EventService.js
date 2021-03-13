import { call } from "redux-saga/effects";
import { Subject } from 'rxjs';
const subject = new Subject();
subject.next(1);


const publish = ev=>subject.next(ev);
const subscribe = c=> subject.subscribe({next: ev=>c(ev)})

subject.subscribe(ev=>{
    
});


export default {
    pulish:publish,
    subscribe:subscribe
}


