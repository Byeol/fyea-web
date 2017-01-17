import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(obj: Object): any {
    const keys = [];

    Object.keys(obj).sort().forEach(key => keys.push(
      { key: key, value: obj[key] }
    ));

    return keys;
  }
}
