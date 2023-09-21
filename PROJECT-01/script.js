// ALL DOM ELEMENTS

const form = document.getElementById("form");
const names = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const passwordIcon = document.getElementById('password-icon');
// ALL FUNCTIONS

//  01- Function to check the length of any field

const checkLength = (field, min, max) => {
  let inputLength = field.value.trim().length;
  let fieldName = field.id.charAt(0).toUpperCase() + field.id.slice(1);
  if (inputLength === 0) {
    return;
  }

  if (inputLength <= min) {
    if (field.parentNode.classList.contains("success")) {
      field.parentNode.classList.remove("success");
    }
    const small = field.parentNode.querySelector("small");
    small.innerHTML = `${fieldName} should be greater than ${min} characters`;
    if (!field.parentNode.classList.contains("error"))
      field.parentNode.classList.add("error");
    return;
    // console.log(` 1st running : ${field.parentNode.className}`);
  }

  if (inputLength > max) {
    if (field.parentNode.classList.contains("success"))
      field.parentNode.classList.remove("success");
    const small = field.parentNode.querySelector("small");
    small.innerHTML = `${fieldName} should be less than ${max} characters`;
    if (!field.parentNode.classList.contains("error")) {
      field.parentNode.classList.add("error");
      return;
    }
  }

  if (field.parentNode.classList.contains("error")) {
    field.parentNode.classList.remove("error");
  }
  if (!field.parentNode.classList.contains("success")) {
    field.parentNode.classList.add("success");
    return;
  }
};

// 02 - Function to check availability of the data

const checkAvailability = (field) => {
  if (field.value.length === 0) {
    if (field.parentNode.classList.contains("success")) {
      field.parentNode.classList.remove("success");
    }
    if (!field.parentNode.classList.contains("error")) {
      field.parentNode.classList.add("error");
    }
    // Function to remove hyphen from Field Id's and convert it in upper case and then rejoin

    if (field.id.includes("-")) {
      const small = field.parentNode.querySelector("small");
      const fieldName = removehyphen(field);
      small.innerHTML = ` Please Enter ${fieldName}`;
      return;
    } else {
      const small = field.parentNode.querySelector("small");
      fieldName = field.id.charAt(0).toUpperCase() + field.id.slice(1);
      small.innerHTML = ` Please Enter ${fieldName}`;
      return;
    }
  }
};

// 03 - Function to remove hyphen from Field Id's for the use to display Errors

const removehyphen = (field) => {
  const fieldId = field.id.split("-");
  let fieldWithoutHyphen = fieldId.map((element) => {
    return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
  });

  fieldWithoutHyphen = fieldWithoutHyphen.join(" ");
  return fieldWithoutHyphen;
};

// 04 - Function to match password

const matchThem = (field1, field2) => {
  const inputLength = field2.value.trim().length;
  if (inputLength === 0) {
    return;
  }
  if (field1.value === field2.value) {
    const small = field2.parentNode.querySelector("small");
    small.innerHTML = "";
    if (field2.parentNode.classList.contains("error"))
      field2.parentNode.classList.remove("error");
    if (!field2.parentNode.classList.contains("success"))
      field2.parentNode.classList.add("success");
    return;
  } else {
    const small = field2.parentNode.querySelector("small");
    small.innerHTML = "Passwords are not matching.";
    if (field2.parentNode.classList.contains("success"))
      field2.parentNode.classList.remove("success");
    if (!field2.parentNode.classList.contains("error")) {
      field2.parentNode.classList.add("error");
      return;
    }
  }
};

// 05 - Function to Validate Email

const validatePattern = (field) => {
  const email = field.value.trim();
  if (field.length === 0) return;
  const regex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
  if (email.match(regex)) {
    const small = field.parentNode.querySelector("small");
    small.innerHTML = "";
    if (field.parentNode.classList.contains("error"))
      field.parentNode.classList.remove("error");
    if (!field.parentNode.classList.contains("success"))
      field.parentNode.classList.add("success");
    return;
  } else {
    const small = field.parentNode.querySelector("small");
    small.innerHTML = "Invalid Email.";
    if (field.parentNode.classList.contains("success"))
      field.parentNode.classList.remove("success");
    if (!field.parentNode.classList.contains("error")) {
      field.parentNode.classList.add("error");
      return;
    }
  }
};

// 06 - Function to reset the form by removing success class and input value from all fields
const reset = (array) => {
  const containsuccessclass = array.every((element) => {
    if(element.parentNode.classList.contains('success')){
      return true;
    }
  }) 
 
  if (containsuccessclass){
    
    array.forEach((element ) => {
      element.parentNode.classList.remove('success')
      element.value='';
     });
     alert("Are you sure yo want to submit?")
  }
   
}

// // ALL EVENT LISTENERS
// // 01-  Event Listener to submit form

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fieldArray = [names, email, password, confirmPassword];
  fieldArray.map((field) => {
    checkAvailability(field);
  });
  checkLength(names, 3, 20);
  checkLength(password, 5, 10);
  matchThem(password, confirmPassword);
  validatePattern(email);
  reset(fieldArray);
  
});

// 02 - Event Listener to toggle password eye icon to show and hide password
passwordIcon.addEventListener('click', () => {

  const input = passwordIcon.parentNode.querySelector('input');
  const inputAttributeType = input.getAttribute('type');
  const iconElement = passwordIcon.parentNode.querySelector('i');
  //  console.log( inputAttributeType );
  //  console.log(iconElement);
  //  console.log(input);
   if(inputAttributeType !== "text"){
    input.removeAttribute("type");
    input.setAttribute("type","text");
    iconElement.classList.replace("fa-eye","fa-eye-slash");
   }
   else{
    input.removeAttribute("type");
    input.setAttribute("type","password");
    iconElement.classList.replace("fa-eye-slash","fa-eye");
   }
});

