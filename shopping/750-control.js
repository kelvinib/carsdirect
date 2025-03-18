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
    if (document.URL.match('buildyourcar/styles/online')) {
        if (croState.passedLander) {
            // step 1 completion - seen style and options
            console.log('CRO: step 1 completion - seen style and options');
            _conv_q.push(["triggerConversion", "100439751"]);
        }
    } else if (document.URL.match('buildyourcar/online/select-dealers')) {
        if (croState.passedLander) {
            // step 2 completion - seen select dealers
            console.log('CRO: step 2 completion - seen select dealers');
            _conv_q.push(["triggerConversion", "100439752"]);
        }
    } else if (document.URL.match('buildyourcar/online/contact-info')) {
        if (croState.passedLander) {
            // step 3 completion - seen contact info
            console.log('CRO: step 3 completion - seen contact info');
            _conv_q.push(["triggerConversion", "100439753"]);
            setTimeout(() => {
                waitForElem('.formWrapper form .fieldRow.ctaRow button').then((el) => {
                    try {
                        const footnotes = document.getElementsByClassName('footnote');
                        footnotes[0].innerHTML = `
                            By submitting this form, you agree to our <a href="https://www.internetbrands.com/ibterms/" target="_blank">Terms of Use</a> (including the <a href="https://www.internetbrands.com/ibterms/supplementalcarrelatedterms/" target="_blank">Supplemental Terms</a>) and <a href="https://www.internetbrands.com/privacy/privacy-main" target="_blank">Privacy Policy</a>.
                        `;
                        if (footnotes.length > 1) {
                            for (let i = 1; i < footnotes.length; i++) {
                                footnotes[i].style.display = 'none';
                            }
                        }
                    } catch (error) {
                        console.error('Error in CRO - step 4 changes:', error);
                    }
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
        { path: 'buildyourcar/styles/online', step: 2, message: 'CRO: loaded step 2 (direct/refresh), metrics disabled' },
        { path: 'buildyourcar/online/select-dealers', step: 3, message: 'CRO: loaded step 3 (direct/refresh), metrics disabled' },
        { path: 'buildyourcar/online/contact-info', step: 4, message: 'CRO: loaded step 4 (direct/refresh), metrics disabled' }
    ];

    const currentStep = steps.find(step => path.includes(step.path));

    if (currentStep) {
        console.log(currentStep.message);
    } else {
        waitForElem('.formWrapper form .fieldRow.ctaRow button').then(() => {
            try {
                console.log('CRO: loaded 750 lander');
                croState.passedLander = true;
            } catch (error) {
                console.error('Error in CRO - step 1 changes:', error);
            }
        });
    }
}
function waitForElem(selector, timeout = 10000) {
    return new Promise((resolve, reject) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length) {
            return resolve(elements);
        }

        const observer = new MutationObserver(mutations => {
            const elements = document.querySelectorAll(selector);
            if (elements.length) {
                observer.disconnect();
                resolve(elements);
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        setTimeout(() => {
            observer.disconnect();
            reject(new Error(`Timeout for waitForElem: ${selector} not found within ${timeout}ms`));
        }, timeout);
    }).catch(e => console.error(e));
}
function croHandler() {
    console.log('CRO: 750 active');
    croSetup();
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', croHandler);
} else {
    croHandler();
}