import { Injectable } from '@angular/core';

@Injectable()
export class DownloadService {
  downloadXML(xml: string, filename = 'library.xml'): void {
    if (typeof xml !== 'string') {
      throw new Error('Provided data must be a string');
    }
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    setTimeout(() => URL.revokeObjectURL(url), 0);
  }
}
