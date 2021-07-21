import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from '../utils/useUser';
import { useRouter } from 'next/router';
import { Button, Input } from '../components/ui/Form';
import { Login16 } from '@carbon/icons-react';
import { formatUsername } from '../utils';
import { app_name } from '../utils/constants';
import toast, { Toaster } from 'react-hot-toast';
import Spinner from '../components/ui/Spinner';
import Head from 'next/head';

const Register = () => {
  const router = useRouter();
  const { user, userSignUp } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);
    toast.loading('Loading...');

    if (username === '') {
      toast.error('Username is required.', {
        id: 'register-error-username',
      });
    }

    const { user, error } = await userSignUp({
      email,
      password,
      username: formatUsername(username),
    });

    if (error) {
      toast.dismiss();
      toast.error(error.message, {
        id: 'register-error',
      });
    } else {
      toast.dismiss();
      toast.success(`An email has sent to ${user.email}`, {
        id: 'register-success',
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      router.replace('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!user)
    return (
      <section className="p-5 bg-section">
        <Head>
          <title>{`${app_name} - Registro`}</title>
          <meta name="description" content="Description" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Toaster />
        <h1>Register</h1>

        <form onSubmit={handleRegister} className="mb-5">
          <Input
            type="email"
            placeholder="Email .."
            label="email"
            id="register-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-100"
          />

          <Input
            type="text"
            placeholder="Username .."
            label="@Username"
            id="register-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-100"
          />
          <Input
            type="password"
            placeholder="Password .."
            label="Password"
            id="register-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-100"
          />

          <div className="separator mb-5"></div>

          <div className="mb-5">
            <Button primary type="submit" disabled={loading}>
              Registrar <Login16 />
            </Button>
          </div>
        </form>

        <Link href="/login">
          <a className="link--primary small-text">
            Já tem uma conta? Faça o login
          </a>
        </Link>
      </section>
    );

  return (
    <section className="flex-center-center">
      <Spinner />
    </section>
  );
};

export default Register;
