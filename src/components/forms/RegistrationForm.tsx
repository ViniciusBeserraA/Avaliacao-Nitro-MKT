import React, { useState } from 'react';
import axios from 'axios';
import Button from '../ui/button/Button.tsx';
import imageSrc from '../assets/logo.png';

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
      setErrorMessage(`Erro ao enviar formulário: ${error.response.data.tipoErro}`);
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
        <div className="flex flex-col">
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
            Nome Completo:
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="mt-1 block w-full p-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out disabled:opacity-50 disabled:pointer-events-none"
          />
          {errors.nome && <span id="name-error" className="text-red-500 text-sm">{errors.nome}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Informe seu E-mail:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out disabled:opacity-50 disabled:pointer-events-none"
          />
          {errors.email && <span id="email-error" className="text-red-500 text-sm">{errors.email}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
            Informe sua Senha:
          </label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            className="mt-1 block w-full p-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out disabled:opacity-50 disabled:pointer-events-none"
          />
          {errors.senha && <span id="password-error" className="text-red-500 text-sm">{errors.senha}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="confirmacaoSenha" className="block text-sm font-medium text-gray-700">
            Confirme sua Senha:
          </label>
          <input
            type="password"
            id="confirmacaoSenha"
            name="confirmacaoSenha"
            value={formData.confirmacaoSenha}
            onChange={handleChange}
            className="mt-1 block w-full p-2 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out disabled:opacity-50 disabled:pointer-events-none"
          />
          {errors.confirmacaoSenha && <span id="confirm-password-error" className="text-red-500 text-sm">{errors.confirmacaoSenha}</span>}
        </div>
      </div>

      <div className="mt-4">
        <Button type="submit" isLoading={loading} children={'Enviar'} />
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
