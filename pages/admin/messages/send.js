import { Send16 } from '@carbon/icons-react';
import { useState } from 'react';
import { ButtonIcon, Textarea } from '../../../components/ui/Form';
import { useMessage } from '../../../utils/useMessage';
import { useUser } from '../../../utils/useUser';

const roles = ['student', 'admin', 'teacher'];

export default function Send() {
  const { postData } = useMessage();
  const { profile } = useUser();

  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [toProfileId, setToProfileId] = useState(null);

  const mapRole = () => {
    return roles.map((x, i) => <option key={i}>{x}</option>);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (profile) {
      setLoading(true);

      const body = {
        profile_id: profile.id,
        content,
        to_profile_id: toProfileId,
        to_role: role,
      };
      const { data, error } = await postData('messages', body);
    }
    setLoading(false);
  };

  return (
    <section className="p-5 bg-section">
      <h1 className="mb-5">Enviar mensagem</h1>

      <Textarea
        label="Conteúdo"
        placeholder="Conteúdo da mensagem"
        rows="4"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></Textarea>

      <form onSubmit={handleSend} className="mb-5">
        <div className="field--select mb-5">
          <label htmlFor="send-message-user-id">Função</label>
          <select
            onChange={(e) => setRole(e.target.value)}
            id="add-balance-user-id"
          >
            <option defaultValue value="">
              Escolha um
            </option>
            {mapRole()}
          </select>
        </div>

        <ButtonIcon disabled={loading} primary onClick={handleSend}>
          Enviar <Send16 />
        </ButtonIcon>
      </form>
    </section>
  );
}
