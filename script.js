const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalIcon = document.getElementById("modalIcon");
const toolContent = document.getElementById("toolContent");

const searchInput = document.getElementById("searchInput");
const toolsGrid = document.getElementById("toolsGrid");
const cards = [...document.querySelectorAll(".tool-card")];

const resultCount = document.getElementById("resultCount");
const noResults = document.getElementById("noResults");

const toast = document.getElementById("toast");


/* =========================
   TOAST
========================= */

function showToast(message = "انجام شد") {

    toast.querySelector("p").textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}


/* =========================
   COPY
========================= */

function copyText(text) {

    navigator.clipboard.writeText(text)
        .then(() => showToast("کپی شد ✓"))
        .catch(() => showToast("کپی انجام نشد"));
}


/* =========================
   MODAL
========================= */

function openTool(title, category, icon, html, init = null) {

    modalTitle.textContent = title;
    modalCategory.textContent = category;
    modalIcon.textContent = icon;

    toolContent.innerHTML = html;

    modal.classList.add("active");

    document.body.style.overflow = "hidden";

    if (init) init();
}

function closeModal() {

    modal.classList.remove("active");

    document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", e => {

    if (e.target === modal) {
        closeModal();
    }

});

document.addEventListener("keydown", e => {

    if (e.key === "Escape") {
        closeModal();
    }

});


/* =========================
   SEARCH
========================= */

function filterTools() {

    const query = searchInput.value.trim().toLowerCase();

    const activeCategory =
        document.querySelector(".category.active").dataset.category;

    let visible = 0;

    cards.forEach(card => {

        const text =
            (card.dataset.search + " " + card.innerText)
            .toLowerCase();

        const matchesSearch =
            !query || text.includes(query);

        const matchesCategory =
            activeCategory === "all" ||
            card.dataset.category === activeCategory;

        const show =
            matchesSearch && matchesCategory;

        card.style.display = show ? "" : "none";

        if (show) visible++;

    });

    resultCount.textContent = `${visible} ابزار`;

    noResults.style.display =
        visible === 0 ? "block" : "none";
}

searchInput.addEventListener("input", filterTools);


/* Ctrl + K */

document.addEventListener("keydown", e => {

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {

        e.preventDefault();

        searchInput.focus();
    }

});


/* =========================
   CATEGORIES
========================= */

document.querySelectorAll(".category").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".category")
            .forEach(x => x.classList.remove("active"));

        button.classList.add("active");

        filterTools();

        document.getElementById("tools")
            .scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

    });

});


/* =========================
   TOOL CARDS
========================= */

cards.forEach(card => {

    card.addEventListener("click", () => {

        const title =
            card.querySelector("h3").textContent.trim();

        openSelectedTool(title);

    });

});


/* =========================
   TOOL SELECTOR
========================= */

function openSelectedTool(title) {

    switch (title) {

        case "شمارش متن":
            textCounter();
            break;

        case "تبدیل حروف":
            caseConverter();
            break;

        case "پاکسازی متن":
            cleanText();
            break;

        case "حذف خطوط تکراری":
            duplicateLines();
            break;

        case "برعکس کردن متن":
            reverseText();
            break;

        case "Lorem Ipsum":
            loremTool();
            break;

        case "ماشین حساب":
            calculator();
            break;

        case "محاسبه درصد":
            percentageTool();
            break;

        case "محاسبه تخفیف":
            discountTool();
            break;

        case "میانگین":
            averageTool();
            break;

        case "BMI":
            bmiTool();
            break;

        case "عدد تصادفی":
            randomNumberTool();
            break;

        case "تبدیل طول":
            converterTool(
                "تبدیل طول",
                "متر",
                {
                    متر: 1,
                    کیلومتر: 1000,
                    سانتی‌متر: 0.01,
                    میلی‌متر: 0.001,
                    مایل: 1609.344,
                    فوت: 0.3048
                }
            );
            break;

        case "تبدیل وزن":
            converterTool(
                "تبدیل وزن",
                "کیلوگرم",
                {
                    کیلوگرم: 1,
                    گرم: 0.001,
                    میلی‌گرم: 0.000001,
                    پوند: 0.453592,
                    اونس: 0.0283495
                }
            );
            break;

        case "تبدیل دما":
            temperatureTool();
            break;

        case "تبدیل سرعت":
            converterTool(
                "تبدیل سرعت",
                "کیلومتر بر ساعت",
                {
                    "کیلومتر بر ساعت": 1,
                    "متر بر ثانیه": 3.6,
                    "مایل بر ساعت": 1.609344
                }
            );
            break;

        case "تبدیل مساحت":
            converterTool(
                "تبدیل مساحت",
                "متر مربع",
                {
                    "متر مربع": 1,
                    "کیلومتر مربع": 1000000,
                    "سانتی‌متر مربع": 0.0001,
                    "هکتار": 10000
                }
            );
            break;

        case "تبدیل حجم":
            converterTool(
                "تبدیل حجم",
                "لیتر",
                {
                    "لیتر": 1,
                    "میلی‌لیتر": 0.001,
                    "متر مکعب": 1000
                }
            );
            break;

        case "JSON Formatter":
            jsonTool();
            break;

        case "Base64":
            base64Tool();
            break;

        case "URL Encoder":
            urlTool();
            break;

        case "HTML Escape":
            htmlTool();
            break;

        case "UUID Generator":
            uuidTool();
            break;

        case "Unix Timestamp":
            timestampTool();
            break;

        case "ساخت رمز عبور":
            passwordTool();
            break;

        case "قدرت رمز عبور":
            passwordStrengthTool();
            break;

        case "SHA-256":
            sha256Tool();
            break;

        case "ساعت آنلاین":
            clockTool();
            break;

        case "کرنومتر":
            stopwatchTool();
            break;

        case "تایمر":
            timerTool();
            break;

        case "محاسبه سن":
            ageTool();
            break;

        case "تغییر اندازه تصویر":
            resizeImageTool();
            break;

        case "فشرده‌سازی تصویر":
            compressImageTool();
            break;

        case "Image Data URL":
            dataUrlTool();
            break;
    }
}


