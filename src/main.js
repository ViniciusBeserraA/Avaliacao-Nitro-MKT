document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('myForm');
  const nameField = document.getElementById('name');
  const emailField = document.getElementById('email');
  const passwordField = document.getElementById('password');
  const confirmPasswordField = document.getElementById('confirm-password');
  const submitButton = document.getElementById('submitBtn');
  const successAlert = document.getElementById('success-alert');
  const errorAlert = document.getElementById('error-alert');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  const confirmPasswordError = document.getElementById('confirm-password-error');

  const submitBtnText = document.getElementById('submitBtnText');
  const submitBtnLoading = document.getElementById('submitBtnLoadingSvg');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    submitBtnText.textContent = 'Enviando';
    submitBtnLoading.classList.remove('hidden');

    const inputs = form.querySelectorAll('input');


    if (validateName() && validateEmail() && validatePasswords()) {
      try {
        const formData = new FormData(form);
        const data = {
          nome: formData.get('name'),
          email: formData.get('email'),
          senha: formData.get('password'),
          confirmacaoSenha: formData.get('confirm-password')
        };

        inputs.forEach(input => {
          input.disabled = true;
        });
    
        const response = await fetch('http://localhost:8080', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'ECA1AB4CE8583613A2C759B445E98'
          },
          body: JSON.stringify(data)
        });
    
        const result = await response.json();
    
        if (!response.ok || result.erro) {
          const errorMessage = result.tipoErro || 'Erro ao enviar formulário.';
          throw new Error(errorMessage);
        }
    
        successAlert.classList.remove('hidden');
        setTimeout(() => {
          successAlert.classList.add('fade-in');
        }, 100);
    
        setTimeout(() => {
          successAlert.classList.add('hidden');
        }, 5000);
    
        form.reset();
        updateSubmitButtonState();
      } catch (error) {
        console.log(error);
        errorAlert.textContent = ('Erro ao enviar formulário: '+ error.message);
        errorAlert.classList.remove('hidden');
        setTimeout(() => {
          errorAlert.classList.add('fade-in');
        }, 100);
    
        setTimeout(() => {
          errorAlert.classList.add('hidden');
        }, 5000);
        console.error('Erro ao enviar formulário:', error);
      } finally {
        submitBtnText.textContent = 'Enviar';
        submitBtnLoading.classList.add('hidden');
        inputs.forEach(input => {
          input.disabled = false;
        });
      }
    }
  });

  const validateName = () => {
    const name = nameField.value.trim();

    if (name === '') {
      nameField.classList.add('error');
      nameError.textContent = 'O campo nome é obrigatório.';
      return false;
    } else {
      nameField.classList.remove('error');
      nameError.textContent = '';
      return true;
    }
  };

  const validateEmail = () => {
    const email = emailField.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      emailField.classList.add('error');
      emailError.textContent = 'Email inválido.';
      return false;
    } else {
      emailField.classList.remove('error');
      emailError.textContent = '';
      return true;
    }
  };

  const validatePasswords = () => {
    const password = passwordField.value;
    const confirmPassword = confirmPasswordField.value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!passwordRegex.test(password)) {
      passwordField.classList.add('error');
      passwordError.textContent = 'A senha deve ter no mínimo 8 caracteres, incluindo pelo menos 1 letra maiúscula, 1 letra minúscula e 1 número.';
      return false;
    } else if (password !== confirmPassword) {
      passwordField.classList.remove('error');
      passwordError.textContent = '';
      confirmPasswordField.classList.add('error');
      confirmPasswordError.textContent = 'As senhas não coincidem.';
      return false;
    } else {
      passwordField.classList.remove('error');
      confirmPasswordField.classList.remove('error');
      passwordError.textContent = '';
      confirmPasswordError.textContent = '';
      return true;
    }
  };

  const updateSubmitButtonState = () => {
    submitButton.disabled = !(validateName() && validateEmail() && validatePasswords());
  };

  nameField.addEventListener('input', () => {
    validateName();
    updateSubmitButtonState();
  });

  emailField.addEventListener('input', () => {
    validateEmail();
    updateSubmitButtonState();
  });

  passwordField.addEventListener('input', () => {
    validatePasswords();
    updateSubmitButtonState();
  });

  confirmPasswordField.addEventListener('input', () => {
    validatePasswords();
    updateSubmitButtonState();
  });
});