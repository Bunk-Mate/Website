'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from './modalContent.jsx';

export default function Popup({ compToPass, setDecisionCheck, message }) {
   const [showModal, setShowModal] = useState(false);
   const [mounted, setMounted] = useState(false);

   useEffect(() => setMounted(true), []);

   return mounted ? (
      <>
         <button onClick={() => setShowModal(true)}>{compToPass}</button>
         {showModal &&
            createPortal(
               <ModalContent
                  props={message}
                  setDecisionCheck={setDecisionCheck}
                  setShowModal={setShowModal}
               />,
               document.body
            )}
      </>
   ) : null;
}