/* =========================
   TEXT COUNTER
========================= */

function textCounter() {

    openTool(
        "شمارش متن",
        "متن",
        "Aa",

        `
        <div class="tool-ui">

            <textarea id="counterText" placeholder="متن خود را اینجا وارد کنید..."></textarea>

            <div class="tool-result" id="counterResult">
                کلمات: 0<br>
                حروف: 0<br>
                خطوط: 0
            </div>

        </div>
        `,

        () => {

            const input =
                document.getElementById("counterText");

            const result =
                document.getElementById("counterResult");

            input.addEventListener("input", () => {

                const text = input.value;

                const words =
                    text.trim()
                        ? text.trim().split(/\s+/).length
                        : 0;

                const chars = text.length;

                const lines =
                    text ? text.split("\n").length : 0;

                result.innerHTML =
                    `کلمات: <b>${words}</b><br>
                     حروف: <b>${chars}</b><br>
                     خطوط: <b>${lines}</b>`;
            });

        }
    );
}


/* =========================
   CASE
========================= */

function caseConverter() {

    openTool(
        "تبدیل حروف",
        "متن",
        "Aa",

        `
        <div class="tool-ui">

            <textarea id="caseText" placeholder="متن..."></textarea>

            <div class="tool-buttons">
                <button class="tool-btn primary" id="upperBtn">
                    حروف بزرگ
                </button>

                <button class="tool-btn" id="lowerBtn">
                    حروف کوچک
                </button>

                <button class="tool-btn" id="copyCase">
                    کپی
                </button>
            </div>

        </div>
        `,

        () => {

            const text =
                document.getElementById("caseText");

            document.getElementById("upperBtn")
                .onclick = () => {
                    text.value = text.value.toUpperCase();
                };

            document.getElementById("lowerBtn")
                .onclick = () => {
                    text.value = text.value.toLowerCase();
                };

            document.getElementById("copyCase")
                .onclick = () => copyText(text.value);

        }
    );
}


/* =========================
   CLEAN TEXT
========================= */

function cleanText() {

    openTool(
        "پاکسازی متن",
        "متن",
        "✧",

        `
        <div class="tool-ui">

            <textarea id="cleanInput" placeholder="متن..."></textarea>

            <button class="tool-btn primary" id="cleanBtn">
                پاکسازی
            </button>

            <textarea id="cleanOutput" readonly placeholder="نتیجه..."></textarea>

            <button class="tool-btn" id="copyClean">
                کپی نتیجه
            </button>

        </div>
        `,

        () => {

            document.getElementById("cleanBtn")
                .onclick = () => {

                    const text =
                        document.getElementById("cleanInput").value;

                    const result =
                        text
                            .split("\n")
                            .map(x => x.trim().replace(/\s+/g, " "))
                            .filter(Boolean)
                            .join("\n");

                    document.getElementById("cleanOutput").value = result;
                };

            document.getElementById("copyClean")
                .onclick = () =>
                    copyText(
                        document.getElementById("cleanOutput").value
                    );
        }
    );
}


/* =========================
   DUPLICATE LINES
========================= */

function duplicateLines() {

    openTool(
        "حذف خطوط تکراری",
        "متن",
        "≡",

        `
        <div class="tool-ui">

            <textarea id="duplicateInput" placeholder="هر مورد را در یک خط بنویس..."></textarea>

            <button class="tool-btn primary" id="duplicateBtn">
                حذف تکراری‌ها
            </button>

            <textarea id="duplicateOutput" readonly></textarea>

            <button class="tool-btn" id="copyDuplicate">
                کپی
            </button>

        </div>
        `,

        () => {

            document.getElementById("duplicateBtn")
                .onclick = () => {

                    const input =
                        document.getElementById("duplicateInput").value;

                    const lines =
                        input
                            .split("\n")
                            .map(x => x.trim())
                            .filter(Boolean);

                    const unique =
                        [...new Set(lines)];

                    document.getElementById("duplicateOutput").value =
                        unique.join("\n");
                };

            document.getElementById("copyDuplicate")
                .onclick = () =>
                    copyText(
                        document.getElementById("duplicateOutput").value
                    );
        }
    );
}


/* =========================
   REVERSE
========================= */

