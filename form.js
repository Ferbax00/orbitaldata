(function () {

    'use strict';



    var FORMSUBMIT_EMAIL = 'josfer38@gmail.com';

    var FORMSUBMIT_URL =

        'https://formsubmit.co/ajax/' + encodeURIComponent(FORMSUBMIT_EMAIL);



    function formDataToObject(formData) {

        var o = {};

        formData.forEach(function (value, key) {

            o[key] = value;

        });

        return o;

    }



    function postFormSubmit(formData) {

        var payload = formDataToObject(formData);

        payload._subject = 'Web ORBITALDATA — Nuevo requerimiento';

        payload._captcha = 'false';

        if (payload.email) {

            payload._replyto = payload.email;

        }



        return fetch(FORMSUBMIT_URL, {

            method: 'POST',

            headers: {

                'Content-Type': 'application/json',

                Accept: 'application/json',

            },

            body: JSON.stringify(payload),

        }).then(function (res) {

            return res.text().then(function (raw) {

                var data = {};

                try {

                    data = raw ? JSON.parse(raw) : {};

                } catch (ignore) {

                    data = { message: raw };

                }

                if (!res.ok) {

                    throw new Error(

                        (data && (data.message || data.error)) ||

                            raw ||

                            'Error al enviar el formulario.'

                    );

                }

                return data;

            });

        });

    }



    function postPhp(formData) {

        return fetch('send_mail.php', {

            method: 'POST',

            body: formData,

        }).then(function (res) {

            return res.text().then(function (text) {

                return { res: res, text: text };

            });

        });

    }



    /** PHP si existe y responde OK; si no, FormSubmit (correo josfer38@gmail.com). */

    function sendContact(formData) {

        return postPhp(formData)

            .then(function (pair) {

                if (pair.res.ok) return;

                return postFormSubmit(formData);

            })

            .catch(function () {

                return postFormSubmit(formData);

            });

    }



    function setFeedback(el, message, isError) {

        if (!el) return;

        el.textContent = message || '';

        el.classList.toggle('is-error', !!isError);

        el.hidden = !message;

    }



    var contactForm = document.getElementById('contactForm');

    if (!contactForm) return;



    var feedback = document.getElementById('contactFormFeedback');



    contactForm.addEventListener('submit', function (e) {

        e.preventDefault();



        var btn = contactForm.querySelector('button[type="submit"]');

        var originalHTML = btn.innerHTML;

        var formData = new FormData(contactForm);



        setFeedback(feedback, '', false);

        btn.innerHTML =

            '<i class="fas fa-satellite fa-spin" aria-hidden="true"></i> Enviando…';

        btn.disabled = true;

        btn.style.opacity = '0.75';



        sendContact(formData)

            .then(function () {

                setFeedback(

                    feedback,

                    'Mensaje enviado. Nos pondremos en contacto a la brevedad.',

                    false

                );

                alert(

                    'Solicitud enviada correctamente.\n\nORBITALDATA ha recibido su requerimiento. Responderemos pronto.'

                );

                contactForm.reset();

            })

            .catch(function (err) {

                console.error(err);

                setFeedback(

                    feedback,

                    'No se pudo enviar. Escriba a josfer38@gmail.com o intente más tarde.',

                    true

                );

                alert(

                    'Error al enviar el formulario.\n\nPuede escribir directamente a: josfer38@gmail.com'

                );

            })

            .finally(function () {

                btn.innerHTML = originalHTML;

                btn.disabled = false;

                btn.style.opacity = '1';

            });

    });

})();

