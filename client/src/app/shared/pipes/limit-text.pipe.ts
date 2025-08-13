import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'limitText'
})
export class LimitTextPipe implements PipeTransform {
    transform(value: string | undefined, maxLength: number = 40): string {
        if (!value) {
            return '';
        }

        if (value.length > maxLength) {
            return `${value.substring(0, maxLength)}...`;
        }
        else {
            return value;
        }
    }
}