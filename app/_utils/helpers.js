export const scrollToHash = (element_id) => {
   const element = document.getElementById(element_id);
   element?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
   });
};
