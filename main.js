(()=>{"use strict";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{J:()=>D});const t={baseUrl:"https://nomoreparties.co/v1/frontend-st-cohort-201",headers:{authorization:"c3e632d7-cff1-413c-a3e2-e7f59c6b5248","Content-Type":"application/json"}},o=(e,o,n)=>{const r={method:e,headers:t.headers};return"GET"!==e&&n&&(r.body=JSON.stringify(n)),fetch(`${t.baseUrl}/${o}`,r).then((e=>e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`)))},n=document.querySelector("#card-template").content;function r(e,t,r,c,a,s){const l=n.querySelector(".card").cloneNode(!0),u=l.querySelector(".card__image"),i=l.querySelector(".card__title"),p=l.querySelector(".card__like-count"),d=l.querySelector(".card__delete-button"),_=l.querySelector(".card__like-button");return u.src=t,u.alt=e,i.textContent=e,p.textContent=r,l._id=c,s?_.classList.add("card__like-button_is-active"):_.classList.remove("card__like-button_is-active"),console.log(s),_.addEventListener("click",(e=>{const t=e.target;t.classList.contains("card__like-button_is-active")?(e=>o("DELETE",`cards/likes/${e}`,{}))(c).then((e=>{t.classList.remove("card__like-button_is-active"),p.textContent=e.likes.length})).catch((e=>console.log(e))):(e=>o("PUT",`cards/likes/${e}`,{}))(c).then((e=>{t.classList.add("card__like-button_is-active"),p.textContent=e.likes.length})).catch((e=>console.log(e)))})),D===a?d.addEventListener("click",(e=>{!function(e,t){(e=>o("DELETE",`cards/${e}`,{}))(t).then((()=>{e.closest(".card").remove()})).catch((e=>{console.log(e)}))}(d,c)})):d.remove(),l}function c(e){"Escape"===e.key&&u(document.querySelector(".popup_is-opened"))}function a(e){e.target===e.currentTarget&&u(document.querySelector(".popup_is-opened"))}function s(e){e.target===e.currentTarget?e.target.style.cursor="pointer":e.target.style.cursor="default"}function l(e){e.classList.add("popup_is-opened"),e.querySelector(".popup__close").addEventListener("click",(t=>u(e))),e.addEventListener("click",a),e.addEventListener("mouseout",s),document.addEventListener("keydown",c)}function u(e){e.querySelector(".popup__close").removeEventListener("click",(t=>u(e))),e.removeEventListener("click",a),e.removeEventListener("mouseout",s),document.removeEventListener("keydown",c),e.classList.remove("popup_is-opened")}function i(e,t,o){!function(e){return e.some((e=>!e.validity.valid))}(e)?t.classList.remove(o):t.classList.add(o)}const p=document.querySelector(".places__list"),d=document.querySelector(".profile__overlay"),_=document.querySelector(".profile__title"),m=document.querySelector(".profile__description"),y=document.querySelector(".profile__image"),v=document.querySelector(".popup_type_edit"),f=document.querySelector(".popup_type_new-card"),S=document.querySelector(".popup_type_image"),b=document.querySelector(".popup_type_avatar"),q=v.querySelector(".popup__form"),L=f.querySelector(".popup__form"),g=b.querySelector(".popup__form"),k=S.querySelector(".popup__image"),h=S.querySelector(".popup__caption"),E=v.querySelector(".popup__input_type_name"),C=v.querySelector(".popup__input_type_description"),x=f.querySelector(".popup__input_type_card-name"),T=f.querySelector(".popup__input_type_url"),$=b.querySelector(".popup__input_type_url"),P=document.querySelector(".profile__edit-button"),w=document.querySelector(".profile__add-button"),A=v.querySelector(".popup__button"),j=f.querySelector(".popup__button"),B=b.querySelector(".popup__button");let D;var O;v.classList.add("popup_is-animated"),f.classList.add("popup_is-animated"),S.classList.add("popup_is-animated"),o("GET","users/me",{}).then((e=>{_.textContent=e.name,m.textContent=e.about,y.style.backgroundImage=`url("${e.avatar}")`,E.value=e.name,C.value=e.about,$.value=e.avatar,D=e._id})).catch((e=>{console.log(e)})),o("GET","cards",{}).then((e=>{e.forEach((e=>{const t=e.likes.some((e=>e._id===D));p.append(r(e.name,e.link,e.likes.length,e._id,e.owner._id,t))}))})).catch((e=>{console.log(e)})),P.addEventListener("click",(e=>{l(v)})),w.addEventListener("click",(e=>{l(f)})),d.addEventListener("click",(e=>{l(b)})),q.addEventListener("submit",(function(e){e.preventDefault();const t=document.querySelector(".profile__title"),n=document.querySelector(".profile__description"),r={name:E.value,about:C.value};A.textContent="Сохранение...",(e=>{let{name:t,about:n}=e;return o("PATCH","users/me",{name:t,about:n})})(r).then((e=>{const o=e.name,r=e.about;t.textContent=o,n.textContent=r})).catch((e=>{console.log(e)})).finally((()=>{u(v),A.classList.add("popup__button_disabled"),A.textContent="Сохранить"}))})),L.addEventListener("submit",(function(e){e.preventDefault();const t=x.value,n=T.value,c={name:t,link:n};j.textContent="Создание...",(e=>{let{name:t,link:n}=e;return o("POST","cards",{name:t,link:n})})(c).then((e=>{const o=e.likes.length,c=e._id,a=e.owner._id,s=r(t,n,o,c,a,!1);p.prepend(s)})).catch((e=>{console.log(e)})).finally((()=>{u(f),j.classList.add("popup__button_disabled"),j.textContent="Создать"}))})),g.addEventListener("submit",(function(e){e.preventDefault();const t=$.value;var n;B.textContent="Сохранение...",(n=t,o("PATCH","users/me/avatar",{avatar:n})).then((e=>{$.textContent=e.avatar,y.style.backgroundImage=`url("${e.avatar}")`})).catch((e=>{console.log(e)})).finally((()=>{u(b),B.classList.add("popup__button_disabled"),B.textContent="Сохранить"}))})),p.addEventListener("click",(e=>{e.target.classList.contains("card__image")&&(k.src="",k.src=e.target.src,h.textContent=e.target.alt,l(S))})),O={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},Array.from(document.querySelectorAll(O.formSelector)).forEach((e=>{!function(e,t){const o=Array.from(e.querySelectorAll(t.inputSelector));console.log(o);const n=e.querySelector(t.submitButtonSelector);i(o,n,t.inactiveButtonClass),o.forEach((r=>{r.addEventListener("input",(()=>{!function(e,t,o,n){t.validity.valid?function(e,t,o,n){const r=e.querySelector(`.${t.name}-error`);t.classList.remove(o),r.classList.remove(n),r.textContent=""}(e,t,o,n):function(e,t,o,n,r){const c=e.querySelector(`.${t.name}-error`);t.classList.add(n),c.classList.add(r),c.textContent=o}(e,t,t.validationMessage,o,n)}(e,r,t.inputErrorClass,t.errorClass),i(o,n,t.inactiveButtonClass)}))}))}(e,O)}))})();