let state = {
    caption: 0,
    head: '',
    body: '',
    logo: '<img src="files/logo.png" alt="">',
  }
  
  function render() {
    count.innerHTML = state.caption;
    head.innerHTML = state.head;
    body.innerHTML = state.body;
    logo.innerHTML = state.logo;
  }
  
  (function initialize() {
    window.history.replaceState(state, null, '');
    render(state);
  })()
  
  window.onpopstate = function (event) {
    if (event.state) { 
      state = event.state; 
    }
    render(state);
    this.resetListeners();
  };
  
  