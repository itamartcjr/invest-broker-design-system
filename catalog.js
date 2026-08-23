const nestedPage = /\/(app|web)\//.test(location.pathname.replaceAll('\\', '/'));

document.querySelectorAll('.brand').forEach(brand => {
  if (!brand.querySelector('.brand-mark')) return;
  brand.innerHTML = `<img class="brand-logo-img" src="${nestedPage ? '../' : ''}assets/brand/ciimo-primary-dark.svg" alt="CIIMO">`;
});

document.querySelectorAll('.side-nav').forEach(nav => {
  if (nav.querySelector('[href$="branding.html"]')) return;
  const link = document.createElement('a');
  link.href = nestedPage ? '../branding.html' : 'branding.html';
  link.innerHTML = '<span class="nav-icon">B</span><span class="nav-text">Marca</span>';
  nav.prepend(link);
});

document.querySelectorAll('[data-tabs]').forEach(group=>{group.querySelectorAll('[data-tab]').forEach(tab=>tab.addEventListener('click',()=>{const id=tab.dataset.tab;group.querySelectorAll('[data-tab]').forEach(item=>item.classList.toggle('active',item===tab));group.parentElement.querySelectorAll('.tab-panel').forEach(panel=>panel.classList.toggle('active',panel.dataset.panel===id))}))});
document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{await navigator.clipboard?.writeText(button.dataset.copy||'');const previous=button.textContent;button.textContent='Copiado';setTimeout(()=>button.textContent=previous,1000)}));
