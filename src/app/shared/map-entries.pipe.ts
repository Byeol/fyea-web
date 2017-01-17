import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export class MapEntry {
  key: any;
  value: any;
}

@Pipe({ name: 'mapEntries' })
export class MapEntriesPipe implements PipeTransform {
  transform(map: Map<any, any>): MapEntry[] {
    const entries = [];

    map.forEach((value, key) => entries.push({
      key: key,
      value: value
    }));

    return entries;
  }
}
