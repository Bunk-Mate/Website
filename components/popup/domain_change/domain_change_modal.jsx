'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import DomainChangeInfo from './domain_change.jsx';
import { ACCESS_NOTICE_KEY } from '@/app/_utils/api_constants.js';

export default function DomainChangeModal() {
   const [showModal, setShowModal] = useState(false);
   const [mounted, setMounted] = useState(false);

   useEffect(() => setMounted(true), []);

   useEffect(() => {
      if (!localStorage.getItem(ACCESS_NOTICE_KEY)) {
         setShowModal(true);
      }
   }, []);

   return mounted ? (
      <>
         {showModal &&
            createPortal(
               <DomainChangeInfo setShowModal={setShowModal} />,
               document.body
            )}
      </>
   ) : null;
}
