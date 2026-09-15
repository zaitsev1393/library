import { Pipe, PipeTransform } from '@angular/core';

const COLORS = [
  'linear-gradient(135deg, #4A2F1E 0%, #7A5539 100%)',
  'linear-gradient(135deg, #641F1F 0%, #A2503F 100%)',
  'linear-gradient(135deg, #233329 0%, #4C6350 100%)',
  'linear-gradient(135deg, #372C5C 0%, #6B5C93 100%)',
  'linear-gradient(135deg, #6E5423 0%, #B0925A 100%)',
  'linear-gradient(135deg, #142B2E 0%, #3D6165 100%)',
];

@Pipe({
  name: 'randomColor',
})
export class RandomColorPipe implements PipeTransform {
  transform(id: string | number | undefined): string {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  }
}
