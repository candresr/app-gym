import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Cities } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class CitiesService {
    private citiesSubject: BehaviorSubject<Cities>;
    public cities: Observable<Cities>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.citiesSubject = new BehaviorSubject<Cities>(JSON.parse(localStorage.getItem('cities')));
        this.cities = this.citiesSubject.asObservable();
    }

    public get citiesValue(): Cities {
        return this.citiesSubject.value;
    }

    getAll() {
        return this.http.get<Cities[]>(`${environment.apiUrl}/cities`);
    }

    register(city: Cities) {
        return this.http.post(`${environment.apiUrl}/cities/create`, city);
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/cities/delete/${id}`)
            .pipe(map(x => {
                return x;
            }));
    }
}