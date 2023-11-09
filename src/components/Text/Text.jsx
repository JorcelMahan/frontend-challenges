import { useEffect, useState } from 'react';
import './Text.css';

export const Text = () => {
  const [text, setText] = useState('');
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [loading]);

  const handleSubmit = e => {
    e.preventDefault();

    if (text === '') return alert('Please enter text');

    if (!loading) {
      setLoading(true);
      setDocuments([...documents, text]);
      setText('');
    } else {
      return alert('Please wait while the document is being processed');
    }
  };

  return (
    <div>
      <div className='body-container'>
        <form onSubmit={handleSubmit}>
          <textarea
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleSubmit(e);
              }
            }}
            className='textarea'
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder='Enter text here...'
            rows={5}
          />
          {documents.length > 0 ? (
            <div className='document-body'>
              {documents.map((doc, index) => (
                <p
                  key={index}
                  className={
                    index === documents.length - 1 && loading
                      ? 'paragraph-highlight-class'
                      : ''
                  }
                >
                  {doc}
                </p>
              ))}
            </div>
          ) : (
            <div
              className='document-body'
              style={{ textAlign: 'center', color: '#52525240' }}
            >
              Added content will show here
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