function reverseText() {

    openTool(
        "برعکس کردن متن",
        "متن",
        "↔",

        `
        <div class="tool-ui">

            <textarea id="reverseInput" placeholder="متن..."></textarea>

            <button class="tool-btn primary" id="reverseBtn">
                برعکس کن
            </button>

            <textarea id="reverseOutput" readonly></textarea>

            <button class="tool-btn" id="reverseCopy">
                کپی
            </button>

        </div>
        `,

        () => {

            document.getElementById("reverseBtn")
                .onclick = () => {

                    const text =
                        document.getElementById("reverseInput").value;

                    document.getElementById("reverseOutput").value =
                        [...text].reverse().join("");
                };

            document.getElementById("reverseCopy")
                .onclick = () =>
                    copyText(
                        document.getElementById("reverseOutput").value
                    );
        }
    );
}


/* =========================
   LOREM
========================= */

function loremTool() {

    openTool(
        "Lorem Ipsum",
        "متن",
        "¶",

        `
        <div class="tool-ui">

            <label>تعداد پاراگراف</label>

            <input id="loremCount" type="number" min="1" max="10" value="3">

            <button class="tool-btn primary" id="loremBtn">
                تولید متن
            </button>

            <textarea id="loremOutput" readonly></textarea>

            <button class="tool-btn" id="loremCopy">
                کپی
            </button>

        </div>
        `,

        () => {

            const paragraph =
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
                "Praesent commodo, nisl at tincidunt facilisis, libero neque " +
                "mattis augue, vitae tincidunt lorem massa non justo.";

            document.getElementById("loremBtn")
                .onclick = () => {

                    let count =
                        Number(document.getElementById("loremCount").value);

                    count = Math.max(1, Math.min(10, count));

                    document.getElementById("loremOutput").value =
                        Array.from({length: count}, () => paragraph)
                            .join("\n\n");
                };

            document.getElementById("loremCopy")
                .onclick = () =>
                    copyText(
                        document.getElementById("loremOutput").value
                    );
        }
    );
}


/* =========================
   CALCULATOR
========================= */

function calculator() {

    openTool(
        "ماشین حساب",
        "محاسبات",
        "＋",

        `
        <div class="tool-ui">

            <input
                id="calcInput"
                placeholder="مثلاً: 25 * 4 + 10 / 2"
                dir="ltr"
            >

            <button class="tool-btn primary" id="calcBtn">
                محاسبه
            </button>

            <div class="tool-result big-result" id="calcResult">
                0
            </div>

        </div>
        `,

        () => {

            document.getElementById("calcBtn")
                .onclick = () => {

                    const input =
                        document.getElementById("calcInput").value;

                    const result =
                        document.getElementById("calcResult");

                    try {

                        if (!/^[0-9+\-*/().%\s]+$/.test(input)) {
                            throw new Error();
                        }

                        result.textContent =
                            Function(
                                `"use strict"; return (${input})`
                            )();

                    } catch {

                        result.textContent =
                            "عبارت نامعتبر";

                    }
                };
        }
    );
}


/* =========================
   PERCENT
========================= */

function percentageTool() {

    openTool(
        "محاسبه درصد",
        "محاسبات",
        "%",

        `
        <div class="tool-ui">

            <input id="percentNumber" type="number" placeholder="عدد">

            <input id="percentValue" type="number" placeholder="درصد">

            <button class="tool-btn primary" id="percentBtn">
                محاسبه
            </button>

            <div class="tool-result big-result" id="percentResult">
                0
            </div>

        </div>
        `,

        () => {

            document.getElementById("percentBtn")
                .onclick = () => {

                    const n =
                        Number(
                            document.getElementById("percentNumber").value
                        );

                    const p =
                        Number(
                            document.getElementById("percentValue").value
                        );

                    document.getElementById("percentResult")
                        .textContent =
                        (n * p / 100).toLocaleString();
                };
        }
    );
}


/* =========================
   DISCOUNT
========================= */

function discountTool() {

    openTool(
        "محاسبه تخفیف",
        "محاسبات",
        "٪",

        `
        <div class="tool-ui">

            <input id="discountPrice" type="number" placeholder="قیمت">

            <input id="discountPercent" type="number" placeholder="درصد تخفیف">

            <button class="tool-btn primary" id="discountBtn">
                محاسبه
            </button>

            <div class="tool-result" id="discountResult">
                نتیجه اینجا نمایش داده می‌شود.
            </div>

        </div>
        `,

        () => {

            document.getElementById("discountBtn")
                .onclick = () => {

                    const price =
                        Number(
                            document.getElementById("discountPrice").value
                        );

                    const percent =
                        Number(
                            document.getElementById("discountPercent").value
                        );

                    const discount =
                        price * percent / 100;

                    const finalPrice =
                        price - discount;

                    document.getElementById("discountResult")
                        .innerHTML =
                        `مقدار تخفیف: <b>${discount.toLocaleString()}</b><br>
                         قیمت نهایی: <b>${finalPrice.toLocaleString()}</b>`;
                };
        }
    );
}


/* =========================
   AVERAGE
========================= */

function averageTool() {

    openTool(
        "میانگین",
        "محاسبات",
        "Σ",

        `
        <div class="tool-ui">

            <input
                id="averageInput"
                placeholder="مثلاً: 12, 15, 18, 20"
                dir="ltr"
            >

            <button class="tool-btn primary" id="averageBtn">
                محاسبه
            </button>

            <div class="tool-result big-result" id="averageResult">
                0
            </div>

        </div>
        `,

        () => {

            document.getElementById("averageBtn")
                .onclick = () => {

                    const values =
                        document.getElementById("averageInput")
                            .value
                            .split(",")
                            .map(Number)
                            .filter(x => !isNaN(x));

                    if (!values.length) return;

                    const avg =
                        values.reduce((a,b) => a+b, 0) /
                        values.length;

                    document.getElementById("averageResult")
                        .textContent =
                        avg.toFixed(2);
                };
        }
    );
}


