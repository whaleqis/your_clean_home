import React, { useEffect, useMemo, useState } from "react";
import {
  Calculator,
  Camera,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Home,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  Sparkles,
  Star,
  Wind,
  Hammer,
  Shirt,
  Sofa,
  Send,
} from "lucide-react";

const logo = "/assets/ych-logo.png";

const i18n = {
  hy: {
    languageName: "Հայերեն",
    currency: "դրամ",
    yes: "այո",
    none: "Չկան",
    pieces: "հատ",
    sqm: "քմ",
    hour: "ժամ",
    navSteps: ["Ծառայություն", "Հաշվարկ", "Հավելյալ", "Հայտ"],
    heroBadge: "Գնի հաշվիչ",
    heroTitle: "Պարզ 4 քայլով ստացեք ծառայության արժեքը",
    heroText: "Your Clean Home - երբ հարմարավետությունը միաձուլվում է մաքրության հետ։",
    summaryTitle: "Ձեր ընտրությունը",
    summaryFallbackTitle: "Ծառայություն ընտրված չէ",
    summaryFallbackRange: "Ընտրեք ծառայությունը",
    quantityLabel: { ironing: "Ժամեր", dry: "Կահույք", default: "Մակերես" },
    addOns: "Հավելյալ",
    approximatePrice: "Մոտավոր արժեք",
    totalApproximatePrice: "Ընդհանուր մոտավոր արժեք",
    includedTitle: "Ինչ է ներառված",
    step1Label: "Քայլ 1",
    step1Title: "Ընտրեք ծառայությունը",
    step1Text: "Սեղմեք ծառայության վրա՝ տեսնելու համար, թե ինչ է ներառված։",
    step2Label: "Քայլ 2",
    step2Title: "Հաշվարկ",
    step2Text: {
      dry: "Ընտրեք կահույքի տեսակները։",
      ironing: "Նշեք ժամերի քանակը։",
      default: "Նշեք մակերեսը։",
    },
    noServiceTitle: "Նախ ընտրեք ծառայությունը",
    noServiceCalcText: "Վերադարձեք առաջին քայլին և ընտրեք մաքրման տեսակը։",
    noServiceAddonText: "Հավելյալ ծառայությունները կախված են ընտրված ծառայությունից։",
    noServiceRequestText: "Հայտ ուղարկելու համար պետք է ընտրված լինի ծառայության տեսակը։",
    chooseService: "Ընտրել ծառայություն",
    chooseFurniture: "Ընտրեք կահույքի տեսակները",
    ironingHours: "Արդուկման ժամեր",
    apartmentArea: "Բնակարանի մակերես",
    minPriceNotes: {
      regular: "1–40 քմ արժեքը՝ 14,000 դրամ, 40 քմ-ից բարձր՝ 350 դրամ / 1 քմ",
      deep: "1–40 քմ արժեքը՝ 26,000 դրամ, 40 քմ-ից բարձր՝ 650 դրամ / 1 քմ",
      post: "1–40 քմ արժեքը՝ 32,000 դրամ, 40 քմ-ից բարձր՝ 800 դրամ / 1 քմ",
      steam: "Մինչև 10 քմ արժեքը՝ 15,000 դրամ, 10 քմ-ից բարձր՝ 1,000 դրամ / 1 քմ",
    },
    step3Label: "Քայլ 3",
    step3Title: "Կա՞ որևէ բան ավելացնելու",
    step3Text: "Ընտրեք հավելյալ ծառայությունները, եթե անհրաժեշտ են։",
    noAddonTitle: "Այս ծառայության համար հավելյալ ընտրանքներ չկան",
    noAddonText: "Կարող եք անցնել հայտի լրացմանը։",
    step4Label: "Քայլ 4",
    step4Title: "Ուղարկել հայտ",
    step4Text: "Կցեք լուսանկարներ, որպեսզի կարողանանք վերջնական գինը ճիշտ հաստատել։",
    photoTitle: "Ճշգրիտ գնի համար ուղարկեք նկարներ",
    photoText: "Այդպես կարող ենք ճիշտ գնահատել աշխատակիցների քանակը, ժամանակը և աշխատանքի բարդությունը։",
    thankTitle: "Շնորհակալություն 💚",
    thankText: "Ձեր հայտը հաջողությամբ ուղարկվել է։ Մենք շուտով կկապվենք Ձեզ հետ։",
    sendError: "Չհաջողվեց ուղարկել հայտը։ Խնդրում ենք փորձել կրկին։",
    sendConnectionError: "Չհաջողվեց ուղարկել հայտը։ Ստուգեք ինտերնետ կապը և փորձեք կրկին։",
    form: {
      name: "Անուն",
      namePlaceholder: "Ձեր անունը",
      phone: "Հեռախոսահամար",
      phonePlaceholder: "+374 ...",
      address: "Հասցե / Թաղամաս",
      addressPlaceholder: "Օրինակ՝ Կենտրոն, Արաբկիր...",
      preferredDate: "Նախընտրելի օր",
      photos: "Լուսանկարներ",
      photosHelp: "Կարող եք կցել մի քանի նկար՝ ավելի հստակ գնահատման համար։",
      notes: "Լրացուցիչ նշումներ",
      notesPlaceholder: "Հավելյալ նշումներ",
    },
    hidden: {
      service: "Ծառայություն",
      hours: "Ժամեր",
      furnitureCount: "Կահույքի քանակ",
      area: "Մակերես",
      addons: "Հավելյալ ծառայություններ",
      basePrice: "Հիմնական արժեք",
      addonsPrice: "Հավելյալների արժեք",
      totalPrice: "Ընդհանուր մոտավոր արժեք",
      fullSummary: "Հաշվարկի ամբողջական ամփոփում",
    },
    orderSummary: {
      service: "Ծառայություն",
      hours: "Ժամեր",
      furnitureCount: "Կահույքի քանակ",
      area: "Մակերես",
      addons: "Հավելյալ ծառայություններ",
      basePrice: "Հիմնական արժեք",
      addonsPrice: "Հավելյալների արժեք",
      totalPrice: "Ընդհանուր մոտավոր արժեք",
    },
    back: "Հետ",
    continue: "Շարունակել",
    sending: "Ուղարկվում է...",
    sendRequest: "Ուղարկել հայտ",
    footerText: "Պրոֆեսիոնալ մաքրման ծառայություններ Երևանում",
    services: {
      regular: { label: "Ընթացիկ մաքրում", short: "Ընթացիկ", subtitle: "Պարբերական մաքրություն", range: "300–500 դրամ / 1 քմ", calcRange: "350 դրամ / 1 քմ" },
      deep: { label: "Համալիր մաքրում", short: "Համալիր", subtitle: "Խորը և մանրակրկիտ մաքրում", range: "600–800 դրամ / 1 քմ", calcRange: "650 դրամ / 1 քմ" },
      post: { label: "Հետշինարարական մաքրում", short: "Հետշինարարական", subtitle: "Վերանորոգումից հետո", range: "800–1200 դրամ / 1 քմ", calcRange: "սկսած 800 դրամ / 1 քմ" },
      steam: { label: "Գոլորշիով մաքրում", short: "Գոլորշիով", subtitle: "Ախտահանում", range: "1000–1500 դրամ / 1 քմ", calcRange: "1000 դրամ / 1 քմ" },
      dry: { label: "Փափուկ կահույքի քիմմաքրում", short: "Քիմմաքրում", subtitle: "Փափուկ կահույքի քիմմաքրում", range: "սկսած 3000 դրամ", calcRange: "սկսած 5000 դրամ / 1 հատ" },
      ironing: { label: "Արդուկում", short: "Արդուկում", subtitle: "Հավելյալ ծառայություն", range: "4000 դրամ / 1 ժամ", calcRange: "4000 դրամ / 1 ժամ" },
    },
    serviceContent: {
      regular: ["Հատակի փոշեկուլով մաքրում", "Հատակի թաց մաքրում", "Փոշիների հեռացում կահույքի մակերեսից", "Դռների և բռնակների փոշեկուլում", "Հայելիների մաքրում", "Սալօջախի մաքրում", "Սանհանգույցի մաքրում"],
      deep: [
        { title: "Սանհանգույց", items: ["Առաստաղի, հատակի և պատերի լվացում՝ հատուկ նյութերով", "Սալիկների լվացում՝ ներառյալ անկյունները և միացման տեղերը", "Լոգախցիկի և վաննայի, լվացարանի և ծորակների մաքրում", "Փոշու և նստվածքի մաքրում", "Դռների մաքրում", "Հայելիների և ապակե մակերեսների մաքրում", "Զուգարանակոնքի մաքրում՝ ներսից և դրսից"] },
        { title: "Խոհանոց", items: ["Հատակի փոշեկուլով մաքրում", "Հատակի թաց մաքրում հատուկ նյութերով", "Առաստաղի և պատերի մաքրում", "Ջահերի մաքրում", "«Գորգոց»-ի յուղազերծում և լվացում", "Աշխատասեղանի յուղազերծում և լվացում", "Լվացարանի և ծորակի մաքրում", "Գազօջախի, վառարանի և օդաքարշ համակարգի յուղազերծում և մաքրում", "Կահույքի արտաքին մակերեսների մաքրում", "Դռների և բռնակների փոշու և կեղտի հեռացում", "Հայելիների և ապակե մակերեսների մաքրում", "Աղբամանի հատվածի լվացում և մաքրում", "Լուսամուտների լվացում"] },
        { title: "Ննջասենյակ և Հյուրասենյակ", items: ["Հատակի փոշեկուլով մաքրում", "Հատակի թաց մաքրում հատուկ նյութերով", "Առաստաղի և պատերի մաքրում", "Ջահերի մաքրում", "Կահույքի և բոլոր մակերեսների մաքրում", "Մահճակալի, կողային սեղանիկների և պահարանների արտաքին մակերեսների մաքրում", "Աքսեսուարների, լուսանկարների շրջանակների, նկարների և դեկորի փոշու մաքրում", "Հայելիների և ապակե մակերեսների լվացում", "Դռների և բռնակների լվացում", "Լուսամուտների լվացում"] },
      ],
      post: ["Տարածքի ընդհանուր փոշեկուլում և մանրամասն մաքրում", "Շինարարական փոշու, մնացորդների և աղբի հեռացում", "Մակերեսների՝ պատերի, դռների, պատուհանների, հատակի մաքրում և փայլեցում", "Պատուհանների ապակիների ներսից և դրսից մանրակրկիտ լվացում", "Շինանյութերի՝ սիլիկոն, ներկ, ցեմենտային հետքեր, հեռացում տարբեր մակերեսներից", "Տարբեր ծածկույթների՝ կերամիկա, լամինատ, քարե մակերեսներ, հատուկ միջոցներով մշակում և մաքրում", "Լոգասենյակի և խոհանոցի մանրամասն մաքրում և ախտահանում", "Էլեկտրական սարքերի՝ լույսերի, վարդակների, փոշեկուլում"],
      steam: ["Մաքրում գոլորշու սարքավորման միջոցով", "Մակերեսների ախտահանում բարձր ջերմաստիճանով", "Սալիկների և կարերի մաքրում", "Լոգասենյակի դժվար հասանելի հատվածների մշակում", "Խոհանոցի յուղոտ մակերեսների գոլորշիով մաքրում", "Ծորակների, լվացարանի և սանհանգույցի հատվածների մշակում", "Դռների բռնակների և հաճախ հպվող մակերեսների ախտահանում", "Անկյունների և դժվար հասանելի հատվածների մաքրում"],
      ironing: ["Հագուստի արդուկում", "Սպիտակեղենի արդուկում", "Ժամային հաշվարկ", "Կարող է ավելացվել հիմնական ծառայությանը"],
      dry: ["Հատուկ նյութերով անվտանգ մաքրում քիմմաքրման սարքով", "Բծերի և տհաճ հոտերի անցկացում", "Փոշու և կեղտի խորքային հեռացում"],
    },
    dryItems: {
      armchair: "Բազկաթոռ",
      sofa_2: "Բազմոց 2 տեղանոց",
      sofa_3: "Բազմոց 3 տեղանոց",
      sofa_2_armchairs: "2 տեղանոց բազմոց + 2 բազկաթոռ",
      sofa_3_armchairs: "3 տեղանոց բազմոց + 2 բազկաթոռ",
      sofa_corner: "Անկյունային բազմոց",
      chair_soft: "Փափուկ աթոռ",
      chair_wood: "Փայտե աթոռ",
      mattress_single: "Ներքնակ 1 անձի",
      mattress_double: "Ներքնակ 2 անձի",
      mattress_kid: "Մանկական ներքնակ",
    },
    addonLabels: {
      bathroom: "Սանհանգույց",
      bathroomExtra: "Սանհանգույց (եթե 1-ից ավել է)",
      fridge: "Սառնարանի մաքրում",
      balcony: "Պատշգամբի մաքրում",
      pets: "Կենդանիների առկայություն",
      ironing: "Արդուկում",
      cabinets: "Դարակների մաքրում",
      steam: "Գոլորշիով մաքրում",
      curtains: "Վարագույտների լվացում",
    },
  },
  ru: {
    languageName: "Русский",
    currency: "драм",
    yes: "да",
    none: "Нет",
    pieces: "шт.",
    sqm: "м²",
    hour: "час",
    navSteps: ["Услуга", "Расчёт", "Дополнительно", "Заявка"],
    heroBadge: "Калькулятор цены",
    heroTitle: "Узнайте стоимость услуги в 4 простых шага",
    heroText: "Your Clean Home — когда комфорт сочетается с чистотой.",
    summaryTitle: "Ваш выбор",
    summaryFallbackTitle: "Услуга не выбрана",
    summaryFallbackRange: "Выберите услугу",
    quantityLabel: { ironing: "Часы", dry: "Мебель", default: "Площадь" },
    addOns: "Дополнительно",
    approximatePrice: "Примерная стоимость",
    totalApproximatePrice: "Общая примерная стоимость",
    includedTitle: "Что входит",
    step1Label: "Шаг 1",
    step1Title: "Выберите услугу",
    step1Text: "Нажмите на услугу, чтобы увидеть, что входит.",
    step2Label: "Шаг 2",
    step2Title: "Расчёт",
    step2Text: { dry: "Выберите виды мебели.", ironing: "Укажите количество часов.", default: "Укажите площадь." },
    noServiceTitle: "Сначала выберите услугу",
    noServiceCalcText: "Вернитесь к первому шагу и выберите тип уборки.",
    noServiceAddonText: "Дополнительные услуги зависят от выбранной услуги.",
    noServiceRequestText: "Чтобы отправить заявку, нужно выбрать услугу.",
    chooseService: "Выбрать услугу",
    chooseFurniture: "Выберите виды мебели",
    ironingHours: "Часы глажки",
    apartmentArea: "Площадь квартиры",
    minPriceNotes: {
      regular: "Стоимость 1–40 м² — 14,000 драм, свыше 40 м² — 350 драм / 1 м²",
      deep: "Стоимость 1–40 м² — 26,000 драм, свыше 40 м² — 650 драм / 1 м²",
      post: "Стоимость 1–40 м² — 32,000 драм, свыше 40 м² — 800 драм / 1 м²",
      steam: "До 10 м² — 15,000 драм, свыше 10 м² — 1,000 драм / 1 м²",
    },
    step3Label: "Шаг 3",
    step3Title: "Хотите что-то добавить?",
    step3Text: "Выберите дополнительные услуги, если они нужны.",
    noAddonTitle: "Для этой услуги нет дополнительных опций",
    noAddonText: "Можно перейти к заполнению заявки.",
    step4Label: "Шаг 4",
    step4Title: "Отправить заявку",
    step4Text: "Прикрепите фотографии, чтобы мы смогли точно подтвердить финальную цену.",
    photoTitle: "Для точной цены отправьте фотографии",
    photoText: "Так мы сможем правильно оценить количество сотрудников, время и сложность работы.",
    thankTitle: "Спасибо 💚",
    thankText: "Ваша заявка успешно отправлена. Мы скоро свяжемся с вами.",
    sendError: "Не удалось отправить заявку. Пожалуйста, попробуйте ещё раз.",
    sendConnectionError: "Не удалось отправить заявку. Проверьте интернет-соединение и попробуйте ещё раз.",
    form: {
      name: "Имя",
      namePlaceholder: "Ваше имя",
      phone: "Номер телефона",
      phonePlaceholder: "+374 ...",
      address: "Адрес / Район",
      addressPlaceholder: "Например: Кентрон, Арабкир...",
      preferredDate: "Предпочтительный день",
      photos: "Фотографии",
      photosHelp: "Можно прикрепить несколько фото для более точной оценки.",
      notes: "Дополнительные заметки",
      notesPlaceholder: "Дополнительные заметки",
    },
    hidden: {
      service: "Услуга",
      hours: "Часы",
      furnitureCount: "Количество мебели",
      area: "Площадь",
      addons: "Дополнительные услуги",
      basePrice: "Основная стоимость",
      addonsPrice: "Стоимость дополнений",
      totalPrice: "Общая примерная стоимость",
      fullSummary: "Полное резюме расчёта",
    },
    orderSummary: {
      service: "Услуга",
      hours: "Часы",
      furnitureCount: "Количество мебели",
      area: "Площадь",
      addons: "Дополнительные услуги",
      basePrice: "Основная стоимость",
      addonsPrice: "Стоимость дополнений",
      totalPrice: "Общая примерная стоимость",
    },
    back: "Назад",
    continue: "Продолжить",
    sending: "Отправляется...",
    sendRequest: "Отправить заявку",
    footerText: "Профессиональные клининговые услуги в Ереване",
    services: {
      regular: { label: "Поддерживающая уборка", short: "Поддерживающая", subtitle: "Регулярная уборка", range: "300–500 драм / 1 м²", calcRange: "350 драм / 1 м²" },
      deep: { label: "Генеральная уборка", short: "Генеральная", subtitle: "Глубокая и тщательная уборка", range: "600–800 драм / 1 м²", calcRange: "650 драм / 1 м²" },
      post: { label: "Уборка после ремонта", short: "После ремонта", subtitle: "После ремонтных работ", range: "800–1200 драм / 1 м²", calcRange: "от 800 драм / 1 м²" },
      steam: { label: "Уборка парогенератором", short: "Парогенератор", subtitle: "Дезинфекция", range: "1000–1500 драм / 1 м²", calcRange: "1000 драм / 1 м²" },
      dry: { label: "Химчистка мягкой мебели", short: "Химчистка", subtitle: "Химчистка мягкой мебели", range: "от 3000 драм", calcRange: "от 5000 драм / 1 шт." },
      ironing: { label: "Глажка", short: "Глажка", subtitle: "Дополнительная услуга", range: "4000 драм / 1 час", calcRange: "4000 драм / 1 час" },
    },
    serviceContent: {
      regular: ["Пылесос пола", "Влажная уборка пола", "Удаление пыли с поверхностей мебели", "Пылесос дверей и ручек", "Чистка зеркал", "Чистка плиты", "Уборка санузла"],
      deep: [
        { title: "Санузел", items: ["Мытьё потолка, пола и стен специальными средствами", "Мытьё плитки, включая углы и швы", "Чистка душевой кабины/ванны, раковины и кранов", "Удаление пыли и налёта", "Чистка дверей", "Чистка зеркал и стеклянных поверхностей", "Чистка унитаза внутри и снаружи"] },
        { title: "Кухня", items: ["Пылесос пола", "Влажная уборка пола специальными средствами", "Чистка потолка и стен", "Чистка люстр", "Обезжиривание и мытьё фартука", "Обезжиривание и мытьё рабочей поверхности", "Чистка раковины и крана", "Обезжиривание и чистка плиты, духовки и вытяжки", "Чистка внешних поверхностей мебели", "Удаление пыли и грязи с дверей и ручек", "Чистка зеркал и стеклянных поверхностей", "Мытьё и чистка зоны мусорного ведра", "Мытьё окон"] },
        { title: "Спальня и гостиная", items: ["Пылесос пола", "Влажная уборка пола специальными средствами", "Чистка потолка и стен", "Чистка люстр", "Чистка мебели и всех поверхностей", "Чистка внешних поверхностей кровати, тумбочек и шкафов", "Удаление пыли с аксессуаров, фоторамок, картин и декора", "Мытьё зеркал и стеклянных поверхностей", "Мытьё дверей и ручек", "Мытьё окон"] },
      ],
      post: ["Общий пылесос и детальная уборка помещения", "Удаление строительной пыли, остатков и мусора", "Чистка и полировка стен, дверей, окон и пола", "Тщательное мытьё окон внутри и снаружи", "Удаление следов силикона, краски и цемента с разных поверхностей", "Обработка и чистка керамики, ламината, каменных поверхностей специальными средствами", "Детальная уборка и дезинфекция ванной и кухни", "Пылесос осветительных приборов и розеток"],
      steam: ["Уборка с помощью парогенератора", "Дезинфекция поверхностей высокой температурой", "Чистка плитки и швов", "Обработка труднодоступных мест в ванной", "Чистка жирных кухонных поверхностей паром", "Обработка кранов, раковины и санузла", "Дезинфекция дверных ручек и часто используемых поверхностей", "Чистка углов и труднодоступных мест"],
      ironing: ["Глажка одежды", "Глажка белья", "Почасовой расчёт", "Можно добавить к основной услуге"],
      dry: ["Безопасная чистка специальными средствами и аппаратом для химчистки", "Удаление пятен и неприятных запахов", "Глубокое удаление пыли и грязи"],
    },
    dryItems: {
      armchair: "Кресло",
      sofa_2: "Диван 2-местный",
      sofa_3: "Диван 3-местный",
      sofa_2_armchairs: "2-местный диван + 2 кресла",
      sofa_3_armchairs: "3-местный диван + 2 кресла",
      sofa_corner: "Угловой диван",
      chair_soft: "Мягкий стул",
      chair_wood: "Деревянный стул",
      mattress_single: "Матрас 1-спальный",
      mattress_double: "Матрас 2-спальный",
      mattress_kid: "Детский матрас",
    },
    addonLabels: {
      bathroom: "Санузел",
      bathroomExtra: "Санузел (если больше одного)",
      fridge: "Чистка холодильника",
      balcony: "Уборка балкона",
      pets: "Наличие животных",
      ironing: "Глажка",
      cabinets: "Чистка шкафов/полок",
      steam: "Уборка парогенератором",
      curtains: "Стирка штор",
    },
  },

  en: {
    languageName: "English",
    currency: "AMD",
    yes: "yes",
    none: "None",
    pieces: "pcs",
    sqm: "m²",
    hour: "hour",
    navSteps: ["Service", "Calculate", "Extras", "Request"],
    heroBadge: "Price calculator",
    heroTitle: "Get the service price in 4 simple steps",
    heroText: "Your Clean Home — where comfort meets cleanliness.",
    summaryTitle: "Your selection",
    summaryFallbackTitle: "No service selected",
    summaryFallbackRange: "Choose a service",
    quantityLabel: { ironing: "Hours", dry: "Furniture", default: "Area" },
    addOns: "Extras",
    approximatePrice: "Estimated price",
    totalApproximatePrice: "Total estimated price",
    includedTitle: "What is included",
    step1Label: "Step 1",
    step1Title: "Choose a service",
    step1Text: "Tap a service to see what is included.",
    step2Label: "Step 2",
    step2Title: "Calculation",
    step2Text: { dry: "Choose furniture types.", ironing: "Enter the number of hours.", default: "Enter the apartment area." },
    noServiceTitle: "Choose a service first",
    noServiceCalcText: "Go back to the first step and choose the cleaning type.",
    noServiceAddonText: "Extra services depend on the selected service.",
    noServiceRequestText: "You need to choose a service before sending a request.",
    chooseService: "Choose service",
    chooseFurniture: "Choose furniture types",
    ironingHours: "Ironing hours",
    apartmentArea: "Apartment area",
    minPriceNotes: {
      regular: "1–40 m² — 14,000 AMD, above 40 m² — 350 AMD / 1 m²",
      deep: "1–40 m² — 26,000 AMD, above 40 m² — 650 AMD / 1 m²",
      post: "1–40 m² — 32,000 AMD, above 40 m² — 800 AMD / 1 m²",
      steam: "Up to 10 m² — 15,000 AMD, above 10 m² — 1,000 AMD / 1 m²",
    },
    step3Label: "Step 3",
    step3Title: "Would you like to add anything?",
    step3Text: "Choose extra services if needed.",
    noAddonTitle: "There are no extra options for this service",
    noAddonText: "You can continue to the request form.",
    step4Label: "Step 4",
    step4Title: "Send request",
    step4Text: "Attach photos so we can confirm the final price accurately.",
    photoTitle: "Send photos for an accurate price",
    photoText: "This helps us estimate the number of staff, time, and complexity of the work.",
    thankTitle: "Thank you 💚",
    thankText: "Your request has been sent successfully. We will contact you soon.",
    sendError: "Could not send the request. Please try again.",
    sendConnectionError: "Could not send the request. Check your internet connection and try again.",
    form: {
      name: "Name",
      namePlaceholder: "Your name",
      phone: "Phone number",
      phonePlaceholder: "+374 ...",
      address: "Address / District",
      addressPlaceholder: "For example: Kentron, Arabkir...",
      preferredDate: "Preferred date",
      photos: "Photos",
      photosHelp: "You can attach several photos for a more accurate estimate.",
      notes: "Additional notes",
      notesPlaceholder: "Additional notes",
    },
    hidden: {
      service: "Service",
      hours: "Hours",
      furnitureCount: "Furniture count",
      area: "Area",
      addons: "Extra services",
      basePrice: "Base price",
      addonsPrice: "Extras price",
      totalPrice: "Total estimated price",
      fullSummary: "Full calculation summary",
    },
    orderSummary: {
      service: "Service",
      hours: "Hours",
      furnitureCount: "Furniture count",
      area: "Area",
      addons: "Extra services",
      basePrice: "Base price",
      addonsPrice: "Extras price",
      totalPrice: "Total estimated price",
    },
    back: "Back",
    continue: "Continue",
    sending: "Sending...",
    sendRequest: "Send request",
    footerText: "Professional cleaning services in Yerevan",
    services: {
      regular: { label: "Regular cleaning", short: "Regular", subtitle: "Maintenance cleaning", range: "300–500 AMD / 1 m²", calcRange: "350 AMD / 1 m²" },
      deep: { label: "Deep cleaning", short: "Deep", subtitle: "Detailed deep cleaning", range: "600–800 AMD / 1 m²", calcRange: "650 AMD / 1 m²" },
      post: { label: "Post-renovation cleaning", short: "Post-renovation", subtitle: "After renovation work", range: "800–1200 AMD / 1 m²", calcRange: "from 800 AMD / 1 m²" },
      steam: { label: "Steam cleaning", short: "Steam", subtitle: "Disinfection", range: "1000–1500 AMD / 1 m²", calcRange: "1000 AMD / 1 m²" },
      dry: { label: "Upholstery dry cleaning", short: "Dry cleaning", subtitle: "Soft furniture dry cleaning", range: "from 3000 AMD", calcRange: "from 5000 AMD / 1 pc" },
      ironing: { label: "Ironing", short: "Ironing", subtitle: "Extra service", range: "4000 AMD / 1 hour", calcRange: "4000 AMD / 1 hour" },
    },
    serviceContent: {
      regular: ["Vacuuming the floor", "Wet floor cleaning", "Removing dust from furniture surfaces", "Vacuuming doors and handles", "Cleaning mirrors", "Cleaning the stove", "Bathroom cleaning"],
      deep: [
        { title: "Bathroom", items: ["Washing ceiling, floor, and walls with special products", "Washing tiles, including corners and joints", "Cleaning shower cabin/bathtub, sink, and faucets", "Removing dust and deposits", "Cleaning doors", "Cleaning mirrors and glass surfaces", "Cleaning the toilet inside and outside"] },
        { title: "Kitchen", items: ["Vacuuming the floor", "Wet floor cleaning with special products", "Cleaning ceiling and walls", "Cleaning chandeliers", "Degreasing and washing the backsplash", "Degreasing and washing the countertop", "Cleaning sink and faucet", "Degreasing and cleaning stove, oven, and hood", "Cleaning exterior furniture surfaces", "Removing dust and dirt from doors and handles", "Cleaning mirrors and glass surfaces", "Washing and cleaning the trash bin area", "Washing windows"] },
        { title: "Bedroom and living room", items: ["Vacuuming the floor", "Wet floor cleaning with special products", "Cleaning ceiling and walls", "Cleaning chandeliers", "Cleaning furniture and all surfaces", "Cleaning exterior surfaces of bed, nightstands, and wardrobes", "Dusting accessories, photo frames, paintings, and decor", "Washing mirrors and glass surfaces", "Washing doors and handles", "Washing windows"] },
      ],
      post: ["General vacuuming and detailed cleaning of the space", "Removal of construction dust, residue, and waste", "Cleaning and polishing walls, doors, windows, and floors", "Detailed window washing inside and outside", "Removal of silicone, paint, and cement marks from different surfaces", "Treatment and cleaning of ceramic, laminate, and stone surfaces with special products", "Detailed bathroom and kitchen cleaning and disinfection", "Vacuuming light fixtures and sockets"],
      steam: ["Cleaning with a steam generator", "High-temperature surface disinfection", "Cleaning tiles and grout", "Treatment of hard-to-reach bathroom areas", "Steam cleaning greasy kitchen surfaces", "Treatment of faucets, sink, and bathroom areas", "Disinfection of door handles and frequently touched surfaces", "Cleaning corners and hard-to-reach areas"],
      ironing: ["Ironing clothes", "Ironing linens", "Hourly calculation", "Can be added to the main service"],
      dry: ["Safe cleaning with special products and dry-cleaning equipment", "Removal of stains and unpleasant odors", "Deep removal of dust and dirt"],
    },
    dryItems: {
      armchair: "Armchair",
      sofa_2: "2-seat sofa",
      sofa_3: "3-seat sofa",
      sofa_2_armchairs: "2-seat sofa + 2 armchairs",
      sofa_3_armchairs: "3-seat sofa + 2 armchairs",
      sofa_corner: "Corner sofa",
      chair_soft: "Soft chair",
      chair_wood: "Wooden chair",
      mattress_single: "Single mattress",
      mattress_double: "Double mattress",
      mattress_kid: "Kids mattress",
    },
    addonLabels: {
      bathroom: "Bathroom",
      bathroomExtra: "Bathroom (if more than one)",
      fridge: "Fridge cleaning",
      balcony: "Balcony cleaning",
      pets: "Pets at home",
      ironing: "Ironing",
      cabinets: "Cabinet/shelf cleaning",
      steam: "Steam cleaning",
      curtains: "Curtain washing",
    },
  },
};

