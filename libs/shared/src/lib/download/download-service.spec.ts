import { DownloadService } from './download.service';

describe('DownloadService', () => {
  it('should be created', () => {
    const service = new DownloadService();
    expect(service).toBeTruthy();
  });

  it('should throw if the provided data is not string', () => {
    const service = new DownloadService();
    const errors = [123, null, undefined, {}, [], true];
    for (const error of errors) {
      expect(() => service.downloadXML(error as any)).toThrow();
    }
  });
});
