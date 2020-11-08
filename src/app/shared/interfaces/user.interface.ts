/******************************************************************************
 * Title: user.interface.ts
 * Author: Jeff Shepherd, Clayton Stacy, Chris Bohnet
 * Modified by:
 * Date: 10/22/2020
 * Description: user interface
 *****************************************************************************/

import { SecurityQuestion } from './security-question.interface';
import { Role } from './role.interface';
 export interface User {
   _id: string;
   userName: string;
   password: string;
   firstName: string;
   lastName: string;
   phoneNumber: string;
   address: string;
   email: string;
   securityQuestions: SecurityQuestion[];
  role: Role;
 }
