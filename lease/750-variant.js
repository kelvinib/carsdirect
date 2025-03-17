console.log('CRO: Variant');
window._conv_q = window._conv_q || [];
const croState = {
    passedLander: false
}
const dropdownSvgHtml = `<svg class="cro-dropdown-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.29414 12.7062C7.68477 13.0968 8.31914 13.0968 8.70977 12.7062L14.7098 6.70615C15.1004 6.31553 15.1004 5.68115 14.7098 5.29053C14.3191 4.8999 13.6848 4.8999 13.2941 5.29053L8.00039 10.5843L2.70664 5.29365C2.31602 4.90303 1.68164 4.90303 1.29102 5.29365C0.900391 5.68428 0.900391 6.31865 1.29102 6.70928L7.29102 12.7093L7.29414 12.7062Z" fill="#666666"/>
</svg>`;
const nextBtnSvgHtml = `<svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.79303 0.293031C6.98056 0.10556 7.23487 0.000244141 7.50003 0.000244141C7.76519 0.000244141 8.0195 0.10556 8.20703 0.293031L14.207 6.29303C14.3945 6.48056 14.4998 6.73487 14.4998 7.00003C14.4998 7.26519 14.3945 7.5195 14.207 7.70703L8.20703 13.707C8.01843 13.8892 7.76583 13.99 7.50363 13.9877C7.24143 13.9854 6.99062 13.8803 6.80521 13.6948C6.6198 13.5094 6.51464 13.2586 6.51236 12.9964C6.51008 12.7342 6.61087 12.4816 6.79303 12.293L12.086 7.00003L6.79303 1.70703C6.60556 1.5195 6.50024 1.26519 6.50024 1.00003C6.50024 0.734866 6.60556 0.480558 6.79303 0.293031ZM0.793031 0.293031C0.980558 0.10556 1.23487 0.000244141 1.50003 0.000244141C1.76519 0.000244141 2.0195 0.10556 2.20703 0.293031L8.20703 6.29303C8.3945 6.48056 8.49982 6.73487 8.49982 7.00003C8.49982 7.26519 8.3945 7.5195 8.20703 7.70703L2.20703 13.707C2.01843 13.8892 1.76583 13.99 1.50363 13.9877C1.24143 13.9854 0.99062 13.8803 0.805212 13.6948C0.619804 13.5094 0.514635 13.2586 0.512356 12.9964C0.510078 12.7342 0.610873 12.4816 0.793031 12.293L6.08603 7.00003L0.793031 1.70703C0.60556 1.5195 0.500244 1.26519 0.500244 1.00003C0.500244 0.734866 0.60556 0.480558 0.793031 0.293031Z" fill="white"/>
</svg>`;
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
            // step 2 changes
            setTimeout(() => {
                waitForElem('.formWrapper form .fieldRow.ctaRow button').then((el) => {
                    try {
                        el[0].innerHTML = `
                            <p>Next Step</p>
                            ${nextBtnSvgHtml}
                        `;
                        document.getElementsByClassName('stepWrapper step2Wrapper')[0].getElementsByClassName('blockTitleWrapper')[0].insertAdjacentHTML('afterend', `
                            <p class="cro-form-headline">Choose Vehicle Options</p>
                        `);
                        waitForElem('.formWrapper form .fieldRow.makeRow .customDropDown.semTrimName svg').then(el => {
                            el[0].insertAdjacentHTML('afterend', dropdownSvgHtml);
                        });
                        waitForElem('.formWrapper form .fieldRow.makeRow .customDropDown.semColorName svg').then(el => {
                            el[0].insertAdjacentHTML('afterend', dropdownSvgHtml);
                        });
                        document.getElementsByClassName('fieldRow zipRow')[0].getElementsByTagName('label')[0].innerHTML = 'Zip Code';
                        document.getElementById('trimSelect').addEventListener('change', (e) => {
                            (e.target.selectedIndex) ? e.target.classList.add('cro-answered') : e.target.classList.remove('cro-answered');
                        });
                        document.getElementsByClassName('colorSelectionSet')[0].addEventListener('click', () => {
                            document.getElementsByClassName('customDropDown semColorName')[0].classList.add('cro-answered');
                        });
                        document.getElementsByClassName('unsetColorSelectButton')[0].addEventListener('click', () => {
                            document.getElementsByClassName('customDropDown semColorName')[0].classList.remove('cro-answered');
                        });
                        replaceCarHeadline(document.getElementsByClassName('nuxtContainer step2Wrapper')[0].getElementsByTagName('h1')[0]);
                        // article section
                        waitForElem('.mainWrapperInner .lowerFoldWrapper .ourReview .ourReviewArticle > span.snippet span.readMore').then(() => {
                            if (document.getElementsByClassName('expertArticle').length) {
                                // expert article
                                document.getElementsByClassName('snippet')[0].insertAdjacentHTML('beforebegin', `
                                    <h2 class="cro-review-summary">Overview</h2>
                                    <div class="cro-review-preview"></div>
                                `);

                                if (window.innerWidth > 768) {
                                    document.getElementsByClassName('sectionTitle')[0].innerHTML = 'Overview';
                                } else {
                                    const croReviewPreview = document.getElementsByClassName('cro-review-preview')[0];
                                    for (let i = 1; i <= 3; i++) {
                                        croReviewPreview.appendChild(document.getElementsByClassName('fullArticle')[0].getElementsByClassName('section')[i].cloneNode(true));
                                    }
                                    document.getElementsByClassName('readMore')[0].addEventListener('click', () => {
                                        croReviewPreview.classList.add('cro-hidden');
                                    });
                                    document.getElementsByClassName('readLess')[0].addEventListener('click', () => {
                                        croReviewPreview.classList.remove('cro-hidden');
                                    });
                                }
                                
                                document.getElementsByClassName('readMore')[0].innerHTML = `Read More <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.29298 0.272116C6.48051 0.0978804 6.73483 0 7 0C7.26517 0 7.51949 0.0978804 7.70702 0.272116L13.7072 5.84852C13.8947 6.02281 14 6.25917 14 6.50561C14 6.75205 13.8947 6.98841 13.7072 7.1627L7.70702 12.7391C7.51841 12.9084 7.2658 13.0021 7.0036 13C6.74139 12.9978 6.49057 12.9001 6.30516 12.7278C6.11975 12.5555 6.01457 12.3224 6.0123 12.0787C6.01002 11.835 6.11082 11.6002 6.29298 11.4249L11.5861 6.50561L6.29298 1.58629C6.1055 1.412 6.00018 1.17565 6.00018 0.929203C6.00018 0.682759 6.1055 0.446405 6.29298 0.272116ZM0.292796 0.272116C0.480329 0.0978804 0.734645 0 0.999817 0C1.26499 0 1.5193 0.0978804 1.70684 0.272116L7.70702 5.84852C7.8945 6.02281 7.99982 6.25917 7.99982 6.50561C7.99982 6.75205 7.8945 6.98841 7.70702 7.1627L1.70684 12.7391C1.51823 12.9084 1.26562 13.0021 1.00342 13C0.741211 12.9978 0.490391 12.9001 0.304977 12.7278C0.119563 12.5555 0.014391 12.3224 0.0121125 12.0787C0.00983402 11.835 0.110632 11.6002 0.292796 11.4249L5.58596 6.50561L0.292796 1.58629C0.105319 1.412 0 1.17565 0 0.929203C0 0.682759 0.105319 0.446405 0.292796 0.272116Z" fill="#4B90E2"/>
                                    </svg>`;
                            } else {
                                // overview article
                                document.getElementsByClassName('overviewArticle')[0].insertAdjacentHTML('beforebegin', `
                                    <h2 class="cro-review-summary cro-review-summary-overview">Overview</h2>
                                `);
                            }
                        });
                        if (window.innerWidth > 768) {
                            const pictureSource = document.getElementsByClassName('photoContainer')[0].getElementsByTagName('source')[0];
                            const pictureSourceOrigin = pictureSource.getAttribute('srcset');
                            const imgStrChunk = pictureSourceOrigin.substring(pictureSourceOrigin.indexOf('IMG'));
                            pictureSource.setAttribute('srcset', '//cdcssl.ibsrv.net/autodata/images/?' + imgStrChunk + '&width=700&' + new Date().getTime());
                            const picObserver = new MutationObserver(mutations => {
                                mutations.forEach((mutation) => {
                                    if (mutation.type === 'attributes' && mutation.attributeName === 'srcset') {
                                        const pictureSourceOrigin = pictureSource.getAttribute('srcset');
                                        const imgStrChunk = pictureSourceOrigin.substring(pictureSourceOrigin.indexOf('IMG'));
                                        pictureSource.setAttribute('srcset', '//cdcssl.ibsrv.net/autodata/images/?' + imgStrChunk + '&width=700&' + new Date().getTime());
                                        picObserver.disconnect();
                                        setTimeout(() => {
                                            picObserver.observe(pictureSource, {attributes: true, subtree: true, attributeFilter: ['srcset']});
                                        }, 1000);
                                    }
                                });
                            });
                            picObserver.observe(pictureSource, {attributes: true, subtree: true, attributeFilter: ['srcset']});
                        }    
                    } catch (error) {
                        console.error('Error in CRO - step 2 changes:', error);
                    }
                });
            }, 500);   
        }
    } else if (document.URL.match('buildyourcar/online/select-dealers')) {
        if (croState.passedLander) {
            // step 2 completion - seen select dealers
            console.log('CRO: step 2 completion - seen select dealers');
            _conv_q.push(["triggerConversion", "100439752"]);
            setTimeout(() => {
                waitForElem('.formWrapper form .fieldRow.ctaRow button').then((el) => {
                    replaceCarHeadline(document.getElementsByClassName('nuxtContainer step2Wrapper')[0].getElementsByTagName('h1')[0]);
                    if (window.innerWidth > 768) {
                        const pictureSource = document.getElementsByClassName('photoContainer')[0].getElementsByTagName('source')[0];
                        const pictureSourceOrigin = pictureSource.getAttribute('srcset');
                        const imgStrChunk = pictureSourceOrigin.substring(pictureSourceOrigin.indexOf('IMG'));
                        pictureSource.setAttribute('srcset', '//cdcssl.ibsrv.net/autodata/images/?' + imgStrChunk + '&width=700&' + new Date().getTime());
                    }
                });
            }, 300);
        }
    } else if (document.URL.match('buildyourcar/online/contact-info')) {
        if (croState.passedLander) {
            // step 3 completion - seen contact info
            console.log('CRO: step 3 completion - seen contact info');
            _conv_q.push(["triggerConversion", "100439753"]);
            setTimeout(() => {
                waitForElem('.formWrapper form .fieldRow.ctaRow button').then((el) => {
                    try {
                        el[0].innerHTML = `
                            <p>See My Price</p>
                            ${nextBtnSvgHtml}
                        `;
                        document.getElementsByClassName('contactInfoWrapper')[0].insertAdjacentHTML('beforebegin', `
                            <div class="cro-contact-headline">
                                <h1>Great Choice. Let’s Secure <span>Your Exclusive Deals</span></h1>
                                <p>Complete this form to get the best discounts for your next vehicle.</p>
                            </div>    
                        `);
                        document.getElementsByTagName('form')[0].insertAdjacentHTML('beforebegin', `
                            <div class="cro-contact-headline-desktop">
                                <h1>Great Choice. Let’s <span>Secure Your Deals</span></h1>
                                <p>Complete this form to get the best discounts for your next vehicle.</p>
                            </div>    
                        `);
                        const footnotes = document.getElementsByClassName('footnote');
                        footnotes[0].innerHTML = `
                            By submitting this form, you agree to our <a href="https://www.internetbrands.com/ibterms/" target="_blank">Terms of Use</a> (including the <a href="https://www.internetbrands.com/ibterms/supplementalcarrelatedterms/" target="_blank">Supplemental Terms</a>) and <a href="https://www.internetbrands.com/privacy/privacy-main" target="_blank">Privacy Policy</a>.
                        `;
                        if (footnotes.length > 1) {
                            for (let i = 1; i < footnotes.length; i++) {
                                footnotes[i].style.display = 'none';
                            }
                        }
                        document.getElementById('firstName').setAttribute('placeholder', '');
                        document.getElementById('lastName').setAttribute('placeholder', '');
                        document.getElementById('emailInput').setAttribute('placeholder', '');
                        document.getElementById('telephoneInput').setAttribute('placeholder', '');
                        replaceCarHeadline(document.getElementsByClassName('nuxtContainer step2Wrapper')[0].getElementsByTagName('h1')[0]);
                        if (window.innerWidth > 768) {
                            const pictureSource = document.getElementsByClassName('photoContainer')[0].getElementsByTagName('source')[0];
                            const pictureSourceOrigin = pictureSource.getAttribute('srcset');
                            const imgStrChunk = pictureSourceOrigin.substring(pictureSourceOrigin.indexOf('IMG'));
                            pictureSource.setAttribute('srcset', '//cdcssl.ibsrv.net/autodata/images/?' + imgStrChunk + '&width=700&' + new Date().getTime());
                        }
                    } catch (error) {
                        console.error('Error in CRO - step 4 changes:', error);
                    }
                });
            }, 300);
        }
    }
});
function replaceCarHeadline(el) {
    const carHeadline = el.innerText;
    if (carHeadline.includes(' Deals')) {
        el.innerText = carHeadline.substring(0, carHeadline.indexOf(' Deals'));
    }
}
function replaceHeadline() {
    return `Get <span>Exclusive Industry Insider</span> Pricing`;
}
function replaceSubHeadline() {
    const pathMap = {
        'lp/online': 'Find verified, low pricing on your next vehicle',
        'lp/pricing': 'Find verified, low pricing on cars, trucks & SUVs',
        'lp/suv': 'Find verified, low pricing on your new SUV',
        'lp/truck': 'Find verified, low pricing on your new truck'
    };

    const path = Object.keys(pathMap).find(key => window.location.pathname.includes(key));
    const baseText = path ? pathMap[path] : 'Find verified, low pricing on your next vehicle';
    
    return `${baseText} - No credit check required`;
}
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
        applyLanderChanges();
    }
}
function applyLanderChanges() {
    waitForElem('.formWrapper form .fieldRow.ctaRow button').then((el) => {
        console.log('CRO: loaded 750 lander');
        croState.passedLander = true;
        try {
            document.getElementsByClassName('nuxtContainer step1Wrapper')[0].getElementsByTagName('span')[0].innerHTML = replaceHeadline();
            document.getElementsByClassName('nuxtContainer step1Wrapper')[0].getElementsByTagName('span')[1].innerHTML = replaceSubHeadline();
            document.getElementsByClassName('stepWrapper step1Wrapper')[0].getElementsByClassName('blockTitle')[0].insertAdjacentHTML('afterend', `
                <p class="cro-form-headline">Select a Vehicle</p>
            `);
            el[0].innerHTML = `
                <p>Next Step</p>
                ${nextBtnSvgHtml}
            `;
            document.getElementsByClassName('semMakeName customDropDown customDropDownAlt')[0].getElementsByTagName('select')[0].firstElementChild.textContent = 'Select a make';
            document.getElementsByClassName('semModelName customDropDown customDropDownAlt')[0].getElementsByTagName('select')[0].firstElementChild.textContent = 'Select a model';
            Array.from(document.getElementsByClassName('customDropDown customDropDownAlt')).forEach((el) => {
                el.addEventListener('change', (e) => {
                    (e.target.selectedIndex) ? el.classList.add('cro-answered') : el.classList.remove('cro-answered');
                });
            });
            document.getElementsByClassName('zipcodeSet')[0].getElementsByTagName('input')[0].setAttribute('placeholder', '');
            waitForElem('.formWrapper form .fieldRow.makeRow .customDropDown svg').then(el => {
                el[0].insertAdjacentHTML('afterend', dropdownSvgHtml);
            });
            waitForElem('.formWrapper form .fieldRow.modelRow .customDropDown svg').then(el => {
                el[0].insertAdjacentHTML('afterend', dropdownSvgHtml);
            });
            document.getElementsByClassName('fieldRow zipRow')[0].getElementsByTagName('label')[0].innerHTML = 'Zip Code';
            document.getElementsByClassName('widgetBlock newUsedAutoSet')[0].getElementsByClassName('blockTitle')[0].innerHTML = 'New Vehicles';
            document.getElementsByClassName('widgetBlock newUsedAutoSet')[0].getElementsByClassName('blockTitle')[1].innerHTML = 'Used Vehicles';
            document.getElementsByClassName('widgetBlock newUsedAutoSet')[0].getElementsByClassName('blockTitle')[2].innerHTML = 'Auto Finance';
            document.getElementsByClassName('imgSet')[1].insertAdjacentHTML('afterend', `
                <img class="cro-logo cro-logo-time" src="https://www.nolo.com/files/carsdirect/time-logo.png" >
            `);
            document.getElementsByClassName('imgSet')[2].insertAdjacentHTML('afterend', `
                <img class="cro-logo cro-logo-time" src="https://www.nolo.com/files/carsdirect/smart-money-logo.png" >
            `);
            document.getElementsByClassName('imgSet')[3].insertAdjacentHTML('afterend', `
                <img class="cro-logo cro-logo-time" src="https://www.nolo.com/files/carsdirect/msnbc-logo.png" >
            `);
            document.getElementsByClassName('imgSet')[4].insertAdjacentHTML('afterend', `
                <img class="cro-logo cro-logo-time" src="https://www.nolo.com/files/carsdirect/Forbes-logo.png" >
            `);
            document.getElementsByClassName('widgetBlock asSeenInSet')[0].getElementsByClassName('blockTitle')[0].innerHTML = 'Recognized By';
            document.getElementsByClassName('widgetBlock aboutCdcSet')[0].getElementsByTagName('span')[0].innerHTML = 'Save More & Shop Faster with CarsDirect';
            document.getElementsByClassName('widgetBlock aboutCdcSet')[0].getElementsByTagName('span')[1].innerHTML = `Since 1998, CarsDirect has been a trusted leader in online car leasing, offering flexible solutions for both new and used vehicles with transparent, upfront pricing. We've helped over <span>2.5 million car shoppers</span> find the right lease by focusing on reliability, efficiency, and authenticity. Whether you're looking for safety, quality, or trust, CarsDirect provides a seamless, stress-free leasing experience.`;
            if (window.innerWidth > 768) {
                const pictureSource = document.getElementsByClassName('photoContainer')[0].getElementsByTagName('source')[0];
                const pictureSourceOrigin = pictureSource.getAttribute('srcset');
                pictureSource.setAttribute('srcset', pictureSourceOrigin.substring(0, pictureSourceOrigin.indexOf('width')) + 'width=700&' + new Date().getTime());
            }
        } catch (error) {
            console.error('Error in CRO - step 1 changes:', error);
        }
    });
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