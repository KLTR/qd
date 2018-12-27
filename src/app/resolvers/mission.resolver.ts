import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { HttpService } from '../services/http/http.service';
import { catchError, map } from 'rxjs/operators';
import { Observable,forkJoin, of } from 'rxjs';

@Injectable()
export class MissionResolver implements Resolve<Observable<any>> {
  missionId: string;

  constructor(private httpService: HttpService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {

    this.missionId = route.paramMap.get('missionId');
    return Observable.create({
        missionData: 'mission Data'
    })
    // return forkJoin([
    //   this.httpService.getMissionDetails(this.missionId).pipe(
    //     catchError(res => of(
    //       []))
    //   ),
    //   this.httpService.getActiveMissionInt().pipe(
    //     catchError(res => of(
    //       {
    //         'pending': [],
    //         'targets': [],
    //         'interceptorAcquired': []
    //       }))
    //   ),
    //   this.httpService.getActiveMission().pipe(
    //     catchError(res => of({}))
    //   ),

    // ]).pipe(
    //   map((data: any[]) => {
    //     return {
    //       missionData: data[0],
    //       activeMissionInt: data[1],
    //       activeMission: data[2],
    //     };
    //   })
    // );
  }

}
