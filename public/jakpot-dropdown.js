(function () {
  function create({ label, options = [], variant = 'single-select', value, onChange = function () {}, placeholder = 'Select an option' }) {
    const multi = variant === 'multi-select';
    let selected = multi ? [...(Array.isArray(value) ? value : [])] : (typeof value === 'string' ? value : '');
    const root = document.createElement('div');
    root.className = 'jakpot-dropdown jakpot-dropdown--' + variant;

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'jakpot-dropdown__trigger jakpot-button jakpot-button--secondary';
    trigger.setAttribute('aria-expanded', 'false');

    const summary = document.createElement('span');
    const chevron = document.createElement('span');
    chevron.className = 'jakpot-dropdown__chevron';
    chevron.setAttribute('aria-hidden', 'true');
    chevron.textContent = '⌄';
    trigger.append(summary, chevron);

    const panel = document.createElement('div');
    panel.className = 'jakpot-dropdown__panel';
    panel.hidden = true;

    const updateSummary = () => {
      summary.textContent = multi
        ? (selected.length ? label + ' · ' + selected.length : label)
        : (selected || label || placeholder);
    };

    const optionsWrap = document.createElement('div');
    optionsWrap.className = 'jakpot-dropdown__options';
    optionsWrap.setAttribute('role', 'group');
    optionsWrap.setAttribute('aria-label', label);

    const optionButtons = [];
    const renderOptions = () => {
      optionButtons.forEach(({ button, option }) => {
        const active = multi ? selected.includes(option) : selected === option;
        button.classList.toggle('is-selected', active);
        button.setAttribute('aria-pressed', String(active));
      });
      updateSummary();
    };

    const updateValue = (next) => {
      selected = multi ? [...next] : next;
      renderOptions();
      onChange(multi ? [...selected] : selected);
    };

    if (multi) {
      const actions = document.createElement('div');
      actions.className = 'jakpot-dropdown__actions';
      const selectAll = document.createElement('button');
      selectAll.type = 'button';
      selectAll.textContent = 'Select all';
      selectAll.addEventListener('click', () => updateValue(options));
      const unselectAll = document.createElement('button');
      unselectAll.type = 'button';
      unselectAll.textContent = 'Unselect all';
      unselectAll.addEventListener('click', () => updateValue([]));
      actions.append(selectAll, unselectAll);
      panel.appendChild(actions);
    }

    options.forEach((option) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'jakpot-dropdown__option' + (multi ? ' jakpot-dropdown__option--tag' : '');
      button.textContent = option;
      button.setAttribute('aria-pressed', 'false');
      button.addEventListener('click', () => {
        if (multi) {
          updateValue(selected.includes(option) ? selected.filter((item) => item !== option) : [...selected, option]);
        } else {
          updateValue(selected === option ? '' : option);
          close();
        }
      });
      optionButtons.push({ button, option });
      optionsWrap.appendChild(button);
    });

    function close() {
      panel.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
    }

    trigger.addEventListener('click', () => {
      const opening = panel.hidden;
      panel.hidden = !opening;
      trigger.setAttribute('aria-expanded', String(opening));
    });

    panel.appendChild(optionsWrap);
    root.append(trigger, panel);
    renderOptions();

    document.addEventListener('pointerdown', (event) => {
      if (!root.contains(event.target)) close();
    });
    root.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        close();
        trigger.focus();
      }
    });

    return {
      element: root,
      getValue: () => multi ? [...selected] : selected,
      setValue: (next) => {
        selected = multi ? [...(Array.isArray(next) ? next : [])] : (typeof next === 'string' ? next : '');
        renderOptions();
      },
      close,
    };
  }

  window.JAKpotDropdown = { create };
})();