import React from 'react';
import ReactDOM from 'react-dom';
import GradioInterface from './gradio';

let fn = async (data, action) => {
  const output = await fetch(process.env.REACT_APP_BACKEND_URL + "api/" + action + "/", {
    method: "POST",
    body: JSON.stringify({ "data": data }),
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return await output.json();
}

async function get_config() {
  if (process.env.REACT_APP_BACKEND_URL) { // dev mode
    let config = await fetch(process.env.REACT_APP_BACKEND_URL + "config");
    config = await config.json()
    return config;
  } else {
    return window.config;
  }  
}

get_config().then(config => {
  ReactDOM.render(
    <div class="gradio_page">
      {config.title ? <h1 className="title">{config.title}</h1> : false}
      {config.description ? <p className="description">{config.description}</p> : false}
      <GradioInterface {...config} fn={fn} />
      {config.article ? <p className="article prose" dangerouslySetInnerHTML={{"__html": config.article}} /> : false}
    </div>,
    document.getElementById('root')
  );
})
