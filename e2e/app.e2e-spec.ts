import { AudioTransformerPage } from './app.po';

describe('audio-transformer App', function() {
  let page: AudioTransformerPage;

  beforeEach(() => {
    page = new AudioTransformerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