/* =========================
   BMI
========================= */

function bmiTool() {

    openTool(
        "BMI",
        "محاسبات",
        "⚖",

        `
        <div class="tool-ui">

            <input id="bmiWeight" type="number" placeholder="وزن (کیلوگرم)">

            <input id="bmiHeight" type="number" placeholder="قد (سانتی‌متر)">

            <button class="tool-btn primary" id="bmiBtn">
                محاسبه
            </button>

            <div class="tool-result big-result" id="bmiResult">
                0
            </div>

        </div>
        `,

        () => {

            document.getElementById("bmiBtn")
                .onclick = () => {

                    const weight =
                        Number(document.getElementById("bmiWeight").value);

                    const height =
                        Number(document.getElementById("bmiHeight").value) / 100;

                    if (!weight || !height) return;

                    const bmi =
                        weight / (height * height);

                    document.getElementById("bmiResult")
                        .textContent =
                        bmi.toFixed(1);
                };
        }
    );
}


/* =========================
   RANDOM
========================= */

function randomNumberTool() {

    openTool(
        "عدد تصادفی",
        "محاسبات",
        "?",

        `
        <div class="tool-ui">

            <input id="randomMin" type="number" value="1" placeholder="حداقل">

            <input id="randomMax" type="number" value="100" placeholder="حداکثر">

            <button class="tool-btn primary" id="randomBtn">
                تولید عدد
            </button>

            <div class="tool-result big-result" id="randomResult">
                ?
            </div>

        </div>
        `,

        () => {

            document.getElementById("randomBtn")
                .onclick = () => {

                    const min =
                        Number(document.getElementById("randomMin").value);

                    const max =
                        Number(document.getElementById("randomMax").value);

                    const result =
                        Math.floor(
                            Math.random() * (max - min + 1)
                        ) + min;

                    document.getElementById("randomResult")
                        .textContent = result;
                };
        }
    );
}


/* =========================
   GENERIC CONVERTER
========================= */

function converterTool(title, defaultUnit, units) {

    const options =
        Object.keys(units)
            .map(unit => `<option>${unit}</option>`)
            .join("");

    openTool(
        title,
        "تبدیل",
        "⇄",

        `
        <div class="tool-ui">

            <input
                id="convValue"
                type="number"
                value="1"
                placeholder="مقدار"
                dir="ltr"
            >

            <div class="converter-grid">

                <select id="convFrom">
                    ${options}
                </select>

                <select id="convTo">
                    ${options}
                </select>

            </div>

            <button class="tool-btn primary" id="convBtn">
                تبدیل
            </button>

            <div class="tool-result big-result" id="convResult">
                0
            </div>

        </div>
        `,

        () => {

            document.getElementById("convFrom").value =
                defaultUnit;

            document.getElementById("convTo").selectedIndex =
                1;

            document.getElementById("convBtn")
                .onclick = () => {

                    const value =
                        Number(
                            document.getElementById("convValue").value
                        );

                    const from =
                        document.getElementById("convFrom").value;

                    const to =
                        document.getElementById("convTo").value;

                    const base =
                        value * units[from];

                    const result =
                        base / units[to];

                    document.getElementById("convResult")
                        .textContent =
                        Number(result.toFixed(8)).toLocaleString();
                };
        }
    );
}


/* =========================
   TEMPERATURE
========================= */

function temperatureTool() {

    openTool(
        "تبدیل دما",
        "تبدیل",
        "℃",

        `
        <div class="tool-ui">

            <input id="tempValue" type="number" value="0">

            <div class="converter-grid">

                <select id="tempFrom">
                    <option>سانتی‌گراد</option>
                    <option>فارنهایت</option>
                    <option>کلوین</option>
                </select>

                <select id="tempTo">
                    <option>فارنهایت</option>
                    <option>سانتی‌گراد</option>
                    <option>کلوین</option>
                </select>

            </div>

            <button class="tool-btn primary" id="tempBtn">
                تبدیل
            </button>

            <div class="tool-result big-result" id="tempResult">
                0
            </div>

        </div>
        `,

        () => {

            document.getElementById("tempBtn")
                .onclick = () => {

                    const value =
                        Number(document.getElementById("tempValue").value);

                    const from =
                        document.getElementById("tempFrom").value;

                    const to =
                        document.getElementById("tempTo").value;

                    let celsius;

                    if (from === "سانتی‌گراد") {
                        celsius = value;
                    }

                    if (from === "فارنهایت") {
                        celsius = (value - 32) * 5 / 9;
                    }

                    if (from === "کلوین") {
                        celsius = value - 273.15;
                    }

                    let result;

                    if (to === "سانتی‌گراد") {
                        result = celsius;
                    }

                    if (to === "فارنهایت") {
                        result = celsius * 9 / 5 + 32;
                    }

                    if (to === "کلوین") {
                        result = celsius + 273.15;
                    }

                    document.getElementById("tempResult")
                        .textContent =
                        result.toFixed(2);
                };
        }
    );
}


/* =========================
   JSON
========================= */

