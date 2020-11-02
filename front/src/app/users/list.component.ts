import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users = null;
    campus = null;
    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private accountService: AccountService
        ) {}

    ngOnInit() {

        this.form = this.formBuilder.group({
             idCampus: ['', Validators.required]
        });

        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
        this.accountService.getAllCampus()
            .pipe(first())
            .subscribe(campus => this.campus = campus);
    }

    onSubmit() {
        this.accountService.getUserCampus(this.form.value.idCampus)
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    deleteUser(id: string) {
        const user = this.users.find(x => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => this.users = this.users.filter(x => x.id !== id));
    }
}