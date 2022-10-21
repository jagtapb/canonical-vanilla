import React, { useState, useEffect } from "react";
import './style.scss';

import DOMPurify from "dompurify";

const CardContainer = () => {
    const [cardData, setCardData] = useState([]);

    useEffect(() => {
        fetch('https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json')
        .then(res => res.json())
        .then(data => setCardData(data));
    }, []);


    return (
        <div className="main-header">
            { 
                cardData.map(({id, featured_media, title, _embedded, content, date}) => (
                    <div key={id} className="row ">
                        <div className="col-12">
                            <div className="p-card--highlighted">
                                <div>CLOUD AND SERVER</div>
                                <hr className="u-sv1" />
                                <img alt="img" className="p-card__image" src={featured_media} />
                                <div className="p-card__inner">
                                    <h3>{title.rendered}</h3>
                                    <p>By <a href={_embedded.author[0].link}>{_embedded.author[0].name}</a> on { new Date(date).toDateString()}</p>
                                </div>
                                <hr className="u-no-margin--bottom" />
                                <div className="p-card__inner">Article</div>
                                {/* <div className="p-card__inner" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.rendered) }}></div> */}
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default CardContainer;