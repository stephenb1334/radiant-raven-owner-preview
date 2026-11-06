const parts = ["./assets/brand-kit/part-00.bin", "./assets/brand-kit/part-01.bin", "./assets/brand-kit/part-02.bin", "./assets/brand-kit/part-03.bin", "./assets/brand-kit/part-04.bin", "./assets/brand-kit/part-05.bin", "./assets/brand-kit/part-06.bin", "./assets/brand-kit/part-07.bin", "./assets/brand-kit/part-08.bin", "./assets/brand-kit/part-09.bin", "./assets/brand-kit/part-10.bin", "./assets/brand-kit/part-11.bin", "./assets/brand-kit/part-12.bin", "./assets/brand-kit/part-13.bin"];
const link = document.querySelector('#brand-download');
link.addEventListener('click', async event => {
  event.preventDefault();
  if (link.dataset.busy) return;
  const label = 'Download the brand & media kit ↓';
  link.dataset.busy = 'true';
  link.textContent = 'Preparing the brand kit…';
  try {
    const buffers = await Promise.all(parts.map(async path => {
      const response = await fetch(path);
      if (!response.ok) throw new Error('Download unavailable');
      return response.arrayBuffer();
    }));
    const url = URL.createObjectURL(new Blob(buffers, { type: 'application/zip' }));
    const save = document.createElement('a');
    save.href = url;
    save.download = 'radiant-raven-brand-kit.zip';
    document.body.append(save);
    save.click();
    save.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
    link.textContent = label;
  } catch {
    link.textContent = 'Download interrupted. Try again ↓';
  } finally {
    delete link.dataset.busy;
  }
});
