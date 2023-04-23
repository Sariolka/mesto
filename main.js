(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(e,n){for(var r=0;r<n.length;r++){var o=n[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(void 0,i=function(e,n){if("object"!==t(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,"string");if("object"!==t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o.key),"symbol"===t(i)?i:String(i)),o)}var i}var n=function(){function t(e,n){var r=e.item,o=e.userId,i=e.handleCardClick,u=e.handleClickIconDelete,a=e.handleLike,c=e.handleDislike;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._item=r,this._name=r.name,this._link=r.link,this._alt=r.name,this._likes=r.likes,this._cardId=r._id,this._cardTemplateSelector=n,this._handleCardClick=i,this._handleClickIconDelete=u,this._userId=o,this._handleLike=a,this._handleDislike=c}var n,r;return n=t,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._cardTemplateSelector).content.querySelector(".card").cloneNode(!0)}},{key:"handleDeleteCard",value:function(){this._card.remove(),this._card=null}},{key:"handleLikeCard",value:function(t){this._likes=t.likes,this._likeButton.classList.toggle("card__like_active"),this._likesCount.textContent=this._likes.length}},{key:"_checkLike",value:function(){var t=this;this._likes.forEach((function(e){e._id===t._userId&&t._likeButton.classList.add("card__like_active")}))}},{key:"_setEventListeners",value:function(){var t=this;this._likeButton.addEventListener("click",(function(){t._likeButton.classList.contains("card__like_active")?t._handleDislike():t._handleLike()})),this._deleteButton.addEventListener("click",(function(){t._handleClickIconDelete()})),this._cardPhoto.addEventListener("click",(function(){t._handleCardClick(t._name,t._link)}))}},{key:"_removeDeleteButton",value:function(){this._item.owner._id!==this._userId&&this._deleteButton.remove()}},{key:"generateCard",value:function(){return this._card=this._getTemplate(),this._likeButton=this._card.querySelector(".card__like"),this._deleteButton=this._card.querySelector(".card__delete"),this._cardPhoto=this._card.querySelector(".card__photo"),this._cardTitle=this._card.querySelector(".card__title"),this._likesCount=this._card.querySelector(".card__like-count"),this._cardTitle.textContent=this._name,this._cardPhoto.src=this._link,this._cardPhoto.alt=this._name,this._removeDeleteButton(),this._checkLike(),this._likesCount.textContent=this._likes.length,this._setEventListeners(),this._card}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,u(r.key),r)}}function i(t,e,n){return(e=u(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function u(t){var e=function(t,e){if("object"!==r(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,"string");if("object"!==r(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===r(e)?e:String(e)}var a=function(){function t(e,n){var r=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),i(this,"_showInputError",(function(t,e){var n=r._formElement.querySelector(".".concat(t.id,"-error"));t.classList.add(r._formValidationConfig.inputErrorClass),n.textContent=e,n.classList.add(r._formValidationConfig.errorClass)})),i(this,"_hideInputError",(function(t){var e=r._formElement.querySelector(".".concat(t.id,"-error"));t.classList.remove(r._formValidationConfig.inputErrorClass),e.textContent="",e.classList.remove(r._formValidationConfig.errorClass)})),i(this,"_checkInputValidity",(function(t){t.validity.valid?r._hideInputError(t):r._showInputError(t,t.validationMessage)})),i(this,"_hasInvalidInput",(function(){return r._inputList.some((function(t){return!t.validity.valid}))})),i(this,"_disableSubmit",(function(t){t.preventDefault()})),i(this,"disableButton",(function(){r._buttonElement.classList.add(r._formValidationConfig.inactiveButtonClass),r._buttonElement.setAttribute("disabled",!0)})),i(this,"enableButton",(function(){r._buttonElement.classList.remove(r._formValidationConfig.inactiveButtonClass),r._buttonElement.removeAttribute("disabled")})),i(this,"_toggleButtonState",(function(){r._hasInvalidInput()?r.disableButton():r.enableButton()})),i(this,"_setEventListeners",(function(){r._toggleButtonState(),r._inputList.forEach((function(t){t.addEventListener("input",(function(){r._checkInputValidity(t),r._toggleButtonState()}))})),r._formElement.addEventListener("submit",r._disableSubmit)})),i(this,"resetForm",(function(){r._toggleButtonState(),r._inputList.forEach((function(t){r._hideInputError(t)}))})),this._formValidationConfig=e,this._formElement=n,this._inputList=Array.from(this._formElement.querySelectorAll(this._formValidationConfig.inputSelector)),this._buttonElement=this._formElement.querySelector(this._formValidationConfig.submitButtonSelector)}var e,n;return e=t,(n=[{key:"enableValidation",value:function(){this._setEventListeners()}}])&&o(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}(),c={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button-submit",inactiveButtonClass:"popup__button-submit_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function l(t){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},l(t)}function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==l(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==l(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===l(o)?o:String(o)),r)}var o}var f=function(){function t(e,n){var r=e.renderer;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._renderer=r,this._container=document.querySelector(n)}var e,n;return e=t,(n=[{key:"addItem",value:function(t){this._container.prepend(t)}},{key:"addItems",value:function(t){this._container.append(t)}},{key:"renderItems",value:function(t){var e=this;t.forEach((function(t){e._renderer(t)}))}}])&&s(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function p(t){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},p(t)}function d(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,y(r.key),r)}}function y(t){var e=function(t,e){if("object"!==p(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==p(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===p(e)?e:String(e)}var h=function(){function t(e){var n,r,o,i=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),n=this,o=function(t){"Escape"===t.key&&i.close()},(r=y(r="_handleEscClose"))in n?Object.defineProperty(n,r,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[r]=o,this._popup=document.querySelector(e)}var e,n;return e=t,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){var t=this;this._popup.addEventListener("mousedown",(function(e){(e.target.classList.contains("popup_opened")||e.target.classList.contains("popup__button-close"))&&t.close()}))}}])&&d(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function m(t){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},m(t)}function b(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==m(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==m(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===m(o)?o:String(o)),r)}var o}function v(){return v="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=g(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},v.apply(this,arguments)}function _(t,e){return _=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},_(t,e)}function g(t){return g=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},g(t)}var S=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&_(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=g(r);if(o){var n=g(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===m(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(e=i.call(this,t))._popupPhoto=document.querySelector(".popup__photo-open"),e._popupPhotoTitle=document.querySelector(".popup__photo-title"),e}return e=u,(n=[{key:"open",value:function(t,e){this._popupPhoto.src=e,this._popupPhoto.alt=t,this._popupPhotoTitle.textContent=t,v(g(u.prototype),"open",this).call(this)}}])&&b(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(h);function w(t){return w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},w(t)}function k(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==w(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==w(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===w(o)?o:String(o)),r)}var o}function E(){return E="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=j(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},E.apply(this,arguments)}function P(t,e){return P=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},P(t,e)}function j(t){return j=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},j(t)}var O=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&P(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=j(r);if(o){var n=j(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===w(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t){var e,n=t.popupSelector,r=t.handleFormSubmit;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(e=i.call(this,n))._popupForm=e._popup.querySelector(".popup__form"),e._inputList=e._popupForm.querySelectorAll(".popup__input"),e._buttonSubmit=e._popupForm.querySelector(".popup__button-submit"),e._buttonSubmitText=e._buttonSubmit.textContent,e._handleFormSubmit=r,e}return e=u,(n=[{key:"_getInputValues",value:function(){var t={};return this._inputList.forEach((function(e){t[e.name]=e.value})),t}},{key:"setInputValues",value:function(t){this._inputList.forEach((function(e){e.value=t[e.name]}))}},{key:"renderLoading",value:function(t){this._buttonSubmit.textContent=t?"Сохранение...":this._buttonSubmitText}},{key:"setEventListeners",value:function(){var t=this;E(j(u.prototype),"setEventListeners",this).call(this),this._popupForm.addEventListener("submit",(function(e){e.preventDefault(),t._handleFormSubmit(t._getInputValues())}))}},{key:"close",value:function(){this._popupForm.reset(),E(j(u.prototype),"close",this).call(this)}}])&&k(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(h);function C(t){return C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},C(t)}function L(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==C(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==C(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===C(o)?o:String(o)),r)}var o}var I=function(){function t(e){var n=e.nameSelector,r=e.infoSelector,o=e.avatarSelector;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._userName=document.querySelector(n),this._userInfo=document.querySelector(r),this._userAvatar=document.querySelector(o)}var e,n;return e=t,(n=[{key:"getUserInfo",value:function(){return{name:this._userName.textContent,about:this._userInfo.textContent,avatar:this._userAvatar.src}}},{key:"setUserInfo",value:function(t){var e=t.name,n=t.about,r=t.avatar,o=t._id;this._userName.textContent=e,this._userInfo.textContent=n,this._userAvatar.src=r,this._userId=o}}])&&L(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function T(t){return T="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},T(t)}function R(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==T(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==T(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===T(o)?o:String(o)),r)}var o}var B=new(function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._address=e.baseUrl,this._headers=e.headers}var e,n;return e=t,(n=[{key:"getResponse",value:function(t){return t.ok?(console.log(t),t.json()):Promise.reject("Ошибка: ".concat(t.status))}},{key:"getInitialCards",value:function(){return fetch("".concat(this._address,"/cards"),{method:"GET",headers:this._headers}).then(this.getResponse)}},{key:"getUserInfo",value:function(){return fetch("".concat(this._address,"/users/me"),{method:"GET",headers:this._headers}).then(this.getResponse)}},{key:"editUserProfile",value:function(t){return fetch("".concat(this._address,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:t.name,about:t.about})}).then(this.getResponse)}},{key:"addNewCard",value:function(t){return fetch("".concat(this._address,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:t.place,link:t.link})}).then(this.getResponse)}},{key:"deleteCard",value:function(t){return fetch("".concat(this._address,"/cards/").concat(t._id),{method:"DELETE",headers:this._headers}).then(this.getResponse)}},{key:"getLikeCard",value:function(t){return fetch("".concat(this._address,"/cards/").concat(t._id,"/likes"),{method:"PUT",headers:this._headers}).then(this.getResponse)}},{key:"deleteLikeCard",value:function(t){return fetch("".concat(this._address,"/cards/").concat(t._id,"/likes"),{method:"DELETE",headers:this._headers}).then(this.getResponse)}},{key:"changeAvatar",value:function(t){return fetch("".concat(this._address,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:t.avatar})}).then(this.getResponse)}}])&&R(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}())({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-64",headers:{authorization:"e266c9d4-7550-484d-9fea-f5c65957f0a5","Content-Type":"application/json"}});function q(t){return q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},q(t)}function D(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==q(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==q(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===q(o)?o:String(o)),r)}var o}function x(){return x="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=A(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},x.apply(this,arguments)}function V(t,e){return V=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},V(t,e)}function A(t){return A=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},A(t)}var F=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&V(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=A(r);if(o){var n=A(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===q(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t){var e,n=t.popupSelector;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(e=i.call(this,n))._popupForm=e._popup.querySelector(".popup__form"),e}return e=u,(n=[{key:"handleSubmit",value:function(t){this._submitHandler=t}},{key:"setEventListeners",value:function(){var t=this;x(A(u.prototype),"setEventListeners",this).call(this),this._popupForm.addEventListener("submit",(function(e){e.preventDefault(),t._submitHandler()}))}}])&&D(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(h);function U(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var N=document.querySelector(".profile__add-button"),H=document.querySelector(".profile__edit-button"),J=document.querySelector(".profile__avatar-button"),G=document.forms["form-profile"],M=document.forms["form-place"],z=document.forms["form-avatar"],$=new I({nameSelector:".profile__name",infoSelector:".profile__description",avatarSelector:".profile__avatar"});Promise.all([B.getUserInfo(),B.getInitialCards()]).then((function(t){var e,n,r=(n=2,function(t){if(Array.isArray(t))return t}(e=t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i,u,a=[],c=!0,l=!1;try{if(i=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=i.call(n)).done)&&(a.push(r.value),a.length!==e);c=!0);}catch(t){l=!0,o=t}finally{try{if(!c&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(e,n)||function(t,e){if(t){if("string"==typeof t)return U(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?U(t,e):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];$.setUserInfo({name:o.name,about:o.about,avatar:o.avatar,userId:o._id}),console.log("data",o),Q.renderItems(i),console.log("items",i)})).catch((function(t){console.log(t)}));var K=function(t){var e=new n({item:t,userId:"",handleCardClick:function(t,e){X.open(t,e)},handleClickIconDelete:function(){W.open(),W.handleSubmit((function(){B.deleteCard(t).then((function(){W.close(),e.handleDeleteCard()})).catch((function(t){console.log(t)}))}))},handleLike:function(){B.getLikeCard(t).then((function(t){e.handleLikeCard(t)})).catch((function(t){console.log(t)}))},handleDislike:function(){B.deleteLikeCard(t).then((function(t){e.handleLikeCard(t)})).catch((function(t){console.log(t)}))}},".card-template");return e.generateCard()},Q=new f({renderer:function(t){Q.addItems(K(t))}},".cards"),W=new F({popupSelector:".popup_type_card-delete"});W.setEventListeners();var X=new S(".popup_type_photo-full");X.setEventListeners();var Y=new O({popupSelector:".popup_type_profile-edit",handleFormSubmit:function(t){!function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранение...";e.renderLoading(!0,n),t().then((function(){e.close()})).catch((function(t){console.error("Ошибка: ".concat(t))})).finally((function(){e.renderLoading(!1)}))}((function(){return B.editUserProfile(t).then((function(t){$.setUserInfo(t)}))}),Y)}});Y.setEventListeners();var Z=new O({popupSelector:".popup_type_card-create",handleFormSubmit:function(t){Z.renderLoading(!0),B.addNewCard(t).then((function(t){Q.addItem(K(t)),Z.close()})).catch((function(t){console.log("Ошибка: ".concat(t))})).finally((function(){Z.renderLoading(!1)}))}});Z.setEventListeners();var tt=new O({popupSelector:".popup_type_avatar-change",handleFormSubmit:function(t){tt.renderLoading(!0),B.changeAvatar(t).then((function(t){$.setUserInfo(t),tt.close()})).catch((function(t){console.log("Ошибка: ".concat(t))})).finally((function(){tt.renderLoading(!1)}))}});tt.setEventListeners();var et=new a(c,G);et.enableValidation();var nt=new a(c,M);nt.enableValidation();var rt=new a(c,z);rt.enableValidation(),J.addEventListener("click",(function(){rt.disableButton(),rt.resetForm(),tt.open()})),H.addEventListener("click",(function(){et.resetForm(),et.enableButton(),Y.setInputValues($.getUserInfo()),Y.open()})),N.addEventListener("click",(function(){nt.disableButton(),nt.resetForm(),Z.open()}))})();
//# sourceMappingURL=main.js.map