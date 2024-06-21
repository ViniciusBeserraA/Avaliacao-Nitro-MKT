import React, { useEffect, useState } from 'react';
import Button from '../ui/button/Button.tsx';
import InputField from '../ui/input/inputField.tsx';
import imageSrc from '../assets/logo.png';
import './RegistrationForm.css';
import { submitFormData } from '../../api/api.js';
import { validateConfirmPassword, validateEmail, validateName, validatePassword } from '../../utils/utils/validators.js';

const RegistrationForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmacaoSenha: '',
  });
  const [errors, setErrors] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmacaoSenha: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors: typeof errors = { nome: '', email: '', senha: '', confirmacaoSenha: '' };
    let isValid = true;

    if (!validateName(formData.nome)) {
      newErrors.nome = 'Nome inválido'
      setLoading(false);
      isValid = false;
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido'
      setLoading(false);
      isValid = false;
    }
    if (!validatePassword(formData.senha)) {
      newErrors.senha = 'A senha deve ter no mínimo 8 caracteres, incluindo 1 caractere minúsculo, 1 caractere maiúsculo e 1 numeral';
      setLoading(false);
      isValid = false;
    }
    if (!validateConfirmPassword(formData.senha, formData.confirmacaoSenha)) {
      newErrors.confirmacaoSenha = 'As senhas não coincidem';
      setLoading(false);
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await submitFormData(formData);

      if (response) {
        setSuccessMessage('Formulário enviado com sucesso!');
        setErrorMessage('');
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      } else {
        throw new Error('Erro ao enviar formulário.');
      }
    } catch (error) {
      setErrorMessage(`Erro ao enviar formulário: ${error.response?.data?.tipoErro || error.message}`);
      setSuccessMessage('');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-lg w-full">
      <div className="mb-4 flex items-center justify-center">
        <img src={imageSrc} width="120" alt="Logo" />
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center">Formulário de Cadastro</h2>

      <div className="grid grid-cols-2 gap-4">
        <InputField
          id="nome"
          name="nome"
          type="text"
          label="Nome Completo:"
          value={formData.nome}
          onChange={handleChange}
          error={errors.nome}
          disabled={loading}
        />
        <InputField
          id="email"
          name="email"
          type="email"
          label="Informe seu E-mail:"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          disabled={loading}
        />
        <InputField
          id="senha"
          name="senha"
          type="password"
          label="Informe sua Senha:"
          value={formData.senha}
          onChange={handleChange}
          error={errors.senha}
          disabled={loading}
        />
        <InputField
          id="confirmacaoSenha"
          name="confirmacaoSenha"
          type="password"
          label="Confirme sua Senha:"
          value={formData.confirmacaoSenha}
          onChange={handleChange}
          error={errors.confirmacaoSenha}
          disabled={loading}
        />
      </div>

      <div className="mt-4">
        <Button type="submit" isLoading={loading} children={loading ? 'Enviando' : 'Enviar'} />
      </div>

      {successMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded shadow-lg">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded shadow-lg">
          {errorMessage}
        </div>
      )}
    </form>
  );
};

export default RegistrationForm;
