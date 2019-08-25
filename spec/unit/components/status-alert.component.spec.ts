import { StatusAlertComponent } from '../../../src';
import { TemplateResult } from 'lit-element';

describe('Status Alert Component', () => {

  it('should inject style into head element', () => {
    const comp = new StatusAlertComponent();
    expect(comp).toBeDefined();
    expect(document.head.innerHTML)
      .toContain("font-family: 'icomoon';");
  });

  it('should fire event, set title and request update', () => {
    const comp = new StatusAlertComponent();
    const spy = spyOn(comp, 'requestUpdate').and.callThrough();
    let firedCnt = 0;
    comp.addEventListener('close', () => {
      firedCnt++;
    });
    comp.closeClick(new Event('fake'));
    expect(comp.title).toEqual('Close clicked');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(firedCnt).toEqual(1);
  });

  it('redner should return html', () => {
    const comp = new StatusAlertComponent();
    const renderResult = comp.render();
    expect(renderResult instanceof TemplateResult).toEqual(true);
  });

  it('should call parents lifecycle hook', () => {
    const comp = new StatusAlertComponent();
    comp.connectedCallback();
  });

  it('should fire title click event', (done) => {
    const el = document.createElement('status-alert');
    el.setAttribute('id', 'elAlert');
    document.body.append(el);
    let firedCnt = 0;
    el.addEventListener('title-click', () => {
      firedCnt++;
    });
    // we have to get the h3 element in the next event loop, so we wrap it in
    // a timeout
    setTimeout(() => {
      const h3El = document.querySelector("#elAlert")
        .shadowRoot.querySelector("h3");
      h3El['click']();
      expect(firedCnt).toEqual(1);
      // clean up the test and remove the element form the dom
      el.remove();
      done();
    }, 0);
  });
});
