import { Subject, Subscription } from 'rxjs';

export class Reminder {
    id: string;
    playSoundOnRemind: boolean;
    remindSubject: Subject<boolean>;
    rateMs: number;
    timerSubscription: Subscription;
}
