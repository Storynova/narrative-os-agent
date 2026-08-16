/*
 * NarrativeOS - Asset Library (Phase 1 drop-in module)
 * ----------------------------------------------------
 * Adds a persistent library where every generated asset (battle card,
 * positioning, story architecture, pitch deck, etc.) is saved and can be
 * viewed later. Uses localStorage so it works on the static GitHub Pages site
 * with no backend.
 *
 * HOW TO WIRE IN:
 * 1. Add a sidebar link:  <a href="#asset-library">Asset Library</a>
 * 2. Add a container:     <section id="asset-library"></section>
 * 3. Include this file after app.js.
 * 4. After each generator renders, call:
 *      AssetLibrary.save({ type: 'battle-card', title: '...', html: outputHtml });
 *
 * PROPRIETARY / ALL RIGHTS RESERVED - Copyright (c) 2026 StoryNova.
 */

const AssetLibrary = (function () {
  const KEY = 'narrativeos.assets.v1';

  function all() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch (e) { return []; }
  }

  function persist(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
  }

  function save(asset) {
    const list = all();
    list.unshift({
      id: 'a_' + Date.now(),
      type: asset.type || 'asset',
      title: asset.title || 'Untitled asset',
      html: asset.html || '',
      createdAt: new Date().toISOString()
    });
    persist(list);
    render();
    return list[0].id;
  }

  function remove(id) {
    persist(all().filter(function (a) { return a.id !== id; }));
    render();
  }

  function typeLabel(t) {
    return ({
      'battle-card': 'Battle Card',
      'positioning': 'Positioning',
      'product-analysis': 'Product Analysis',
      'story-architecture': 'Story Architecture',
      'pitch-deck': 'Pitch Deck',
      'creative-hooks': 'Creative Hooks'
    })[t] || 'Asset';
  }

  function render() {
    const root = document.getElementById('asset-library');
    if (!root) return;
    const list = all();
    if (!list.length) {
      root.innerHTML = '<div class="al-empty"><h2>Asset Library</h2>' +
        '<p>No saved assets yet. Generate a battle card, positioning, or story and it will appear here.</p></div>';
      return;
    }
    root.innerHTML =
      '<div class="al-head"><h2>Asset Library</h2><span>' + list.length + ' saved</span></div>' +
      '<div class="al-grid">' +
      list.map(function (a) {
        return '<div class="al-card" data-id="' + a.id + '">' +
          '<div class="al-tag">' + typeLabel(a.type) + '</div>' +
          '<h3>' + escapeHtml(a.title) + '</h3>' +
          '<div class="al-date">' + new Date(a.createdAt).toLocaleString() + '</div>' +
          '<div class="al-actions">' +
          '<button data-act="view" data-id="' + a.id + '">View</button>' +
          '<button data-act="delete" data-id="' + a.id + '">Delete</button>' +
          '</div></div>';
      }).join('') +
      '</div><div id="al-viewer" class="al-viewer"></div>';

    root.querySelectorAll('button[data-act]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const id = btn.getAttribute('data-id');
        if (btn.getAttribute('data-act') === 'delete') { remove(id); return; }
        const a = all().find(function (x) { return x.id === id; });
        const v = document.getElementById('al-viewer');
        if (a && v) { v.innerHTML = '<div class="al-viewer-inner">' + a.html + '</div>'; v.scrollIntoView({behavior:'smooth'}); }
      });
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  document.addEventListener('DOMContentLoaded', render);
  return { save: save, remove: remove, all: all, render: render };
})();

