import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Cities, Campus } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class CampusService {
    private campusSubject: BehaviorSubject<Campus>;
    public campus: Observable<Campus>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.campusSubject = new BehaviorSubject<Campus>(JSON.parse(localStorage.getItem('campus')));
        this.campus = this.campusSubject.asObservable();
    }

    public get campusValue(): Campus {
        return this.campusSubject.value;
    }

    getAll() {
        return this.http.get<Campus[]>(`${environment.apiUrl}/campus`);
    }

    register(data: Campus) {
        return this.http.post(`${environment.apiUrl}/campus/create`, data);
    }

    getAllCities() {
        return this.http.get<Campus[]>(`${environment.apiUrl}/campus/getAllCities`);
    }


    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/campus/delete/${id}`)
            .pipe(map(x => {
                return x;
            }));
    }
}