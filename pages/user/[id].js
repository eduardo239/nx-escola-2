import { useEffect } from 'react';
import { app_description, app_name } from '../../utils/constants';
import { useUser } from '../../utils/useUser';
import Grades from '../../components/table/user/Grades';
import Head from 'next/head';
import Payments from '../../components/table/user/Payments';
import Chart from '../../components/table/user/Chart';

const Profile = ({}) => {
  const {
    profile,
    userCourses,
    userPayments,
    userGrades,
    getUserCourses,
    getUserPayments,
    getUserGrades,
  } = useUser();
  useEffect(() => {
    (async function () {
      if (profile) {
        await getUserCourses(profile.id);
        await getUserPayments(profile.id);
        await getUserGrades(profile.id);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  if (profile)
    return (
      <section className="p-5 bg-section">
        <Head>
          <title>{`${app_name} - ${profile.username}`}</title>
          <meta
            name="description"
            content={`${app_name} - ${app_description}`}
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h5 className="mb-5">Conta: {profile.username}</h5>

        <div className="separator mb-5"></div>

        {userGrades && <Chart user_grades={userGrades} />}
        <div className="separator mb-5"></div>
        {userGrades && <Grades user_grades={userGrades} />}
        <div className="separator mb-5"></div>
        {userPayments && <Payments user_payments={userPayments} />}
        <div className="separator mb-5"></div>
      </section>
    );

  return (
    <section className="p-5 bg-section">
      <h1>Usuário não encontrado.</h1>
    </section>
  );
};

export default Profile;
