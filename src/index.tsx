import * as ReactDOM from 'react-dom';
import './polyfill';
import App from './App';
import './index.css';
import Keplr from 'src/lib/Keplr';
import { ChainStore } from './stores/chain';
import { EmbedChainInfos } from './config';

window.chainStore = new ChainStore(EmbedChainInfos);

// export default Keplr;
// global Keplr
window.Keplr = new Keplr();

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);

let ctrlDown = false;
const ctrlKey = 'Meta';

document.addEventListener('keydown', (e) => {
  if (e.key === ctrlKey) ctrlDown = true;
});
document.addEventListener('keyup', (e) => {
  if (e.key === ctrlKey) ctrlDown = false;
});

document.addEventListener('keydown', (e) => {
  if (ctrlDown) {
    switch (e.key) {
      case 'v':
        return document.execCommand('paste');
      case 'c':
        return document.execCommand('copy');
      case 'x':
        return document.execCommand('cut');
      case 'a':
        return document.execCommand('selectAll');
    }
  }
});