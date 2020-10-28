/******************************************************************************
 * Title: phone-format.pipe.ts
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 10/22/2020
 * Description: pipe to format phone numbers
 *****************************************************************************/
import { Pipe, PipeTransform } from '@angular/core';

  // Formats the phone number to look like (402) 555-1212 unless
  // the argument does not match the regex, in which case the function
  // returns the argument unchanged.

@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {

  transform(value: string): string {
    let formattedPhone;
    let pattern = new RegExp('^[0-9]*$');

    if (value.match(pattern)) {
      let areaCode = value.substring(0, 3);
      let prefix = value.substring(3, 6);
      let lastFour = value.substring(6);
      formattedPhone = `(${areaCode}) ${prefix}-${lastFour}`;
    } else {
      return value;
    }

      return formattedPhone;
    }

}
