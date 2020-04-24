
window.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const aTags = document.querySelectorAll('a:not([style])');
  const tips = document.querySelectorAll('.tip');

  const setDarkTheme = () => {
    document.body.style.backgroundColor = '#222';
    document.body.style.color = '#fff';
    aTags.forEach((a) => { a.style.color = '#fff'; });
    tips.forEach((tip) => { 
      tip.style.borderLeftColor = '#fff';
      tip.style.borderTopWidth = '0px';
      tip.style.borderRightWidth = '0px';
      tip.style.borderBottomWidth = '0px';
    });
  };

  const setLightTheme = () => {
    document.body.style.backgroundColor = '#fff';
    document.body.style.color = '#000';
    aTags.forEach((a) => { a.style.color = '#000'; });
    tips.forEach((tip) => { 
      tip.style.borderLeftColor = '#000';
      tip.style.borderTopWidth = '0.5px';
      tip.style.borderRightWidth = '0.5px';
      tip.style.borderBottomWidth = '0.5px';
    });
  }

  const initLocalStorage = () => {
    if (localStorage.getItem('theme')) {
      return false;
    }

    localStorage.setItem('theme', JSON.stringify({ darkMode: false }));
  }

  const initTheme = () => {
    const state = JSON.parse(localStorage.getItem('theme'));

    if (state.darkMode) {
      setDarkTheme();
      themeToggle.className = 'theme-toggle-light';
      themeToggle.innerText = '🌞';
      themeToggle.title = 'Enable Light Mode';
      return false;
    }

    setLightTheme();
    themeToggle.className = 'theme-toggle-dark';
    themeToggle.innerText = '🌙';
    themeToggle.title = 'Enable Dark Mode';
  };

  initLocalStorage();
  initTheme();

  themeToggle.onclick = (e) => {
    if (e.target.className === 'theme-toggle-dark') {
      e.target.className = 'theme-toggle-light';
      themeToggle.innerText = '🌞';
      themeToggle.title = 'Enable Light Mode';
      const getThemeState = JSON.parse(localStorage.getItem('theme'));
      const state = {
        darkMode: !getThemeState.darkMode,
      };

      localStorage.setItem('theme', JSON.stringify(state));

      setDarkTheme();
    } else {
      e.target.className = 'theme-toggle-dark';
      themeToggle.innerText = '🌙';
      themeToggle.title = 'Enable Dark Mode';

      const getThemeState = JSON.parse(localStorage.getItem('theme'));
      const state = {
        darkMode: !getThemeState.darkMode,
      };

      localStorage.setItem('theme', JSON.stringify(state));

      setLightTheme();
    }
  };
});
