// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

  
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const delayInput = form.querySelector('input[name="delay"]');
      const delay = parseInt(delayInput.value);
      
      const stateInput = form.querySelector('input[name="state"]:checked');
      const state = stateInput ? stateInput.value : null; 
      try {
        const promise = new Promise((resolve, reject) => {
          if (state === 'fulfilled') {
            setTimeout(() => resolve(delay), delay);
          } else if (state === 'rejected') {
            setTimeout(() => reject(delay), delay);
          } else {
            throw new Error('State is not selected');
          }
        });
        await promise.then((delay) => {
          iziToast.success({
            title: 'Fulfilled promise',
            message: `Fulfilled promise in ${delay}ms`
          });
        }).catch((delay) => {
          iziToast.error({
            title: 'Rejected promise',
            message: `Rejected promise in ${delay}ms`
          });
        });
      } catch (error) {
        iziToast.error({
          title: 'Error',
          message: error.message
        });
      }
    });
  });
