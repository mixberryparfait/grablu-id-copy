const voice = false;

console.log("execute copy.js");

// バトルページのみ
if (location.href.indexOf('#raid') >= 0) {

  window.onload = function() {

    // ポップアップが出現したときに呼ばれる
    // ID をクリップボードにコピーするイベントを登録してコピーイベントを呼び出す
    const observer = new MutationObserver((mutations) => {
      var elems = document.getElementsByClassName('prt-battle-id');
      if (elems.length <= 0) {
        return;
      }
      const id = elems[0].textContent.trim();

      const copy = e => {
        e.preventDefault();
        e.clipboardData.setData('text/plain', id);
        console.log('copy ' + id);
        if(voice) speak(id.split('').join(' '));
      };

      document.addEventListener('copy', copy);
      document.execCommand("copy");
      document.removeEventListener('copy', copy);
    });

    const wait_generate_pop = () => {
      const target = document.getElementById('pop');
      if(target) {
        // pop 要素の中を見張る
        const config = { 
          childList: true,
          attributes: false,
          characterData: false,
          subtree: false
        };
        observer.observe(target, config);
      }
      // pop 要素が生成されるまでループ
      // リロードのたびに呼ばれるので間隔を短くしすぎるとリロード処理が重くなる
      // 長くしすぎると最速で救援窓を開いたときに動かない
      // 自分の環境では 1.5 秒ぐらいで生成される
      else
        setTimeout(wait_generate_pop, 1500);
    };

    wait_generate_pop();
  }

  const speak = (text) => {
    const speak   = new SpeechSynthesisUtterance();
    speak.text = text;
    speak.rate  = 2; // 読み上げ速度 0.1-10 初期値:1 (倍速なら2, 半分の倍速なら0.5, )
    speak.pitch = 3;
    speak.volume = 0.5;
    speechSynthesis.speak(speak);
  } 
}
