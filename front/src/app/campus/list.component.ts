import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { CampusService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    campus = null;

    constructor(
        private campusService: CampusService
        ) {}

    ngOnInit() {
        this.campusService.getAllCities()
            .pipe(first())
            .subscribe(campus => this.campus = campus);
    }

    deleteCampus(id: string) {

        this.campusService.delete(id)
            .pipe(first())
            .subscribe(() => this.campus = this.campus.filter(x => x.id !== id));
    }
}