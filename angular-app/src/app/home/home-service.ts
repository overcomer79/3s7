import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {} from 'rxjs/observable';
import { Observable } from 'rxjs';

@Injectable()
export class HomeService {
    private socket = io('http://localhost:3000');

    newUserConnected()
    {
        let observable = new Observable<number>(observer=>{
            this.socket.on('ServerMsg', (data)=>{
                observer.next(data.numberOfUser);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

}