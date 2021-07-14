import { useRef, useState } from 'react';
import Image from 'next/image';
import { Input, Button, Textarea } from '../ui/Form';
import {
  Add16,
  DocumentPdf16,
  Image16,
  Link16,
  Paragraph16,
  TextAlignJustify16,
  TextAllCaps16,
  TextBold16,
  VideoChat16,
} from '@carbon/icons-react';

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
        <Button
          primary={type === 'title'}
          secondary={type !== 'title'}
          onClick={() => setType('title')}
        >
          Title <TextAllCaps16 />
        </Button>
        <Button
          primary={type === 'subtitle'}
          secondary={type !== 'subtitle'}
          label="Subtitle"
          onClick={() => setType('subtitle')}
        >
          Subtitle <TextBold16 />
        </Button>
        <Button
          primary={type === 'paragraph'}
          secondary={type !== 'paragraph'}
          onClick={() => setType('paragraph')}
        >
          Paragraph <Paragraph16 />
        </Button>
        <Button
          primary={type === 'text'}
          secondary={type !== 'text'}
          onClick={() => setType('text')}
        >
          Text <TextAlignJustify16 />
        </Button>

        <Button
          primary={type === 'anchor'}
          secondary={type !== 'anchor'}
          onClick={() => setType('anchor')}
        >
          Link <Link16 />
        </Button>
        <Button
          primary={type === 'video'}
          secondary={type !== 'video'}
          onClick={() => setType('video')}
        >
          Video <VideoChat16 />
        </Button>
        <Button
          primary={type === 'pdf'}
          secondary={type !== 'pdf'}
          onClick={() => setType('pdf')}
        >
          PDF File <DocumentPdf16 />
        </Button>
        {/*  */}
        <Button
          primary={type === 'image'}
          secondary={type !== 'image'}
          onClick={() => setType('image')}
        >
          Image <Image16 />
        </Button>
        {/*  */}
        <Button
          primary={type === 'separator'}
          secondary={type !== 'separator'}
          onClick={() => addElement('separator')}
        >
          Separator <DocumentPdf16 />
        </Button>
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
              placeholder="Write here .."
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
          <div key={i} className="flex-space-center">
            <p
              style={{
                flex: '1',
                margin: '0.5rem 0',
                border: '1px solid #333',
                padding: '0.5rem ',
                fontSize: '0.75rem',
              }}
            >
              {h.content}
            </p>
            <Button danger onClick={() => removeElement(i)}>
              Remover
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default AddContent;