function jsonTool() {

    openTool(
        "JSON Formatter",
        "برنامه‌نویسی",
        "{ }",

        `
        <div class="tool-ui">

            <textarea id="jsonInput" dir="ltr" placeholder='{"name":"Artin","age":16}'></textarea>

            <div class="tool-buttons">

                <button class="tool-btn primary" id="formatJson">
                    Format
                </button>

                <button class="tool-btn" id="minifyJson">
                    Minify
                </button>

            </div>

            <textarea id="jsonOutput" readonly dir="ltr"></textarea>

            <button class="tool-btn" id="copyJson">
                کپی
            </button>

        </div>
        `,

        () => {

            function process(minify) {

                try {

                    const obj =
                        JSON.parse(
                            document.getElementById("jsonInput").value
                        );

                    document.getElementById("jsonOutput").value =
                        minify
                            ? JSON.stringify(obj)
                            : JSON.stringify(obj, null, 4);

                } catch {

                    document.getElementById("jsonOutput").value =
                        "JSON نامعتبر است.";

                }
            }

            document.getElementById("formatJson")
                .onclick = () => process(false);

            document.getElementById("minifyJson")
                .onclick = () => process(true);

            document.getElementById("copyJson")
                .onclick = () =>
                    copyText(
                        document.getElementById("jsonOutput").value
                    );
        }
    );
}


/* =========================
   BASE64
========================= */

function base64Tool() {

    openTool(
        "Base64",
        "برنامه‌نویسی",
        "64",

        `
        <div class="tool-ui">

            <textarea id="baseInput" placeholder="متن..." dir="ltr"></textarea>

            <div class="tool-buttons">

                <button class="tool-btn primary" id="baseEncode">
                    Encode
                </button>

                <button class="tool-btn" id="baseDecode">
                    Decode
                </button>

            </div>

            <textarea id="baseOutput" readonly dir="ltr"></textarea>

            <button class="tool-btn" id="baseCopy">
                کپی
            </button>

        </div>
        `,

        () => {

            document.getElementById("baseEncode")
                .onclick = () => {

                    const text =
                        document.getElementById("baseInput").value;

                    document.getElementById("baseOutput").value =
                        btoa(unescape(encodeURIComponent(text)));
                };

            document.getElementById("baseDecode")
                .onclick = () => {

                    try {

                        const text =
                            document.getElementById("baseInput").value;

                        document.getElementById("baseOutput").value =
                            decodeURIComponent(
                                escape(atob(text))
                            );

                    } catch {

                        document.getElementById("baseOutput").value =
                            "Base64 نامعتبر است.";

                    }
                };

            document.getElementById("baseCopy")
                .onclick = () =>
                    copyText(
                        document.getElementById("baseOutput").value
                    );
        }
    );
}


/* =========================
   URL
========================= */

function urlTool() {

    openTool(
        "URL Encoder",
        "برنامه‌نویسی",
        "URL",

        `
        <div class="tool-ui">

            <textarea id="urlInput" dir="ltr"></textarea>

            <div class="tool-buttons">

                <button class="tool-btn primary" id="urlEncode">
                    Encode
                </button>

                <button class="tool-btn" id="urlDecode">
                    Decode
                </button>

            </div>

            <textarea id="urlOutput" readonly dir="ltr"></textarea>

            <button class="tool-btn" id="urlCopy">
                کپی
            </button>

        </div>
        `,

        () => {

            document.getElementById("urlEncode")
                .onclick = () => {

                    document.getElementById("urlOutput").value =
                        encodeURIComponent(
                            document.getElementById("urlInput").value
                        );
                };

            document.getElementById("urlDecode")
                .onclick = () => {

                    try {

                        document.getElementById("urlOutput").value =
                            decodeURIComponent(
                                document.getElementById("urlInput").value
                            );

                    } catch {

                        document.getElementById("urlOutput").value =
                            "URL نامعتبر است.";

                    }
                };

            document.getElementById("urlCopy")
                .onclick = () =>
                    copyText(
                        document.getElementById("urlOutput").value
                    );
        }
    );
}


/* =========================
   HTML ESCAPE
========================= */

