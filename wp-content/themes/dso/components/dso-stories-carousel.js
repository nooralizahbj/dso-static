import {
    LitElement,
    html,
    css
} from "https://cdn.jsdelivr.net/npm/lit@2.8.0/+esm";

class DSOStoriesCarousel extends LitElement {
    static get properties() {
        return {
            _id: { type: String },
            acf: { type: Object }
        };
    }

    static styles = css`
        :host {
            width: 100%;
        }

        .heading__line-1 {
            font-family: "Titillium Web";
            font-weight: 600;
            font-size: 2rem;
            line-height: 2rem;
            color: rgba(255, 255, 255, 0.85);
        }

        .heading__line-2 {
            font-family: "Work Sans";
            font-weight: 800;
            font-size: 3rem;
            line-height: 4rem;
            text-transform: uppercase;
            color: #ffffff;
        }
    `;

    constructor() {
        super();
    }

    firstUpdated() {
        this._id = this.randomString();
        const swiperEl = this.shadowRoot.querySelector("swiper-container");
        const swiperParams = {
            injectStyles: [
                `
                :host {
                    display: flex;
                    align-items: center;
                }

                :host .swiper-button-prev,
                :host .swiper-button-next {
                    background: #fff !important;
                    backdrop-filter: blur(20px);
                    border-radius: 100px;
                    width: 4rem !important;
                    height: 4rem !important;
                    top: 50% !important;
                    transform: translateY(-50%);
                }

                :host .swiper-button-prev > svg, :host .swiper-button-next > svg {
                    color: #06184A;
                    width: 1.25rem;
                    height: 1.25rem;
                }

                :host .swiper-button-prev.swiper-button-disabled,
                :host .swiper-button-next.swiper-button-disabled {
                    display: none;
                }

                ::slotted(swiper-slide) {
                    display: flex;
                    height: auto;
                }

                ::slotted(swiper-slide:nth-child(1)) {
                    flex-direction: column;
                    justify-content: center;
                }

                ::slotted(swiper-slide:nth-child(n+2)) {
                    align-items: center;
                }
                `
            ],
            slidesPerView: 1,
            spaceBetween: 30,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 40
                },
                480: {
                    slidesPerView: 2,
                    spaceBetween: 40
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 40
                },
                769: {
                    slidesPerView: 2,
                    spaceBetween: 40
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 50
                }
            },
            on: {
                init() {
                    // ...
                }
            }
        };
        Object.assign(swiperEl, swiperParams);
        swiperEl.initialize();
    }

    randomString(length = 4) {
        // Declare all characters
        let chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        // Pick characers randomly
        let str = "";
        for (let i = 0; i < length; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return str;
    }

    render() {
        return html`
            <swiper-container
                init="false"
                navigation="true"
                class="dso-stories-swiper-${this._id}"
            >
                <swiper-slide>
                    <div class="heading__line-1">
                        ${this.acf.carousel_title_line_1 ?? ''}
                    </div>
                    <div class="heading__line-2">
                        ${this.acf.carousel_title_line_2 ?? ''}
                    </div>
                </swiper-slide>
                ${this.acf.carousel_images.map(
                    (item) =>
                        html`<swiper-slide>
                            <img src="${item["carousel_image"]}" width="100%">
                        </swiper-slide>`
                )}
            </swiper-container>
        `;
    }
}

customElements.define("dso-stories-carousel", DSOStoriesCarousel);
