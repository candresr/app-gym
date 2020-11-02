import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { CitiesService } from '@app/_services/cities.service';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    cities = null;

    constructor(private citiesService: CitiesService) {}

    ngOnInit() {
        console.log("EN ngOnInit");
        this.citiesService.getAll()
            .pipe(first())
            .subscribe(cities => this.cities = cities);
    }

    deleteCity(id: string) {

        this.citiesService.delete(id)
            .pipe(first())
            .subscribe(() => this.cities = this.cities.filter(x => x.id !== id));
    }
}