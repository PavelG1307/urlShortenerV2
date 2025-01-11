import Api from '../api/api';
import styleClasses from './MainPage.module.css'
import { useState } from 'react';

export function MainPage() {
    const [link, setLink] = useState(null);
    const [originalUrl, setOriginalUrl] = useState();

    return (<div className={styleClasses.container}>
        <h1 className="title">
            URL Shortener
        </h1>

        <div className={styleClasses.subtitle}>
            Введите ссылку, которую надо сократить
        </div>

        <div className={styleClasses.inputContainer}>
            <input
                className={styleClasses.input}
                type="text"
                placeholder="Ссылка"
                onChange={(e) => setOriginalUrl(e.target.value)}
            />
            <button
                className={styleClasses.button}
                onClick={() => {
                    Api.createShortUrl(originalUrl)
                        .then(l => setLink(l))
                        .catch(console.error)
                    }
                }
            >
                Сократить
            </button>
        </div>

        {   link
            ? <div className={styleClasses.linkContainer}>
                <div  className={styleClasses.link}>
                    {link.replace('https://', '')}
                </div>
                <div  className={styleClasses.buttonContainer}>
                    <button
                        onClick={() => {
                            try {
                                navigator.clipboard.writeText(link);
                              } catch (err) {
                                console.error('Ошибка:', err);
                              }
                        }}
                    >
                        Копировать
                    </button>
                </div>
            </div>
            : null
        }
    </div>)
}