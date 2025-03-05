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
    if (document.URL.match('buildyourcar/styles/lease')) {
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
                        // article section
                        waitForElem('.mainWrapperInner .lowerFoldWrapper .ourReview .ourReviewArticle > span.snippet span.readMore').then(() => {
                            const autoName = document.getElementsByClassName('nuxtContainer step2Wrapper')[0].getElementsByTagName('h1')[0].innerText;
                            if (document.getElementsByClassName('expertArticle').length) {
                                // expert article
                                document.getElementsByClassName('snippet')[0].insertAdjacentHTML('beforebegin', `
                                    <h2 class="cro-review-summary">${autoName} Expert Review</h2>
                                    <div class="cro-review-preview"></div>
                                `);
                                const croReviewPreview = document.getElementsByClassName('cro-review-preview')[0];
                                for (let i = 0; i < 3; i++) {
                                    croReviewPreview.appendChild(document.getElementsByClassName('fullArticle')[0].getElementsByClassName('section')[i].cloneNode(true));
                                }
                                document.getElementsByClassName('readMore')[0].addEventListener('click', () => {
                                    croReviewPreview.classList.add('cro-hidden');
                                });
                                document.getElementsByClassName('readLess')[0].addEventListener('click', () => {
                                    croReviewPreview.classList.remove('cro-hidden');
                                });
                            } else {
                                // overview article
                                document.querySelector('.mainWrapperInner .lowerFoldWrapper .ourReview .overviewArticle').insertAdjacentHTML('beforebegin', `
                                    <h2 class="cro-review-summary">${autoName} Expert Review</h2>
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
                    try {
                        el[0].innerHTML = `
                            <p>See My Price</p>
                            ${nextBtnSvgHtml}
                        `;
                        document.getElementsByClassName('contactInfoWrapper')[0].insertAdjacentHTML('beforebegin', `
                            <div class="cro-contact-headline">
                                <h1>Great Choice, Let’s <span>Secure Your Exclusive Lease Deals</span></h1>
                                <p>Complete this form to see top local offers based on current pricing analysis — no credit checks, no hassle.</p>
                            </div>    
                        `);
                        document.getElementsByTagName('form')[0].insertAdjacentHTML('beforebegin', `
                            <div class="cro-contact-headline-desktop">
                                <h1>Great Choice, Let’s <span>Secure Your Exclusive Lease Deals</span></h1>
                                <p>Complete this form to see top local offers based on current pricing analysis — no credit checks, no hassle.</p>
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
                        if (window.innerWidth < 769) {
                            document.getElementsByClassName('fieldRow')[1].getElementsByTagName('label')[0].insertAdjacentHTML('afterend', `
                                <p class="cro-contact-sublabel">Get your lease offers directly to your inbox</p>
                            `);
                            document.getElementsByClassName('fieldRow')[2].getElementsByTagName('label')[0].insertAdjacentHTML('afterend', `
                                <p class="cro-contact-sublabel">Only used to confirm your options & preferences for faster service</p>
                            `);
                        }
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
        applyLanderChanges();
    }
}
function applyLanderChanges() {
    waitForElem('.formWrapper form .fieldRow.ctaRow button').then((el) => {
        console.log('CRO: loaded 742 lander');
        croState.passedLander = true;
        try {
            document.getElementsByClassName('nuxtContainer step1Wrapper')[0].getElementsByTagName('span')[0].innerHTML = `Find Local Lease Deals <span>Without the Hassle</span>`;
            document.getElementsByClassName('nuxtContainer step1Wrapper')[0].getElementsByTagName('span')[2].innerHTML = `Compare multiple deals to see the lowest price on your next lease in minutes — No credit check needed.`;
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
            document.getElementsByClassName('widgetBlock newUsedAutoSet')[0].getElementsByClassName('blockTitle')[0].innerHTML = 'New Vehicle Leases';
            document.getElementsByClassName('widgetBlock newUsedAutoSet')[0].getElementsByClassName('blockTitle')[1].innerHTML = 'Used Vehicle Leases';
            document.getElementsByClassName('widgetBlock newUsedAutoSet')[0].getElementsByClassName('blockTitle')[2].innerHTML = 'Lease Financing';
            document.getElementsByClassName('widgetBlock newUsedAutoSet')[0].getElementsByTagName('p')[1].innerHTML = `Find flexible lease options on the latest models. Enjoy transparent terms and pricing to get behind the wheel of a new car without the long-term commitment. We've built one of the largest networks of participating dealers to offer you great deals on great vehicles.`;
            document.getElementsByClassName('widgetBlock newUsedAutoSet')[0].getElementsByTagName('p')[3].innerHTML = `Explore affordable leasing options for pre-owned cars. With upfront pricing and reliable information, leasing a used car has never been easier. Can't find the car or truck you're looking for? You can save your search and we'll notify you when new listings are added that match your search!`;
            document.getElementsByClassName('widgetBlock newUsedAutoSet')[0].getElementsByTagName('p')[5].innerHTML = `We simplify the leasing process with competitive rates and clear financing options tailored to your budget, helping you lease confidently. We understand that good people don't always have great credit. Complete our simple & secure online application in minutes.`;
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
    console.log('CRO: 742 active');
    croSetup();
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', croHandler);
} else {
    croHandler();
}