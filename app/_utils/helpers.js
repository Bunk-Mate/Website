export const scrollToHash = (element_id) => {
   const element = document.getElementById(element_id);
   element?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
   });
};

import { PASSWORD_STRENGTH } from '../_enums/auth';

export const checkPasswordStrength = (password) => {
   let score = 0;

   if (password.length < 8) {
      return PASSWORD_STRENGTH.FAIL.LENGTH;
   } else if (/^\d+$/.test(password)) {
      // all numbers
      return PASSWORD_STRENGTH.FAIL.NUMS_ONLY;
   }

   // lowercase
   if (/[a-z]/.test(password)) score += 1;
   // uppercase
   if (/[A-Z]/.test(password)) score += 1;
   // numbers
   if (/\d/.test(password)) score += 1;
   // special characters
   if (/[^A-Za-z0-9]/.test(password)) score += 1;
   switch (score) {
      case 0:
      case 1:
         return PASSWORD_STRENGTH.WEAK;
      case 2:
      case 3:
         return PASSWORD_STRENGTH.MEDIUM;
      case 4:
         return PASSWORD_STRENGTH.STRONG;
   }
};
