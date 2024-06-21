import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../ui/button/Button.tsx';
import InputField from '../ui/input/inputField.tsx';
import imageSrc from '../assets/logo.png';
import './RegistrationForm.css';

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

    if (!formData.nome) {
      newErrors.nome = 'O nome é obrigatório.';
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = 'O e-mail é obrigatório.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'O e-mail é inválido.';
      isValid = false;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!formData.senha) {
      newErrors.senha = 'A senha é obrigatória.';
      isValid = false;
    } else if (!passwordRegex.test(formData.senha)) {
      newErrors.senha = 'A senha deve ter no mínimo 8 caracteres, incluindo 1 caractere minúsculo, 1 caractere maiúsculo e 1 numeral.';
      isValid = false;
    }
    if (formData.senha !== formData.confirmacaoSenha) {
      newErrors.confirmacaoSenha = 'As senhas não coincidem.';
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
      const response = await axios.post('http://localhost:8080', formData, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'ECA1AB4CE8583613A2C759B445E98',
        },
      });

      if (response.status === 200) {
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
        />
        <InputField
          id="email"
          name="email"
          type="email"
          label="Informe seu E-mail:"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <InputField
          id="senha"
          name="senha"
          type="password"
          label="Informe sua Senha:"
          value={formData.senha}
          onChange={handleChange}
          error={errors.senha}
        />
        <InputField
          id="confirmacaoSenha"
          name="confirmacaoSenha"
          type="password"
          label="Confirme sua Senha:"
          value={formData.confirmacaoSenha}
          onChange={handleChange}
          error={errors.confirmacaoSenha}
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
