console.log('CRO: Control');
window._conv_q = window._conv_q || [];
const croState = {
    passedLander: false
}
const originalPushState = window.history.pushState;
const originalReplaceState = window.history.replaceState;
window.history.pushState = function (...args) {
    const result = originalPushState.apply(this, args);
    window.dispatchEvent(new Event("urlchange"));
    return result;
};
window.history.replaceState = function (...args) {
    const result = originalReplaceState.apply(this, args);
    window.dispatchEvent(new Event("urlchange"));
    return result;
};
window.addEventListener("popstate", function () {
    window.dispatchEvent(new Event("urlchange"));
});
window.addEventListener('urlchange', () => {
    if (document.URL.match('buildyourcar/styles/lease')) {
        if (croState.passedLander) {
            // step 1 completion - seen style and options
            console.log('CRO: step 1 completion - seen style and options');
            _conv_q.push(["triggerConversion", "100439751"]);
        }
    } else if (document.URL.match('buildyourcar/select-dealers')) {
        if (croState.passedLander) {
            // step 2 completion - seen select dealers
            console.log('CRO: step 2 completion - seen select dealers');
            _conv_q.push(["triggerConversion", "100439752"]);
        }
    } else if (document.URL.match('buildyourcar/contact-info')) {
        if (croState.passedLander) {
            // step 3 completion - seen contact info
            console.log('CRO: step 3 completion - seen contact info');
            _conv_q.push(["triggerConversion", "100439753"]);
            setTimeout(() => {
                waitForElem('.formWrapper form .fieldRow.ctaRow button').then((el) => {
                    document.getElementsByClassName('footnote')[0].innerHTML = `
                        By submitting this form, you agree to our <a href="https://www.internetbrands.com/ibterms/" target="_blank">Terms of Use</a> (including the <a href="https://www.internetbrands.com/ibterms/supplementalcarrelatedterms/" target="_blank">Supplemental Terms</a>) and <a href="https://www.internetbrands.com/privacy/privacy-main" target="_blank">Privacy Policy</a>.
                    `;
                });
            }, 300);
        }
    }
});
function croSetup() {
    // for context, the other paths are here upon first page load as additional safeguard just in case
    // a user somehow enters the experience in between the steps, which skips the lander
    const path = window.location.pathname;
    const steps = [
        { path: 'buildyourcar/styles/lease', step: 2, message: 'CRO: loaded step 2 (direct/refresh), metrics disabled' },
        { path: 'buildyourcar/select-dealers', step: 3, message: 'CRO: loaded step 3 (direct/refresh), metrics disabled' },
        { path: 'buildyourcar/contact-info', step: 4, message: 'CRO: loaded step 4 (direct/refresh), metrics disabled' }
    ];

    const currentStep = steps.find(step => path.includes(step.path));

    if (currentStep) {
        console.log(currentStep.message);
    } else {
        waitForElem('.formWrapper form .fieldRow.ctaRow button').then(() => {
            console.log('CRO: loaded 742 lander');
            croState.passedLander = true;
        });
    }
}
function waitForElem(selector) {
    return new Promise(resolve => {
        if (document.querySelectorAll(selector).length) {
            return resolve(document.querySelectorAll(selector));
        }
        const observer = new MutationObserver(mutations => {
            if (document.querySelectorAll(selector).length) {
                observer.disconnect();
                resolve(document.querySelectorAll(selector));
            }
        });
        observer.observe(document.body, {childList: true, subtree: true});
    });
}
function croHandler() {
    redirectWithParams();
}
function redirectWithParams() {
    try {
        if (!window.location.search.includes('version=control')) {
            if (window.location.search === '') {
                convert.redirect(window.location.href + '?version=control');
            } else {
                convert.redirect(window.location.href + '&version=control');
            }
        } else {
            console.log('CRO: 742 active - redirected');
            croSetup();
        }
    } catch (error) {
        console.error('Error in CRO - redirectWithParams:', error);
    }
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', croHandler);
} else {
    croHandler();
}