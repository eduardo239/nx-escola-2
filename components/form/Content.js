import { useRef, useState } from 'react';
import Image from 'next/image';
import { Input, Button, Textarea, IconOnly } from '../ui/Form';
import {
  Add16,
  DirectionCurveFilled16,
  DocumentPdf16,
  Image16,
  Link16,
  Paragraph16,
  SoilTemperature16,
  Subtract16,
  TextAlignJustify16,
  TextAllCaps16,
  TextBold16,
  TextLineSpacing16,
  TrashCan16,
  VideoChat16,
} from '@carbon/icons-react';
import s from '../../styles/Questions.module.scss';

const AddContent = ({ setContent }) => {
  const [type, setType] = useState('title');
  const [code, setCode] = useState('');
  const [html, setHtml] = useState([]);
  const [loading, setLoading] = useState(false);

  const imageRef = useRef();

  const handleAdd = (e) => {
    e.preventDefault();
    if (code !== '') {
      setHtml((html) => [...html, { type, content: code }]);
      setContent(html);
    }
    setCode('');
  };

  const addElement = (item) => {
    setHtml((html) => [...html, { type: item, content: item }]);
    setContent(html);
    setCode('');
  };

  const removeElement = (i) => {
    setHtml(html.filter((item, index) => index !== i));
  };

  const addImage = (URL) => {
    if (code === '') {
      return;
    }
    // TODO: fix image
    setLoading(true);
    let img = new Image();
    img.src = URL;

    if (img.src) {
      img.onload = function () {
        setHtml((html) => [
          ...html,
          {
            type,
            image: {
              url: code,
              size: { width: img.width, height: img.height },
            },
          },
        ]);
      };
      setContent(html);
      setCode('');
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="separator"></div>
      <h5>ELemento</h5>
      <div
        className="mb-5"
        style={{ display: 'flex', gap: '1px', flexWrap: 'wrap' }}
      >
        <IconOnly
          primary={type === 'title'}
          secondary={type !== 'title'}
          onClick={() => setType('title')}
        >
          <TextAllCaps16 />
        </IconOnly>
        <IconOnly
          primary={type === 'subtitle'}
          secondary={type !== 'subtitle'}
          label="Subtitle"
          onClick={() => setType('subtitle')}
        >
          <TextBold16 />
        </IconOnly>
        <IconOnly
          primary={type === 'paragraph'}
          secondary={type !== 'paragraph'}
          onClick={() => setType('paragraph')}
        >
          <Paragraph16 />
        </IconOnly>
        <IconOnly
          primary={type === 'text'}
          secondary={type !== 'text'}
          onClick={() => setType('text')}
        >
          <TextAlignJustify16 />
        </IconOnly>

        <IconOnly
          primary={type === 'anchor'}
          secondary={type !== 'anchor'}
          onClick={() => setType('anchor')}
        >
          <Link16 />
        </IconOnly>
        <IconOnly
          primary={type === 'video'}
          secondary={type !== 'video'}
          onClick={() => setType('video')}
        >
          <VideoChat16 />
        </IconOnly>
        <IconOnly
          primary={type === 'pdf'}
          secondary={type !== 'pdf'}
          onClick={() => setType('pdf')}
        >
          <DocumentPdf16 />
        </IconOnly>
        {/*  */}
        <IconOnly
          primary={type === 'image'}
          secondary={type !== 'image'}
          onClick={() => setType('image')}
        >
          <Image16 />
        </IconOnly>
        {/*  */}
        <IconOnly
          primary={type === 'separator'}
          secondary={type !== 'separator'}
          onClick={() => addElement('separator')}
        >
          <TextLineSpacing16 />
        </IconOnly>
      </div>
      <form onSubmit={handleAdd}>
        {(type === 'title' ||
          type === 'subtitle' ||
          type === 'paragraph' ||
          type === 'anchor' ||
          type === 'video' ||
          type === 'pdf') && (
          <div className="mb-5">
            <Input
              id="add-subject-content"
              type="text"
              label={type.charAt(0).toUpperCase() + type.slice(1)}
              placeholder="Escreva aqui .."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-100"
            />
            <Button disabled={loading} type="submit" danger onClick={handleAdd}>
              Adicionar Elemento
              <Add16 />
            </Button>
          </div>
        )}
      </form>

      {type === 'text' && (
        <div className="mb-5">
          <Textarea
            id="add-subject-text"
            label={type.charAt(0).toUpperCase() + type.slice(1)}
            placeholder="Write here .."
            className="w-100"
            rows="4"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></Textarea>
          <Button disabled={loading} type="submit" danger onClick={handleAdd}>
            Adicionar Elemento
            <Add16 />
          </Button>
        </div>
      )}
      {type === 'image' && (
        <div>
          <Input
            id="add-subject-image"
            type="text"
            label={type.charAt(0).toUpperCase() + type.slice(1)}
            placeholder="Write here .."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-100"
          />
          {type === 'image' && (
            <div className="mb-5">
              <Button
                disabled={loading}
                type="submit"
                secondary
                onClick={() => addImage(code)}
              >
                Adicionar Imagem <Add16 />
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="separator"></div>

      <div className="mb-5">
        <h5>Conteúdo</h5>
        {html.map((h, i) => (
          <div key={i} className={s.item}>
            <div>
              <span>{i + 1}</span>
              <label>{h.content}</label>
            </div>
            <div>
              <IconOnly secondary onClick={() => removeElement(i)}>
                <Subtract16 />
              </IconOnly>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AddContent;
