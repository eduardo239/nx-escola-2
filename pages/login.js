import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from '../utils/useUser';
import { useRouter } from 'next/router';
import { Login16, LogoGithub16 } from '@carbon/icons-react';
import { Button, Input } from '../components/ui/Form';
import toast, { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import { app_name } from '../utils/constants';
import Spinner from '../components/ui/Spinner';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, signIn } = useUser();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.loading('Loading...');

    const { error } = await signIn({
      email,
      password,
    });

    if (error) {
      toast.dismiss();
      toast.error(error.message, {
        id: 'login-error',
      });
    } else {
      toast.dismiss();
    }
    setLoading(false);
  };

  const handleOAuthSignIn = async (provider) => {
    setLoading(true);
    const { error } = await signIn({ provider });
    if (error)
      toast.error(error.message, {
        id: 'oauth-error',
      });
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
          <title>{`${app_name} - Login`}</title>
          <meta name="description" content="Description" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Toaster />
        <h1>Login</h1>

        <form onSubmit={handleLogin} className="mb-5">
          <Input
            type="email"
            placeholder="Email .."
            label="Email"
            id="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-100"
          />
          <Input
            type="password"
            placeholder="Password .."
            label="Password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-100"
          />

          <div className="mb-5">
            <Button primary type="submit" disabled={loading}>
              Login <Login16 />
            </Button>
          </div>
        </form>

        <div className="separator mb-5"></div>

        <div className="mb-5">
          <Button
            disabled={loading}
            secondary
            type="submit"
            onClick={() => handleOAuthSignIn('github')}
          >
            Continue com Github <LogoGithub16 />
          </Button>
        </div>

        <Link href="/register">
          <a className="link--primary small-text">
            Não tem uma conta? Se inscreva
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

export default Login;
