const regexFormat1 = new RegExp(/^[^\W\d_]*$/);
      const regexFormat2 = new RegExp(/^.{0,35}$/);
      let isFirstNameTouched = false;
      let isLastNameTouched = false;
      let isAddressTouched = false;
      let lastAddedId = 0;
      function preSubmit(event) {
        event.preventDefault();
          const form = getFormSnapshot(event.target);
          let formIsInvalid = false;
          for(let i in form) {
              if (form[i].value?.length === 0 && (i == 'firstName' || i == 'lastName' || i == 'address')) {
                const requiredError = event.target.querySelector(`#${i}+.form-text+.control-error-required`);
                form[i].classList.add('control-error-req');
                requiredError.classList.add('required');
                formIsInvalid = true;
              }
          }
          if(formIsInvalid) {
              console.log('invalid form');
          } else (handleSubmit(form))
      }
      //=============================
      function handleSubmit(form) {
          let tbodyRef = document.querySelector('.table-body');
          lastAddedId = ((Number(document.querySelector('.table-body > tr:last-child')?.classList?.value?.substring(8)) || 0));
          let element = `
        <tr class="entryId-${lastAddedId+1}">
        <td scope="col" onclick="popupContent(${lastAddedId+1})" data-bs-toggle="modal" data-bs-target="#exampleModal">${lastAddedId+1}</td>
        <td scope="col" onclick="popupContent(${lastAddedId+1})" data-bs-toggle="modal" data-bs-target="#exampleModal">${form.firstName.value}</td>
        <td scope="col" onclick="popupContent(${lastAddedId+1})" data-bs-toggle="modal" data-bs-target="#exampleModal">${form.lastName.value}</td>
        <td scope="col" onclick="popupContent(${lastAddedId+1})" data-bs-toggle="modal" data-bs-target="#exampleModal">${form.address.value}</td>
        <td scope="col" onclick="popupContent(${lastAddedId+1})" data-bs-toggle="modal" data-bs-target="#exampleModal">${form.date.value || 'Not provided'}</td>
        <td scope="col" onclick="popupContent(${lastAddedId+1})" data-bs-toggle="modal" data-bs-target="#exampleModal">${form.sex.value || 'Not provided'}</td>
        <td scope="col" onclick="popupContent(${lastAddedId+1})" data-bs-toggle="modal" data-bs-target="#exampleModal">${form.notes.value || 'Not provided'}</td>
        <td scope="col">
            <button type="button" class="btn btn-danger" onclick="deleteEntry(${++lastAddedId}, event)">Delete</button>
        </td>
      </tr>`;
      tbodyRef.innerHTML += element; 
      document.querySelector('.form').reset();
      }
      //=============================
      function addressValidation(event) {
        const element = event.target;
          if (regexFormat2.test(element.value)) {
              element.classList?.remove('control-error');
          } else {
            element.classList.add('control-error');
          }
          
          if (isAddressTouched) {
              const requiredError = document.querySelector('#address+.form-text+.control-error-required');
              if(element.value?.length === 0) {
                element.classList.add('control-error-req');
                  requiredError.classList.add('required');
              } else {
                element.classList?.remove('control-error-req');
                requiredError.classList?.remove('required');
              }
          }
      }
      function lastNameValidation(event) {
        const element = event.target;
          if (regexFormat1.test(element.value)) {
              element.classList?.remove('control-error');
          } else {
            element.classList.add('control-error');
          }
          if (isLastNameTouched) {
              const requiredError = document.querySelector('#lastName+.form-text+.control-error-required');
              if(element.value?.length === 0) {
                element.classList.add('control-error-req');
                  requiredError.classList.add('required');
              } else {
                element.classList?.remove('control-error-req');
                requiredError.classList?.remove('required');
              }
          }
    
      }
      function firstNameValidation(event) {
          const element = event.target;
          if (regexFormat1.test(element.value)) {
              element.classList?.remove('control-error');
          } else {
            element.classList.add('control-error');
          }
          if (isFirstNameTouched) {
              const requiredError = document.querySelector('#firstName+.form-text+.control-error-required');
              if(element.value?.length === 0) {
                element.classList.add('control-error-req');
                  requiredError.classList.add('required');
              } else {
                element.classList?.remove('control-error-req');
                requiredError.classList?.remove('required');
              }
          }
      }
      function getFormSnapshot(form) {
          return {
              firstName: form.querySelector('#firstName'),
              lastName: form.querySelector('#lastName'),
              address: form.querySelector('#address'),
              date: form.querySelector('#date'),
              sex: form.querySelector('#sex'),
              notes: form.querySelector('#notes')
          };
      }
      function deleteEntry(id, event) {
        event.preventDefault();
          document.querySelector('.entryId-' + id)?.remove();
      }
      function handleUnload() {
          localStorage.setItem('cachedTable', document.querySelector('.table-body').innerHTML);
          localStorage.setItem('cachedLastId', document.querySelector('.table-body > tr:last-child')?.classList?.value?.substring(8) || '0');
      }
      function handleLoad() {
        lastAddedId = Number(localStorage.getItem('cachedLastId')) || 0;
        document.querySelector('.table-body').innerHTML = localStorage.getItem('cachedTable') || '';
      }
      function popupContent(content) {
        document.querySelector('.modal-body').innerText = document.querySelector('.entryId-' + content).querySelector('td:nth-child(7)').innerText || 'Not provided';
        //document.querySelector('.modal-body').innerText= "ssssssssssssssss";
      }