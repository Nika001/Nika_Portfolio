//prerequisites 
const sections = {
    'home':document.querySelector(`#home-cont`), 
    'experience':document.querySelector(`#experience-cont`), 
    'contact':document.querySelector(`#contact-cont`), 
    'about':document.querySelector(`#about-cont`)
};

let transitionOngoing = false;

/*sections*/
let activeSec = 'home';
let currentActiveNav = null;
let lastActiveSection = null;

/*experiences*/
let activeExp = document.querySelector(`#sequel`);
let lastExp = activeExp;

//dom elemets

const heda = document.querySelector('header');
currentActiveNav = heda.querySelectorAll('.btn-hover-helper')[0];
//functions




function handleNav(eTarget){
    const hovhel = eTarget.closest('.btn-hover-helper');
    if(hovhel){
        const hoverDecor = hovhel.querySelector('.btn-hover-decor');
        const haidi = hoverDecor.dataset.aidi;
        if(haidi!=activeSec.toLowerCase()&&transitionOngoing!=true){
            lastActiveSection = sections[currentActiveNav.dataset.aidi];
            currentActiveNav.classList.remove('active-nav');  
            activeSec = hoverDecor.dataset.aidi;
            hoverDecor.classList.add('active-nav');
            hoverDecor.classList.add('light-shadow');
            currentActiveNav = hoverDecor;
            handleFadeOut(lastActiveSection, sections[activeSec]);
        }
    }
}

//for edgecase
function handleNavFirst() {
    const houm = heda.querySelector(`[data-aidi=${activeSec}]`);
    houm.classList.add('active-nav');
    houm.classList.add('light-shadow');
    currentActiveNav = houm;
    lastActiveSection = sections[currentActiveNav.dataset.aidi];
}



function handleFadeOut(old, niu){
    transitionOngoing = true;
    old.classList.add('transitionable');
    niu.classList.add('no-block'); 
    niu.classList.remove('no-display'); 
    const fadeOutListener = ()=>{
        old.classList.add('no-display');
        old.classList.remove('transitionable');
        old.removeEventListener('transitionend', fadeOutListener);
        handleFadeIn(niu);
    }  
    old.addEventListener('transitionend', fadeOutListener);
    old.classList.add('fade-out');
}

function handleFadeIn(niu){
    const fadeInListener = () => {
        niu.classList.remove('transitionable');
        transitionOngoing = false;
        niu.removeEventListener('transitionend', fadeInListener);
    }
    niu.classList.add('transitionable');
    niu.addEventListener('transitionend', (niu)=>{fadeInListener(niu)});
    niu.classList.remove('no-block'); 
    niu.classList.remove('fade-out'); 
} 


//eventListeners

handleNavFirst();
heda.addEventListener('click',(e)=>{
    handleNav(e.target);
});


document.querySelectorAll('.exp-list-btn').forEach((elem)=>{
    elem.addEventListener('click', ()=>{
        if(!transitionOngoing&&elem.dataset.id!=activeExp.id){
            lastExp=activeExp;
            activeExp=document.querySelector(`#${elem.dataset.id}`);
            handleFadeOut(lastExp, activeExp);
        }
    });
});