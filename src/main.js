document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('myForm');
  const nameField = document.getElementById('name');
  const emailField = document.getElementById('email');
  const passwordField = document.getElementById('password');
  const confirmPasswordField = document.getElementById('confirm-password');
  const submitButton = document.getElementById('submit-button');
  const successAlert = document.getElementById('success-alert');
  const errorAlert = document.getElementById('error-alert');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  const confirmPasswordError = document.getElementById('confirm-password-error');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (validateName() && validateEmail() && validatePasswords()) {
      try {
        const formData = new FormData(form);
        const data = {
          nome: formData.get('name'),
          email: formData.get('email'),
          senha: formData.get('password'),
          confirmacaoSenha: formData.get('password')
        };
        
        const response = await fetch('http://localhost:8080', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'ECA1AB4CE8583613A2C759B445E98'
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error('Erro ao enviar formulário.');
        }

        successAlert.classList.remove('hidden');
        successAlert.classList.remove('fade-out');
        successAlert.classList.add('fade-in');
        successAlert.textContent = 'Formulário enviado com sucesso!';
        
        form.reset();
        updateSubmitButtonState();
      } catch (error) {
        errorAlert.classList.remove('hidden');
        errorAlert.textContent = 'Erro ao enviar formulário. Tente novamente mais tarde.';
        console.error('Erro ao enviar formulário:', error);
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
