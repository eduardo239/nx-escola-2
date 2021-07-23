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
import { extractYoutubeUrl } from '../../utils';
import ContentBody from './ContentBody';

const AddContent = ({ setContent }) => {
  const [type, setType] = useState('title');
  const [code, setCode] = useState('');
  const [html, setHtml] = useState([]);

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

  const mapContent = () => {
    // return <ContentBody html={html} />;
    return html.map((c, i) => (
      <div key={i} className="text-center">
        {c.type === 'title' && <h1 className={s.h1}>{c.content}</h1>}
        {c.type === 'subtitle' && <h4>{c.content}</h4>}
        {c.type === 'paragraph' && <p>{c.content}</p>}
        {c.type === 'text' && <p className="text-left">{c.content}</p>}
        {/* https://www.youtube.com/watch?v=tgbNymZ7vqY&t=2s */}
        {c.type === 'video' && (
          <div className="">
            <div className="video-container">
              <iframe
                className="video"
                src={extractYoutubeUrl(c.content)}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
        {c.type === 'pdf' && <p>{c.content}</p>}
        {c.type === 'anchor' && (
          <a href={c.content} target="_blank" rel="noreferrer">
            {c.content}
          </a>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {c.type === 'image' && <img src={c.content} alt={c.content} />}
      </div>
    ));
  };

  return (
    <>
      <div className="separator"></div>
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
          type === 'image' ||
          type === 'pdf') && (
          <div className="mb-5">
            <Input
              id="add-subject-content"
              type="text"
              label={type.charAt(0).toUpperCase() + type.slice(1)}
              placeholder="Escreva aqui .."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button type="submit" danger onClick={handleAdd}>
              Adicionar {type.charAt(0).toUpperCase() + type.slice(1)}
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
            rows="4"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></Textarea>
          <Button type="submit" danger onClick={handleAdd}>
            Adicionar {type.charAt(0).toUpperCase() + type.slice(1)}
            <Add16 />
          </Button>
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
      {/*  */}
      <div className="mb-5 text-center">
        {mapContent().length > 0 && mapContent()}
      </div>
    </>
  );
};

export default AddContent;
