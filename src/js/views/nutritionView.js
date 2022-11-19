import View from './View.js';
//import icons from 'url:../../img/icons.svg';

class NutritionView extends View {
  addHandlerCal(res) {
    const iframe = document.getElementById('previewWidget');
    const overlay = document.querySelector('.overlay');
    let xmlHttp = new XMLHttpRequest();
    let { url, servings, ingredientList } = res;
    const oneServing = 1;

    if (iframe.classList.contains('hidden')) {
      iframe.classList.remove('hidden');
      overlay.classList.remove('hidden');
    }

    xmlHttp.open('POST', url, true);
    xmlHttp.send(
      'defaultCss=true&servings=' +
        oneServing +
        '&ingredientList=' +
        ingredientList
    );
    xmlHttp.onreadystatechange =
      (this,
      function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          handlerIframe(xmlHttp.responseText);
          //console.log(xmlHttp.responseText);
        } else {
          return 'No data get';
        }
      });

    function handlerIframe(response) {
      let el = document.createElement('script');
      el.setAttribute('type', 'text/javascript');
      el.setAttribute('src', 'https://code.jquery.com/jquery-1.9.1.min.js');
      iframe.contentDocument.head.appendChild(el);

      el = document.createElement('script');
      el.setAttribute('type', 'text/javascript');
      el.setAttribute(
        'src',
        'https://spoonacular.com/application/frontend/js/jquery.canvasjs.min'
      );
      iframe.contentDocument.head.appendChild(el);

      // wait until jquery is loaded
      setTimeout(function () {
        let iframeDocument = iframe.contentDocument;

        iframeDocument.open();
        iframeDocument.write(
          response +
            `<a
          href="#"
          id='clButton'
          style="text-decoration:none;
          font-family: inherit;
          color: inherit;
          position: absolute;
          top: -1rem;
          right: 0.5rem;
          font-size: 2.5rem;
          cursor: pointer;
          border: none;
          background: none;"
          >&times</a
        ><div
          style="
          position: absolute;
          left: 5rem;
          top: 0;
          font-size: 16px;
          margin-top: 12px;
          margin-bottom: 6px;
          color: inherit;
          ">
          (nutrition calculation ${servings} servings)
          </div>`
        );
        iframeDocument.close();

        let elScript = document.createElement('script');
        elScript.setAttribute('type', 'text/javascript');
        elScript.setAttribute(
          'src',
          'https://spoonacular.com/application/frontend/js/nutritionWidget.min.js?c=1'
        );
        iframe.contentDocument.body.appendChild(elScript);

        let closeWinow = document.createElement('script');
        closeWinow.innerHTML = `
              
            document.getElementById('clButton').addEventListener('click', function(e){
              let d = window.parent.document;
              let overlay = d.querySelector('.overlay');
              let frame = d.getElementById('previewWidget');
              frame.classList.add('hidden');
              overlay.classList.add('hidden');
              e.preventDefault();
            })
    
            
           `;
        //  document.getElementById('clButton').addEventListener('click', function(e){
        //   let d = window.parent.document;
        //   let frame = d.getElementById('previewWidget');
        //   frame.parentNode.removeChild(frame);
        //   e.preventDefault();
        // })
        iframe.contentDocument.body.appendChild(closeWinow);
        let elStyle = document.createElement('style');
        elStyle.innerHTML = `html {
            overflow-y: scroll;
          }
          
          :root {
            overflow-y: auto;
            overflow-x: hidden;
          }
          
          :root body {
            position: absolute;
          }
          
          body {
            width: 100vw;
            overflow: scroll;
            
          }`;
        iframe.contentDocument.head.appendChild(elStyle);
      }, 1000);
    }
  }
}

export default new NutritionView();
