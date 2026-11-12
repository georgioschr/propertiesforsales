'use strict';
// Add approved photos at images/{folder}/cover.jpg and they will appear automatically.
// Contact channels are intentionally not active until the owner supplies public details.
const listings = [
  {id:1, folder:'livadia', location:['ΛΙΒΑΔΙΑ • ΛΕΥΚΩΣΙΑ','LIVADIA • NICOSIA'], name:['Οικιστικό τεμάχιο','Residential land plot'], price:'€79.000', area:'2.342 m²', zone:'H4', type:['Οικιστική γη','Residential land'], facts:[['Τεμάχιο 691','Parcel 691'],['Πολεοδομική ζώνη Η4','Planning zone H4'],['Δυνατότητα οικιστικής αξιοποίησης υπό τις απαραίτητες εγκρίσεις','Potential residential development subject to required approvals']]},
  {id:2, folder:'alona', location:['ΑΛΩΝΑ • ΚΡΥΟΣ','ALONA • KRIOS'], name:['Τρία αγροτικά τεμάχια','Three rural land parcels'], price:'€15.900', area:'7.759 m²', zone:'Z1', type:['Αγροτική γη','Rural land'], facts:[['Τεμάχια 1497, 1498, 1507','Parcels 1497, 1498, 1507'],['Πολεοδομική ζώνη Ζ1','Planning zone Z1'],['Αγροτικός δρόμος σε πολύ κοντινή απόσταση (δεν δηλώνεται άμεση πρόσβαση)','Agricultural road very close by (direct access not claimed)'],['Ξεχωριστοί τίτλοι ιδιοκτησίας','Separate title deeds']]},
  {id:3, folder:'alithinou', location:['ΑΛΗΘΙΝΟΥ • ΦΟΥΡΝΙΑ','ALITHINOU • FOURNIA'], name:['Τρία αγροτικά τεμάχια','Three rural land parcels'], price:'€5.900', area:'3.513 m²', zone:'Γ3', type:['Αγροτική γη','Rural land'], facts:[['Τεμάχια 817, 818, 819','Parcels 817, 818, 819'],['Πωλείται το 100% του 818 και μερίδιο 50% στα 817 και 819','100% of parcel 818 and 50% shares in parcels 817 and 819 offered'],['Πολεοδομική ζώνη Γ3','Planning zone G3'],['Η συνολική επιφάνεια είναι των τριών τεμαχίων, όχι ισοδύναμη αποκλειστικής ιδιοκτησίας','Total area refers to all three parcels, not solely owned area']]},
  {id:4, folder:'polystypos', location:['ΠΟΛΥΣΤΥΠΟΣ • ΛΕΥΚΩΣΙΑ','POLYSTYPOS • NICOSIA'], name:['Ημιτελές κτίριο πρώην εστιατορίου','Unfinished former restaurant building'], price:null, area:null, zone:null, type:['Κτίριο','Building'], facts:[['Πωλείται το 100% της ιδιοκτησίας, με τη συμφωνία των δύο συνιδιοκτητών','100% ownership offered with agreement from both co-owners'],['Οικοδομική άδεια 1982 για εστιατόριο','1982 building permit for a restaurant'],['Ημιτελής κατασκευή με ανάγκες επισκευής και αποκατάστασης','Unfinished building requiring repairs and restoration'],['Άλλη χρήση μόνο με τις απαραίτητες εγκρίσεις','Alternative uses subject to required approvals'] ]}
];
let language='gr';
let activeId=null;
const $=id=>document.getElementById(id);
const translate=pair=>pair[language==='gr'?0:1];
const photoPath=item=>`images/${item.folder}/cover.jpg`;
function textFor(keyGr,keyEn){return language==='gr'?keyGr:keyEn;}
function createCard(item){
  const article=document.createElement('article');article.className='property-card';
  const visual=document.createElement('div');visual.className='property-visual';
  const fallback=document.createElement('div');fallback.className='missing-image';fallback.textContent=textFor('Πραγματική φωτογραφία / χάρτης προς προσθήκη','Actual property photo / map to be added');
  const img=document.createElement('img');img.src=photoPath(item);img.alt=textFor(`Φωτογραφία ακινήτου: ${translate(item.location)}`,`Property photo: ${translate(item.location)}`);img.loading='lazy';img.hidden=true;
  img.addEventListener('load',()=>{img.hidden=false;fallback.hidden=true});img.addEventListener('error',()=>{img.remove();fallback.hidden=false});
  visual.append(img,fallback);
  const type=document.createElement('span');type.className='property-type';type.textContent=translate(item.type);visual.append(type);
  const body=document.createElement('div');body.className='property-body';
  const location=document.createElement('div');location.className='location';location.textContent=translate(item.location);
  const title=document.createElement('h3');title.textContent=translate(item.name);
  const price=document.createElement('div');price.className='price'+(item.price?'':' no-price');price.textContent=item.price||textFor('Τιμή κατόπιν επικοινωνίας','Price on request');
  const features=document.createElement('div');features.className='features';const area=document.createElement('span');area.textContent=item.area||textFor('Κτίριο','Building');features.append(area);if(item.zone){const zone=document.createElement('span');zone.textContent=textFor('Ζώνη ','Zone ')+item.zone;features.append(zone)}
  const btn=document.createElement('button');btn.type='button';btn.className='detail-button';btn.textContent=textFor('Περισσότερες πληροφορίες →','View details →');btn.addEventListener('click',()=>openModal(item.id));
  body.append(location,title,price,features,btn);article.append(visual,body);return article;
}
function render(){document.documentElement.lang=language==='gr'?'el':'en';document.title=textFor('Ακίνητα προς Πώληση στην Πιτσιλιά Λευκωσίας | Pitsilia Properties','Properties for Sale in Pitsilia, Nicosia | Pitsilia Properties');document.querySelectorAll('[data-gr][data-en]').forEach(node=>{node.textContent=node.dataset[language]});const cards=$('property-cards');cards.replaceChildren(...listings.map(createCard));$('language-button').setAttribute('aria-label',textFor('Switch language to English','Αλλαγή γλώσσας στα Ελληνικά'));if(activeId!==null)populateModal(listings.find(p=>p.id===activeId));}
function populateModal(item){if(!item)return;const slot=$('modal-content');slot.replaceChildren();const eyebrow=document.createElement('div');eyebrow.className='eyebrow bronze';eyebrow.textContent=translate(item.location);const title=document.createElement('h2');title.id='modal-title';title.textContent=translate(item.name);const price=document.createElement('div');price.className='price';price.textContent=item.price||textFor('Τιμή κατόπιν επικοινωνίας','Price on request');slot.append(eyebrow,title,price);
  if(item.area){const area=document.createElement('p');area.textContent=textFor('Συνολική έκταση τεμαχίων: ','Total parcel area: ')+item.area;slot.append(area)}
  const ul=document.createElement('ul');item.facts.forEach(fact=>{const li=document.createElement('li');li.textContent=translate(fact);ul.append(li)});slot.append(ul);
  const disclaimer=document.createElement('p');disclaimer.className='explain';disclaimer.textContent=textFor('Οι περιγραφές είναι πληροφοριακές. Για εμβαδά, δικαιώματα, πρόσβαση, πολεοδομικούς όρους και επιτρεπόμενες χρήσεις απαιτείται έλεγχος των επίσημων εγγράφων.','Descriptions are informative. Official records must be checked for areas, ownership rights, access, planning terms and permitted uses.');slot.append(disclaimer);
  const contact=document.createElement('div');contact.className='contact-note';contact.textContent=textFor('Στοιχεία επικοινωνίας ιδιοκτητών — θα προστεθούν πριν τη δημοσίευση','Owner contact details — to be added before publication');slot.append(contact);
}
function openModal(id){activeId=id;populateModal(listings.find(p=>p.id===id));$('property-modal').hidden=false;$('modal-close').focus();document.body.style.overflow='hidden'}
function closeModal(){$('property-modal').hidden=true;document.body.style.overflow='';activeId=null;}
$('language-button').addEventListener('click',()=>{language=language==='gr'?'en':'gr';render()});$('modal-close').addEventListener('click',closeModal);$('property-modal').addEventListener('click',event=>{if(event.target===$('property-modal'))closeModal()});document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!$('property-modal').hidden)closeModal()});render();
