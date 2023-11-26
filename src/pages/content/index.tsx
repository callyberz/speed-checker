import { createRoot } from 'react-dom/client';
import { StorageUtils } from '@src/utils/StorageUtils';
import './style.css';

function render() {
  const div = document.createElement('div');
  div.id = '__root';
  document.body.appendChild(div);

  const rootContainer = document.querySelector('#__root');
  if (!rootContainer) throw new Error("Can't find Options root element");
  const root = createRoot(rootContainer);

  root.render(
    <div className="absolute top-0 left-0 text-lg text-black bg-amber-400 z-50">
      {`Your current speed is : ${StorageUtils.getSpeed()}x`}
    </div>
  );
}

try {
  render();
} catch (e) {
  console.error(e);
}
