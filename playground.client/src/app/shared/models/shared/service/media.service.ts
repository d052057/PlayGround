import { Injectable, OnInit, Inject, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mediaDirectory, mediaMenu, menuType } from '../../models';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class MediaService implements OnInit {
  private http = inject(HttpClient);
  public router = inject(Router);
  constructor(
  ) {
  }
  ngOnInit(): void {

  }

  private _dataResult!: any;
  public get dataResult(): any {
    return this._dataResult;
  }
  public set dataResult(value: any) {
    this._dataResult = value;
  }
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  textHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'text/plain'
    })
  }

  // HttpClient API get() method => Fetch menu
  getMenuList(): Observable<mediaMenu> {
    return this.http.get<mediaMenu>('/MediaMetaData/GetMenuList')
  }

  // HttpClient API get() method => Fetch directory
  getDirectoryList(id: any): Observable<mediaDirectory> {
    return this.http.get<mediaDirectory>('/MediaMetaData/GetDirectoryList/' + id)
  }

  deleteMenuItem(recordId: any): Observable<any> {
    return this.http.delete<any>('/MediaMetaData/RemoveMediaDirectory/' + recordId, this.httpOptions)
  }

  // Add menu item Record
  createMenuItem(record: any): Observable<any> {
    return this.http.post<any>('/MediaMetaData/AddMediaDirectory', JSON.stringify(record), this.httpOptions)
  }
  AddLink(record: any): Observable<any> {
    return this.http.post<any>('/MediaMetaData/AddLink', JSON.stringify(record), this.httpOptions)
  }
  RemoveLink(record: string): Observable<any> {
    return this.http.delete<any>('/MediaMetaData/RemoveLink/' + encodeURIComponent(record), this.httpOptions)
  }
  updateMetaData(menu: string): Observable<any> {
    let menutype = new menuType;
    menutype.menuId = menu;
    return this.http.put<any>('/updatedatabase/updateMetaData', JSON.stringify(menutype), this.httpOptions)
  }

  refreshMenu() {
    this.router.navigate([''])
      .then(() => {
        window.location.reload();
      });
  }
  // Get mediaMetaData
  //getMedia(folder: string): Observable<any> {
  //  return this.http.get<any>('/MediaMetaData/GetFilesByFolder?folder=' + folder)
  //}
  getMedia(folder: string, menu: string): Observable<any> {
    return this.http.get<any>('/MediaMetaData/GetFilesByFolder?folder=' + folder + "&menu=" + menu)
  }
  // Get rpm
  getRPM(): Observable<any> {
    return this.http.get<any>('/rpm/GetRpm');
  }

  RenameMediafile(record: any): Observable<any> {
    return this.http.post<any>('/MediaMetaData/RenameMediafile', JSON.stringify(record), this.httpOptions)
  }

  getById(id: string) {
    return this.http.get<any>('/MediaMetaData/getById/' + `${id}`);
  }
  deleteMedia(id: string) {
    return this.http.delete('/MediaMetaData/deleteById/' + `${id}`)
  }
  getYitong() {
    return this.http.get('/MediaMetaData/Yitong');
  }
  getMediaView(menu: string) {
    switch (menu) {
      case 'videos':
        return this.http.get('/MediaMetaData/videosView')
        break;
      case 'movies':
        return this.http.get('/MediaMetaData/moviesView')
        break;
      default:
        return this.http.get('/MediaMetaData/musicsView')
    }
  }
  updateDuration(data: any): Observable<any> {
        return this.http.post<any>('/MediaMetaData/updateMediasDuration', JSON.stringify(data), this.httpOptions)
  }

}
