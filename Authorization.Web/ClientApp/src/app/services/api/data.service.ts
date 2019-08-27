import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { SnackerService } from '../snacker.service';

import {
  TableCategory,
  TableDatum
} from '../../models';

@Injectable()
export class DataService {
  private categories = new BehaviorSubject<TableCategory[]>(null);
  private category = new BehaviorSubject<TableCategory>(null);
  private data = new BehaviorSubject<TableDatum[]>(null);
  private datum = new BehaviorSubject<TableDatum>(null);

  categories$ = this.categories.asObservable();
  category$ = this.category.asObservable();
  data$ = this.data.asObservable();
  datum$ = this.datum.asObservable();

  constructor(
    private http: HttpClient,
    private snacker: SnackerService
  ) { }

  getCategories = () => this.http.get<TableCategory[]>(`/api/data/getCategories`)
    .subscribe(
      data => this.categories.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    );

  searchCategories = (search: string) => this.http.get<TableCategory[]>(`/api/data/searchCategories/${search}`)
    .subscribe(
      data => this.categories.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    );

  getDeletedCategories = () => this.http.get<TableCategory[]>(`/api/data/getDeletedCategories`)
    .subscribe(
      data => this.categories.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    );

  searchDeletedCategories = (search: string) => this.http.get<TableCategory[]>(`/api/data/searchDeletedCategories/${search}`)
    .subscribe(
      data => this.categories.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    );

  getCategoriesWithData = () => this.http.get<TableCategory[]>(`/api/data/getCategoriesWithData`)
    .subscribe(
      data => this.categories.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    );

  searchCategoriesWithData = (search: string) => this.http.get<TableCategory[]>(`/api/data/searchCategoriesWithData/${search}`)
    .subscribe(
      data => this.categories.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    );

  getCategory = (categoryId: number) => this.http.get<TableCategory>(`/api/data/getCategory/${categoryId}`)
    .subscribe(
      data => this.category.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    );

  getCategoryWithData = (categoryId: number) => this.http.get<TableCategory>(`/api/data/getCategoryWithData/${categoryId}`)
    .subscribe(
      data => this.category.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    );

  addCategory = (category: TableCategory): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post(`/api/data/addCategory`, category)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${category.label} successfully added`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          }
        );
    });

  updateCategory = (category: TableCategory): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post(`/api/data/updateCategory`, category)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${category.label} successfully updated`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          }
        );
    });

  toggleCategoryDeleted = (category: TableCategory): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post(`/api/data/toggleCategoryDeleted`, category)
        .subscribe(
          () => {
            const message = category.isDeleted ?
              `${category.label} successfully restored` :
              `${category.label} successfully deleted`;

            this.snacker.sendSuccessMessage(message);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          }
        );
    });

  removeCategory = (category: TableCategory): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post(`/api/data/removeCategory`, category)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${category.label} permanently deleted`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          }
        );
    });

  getData = () => this.http.get<TableDatum[]>(`/api/data/getData`)
    .subscribe(
      data => this.data.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    );

  searchData = (search: string) => this.http.get<TableDatum[]>(`/api/data/searchData/${search}`)
    .subscribe(
      data => this.data.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    );

  getDeletedData = () => this.http.get<TableDatum[]>(`/api/data/getDeletedData`)
    .subscribe(
      data => this.data.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    );

  searchDeletedData = (search: string) => this.http.get<TableDatum[]>(`/api/data/searchDeletedData/${search}`)
    .subscribe(
      data => this.data.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    );

  getDataByCategory = (categoryId: number) => this.http.get<TableDatum[]>(`/api/data/getDataByCategory/${categoryId}`)
    .subscribe(
      data => this.data.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    );

  getDatum = (datumId: number) => this.http.get<TableDatum>(`/api/data/getDatum/${datumId}`)
    .subscribe(
      data => this.datum.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    );

  addDatum = (datum: TableDatum): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post(`/api/data/addDatum`, datum)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${datum.data} successfully added`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          }
        );
    });

  updateDatum = (datum: TableDatum): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post(`/api/data/updateDatum`, datum)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${datum.data} successfully updated`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          }
        );
    });

  toggleDatumDeleted = (datum: TableDatum): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post(`/api/data/toggleDatumDeleted`, datum)
        .subscribe(
          () => {
            const message = datum.isDeleted ?
              `${datum.data} successfully restored` :
              `${datum.data} successfully deleted`;

            this.snacker.sendSuccessMessage(message);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          }
        );
    });

  removeDatum = (datum: TableDatum): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post(`/api/data/removeDatum`, datum)
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`${datum.data} permanently deleted`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          }
        );
    });
}