const serviceIcons = { regular: Home, deep: Sparkles, post: Hammer, steam: Wind, ironing: Shirt, dry: Sofa };

const dryCleaningBase = [
  { id: "armchair", price: 2500, image: "/assets/furniture/armchair.png" },
  { id: "sofa_2", price: 8000, image: "/assets/furniture/sofa-2.png" },
  { id: "sofa_3", price: 10000, image: "/assets/furniture/sofa-3.png" },
  { id: "sofa_2_armchairs", price: 10000, image: "/assets/furniture/sofa-2-armchairs.png" },
  { id: "sofa_3_armchairs", price: 12000, image: "/assets/furniture/sofa-3-armchairs.png" },
  { id: "sofa_corner", price: 15000, image: "/assets/furniture/sofa-l.png" },
  { id: "chair_soft", price: 2000, image: "/assets/furniture/chair-soft.png" },
  { id: "chair_wood", price: 1000, image: "/assets/furniture/chair-wood.png" },
  { id: "mattress_single", price: 8000, image: "/assets/furniture/mattress-single.png" },
  { id: "mattress_double", price: 12000, image: "/assets/furniture/mattress-double.png" },
  { id: "mattress_kid", price: 6000, image: "/assets/furniture/mattress-kid.png" },
];

const addonBase = {
  regular: [
    { id: "bathroom", price: 3000, type: "counter", unitKey: "pieces" },
    { id: "fridge", price: 3000, type: "counter", unitKey: "pieces" },
    { id: "balcony", price: 3000, type: "counter", unitKey: "pieces" },
    { id: "pets", price: 3000, type: "checkbox" },
    { id: "ironing", price: 4000, type: "hours", unitKey: "hour" },
  ],
  deep: [
    { id: "bathroomExtra", price: 5000, type: "counter", unitKey: "pieces" },
    { id: "fridge", price: 3000, type: "counter", unitKey: "pieces" },
    { id: "balcony", price: 5000, type: "counter", unitKey: "pieces" },
    { id: "cabinets", price: 10000, type: "checkbox" },
    { id: "steam", price: 8000, type: "checkbox" },
    { id: "pets", price: 8000, type: "checkbox" },
    { id: "curtains", price: 2000, type: "counter", unitKey: "pieces" },
    { id: "ironing", price: 4000, type: "hours", unitKey: "hour" },
  ],
  post: [
    { id: "cabinets", price: 10000, type: "checkbox" },
    { id: "balcony", price: 5000, type: "counter", unitKey: "pieces" },
  ],
  ironing: [],
  dry: [],
  steam: [],
};

