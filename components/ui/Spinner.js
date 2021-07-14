import s from '../../styles/Spinner.module.scss';

export default function Spinner() {
  return (
    <div className={s.spinner}>
      <div className={s.bounce1}></div>
      <div className={s.bounce2}></div>
      <div className={s.bounce3}></div>
    </div>
  );
}