function htmlTool() {

    openTool(
        "HTML Escape",
        "برنامه‌نویسی",
        "</>",

        `
        <div class="tool-ui">

            <textarea id="htmlInput" dir="ltr"></textarea>

            <div class="tool-buttons">

                <button class="tool-btn primary" id="escapeBtn">
                    Escape
                </button>

                <button class="tool-btn" id="unescapeBtn">
                    Unescape
                </button>

            </div>

            <textarea id="htmlOutput" readonly dir="ltr"></textarea>

        </div>
        `,

        () => {

            const input =
                document.getElementById("htmlInput");

            const output =
                document.getElementById("htmlOutput");

            document.getElementById("escapeBtn")
                .onclick = () => {

                    output.value =
                        input.value
                            .replace(/&/g, "&amp;")
                            .replace(/</g, "&lt;")
                            .replace(/>/g, "&gt;")
                            .replace(/"/g, "&quot;")
                            .replace(/'/g, "&#039;");
                };

            document.getElementById("unescapeBtn")
                .onclick = () => {

                    const textarea =
                        document.createElement("textarea");

                    textarea.innerHTML = input.value;

                    output.value =
                        textarea.value;
                };
        }
    );
}


/* =========================
   UUID
========================= */

function uuidTool() {

    openTool(
        "UUID Generator",
        "برنامه‌نویسی",
        "ID",

        `
        <div class="tool-ui">

            <button class="tool-btn primary" id="uuidBtn">
                ساخت UUID
            </button>

            <div class="tool-result generated-password" id="uuidResult">
                UUID
            </div>

            <button class="tool-btn" id="uuidCopy">
                کپی
            </button>

        </div>
        `,

        () => {

            function generate() {

                const uuid =
                    crypto.randomUUID
                        ? crypto.randomUUID()
                        : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
                            .replace(/[xy]/g, c => {

                                const r =
                                    Math.random() * 16 | 0;

                                const v =
                                    c === "x"
                                        ? r
                                        : (r & 0x3 | 0x8);

                                return v.toString(16);
                            });

                document.getElementById("uuidResult")
                    .textContent = uuid;
            }

            generate();

            document.getElementById("uuidBtn")
                .onclick = generate;

            document.getElementById("uuidCopy")
                .onclick = () =>
                    copyText(
                        document.getElementById("uuidResult").textContent
                    );
        }
    );
}


/* =========================
   TIMESTAMP
========================= */

function timestampTool() {

    openTool(
        "Unix Timestamp",
        "برنامه‌نویسی",
        "#",

        `
        <div class="tool-ui">

            <div class="tool-result big-result" id="timestampResult">
                ${Math.floor(Date.now() / 1000)}
            </div>

            <button class="tool-btn primary" id="timestampBtn">
                بروزرسانی
            </button>

            <button class="tool-btn" id="timestampCopy">
                کپی
            </button>

        </div>
        `,

        () => {

            document.getElementById("timestampBtn")
                .onclick = () => {

                    document.getElementById("timestampResult")
                        .textContent =
                        Math.floor(Date.now() / 1000);
                };

            document.getElementById("timestampCopy")
                .onclick = () =>
                    copyText(
                        document.getElementById("timestampResult").textContent
                    );
        }
    );
}


/* =========================
   PASSWORD
========================= */

function passwordTool() {

    openTool(
        "ساخت رمز عبور",
        "امنیت",
        "♢",

        `
        <div class="tool-ui">

            <label>طول رمز</label>

            <input
                id="passwordLength"
                type="number"
                min="4"
                max="64"
                value="16"
            >

            <button class="tool-btn primary" id="passwordBtn">
                ساخت رمز
            </button>

            <div class="tool-result generated-password" id="passwordResult">
                -
            </div>

            <button class="tool-btn" id="passwordCopy">
                کپی رمز
            </button>

        </div>
        `,

        () => {

            function generatePassword() {

                const length =
                    Math.max(
                        4,
                        Math.min(
                            64,
                            Number(
                                document.getElementById("passwordLength").value
                            )
                        )
                    );

                const chars =
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
                    "abcdefghijklmnopqrstuvwxyz" +
                    "0123456789" +
                    "!@#$%^&*_-+=";

                let password = "";

                for (let i = 0; i < length; i++) {

                    password +=
                        chars[
                            Math.floor(
                                Math.random() * chars.length
                            )
                        ];
                }

                document.getElementById("passwordResult")
                    .textContent = password;
            }

            generatePassword();

            document.getElementById("passwordBtn")
                .onclick = generatePassword;

            document.getElementById("passwordCopy")
                .onclick = () =>
                    copyText(
                        document.getElementById("passwordResult").textContent
                    );
        }
    );
}


/* =========================
   PASSWORD STRENGTH
========================= */

function passwordStrengthTool() {

    openTool(
        "قدرت رمز عبور",
        "امنیت",
        "✓",

        `
        <div class="tool-ui">

            <input
                id="strengthInput"
                type="password"
                placeholder="رمز عبور"
                dir="ltr"
            >

            <button class="tool-btn primary" id="strengthBtn">
                بررسی
            </button>

            <div class="tool-result" id="strengthResult">
                نتیجه اینجا نمایش داده می‌شود.
            </div>

        </div>
        `,

        () => {

            document.getElementById("strengthBtn")
                .onclick = () => {

                    const password =
                        document.getElementById("strengthInput").value;

                    let score = 0;

                    if (password.length >= 8) score++;
                    if (password.length >= 12) score++;
                    if (/[A-Z]/.test(password)) score++;
                    if (/[a-z]/.test(password)) score++;
                    if (/[0-9]/.test(password)) score++;
                    if (/[^A-Za-z0-9]/.test(password)) score++;

                    let text;

                    if (score <= 2) {
                        text = "ضعیف";
                    } else if (score <= 4) {
                        text = "متوسط";
                    } else {
                        text = "قوی";
                    }

                    document.getElementById("strengthResult")
                        .innerHTML =
                        `قدرت رمز: <b>${text}</b><br>
                         امتیاز: ${score} از 6`;
                };
        }
    );
}


/* =========================
   SHA256
========================= */

async function sha256Tool() {

    openTool(
        "SHA-256",
        "امنیت",
        "#",

        `
        <div class="tool-ui">

            <textarea id="hashInput" dir="ltr" placeholder="متن..."></textarea>

            <button class="tool-btn primary" id="hashBtn">
                ساخت Hash
            </button>

            <textarea id="hashOutput" readonly dir="ltr"></textarea>

            <button class="tool-btn" id="hashCopy">
                کپی
            </button>

        </div>
        `,

        () => {

            document.getElementById("hashBtn")
                .onclick = async () => {

                    const text =
                        document.getElementById("hashInput").value;

                    const data =
                        new TextEncoder().encode(text);

                    const hash =
                        await crypto.subtle.digest(
                            "SHA-256",
                            data
                        );

                    const hex =
                        [...new Uint8Array(hash)]
                            .map(
                                b => b.toString(16).padStart(2, "0")
                            )
                            .join("");

                    document.getElementById("hashOutput").value =
                        hex;
                };

            document.getElementById("hashCopy")
                .onclick = () =>
                    copyText(
                        document.getElementById("hashOutput").value
                    );
        }
    );
}


/* =========================
   CLOCK
========================= */

function clockTool() {

    openTool(
        "ساعت آنلاین",
        "زمان",
        "◷",

        `
        <div class="tool-ui">

            <div class="tool-result big-result" id="clockResult">
                00:00:00
            </div>

            <div class="tool-result" id="dateResult">
                -
            </div>

        </div>
        `,

        () => {

            function update() {

                const now = new Date();

                document.getElementById("clockResult")
                    .textContent =
                    now.toLocaleTimeString("fa-IR");

                document.getElementById("dateResult")
                    .textContent =
                    now.toLocaleDateString("fa-IR", {
                        dateStyle: "full"
                    });
            }

            update();

            const interval =
                setInterval(() => {

                    if (!modal.classList.contains("active")) {
                        clearInterval(interval);
                        return;
                    }

                    update();

                }, 1000);
        }
    );
}


/* =========================
   STOPWATCH
========================= */

function stopwatchTool() {

    openTool(
        "کرنومتر",
        "زمان",
        "⏱",

        `
        <div class="tool-ui">

            <div class="tool-result big-result" id="stopwatchResult">
                00:00:00
            </div>

            <div class="tool-buttons">

                <button class="tool-btn primary" id="startStopwatch">
                    شروع
                </button>

                <button class="tool-btn" id="pauseStopwatch">
                    توقف
                </button>

                <button class="tool-btn" id="resetStopwatch">
                    ریست
                </button>

            </div>

        </div>
        `,

        () => {

            let seconds = 0;
            let interval = null;

            const display =
                document.getElementById("stopwatchResult");

            function render() {

                const h =
                    Math.floor(seconds / 3600)
                        .toString()
                        .padStart(2, "0");

                const m =
                    Math.floor((seconds % 3600) / 60)
                        .toString()
                        .padStart(2, "0");

                const s =
                    (seconds % 60)
                        .toString()
                        .padStart(2, "0");

                display.textContent =
                    `${h}:${m}:${s}`;
            }

            document.getElementById("startStopwatch")
                .onclick = () => {

                    if (interval) return;

                    interval =
                        setInterval(() => {

                            seconds++;

                            render();

                        }, 1000);
                };

            document.getElementById("pauseStopwatch")
                .onclick = () => {

                    clearInterval(interval);

                    interval = null;
                };

            document.getElementById("resetStopwatch")
                .onclick = () => {

                    clearInterval(interval);

                    interval = null;

                    seconds = 0;

                    render();
                };
        }
    );
}


/* =========================
   TIMER
========================= */

function timerTool() {

    openTool(
        "تایمر",
        "زمان",
        "◴",

        `
        <div class="tool-ui">

            <div class="converter-grid">

                <input
                    id="timerMin"
                    type="number"
                    min="0"
                    value="1"
                    placeholder="دقیقه"
                >

                <input
                    id="timerSec"
                    type="number"
                    min="0"
                    value="0"
                    placeholder="ثانیه"
                >

            </div>

            <button class="tool-btn primary" id="timerStart">
                شروع
            </button>

            <button class="tool-btn" id="timerReset">
                ریست
            </button>

            <div class="tool-result big-result" id="timerResult">
                01:00
            </div>

        </div>
        `,

        () => {

            let interval = null;

            let total = 60;

            const display =
                document.getElementById("timerResult");

            function render() {

                const min =
                    Math.floor(total / 60)
                        .toString()
                        .padStart(2, "0");

                const sec =
                    (total % 60)
                        .toString()
                        .padStart(2, "0");

                display.textContent =
                    `${min}:${sec}`;
            }

            document.getElementById("timerStart")
                .onclick = () => {

                    if (interval) return;

                    total =
                        Number(
                            document.getElementById("timerMin").value
                        ) * 60 +
                        Number(
                            document.getElementById("timerSec").value
                        );

                    render();

                    interval =
                        setInterval(() => {

                            if (total <= 0) {

                                clearInterval(interval);

                                interval = null;

                                showToast("تایمر تمام شد ✓");

                                return;
                            }

                            total--;

                            render();

                        }, 1000);
                };

            document.getElementById("timerReset")
                .onclick = () => {

                    clearInterval(interval);

                    interval = null;

                    total = 60;

                    render();
                };
        }
    );
}


/* =========================
   AGE
========================= */

function ageTool() {

    openTool(
        "محاسبه سن",
        "زمان",
        "🎂",

        `
        <div class="tool-ui">

            <label>تاریخ تولد</label>

            <input id="birthDate" type="date">

            <button class="tool-btn primary" id="ageBtn">
                محاسبه
            </button>

            <div class="tool-result" id="ageResult">
                -
            </div>

        </div>
        `,

        () => {

            document.getElementById("ageBtn")
                .onclick = () => {

                    const value =
                        document.getElementById("birthDate").value;

                    if (!value) return;

                    const birth =
                        new Date(value);

                    const now =
                        new Date();

                    let age =
                        now.getFullYear() -
                        birth.getFullYear();

                    const month =
                        now.getMonth() -
                        birth.getMonth();

                    if (
                        month < 0 ||
                        (
                            month === 0 &&
                            now.getDate() < birth.getDate()
                        )
                    ) {
                        age--;
                    }

                    document.getElementById("ageResult")
                        .innerHTML =
                        `سن تقریبی شما: <b>${age}</b> سال`;
                };
        }
    );
}


/* =========================
   IMAGE RESIZE
========================= */

function resizeImageTool() {

    openTool(
        "تغییر اندازه تصویر",
        "تصویر",
        "▧",

        `
        <div class="tool-ui">

            <input id="resizeFile" type="file" accept="image/*">

            <input id="resizeWidth" type="number" placeholder="عرض جدید">

            <input id="resizeHeight" type="number" placeholder="ارتفاع جدید">

            <button class="tool-btn primary" id="resizeBtn">
                تغییر اندازه
            </button>

            <a
                id="resizeDownload"
                class="tool-btn"
                style="display:none;text-align:center"
                download="tooliva-resized.png"
            >
                دانلود تصویر
            </a>

        </div>
        `,

        () => {

            document.getElementById("resizeBtn")
                .onclick = () => {

                    const file =
                        document.getElementById("resizeFile")
                            .files[0];

                    if (!file) {
                        showToast("اول یک تصویر انتخاب کن");
                        return;
                    }

                    const width =
                        Number(
                            document.getElementById("resizeWidth").value
                        );

                    const height =
                        Number(
                            document.getElementById("resizeHeight").value
                        );

                    if (!width || !height) {
                        showToast("عرض و ارتفاع را وارد کن");
                        return;
                    }

                    const img =
                        new Image();

                    img.onload = () => {

                        const canvas =
                            document.createElement("canvas");

                        canvas.width = width;
                        canvas.height = height;

                        canvas.getContext("2d")
                            .drawImage(
                                img,
                                0,
                                0,
                                width,
                                height
                            );

                        canvas.toBlob(blob => {

                            const url =
                                URL.createObjectURL(blob);

                            const link =
                                document.getElementById(
                                    "resizeDownload"
                                );

                            link.href = url;

                            link.style.display =
                                "block";

                        }, "image/png");
                    };

                    img.src =
                        URL.createObjectURL(file);
                };
        }
    );
}


/* =========================
   IMAGE COMPRESS
========================= */

function compressImageTool() {

    openTool(
        "فشرده‌سازی تصویر",
        "تصویر",
        "◇",

        `
        <div class="tool-ui">

            <input id="compressFile" type="file" accept="image/*">

            <label>
                کیفیت
            </label>

            <input
                id="compressQuality"
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value="0.7"
            >

            <button class="tool-btn primary" id="compressBtn">
                فشرده کن
            </button>

            <a
                id="compressDownload"
                class="tool-btn"
                style="display:none;text-align:center"
                download="tooliva-compressed.jpg"
            >
                دانلود تصویر
            </a>

        </div>
        `,

        () => {

            document.getElementById("compressBtn")
                .onclick = () => {

                    const file =
                        document.getElementById("compressFile")
                            .files[0];

                    if (!file) {
                        showToast("اول تصویر انتخاب کن");
                        return;
                    }

                    const quality =
                        Number(
                            document.getElementById("compressQuality").value
                        );

                    const img =
                        new Image();

                    img.onload = () => {

                        const canvas =
                            document.createElement("canvas");

                        canvas.width =
                            img.width;

                        canvas.height =
                            img.height;

                        canvas.getContext("2d")
                            .drawImage(
                                img,
                                0,
                                0
                            );

                        canvas.toBlob(blob => {

                            const url =
                                URL.createObjectURL(blob);

                            const link =
                                document.getElementById(
                                    "compressDownload"
                                );

                            link.href = url;

                            link.style.display =
                                "block";

                        }, "image/jpeg", quality);
                    };

                    img.src =
                        URL.createObjectURL(file);
                };
        }
    );
}


/* =========================
   DATA URL
========================= */

function dataUrlTool() {

    openTool(
        "Image Data URL",
        "تصویر",
        "IMG",

        `
        <div class="tool-ui">

            <input id="dataFile" type="file" accept="image/*">

            <textarea
                id="dataOutput"
                readonly
                dir="ltr"
                placeholder="Data URL..."
            ></textarea>

            <button class="tool-btn" id="dataCopy">
                کپی
            </button>

        </div>
        `,

        () => {

            document.getElementById("dataFile")
                .addEventListener("change", e => {

                    const file =
                        e.target.files[0];

                    if (!file) return;

                    const reader =
                        new FileReader();

                    reader.onload = () => {

                        document.getElementById("dataOutput")
                            .value =
                            reader.result;
                    };

                    reader.readAsDataURL(file);
                });

            document.getElementById("dataCopy")
                .onclick = () =>
                    copyText(
                        document.getElementById("dataOutput").value
                    );
        }
    );
}


/* =========================
   INITIAL COUNT
========================= */

document.getElementById("toolCount")
    .textContent = `${cards.length}+`;

resultCount.textContent =
    `${cards.length} ابزار`;