const rateBase = {
  regular: { rate: 350, unitKey: "sqm" },
  deep: { rate: 650, unitKey: "sqm" },
  post: { rate: 800, unitKey: "sqm" },
  steam: { rate: 1000, unitKey: "sqm" },
  dry: { rate: 5000, unitKey: "pieces" },
  ironing: { rate: 4000, unitKey: "hour" },
};

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IncludedList({ service }) {
  const sections = service.sections || [{ title: null, items: service.items || [] }];

  return (
    <div className="included-sections">
      {sections.map((section) => (
        <div className="included-section" key={section.title || "default"}>
          {section.title && <h4>{section.title}</h4>}
          <ul>
            {section.items.map((item) => (
              <li key={item}>
                <CheckCircle2 size={17} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("ychLanguage") || "hy");
  const t = i18n[lang] || i18n.hy;

  const formatAMD = (value) => `${new Intl.NumberFormat(lang === "ru" ? "ru-RU" : lang === "en" ? "en-US" : "hy-AM").format(Math.round(value || 0))} ${t.currency}`;


  const trackMetaEvent = (eventName, params = {}) => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", eventName, params);
    }
  };

  const trackCustomMetaEvent = (eventName, params = {}) => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("trackCustom", eventName, params);
    }
  };

  const steps = useMemo(() => t.navSteps.map((label, index) => ({ number: index + 1, label })), [t]);

  const serviceRates = useMemo(() => {
    return Object.fromEntries(
      Object.keys(t.services).map((id) => [id, { label: t.services[id].label, short: t.services[id].short, range: t.services[id].range }])
    );
  }, [t]);

  const calculatorRates = useMemo(() => {
    return Object.fromEntries(
      Object.entries(rateBase).map(([id, value]) => [
        id,
        { label: t.services[id].label, short: t.services[id].short, rate: value.rate, unit: t[value.unitKey], range: t.services[id].calcRange },
      ])
    );
  }, [t]);

  const services = useMemo(() => {
    const ids = ["regular", "deep", "post", "steam", "ironing", "dry"];
    return ids.map((id) => {
      const content = t.serviceContent[id];
      const hasSections = Array.isArray(content) && typeof content[0] === "object";
      return {
        id,
        icon: serviceIcons[id],
        title: t.services[id].label,
        subtitle: t.services[id].subtitle,
        ...(hasSections ? { sections: content } : { items: content }),
      };
    });
  }, [t]);

  const dryCleaningItems = useMemo(() => dryCleaningBase.map((item) => ({ ...item, title: t.dryItems[item.id] })), [t]);

  const calculatorAddOns = useMemo(() => {
    return Object.fromEntries(
      Object.entries(addonBase).map(([serviceId, items]) => [
        serviceId,
        items.map((item) => ({ ...item, label: t.addonLabels[item.id], unit: item.unitKey ? t[item.unitKey] : undefined })),
      ])
    );
  }, [t]);

  const [step, setStep] = useState(1);
  const [service, setService] = useState(null);
  const [sqm, setSqm] = useState(0);
  const [hours, setHours] = useState(0);
  const [drySelections, setDrySelections] = useState({});
  const [addonValues, setAddonValues] = useState({});
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientMessage, setClientMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleLanguageChange = (nextLang) => {
    trackCustomMetaEvent("LanguageChange", { language: nextLang });
    setLang(nextLang);
    localStorage.setItem("ychLanguage", nextLang);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setIsSending(true);

    try {
      const response = await fetch("https://formspree.io/f/xqenojng", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        trackMetaEvent("Lead", {
          content_name: "Request form submitted",
          service_id: service || "not_selected",
          service_name: calculation.selectedService.label,
          area_m2: service === "ironing" || service === "dry" ? undefined : Number(sqm || 0),
          hours: service === "ironing" ? Number(hours || 0) : undefined,
          furniture_count: service === "dry" ? Number(dryTotalCount || 0) : undefined,
          addons_count: calculation.addOnRows.length,
          estimated_price: Number(calculation.total || 0),
          currency: "AMD",
          preferred_language: lang,
        });
        setIsSubmitted(true);
        form.reset();
      } else {
        alert(t.sendError);
      }
    } catch (error) {
      alert(t.sendConnectionError);
    } finally {
      setIsSending(false);
    }
  };

  const resetCalculation = () => {
    setSqm(0);
    setHours(0);
    setDrySelections({});
    setAddonValues({});
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTopMobile = () => {
    if (window.innerWidth <= 720) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleServiceSelect = (id) => {
    const selected = calculatorRates[id] || serviceRates[id];

    if (service === id) {
      trackCustomMetaEvent("ServiceDeselected", {
        service_id: id,
        service_name: selected?.label || id,
        preferred_language: lang,
      });
      setService(null);
      setAddonValues({});
      setDrySelections({});
      return;
    }

    trackMetaEvent("Search", {
      search_string: selected?.label || id,
      content_name: "Service selected",
      service_id: id,
      service_name: selected?.label || id,
      preferred_language: lang,
    });

    setService(id);
    setAddonValues({});
    if (id !== "dry") setDrySelections({});
  };

  const updateDryCount = (id, value) => {
    const cleanValue = Math.max(0, Number(value) || 0);
    const item = dryCleaningItems.find((dryItem) => dryItem.id === id);

    trackMetaEvent("CustomizeProduct", {
      content_name: "Dry cleaning item changed",
      service_id: "dry",
      service_name: calculatorRates.dry?.label || "Dry cleaning",
      item_id: id,
      item_name: item?.title || id,
      quantity: cleanValue,
      item_price: Number(item?.price || 0),
      currency: "AMD",
      preferred_language: lang,
    });

    setDrySelections((current) => {
      const next = { ...current };
      if (cleanValue === 0) delete next[id];
      else next[id] = cleanValue;
      return next;
    });
  };

  const updateAddon = (id, value) => {
    const addon = calculatorAddOns[service]?.find((item) => item.id === id);
    const cleanValue = Number(value) || 0;

    trackMetaEvent("CustomizeProduct", {
      content_name: "Addon changed",
      service_id: service || "not_selected",
      service_name: calculation.selectedService.label,
      addon_id: id,
      addon_name: addon?.label || id,
      quantity: cleanValue,
      addon_price: Number(addon?.price || 0),
      estimated_price: Number(calculation.total || 0),
      currency: "AMD",
      preferred_language: lang,
    });

    setAddonValues((current) => ({ ...current, [id]: value }));
  };

  const toggleAddon = (id) => {
    const addon = calculatorAddOns[service]?.find((item) => item.id === id);
    const nextValue = !addonValues[id];

    trackMetaEvent("CustomizeProduct", {
      content_name: "Addon toggled",
      service_id: service || "not_selected",
      service_name: calculation.selectedService.label,
      addon_id: id,
      addon_name: addon?.label || id,
      selected: nextValue,
      addon_price: Number(addon?.price || 0),
      estimated_price: Number(calculation.total || 0),
      currency: "AMD",
      preferred_language: lang,
    });

    setAddonValues((current) => ({ ...current, [id]: !current[id] }));
  };
  const dryTotalCount = Object.values(drySelections).reduce((sum, value) => sum + Number(value || 0), 0);

  const calculation = useMemo(() => {
    const selectedServiceRate = service ? calculatorRates[service] : null;

    if (!selectedServiceRate) {
      return { selectedService: { label: t.summaryFallbackTitle, range: t.summaryFallbackRange }, base: 0, addOnsTotal: 0, addOnRows: [], total: 0 };
    }

    if (service === "dry") {
      const dryRows = dryCleaningItems
        .map((item) => {
          const quantity = Number(drySelections[item.id]) || 0;
          return { id: item.id, label: item.title, quantity, price: item.price, total: quantity * item.price };
        })
        .filter((item) => item.quantity > 0);
      const base = dryRows.reduce((sum, item) => sum + item.total, 0);
      return { selectedService: selectedServiceRate, base, addOnsTotal: 0, addOnRows: dryRows, total: base };
    }

    const isIroning = service === "ironing";
    const quantity = isIroning ? Number(hours || 0) : Number(sqm || 0);
    const base = isIroning
      ? quantity * selectedServiceRate.rate
      : service === "regular" && quantity >= 1 && quantity <= 40
      ? 14000
      : service === "deep" && quantity >= 1 && quantity <= 40
      ? 26000
      : service === "post" && quantity >= 1 && quantity <= 40
      ? 32000
      : service === "steam" && quantity >= 1 && quantity < 10
      ? 15000
      : service === "steam"
      ? quantity * 1000
      : quantity * selectedServiceRate.rate;

    const activeAddOns = calculatorAddOns[service] || [];
    const addOnRows = activeAddOns
      .map((item) => {
        const value = addonValues[item.id];
        const quantity = item.type === "checkbox" ? (value ? 1 : 0) : Number(value) || 0;
        return { ...item, quantity, total: quantity * item.price };
      })
      .filter((item) => item.total > 0);

    const addOnsTotal = addOnRows.reduce((sum, item) => sum + item.total, 0);
    return { selectedService: selectedServiceRate, base, addOnsTotal, addOnRows, total: base + addOnsTotal };
  }, [service, calculatorRates, t, dryCleaningItems, drySelections, hours, sqm, calculatorAddOns, addonValues]);

  const selectedAddOnsSummary = !service
    ? ""
    : service === "dry"
    ? dryCleaningItems
        .map((item) => {
          const count = Number(drySelections[item.id]) || 0;
          return count > 0 ? `${item.title}: ${count} ${t.pieces} (+${formatAMD(count * item.price)})` : null;
        })
        .filter(Boolean)
        .join("\n")
    : (calculatorAddOns[service] || [])
        .map((item) => {
          const value = addonValues[item.id];
          if (item.type === "checkbox" && value) return `${item.label}: ${t.yes} (+${formatAMD(item.price)})`;
          if ((item.type === "counter" || item.type === "hours") && Number(value) > 0) {
            const unit = item.type === "hours" ? t.hour : item.unit || t.pieces;
            return `${item.label}: ${value} ${unit} (+${formatAMD(Number(value) * item.price)})`;
          }
          return null;
        })
        .filter(Boolean)
        .join("\n");

  const orderSummary = `
${t.orderSummary.service}: ${calculation.selectedService.label}
${service === "ironing" ? `${t.orderSummary.hours}: ${hours}` : service === "dry" ? `${t.orderSummary.furnitureCount}: ${dryTotalCount} ${t.pieces}` : `${t.orderSummary.area}: ${sqm} ${t.sqm}`}
${t.orderSummary.addons}:
${selectedAddOnsSummary || t.none}
${t.orderSummary.basePrice}: ${formatAMD(calculation.base)}
${t.orderSummary.addonsPrice}: ${formatAMD(calculation.addOnsTotal)}
${t.orderSummary.totalPrice}: ${formatAMD(calculation.total)}
`;

  const handleSqmChange = (value) => {
    const cleanValue = Math.max(0, Number(value) || 0);
    setSqm(cleanValue);
  };

  const handleHoursChange = (value) => {
    const cleanValue = Math.max(0, Number(value) || 0);
    setHours(cleanValue);
  };

  const goToStep = (nextStep, source = "step_navigation") => {
    trackMetaEvent("ViewContent", {
      content_name: `Step ${nextStep}`,
      source,
      step: nextStep,
      service_id: service || "not_selected",
      service_name: calculation.selectedService.label,
      estimated_price: Number(calculation.total || 0),
      currency: "AMD",
      preferred_language: lang,
    });

    setStep(nextStep);
    setTimeout(scrollToTopMobile, 50);
  };

  const goNext = () => {
    if (step === 2 && service) {
      trackMetaEvent("CustomizeProduct", {
        content_name: "Price calculated",
        service_id: service,
        service_name: calculation.selectedService.label,
        area_m2: service === "ironing" || service === "dry" ? undefined : Number(sqm || 0),
        hours: service === "ironing" ? Number(hours || 0) : undefined,
        furniture_count: service === "dry" ? Number(dryTotalCount || 0) : undefined,
        addons_count: calculation.addOnRows.length,
        estimated_price: Number(calculation.total || 0),
        currency: "AMD",
        preferred_language: lang,
      });
    }

    setStep((current) => Math.min(4, current + 1));
    setTimeout(scrollToTopMobile, 50);
  };

  const goBack = () => {
    setStep((current) => {
      const nextStep = Math.max(1, current - 1);
      if (current === 2 && nextStep === 1) resetCalculation();
      return nextStep;
    });
    setTimeout(scrollToTopMobile, 50);
  };

  return (
    <div className="miniapp">
      <header className="mini-header">
        <a href="#top" className="mini-brand">
          <img src={logo} alt="Your Clean Home" />
        </a>

        <div className="header-actions">
          <nav>
            {steps.map((item) => (
              <button
                key={item.number}
                type="button"
                className={step === item.number ? "active" : ""}
                onClick={() => {
                  if (item.number === 1) resetCalculation();
                  goToStep(item.number, "top_navigation");
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="language-switcher" aria-label="Language selector">
            <button type="button" className={lang === "hy" ? "active" : ""} onClick={() => handleLanguageChange("hy")}>HY</button>
            <button type="button" className={lang === "ru" ? "active" : ""} onClick={() => handleLanguageChange("ru")}>RU</button>
            <button type="button" className={lang === "en" ? "active" : ""} onClick={() => handleLanguageChange("en")}>EN</button>
          </div>
        </div>
      </header>

      <main id="top" className="mini-main">
        <section className="mini-hero">
          <div className="mini-hero-top">
            <div className="mini-logo-card"><img src={logo} alt="Your Clean Home" /></div>
            <div>
              <span className="mini-badge"><Star size={15} /> {t.heroBadge}</span>
              <h1>{t.heroTitle}</h1>
              <p>{t.heroText}</p>
            </div>
          </div>

          <div className="steps-bar">
            {steps.map((item) => (
              <button
                key={item.number}
                type="button"
                className={step === item.number ? "step-pill active" : step > item.number ? "step-pill done" : "step-pill"}
                onClick={() => {
                  if (item.number === 1) { resetCalculation(); setService(null); }
                  goToStep(item.number, "steps_bar");
                }}
              >
                <span>{item.number}</span>
                <b>{item.label}</b>
              </button>
            ))}
          </div>
        </section>

        <section className="wizard-shell">
          <aside className="summary-side">
            <div className="summary-card">
              <span>{t.summaryTitle}</span>
              <h3>{calculation.selectedService.label}</h3>
              <p>{calculation.selectedService.range}</p>
              <div className="summary-lines">
                <div>
                  <span>{service === "ironing" ? t.quantityLabel.ironing : service === "dry" ? t.quantityLabel.dry : t.quantityLabel.default}</span>
                  <b>{service === "ironing" ? `${hours} ${t.hour}` : service === "dry" ? `${dryTotalCount} ${t.pieces}` : `${sqm} ${t.sqm}`}</b>
                </div>
                <div><span>{t.addOns}</span><b>{formatAMD(calculation.addOnsTotal)}</b></div>
                <div className="summary-total"><span>{t.approximatePrice}</span><b>{formatAMD(calculation.total)}</b></div>
              </div>
            </div>
          </aside>

          <div className="wizard-card">
            {step === 1 && (
              <div className="step-content">
                <div className="step-title"><span>{t.step1Label}</span><h2>{t.step1Title}</h2><p>{t.step1Text}</p></div>
                <div className="service-picker">
                  {services.map((item) => {
                    const Icon = item.icon;
                    const isActive = service === item.id;
                    return (
                      <div key={item.id} className={isActive ? "service-choice-wrap active" : "service-choice-wrap"}>
                        <button type="button" className={isActive ? "service-choice active" : "service-choice"} onClick={() => handleServiceSelect(item.id)}>
                          <Icon size={22} />
                          <div><strong>{item.title}</strong><span>{item.subtitle}</span><small>{serviceRates[item.id]?.range || calculatorRates[item.id]?.range}</small></div>
                          {isActive ? <CheckCircle2 size={20} /> : <ChevronRight size={20} />}
                        </button>
                        <div className={isActive ? "mobile-included-list open" : "mobile-included-list"}>
                          <div className="included-list-inner"><h3>{t.includedTitle}</h3><IncludedList service={item} /></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="step-content">
                <div className="step-title"><span>{t.step2Label}</span><h2>{t.step2Title}</h2><p>{service === "dry" ? t.step2Text.dry : service === "ironing" ? t.step2Text.ironing : t.step2Text.default}</p></div>
                {!service ? (
                  <div className="empty-addons"><Calculator size={28} /><h3>{t.noServiceTitle}</h3><p>{t.noServiceCalcText}</p><button type="button" className="next-button inline-action" onClick={() => goToStep(1, "choose_service_button")}>{t.chooseService}</button></div>
                ) : service === "dry" ? (
                  <div className="dry-area">
                    <div className="label-line"><strong>{t.chooseFurniture}</strong><b>{dryTotalCount} {t.pieces}</b></div>
                    <div className="dry-grid">
                      {dryCleaningItems.map((item) => {
                        const count = drySelections[item.id] || 0;
                        return (
                          <button type="button" key={item.id} className={count > 0 ? "dry-tile active" : "dry-tile"} onClick={() => updateDryCount(item.id, count > 0 ? 0 : 1)}>
                            <img src={item.image} alt={item.title} />
                            <strong>{item.title}</strong>
                            <span>{formatAMD(item.price)}</span>
                            <div className="tile-counter" onClick={(e) => e.stopPropagation()}>
                              <button type="button" onClick={() => updateDryCount(item.id, count - 1)}><Minus size={14} /></button>
                              <b>{count}</b>
                              <button type="button" onClick={() => updateDryCount(item.id, count + 1)}><Plus size={14} /></button>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : service === "ironing" ? (
                  <div className="input-card"><div className="label-line"><strong>{t.ironingHours}</strong><b>{hours} {t.hour}</b></div><input className="number-input" type="number" min="1" value={hours} onChange={(e) => handleHoursChange(e.target.value)} /></div>
                ) : (
                  <div className="input-card"><div className="label-line"><strong>{t.apartmentArea}</strong><b>{sqm} {t.sqm}</b></div><input type="range" min="1" max="250" value={sqm} onChange={(e) => handleSqmChange(e.target.value)} /><input className="number-input" type="number" min="1" value={sqm} onChange={(e) => handleSqmChange(e.target.value)} /></div>
                )}
                <div className="total-panel"><span>{t.approximatePrice}</span><strong>{formatAMD(calculation.total)}</strong><small>{t.minPriceNotes[service] || `${calculation.selectedService.label} — ${calculation.selectedService.range}`}</small></div>
              </div>
            )}

            {step === 3 && (
              <div className="step-content">
                <div className="step-title"><span>{t.step3Label}</span><h2>{t.step3Title}</h2><p>{t.step3Text}</p></div>
                {!service ? (
                  <div className="empty-addons"><CheckCircle2 size={28} /><h3>{t.noServiceTitle}</h3><p>{t.noServiceAddonText}</p><button type="button" className="next-button inline-action" onClick={() => goToStep(1, "choose_service_button")}>{t.chooseService}</button></div>
                ) : calculatorAddOns[service]?.length > 0 ? (
                  <div className="addon-grid">
                    {calculatorAddOns[service].map((item) => {
                      if (item.type === "checkbox") {
                        return <button type="button" key={item.id} className={addonValues[item.id] ? "addon-tile active" : "addon-tile"} onClick={() => toggleAddon(item.id)}><div><strong>{item.label}</strong><span>+ {formatAMD(item.price)}</span></div><CheckCircle2 size={20} /></button>;
                      }
                      const value = addonValues[item.id] || 0;
                      const unit = item.type === "hours" ? t.hour : item.unit || t.pieces;
                      return <div className={value > 0 ? "addon-tile counter active" : "addon-tile counter"} key={item.id}><div><strong>{item.label}</strong><span>+ {formatAMD(item.price)} / {unit}</span></div><div className="tile-counter"><button type="button" onClick={() => updateAddon(item.id, Math.max(0, value - 1))}><Minus size={14} /></button><b>{value}</b><button type="button" onClick={() => updateAddon(item.id, value + 1)}><Plus size={14} /></button></div></div>;
                    })}
                  </div>
                ) : (
                  <div className="empty-addons"><CheckCircle2 size={28} /><h3>{t.noAddonTitle}</h3><p>{t.noAddonText}</p></div>
                )}
                <div className="total-panel"><span>{t.totalApproximatePrice}</span><strong>{formatAMD(calculation.total)}</strong></div>
              </div>
            )}

            {step === 4 && (
              <div className="step-content">
                <div className="step-title"><span>{t.step4Label}</span><h2>{t.step4Title}</h2><p>{t.step4Text}</p></div>
                <div className="photo-note"><Camera size={24} /><div><strong>{t.photoTitle}</strong><span>{t.photoText}</span></div></div>
                {!service && <div className="empty-addons"><CheckCircle2 size={28} /><h3>{t.noServiceTitle}</h3><p>{t.noServiceRequestText}</p><button type="button" className="next-button inline-action" onClick={() => goToStep(1, "choose_service_button")}>{t.chooseService}</button></div>}
                {isSubmitted && <div className="thank-you-card"><CheckCircle2 size={34} /><h3>{t.thankTitle}</h3><p>{t.thankText}</p></div>}
                {service && !isSubmitted && (
                  <form id="request-form" className="request-form" onSubmit={handleSubmit} encType="multipart/form-data">
                    <input type="hidden" name={t.hidden.service} value={calculation.selectedService.label} />
                    <input type="hidden" name={service === "ironing" ? t.hidden.hours : service === "dry" ? t.hidden.furnitureCount : t.hidden.area} value={service === "ironing" ? `${hours} ${t.hour}` : service === "dry" ? `${dryTotalCount} ${t.pieces}` : `${sqm} ${t.sqm}`} />
                    <input type="hidden" name={t.hidden.addons} value={selectedAddOnsSummary || t.none} />
                    <input type="hidden" name={t.hidden.basePrice} value={formatAMD(calculation.base)} />
                    <input type="hidden" name={t.hidden.addonsPrice} value={formatAMD(calculation.addOnsTotal)} />
                    <input type="hidden" name={t.hidden.totalPrice} value={formatAMD(calculation.total)} />
                    <textarea name={t.hidden.fullSummary} value={orderSummary} readOnly hidden />
                    <div className="form-row">
                      <div className="form-field"><label>{t.form.name}</label><input type="text" name={t.form.name} placeholder={t.form.namePlaceholder} value={clientName} onChange={(e) => setClientName(e.target.value)} required /></div>
                      <div className="form-field"><label>{t.form.phone}</label><input type="tel" name={t.form.phone} placeholder={t.form.phonePlaceholder} value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} required /></div>
                    </div>
                    <div className="form-field"><label>{t.form.address}</label><input type="text" name={t.form.address} placeholder={t.form.addressPlaceholder} value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} /></div>
                    <div className="form-field"><label>{t.form.preferredDate}</label><input type="date" name={t.form.preferredDate} min={getTodayDate()} required /></div>
                    <div className="form-field"><label>{t.form.photos}</label><input type="file" name={t.form.photos} accept="image/*" multiple /><small>{t.form.photosHelp}</small></div>
                    <div className="form-field"><label>{t.form.notes}</label><textarea name={t.form.notes} placeholder={t.form.notesPlaceholder} value={clientMessage} onChange={(e) => setClientMessage(e.target.value)} rows="5" /></div>
                  </form>
                )}
              </div>
            )}

            <div className="wizard-actions">
              <button type="button" className="ghost-button" onClick={goBack} disabled={step === 1}><ChevronLeft size={18} />{t.back}</button>
              {step < 4 ? (
                <button type="button" className="next-button" onClick={goNext} disabled={step === 1 && !service}>{t.continue}<ChevronRight size={18} /></button>
              ) : (
                <button type="button" className="next-button request-send-bottom" disabled={!service || isSending || isSubmitted} onClick={() => { trackMetaEvent("InitiateCheckout", { content_name: "Send request button clicked", service_id: service || "not_selected", service_name: calculation.selectedService.label, estimated_price: Number(calculation.total || 0), currency: "AMD", preferred_language: lang }); const form = document.getElementById("request-form"); if (form) form.requestSubmit(); }}>
                  <MessageCircle size={22} />{isSending ? t.sending : t.sendRequest}
                </button>
              )}
            </div>
          </div>
        </section>

        <footer className="mini-footer">
          <div className="footer-brand"><img src={logo} alt="Your Clean Home" /><p>{t.footerText}</p></div>
          <div className="footer-links">
            <a href="tel:+37441101143" onClick={() => trackMetaEvent("Contact", { content_name: "Phone click", contact_method: "phone", service_id: service || "not_selected", estimated_price: Number(calculation.total || 0), preferred_language: lang })}><Phone size={18} />041 101 143</a>
            <a href="https://wa.me/37441101143" target="_blank" rel="noreferrer" onClick={() => trackMetaEvent("Contact", { content_name: "WhatsApp click", contact_method: "whatsapp", service_id: service || "not_selected", estimated_price: Number(calculation.total || 0), preferred_language: lang })}><MessageCircle size={18} />WhatsApp</a>
            <a href="https://t.me/your_clean_home" target="_blank" rel="noreferrer" onClick={() => trackMetaEvent("Contact", { content_name: "Telegram click", contact_method: "telegram", service_id: service || "not_selected", estimated_price: Number(calculation.total || 0), preferred_language: lang })}><Send size={18} />Telegram</a>
            <a href="https://instagram.com/your_clean_home.yerevan" target="_blank" rel="noreferrer" onClick={() => trackMetaEvent("Contact", { content_name: "Instagram click", contact_method: "instagram", service_id: service || "not_selected", estimated_price: Number(calculation.total || 0), preferred_language: lang })}><InstagramIcon size={18} />Instagram</a>
          </div>
        </footer>
      </main>

      {showScrollTop && <button className="scroll-top-btn" onClick={() => { trackCustomMetaEvent("ScrollTopClick", { preferred_language: lang }); window.scrollTo({ top: 0, behavior: "smooth" }); }} aria-label="Go to top">↑</button>}
    </div>
  );
}
