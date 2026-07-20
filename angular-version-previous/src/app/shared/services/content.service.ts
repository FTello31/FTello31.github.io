import { Injectable } from '@angular/core';
import { client } from '../../sanity-client';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  getContent(table: string): Observable<any> {
    return from(client.fetch(`*[_type == "${table}"] | order(id asc)`));
  }
}
