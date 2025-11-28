
document.addEventListener('DOMContentLoaded', function(){
  const menuBtn = document.getElementById('menu-btn');
  const nav = document.querySelector('.nav');
  if(menuBtn){
    menuBtn.addEventListener('click', ()=> nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex');
  }


  const search = document.getElementById('search');
  const sort = document.getElementById('sort');
  const catalog = document.getElementById('catalog');
  if(search || sort){
    const products = Array.from(document.querySelectorAll('.product'));
    const applyFilter = ()=>{
      const q = search ? search.value.trim().toLowerCase() : '';

      products.forEach(p=>{
        const title = p.dataset.title.toLowerCase();
        const price = (p.dataset.price||'0');
        const match = title.includes(q) || price.includes(q);
        p.style.display = match ? '' : 'none';
      });
   
      let visible = products.filter(p=> p.style.display !== 'none');
      if(sort && sort.value === 'price-asc'){
        visible.sort((a,b)=> parseFloat(a.dataset.price)-parseFloat(b.dataset.price));
      } else if(sort && sort.value === 'price-desc'){
        visible.sort((a,b)=> parseFloat(b.dataset.price)-parseFloat(a.dataset.price));
      }
    
      visible.forEach(v => catalog.appendChild(v));
    };
    if(search) search.addEventListener('input', applyFilter);
    if(sort) sort.addEventListener('change', applyFilter);
  }
});
