(function () {
    'use strict';

    var FORMSUBMIT_EMAIL = 'josfer38@gmail.com';
    var FORMSUBMIT_URL =
        'https://formsubmit.co/ajax/' + encodeURIComponent(FORMSUBMIT_EMAIL);

    function getApiBase() {
        var url = (window.ORBITAL_API_URL || '').trim();
        return url.replace(/\/$/, '');
    }

    function formDataToObject(formData) {
        var o = {};
        formData.forEach(function (value, key) {
            if (key !== '_gotcha') o[key] = value;
        });
        return o;
    }

    function postFastAPI(formData) {
        var apiBase = getApiBase();
        if (!apiBase) {
            return Promise.reject(new Error('API no configurada'));
        }

        var payload = {
            name: (formData.get('nombre') || formData.get('name') || '').trim(),
            email: (formData.get('email') || '').trim(),
            message: (formData.get('mensaje') || formData.get('message') || '').trim()
        };

        return fetch(apiBase + '/api/contact-requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(function (res) {
            return res.text().then(function (raw) {
                var data = {};
                try {
                    data = raw ? JSON.parse(raw) : {};
                } catch (ignore) {
                    data = { detail: raw };
                }
                if (!res.ok) {
                    var msg =
                        (data && (data.detail || data.message)) ||
                        raw ||
                        'Error al enviar al servidor.';
                    throw new Error(
                        typeof msg === 'string' ? msg : JSON.stringify(msg)
                    );
                }
                return data;
            });
        });
    }

    function postFormSubmit(formData) {
        var payload = formDataToObject(formData);
        payload._subject = 'Web ORBITALDATA — Nuevo requerimiento';
        payload._captcha = 'false';
        if (payload.email) payload._replyto = payload.email;

        return fetch(FORMSUBMIT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(payload)
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

    /** API FastAPI (MongoDB); si falla, FormSubmit por correo. */
    function sendContact(formData) {
        return postFastAPI(formData).catch(function (apiErr) {
            console.warn('API ORBITALDATA:', apiErr.message, '— usando FormSubmit.');
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
        btn.innerHTML = ' Enviando…';
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
