// js/fub-forms.js — FUB Pixel injection + Fello CTA wiring
// Requires js/fub-config.js to be loaded first in the page <head>

document.addEventListener('DOMContentLoaded', () => {

  // 1. Inject FUB Pixel
  if (typeof FUB_CONFIG !== 'undefined' && FUB_CONFIG.pixelId) {
    (function(w, d, s, i) {
      var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s);
      j.async = true;
      j.src = 'https://cdn.followupboss.com/2/fub.js?id=' + i;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', FUB_CONFIG.pixelId);
  }

  // 2. Inject RealScout agent ID dynamically
  if (typeof FUB_CONFIG !== 'undefined' && FUB_CONFIG.realscoutAgentId) {
    document.querySelectorAll('realscout-simple-search, realscout-office-listings').forEach(el => {
      el.setAttribute('agent-encoded-id', FUB_CONFIG.realscoutAgentId);
    });
  }

  // 3. Wire Fello CTA buttons from config
  document.querySelectorAll('.fello-cta').forEach(el => {
    if (typeof FUB_CONFIG !== 'undefined' && FUB_CONFIG.felloUrl) {
      el.href = FUB_CONFIG.felloUrl;
    }
  });

});
