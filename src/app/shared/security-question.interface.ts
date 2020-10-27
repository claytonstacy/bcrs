/******************************************************************************
 * Title: security-question-interface.ts
 * Author: Jeff Shepherd, Clayton Stacy, Chris Bohnet
 * Modified by:
 * Date: 10/22/2020
 * Description: security question interface
 *****************************************************************************/

export interface SecurityQuestion {
  _id?: string;
  text?: string;
  answerText?: string;
  questionText?: string;
}
