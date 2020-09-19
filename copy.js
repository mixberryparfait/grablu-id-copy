var debug = true;

//localStorage.clear();

if (debug) console.log("execute copy.js");

// バトルページのみ
if (location.href.indexOf('#raid') >= 0) {

  // ポップアップが出現したときに呼ばれる
  // ID をクリップボードにコピーするイベントを登録してコピーイベントを呼び出す

  window.onload = function() {
    const observer = new MutationObserver((mutations) => {
      var elems = document.getElementsByClassName('prt-battle-id');
      if (elems.length <= 0) {
        return;
      }
      const id = elems[0].textContent.trim();
      document.addEventListener('copy', function(e) {
        e.preventDefault();
        e.clipboardData.setData('text/plain', id);
        console.log('copy ' + id)
      });
      document.execCommand("copy");
    });

    // pop 要素が生成されるまでループ
    const wait_generate_pop = () => {
      const target = document.getElementById('pop');
      console.log(target);
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
      else
        setTimeout(wait_generate_pop, 100);
    };

    wait_generate_pop();
  }
}
