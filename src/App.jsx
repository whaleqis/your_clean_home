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

const serviceRates = {
  regular: { label: "Ընթացիկ մաքրում", short: "Ընթացիկ", range: "300–500 դրամ / 1 քմ" },
  deep: { label: "Համալիր մաքրում", short: "Համալիր", range: "600–800 դրամ / 1 քմ" },
  post: { label: "Հետշինարարական մաքրում", short: "Հետշինարարական", range: "800–1200 դրամ / 1 քմ" },
  steam: { label: "Գոլորշիով մաքրում", short: "Գոլորշիով", range: "1000–1500 դրամ / 1 քմ" },
  dry: { label: "Փափուկ կահույքի քիմմաքրում", short: "Քիմմաքրում", unit: "հատ", range: "սկսած 3000 դրամ" },
};

const calculatorRates = {
  regular: {
    label: "Ընթացիկ մաքրում",
    rate: 350,
    unit: "քմ",
    range: "350 դրամ / 1 քմ",
  },
  deep: {
    label: "Համալիր մաքրում",
    rate: 650,
    unit: "քմ",
    range: "650 դրամ / 1 քմ",
  },
  post: {
    label: "Հետշինարարական մաքրում",
    rate: 800,
    unit: "քմ",
    range: "սկսած 800 դրամ / 1 քմ",
  },
  steam: {
    label: "Գոլորշիով մաքրում",
    rate: 1000,
    unit: "քմ",
    range: "1000 դրամ / 1 քմ",
  },
  dry: {
    label: "Փափուկ կահույքի քիմմաքրում",
    short: "Քիմմաքրում",
    rate: 5000,
    unit: "հատ",
    range: "սկսած 5000 դրամ / 1 հատ",
  },
  ironing: {
    label: "Արդուկում",
    rate: 4000,
    unit: "ժամ",
    range: "4000 դրամ / 1 ժամ",
  },
};

const services = [
  {
    id: "regular",
    icon: Home,
    title: "Ընթացիկ մաքրում",
    subtitle: "Պարբերական մաքրություն",
    items: [
      "Հատակի փոշեկուլով մաքրում",
      "Հատակի թաց մաքրում",
      "Փոշիների հեռացում կահույքի մակերեսից",
      "Դռների և բռնակների փոշեկուլում",
      "Հայելիների մաքրում",
      "Սալօջախի մաքրում",
      "Սանհանգույցի մաքրում",
    ],
  },
  {
    id: "deep",
    icon: Sparkles,
    title: "Համալիր մաքրում",
    subtitle: "Խորը և մանրակրկիտ մաքրում",
    items: [
      "Առաստաղի, հատակի և պատերի լվացում՝ հատուկ նյութերով",
      "Սալիկների լվացում",
      "Լոգախցիկի և վաննայի, լվացարանի և ծորակների մաքրում",
      "Փոշու և նստվածքի մաքրում",
      "Դռների մաքրում",
      "Հայելիների և ապակե մակերեսների մաքրում",
      "Զուգարանակոնքի մաքրում՝ ներսից և դրսից",
      "Հատակի փոշեկուլով մաքրում",
      "Հատակի թաց մաքրում հատուկ նյութերով",
      "Ջահերի մաքրում",
      "«Գորգոց»-ի յուղազերծում և լվացում",
      "Աշխատասեղանի յուղազերծում և լվացում",
      "Լվացարանի, ծորակի մաքրում",
      "Գազօջախի, վառարանի, օդաքարշ համակարգի յուղազերծում և մաքրում",
      "Կահույքի արտաքին մակերեսների մաքրում",
      "Աղբամանի հատվածի լվացում և մաքրում",
      "Լուսամուտների լվացում",
    ],
  },
  {
    id: "post",
    icon: Hammer,
    title: "Հետշինարարական մաքրում",
    subtitle: "Վերանորոգումից հետո",
    items: [
      "Տարածքի ընդհանուր փոշեկուլում և մանրամասն մաքրում",
      "Շինարարական փոշու, մնացորդների և աղբի հեռացում",
      "Մակերեսների՝ պատերի, դռների, պատուհանների, հատակի մաքրում և փայլեցում",
      "Պատուհանների ապակիների ներսից և դրսից մանրակրկիտ լվացում",
      "Շինանյութերի՝ սիլիկոն, ներկ, ցեմենտային հետքեր, հեռացում տարբեր մակերեսներից",
      "Տարբեր ծածկույթների՝ կերամիկա, լամինատ, քարե մակերեսներ, հատուկ միջոցներով մշակում և մաքրում",
      "Լոգասենյակի և խոհանոցի մանրամասն մաքրում և ախտահանում",
      "Էլեկտրական սարքերի՝ լույսերի, վարդակների, փոշեկուլում",
    ],
  },
  {
    id: "steam",
    icon: Wind,
    title: "Գոլորշիով մաքրում",
    subtitle: "Ախտահանում",
    items: [
      "Հատակի փոշեկուլով մաքրում",
      "Հատակի թաց մաքրում",
      "Փոշիների հեռացում կահույքի մակերեսից",
      "Դռների և բռնակների փոշեկուլում",
      "Հայելիների մաքրում",
      "Սալօջախի մաքրում",
      "Անկյունները փչել նուրբ՝ եթե տրամադրվում է",
      "Սանհանգույցի մաքրում",
    ],
  },
  {
    id: "ironing",
    icon: Shirt,
    title: "Արդուկում",
    subtitle: "Հավելյալ ծառայություն",
    items: [
      "Հագուստի արդուկում",
      "Սպիտակեղենի արդուկում",
      "Ժամային հաշվարկ",
      "Կարող է ավելացվել հիմնական ծառայությանը",
    ],
  },
  {
    id: "dry",
    icon: Sofa,
    title: "Փափուկ կահույքի քիմմաքրում",
    subtitle: "Փափուկ կահույքի քիմմաքրում",
    items: [
      "Բծերի և տհաճ հոտերի նվազեցում",
      "Փոշու և կեղտի խորքային հեռացում",
      "Փափուկ մակերեսների թարմացում",
      "Հատուկ նյութերով անվտանգ մաքրում",
      "Բազմոցների և աթոռների մշակում",
      "Կենդանիների մազերի հեռացում",
    ],
  },
];

const dryCleaningItems = [
  { id: "armchair", title: "Բազկաթոռ", price: 2500, image: "/assets/furniture/armchair.png" },
  { id: "sofa_2", title: "Բազմոց 2 տեղանոց", price: 8000, image: "/assets/furniture/sofa-2.png" },
  { id: "sofa_3", title: "Բազմոց 3 տեղանոց", price: 10000, image: "/assets/furniture/sofa-3.png" },
  { id: "sofa_2_armchairs", title: "2 տեղանոց բազմոց + 2 բազկաթոռ", price: 10000, image: "/assets/furniture/sofa-2-armchairs.png" },
  { id: "sofa_3_armchairs", title: "3 տեղանոց բազմոց + 2 բազկաթոռ", price: 12000, image: "/assets/furniture/sofa-3-armchairs.png" },
  { id: "sofa_corner", title: "Անկյունային բազմոց", price: 15000, image: "/assets/furniture/sofa-l.png" },
  { id: "chair_soft", title: "Փափուկ աթոռ", price: 2000, image: "/assets/furniture/chair-soft.png" },
  { id: "chair_wood", title: "Փայտե աթոռ", price: 1000, image: "/assets/furniture/chair-wood.png" },
  { id: "mattress_single", title: "Ներքնակ 1 անձի", price: 8000, image: "/assets/furniture/mattress-single.png" },
  { id: "mattress_double", title: "Ներքնակ 2 անձի", price: 12000, image: "/assets/furniture/mattress-double.png" },
  { id: "mattress_kid", title: "Մանկական ներքնակ", price: 6000, image: "/assets/furniture/mattress-kid.png" },
];

const calculatorAddOns = {
  regular: [
    { id: "bathroom", label: "Սանհանգույց", price: 3000, type: "counter", unit: "հատ" },
    { id: "fridge", label: "Սառնարանի մաքրում", price: 3000, type: "counter", unit: "հատ" },
    { id: "balcony", label: "Պատշգամբի մաքրում", price: 3000, type: "counter", unit: "հատ" },
    { id: "pets", label: "Կենդանիների առկայություն", price: 3000, type: "checkbox" },
    { id: "ironing", label: "Արդուկում", price: 4000, type: "hours", unit: "ժամ" },
  ],
  deep: [
    { id: "bathroom", label: "Սանհանգույց", price: 5000, type: "counter", unit: "հատ" },
    { id: "fridge", label: "Սառնարանի մաքրում", price: 3000, type: "counter", unit: "հատ" },
    { id: "balcony", label: "Պատշգամբի մաքրում", price: 5000, type: "counter", unit: "հատ" },
    { id: "cabinets", label: "Դարակների մաքրում", price: 10000, type: "checkbox" },
    { id: "steam", label: "Գոլորշիով մաքրում", price: 8000, type: "checkbox" },
    { id: "pets", label: "Կենդանիների առկայություն", price: 8000, type: "checkbox" },
    { id: "curtains", label: "Վարագույտների լվացում", price: 2000, type: "counter", unit: "հատ" },
    { id: "ironing", label: "Արդուկում", price: 4000, type: "hours", unit: "ժամ" },
  ],
  post: [
    { id: "cabinets", label: "Դարակների մաքրում", price: 10000, type: "checkbox" },
    { id: "balcony", label: "Պատշգամբի մաքրում", price: 5000, type: "counter", unit: "հատ" },
  ],
  ironing: [],
  dry: [],
  steam: [],
};

const steps = [
  { number: 1, label: "Ծառայություն" },
  { number: 2, label: "Հաշվարկ" },
  { number: 3, label: "Հավելյալներ" },
  { number: 4, label: "Հայտ" },
];

function formatAMD(value) {
  return `${new Intl.NumberFormat("hy-AM").format(Math.round(value || 0))} դրամ`;
}

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function App() {
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
  const resetCalculation = () => {
    setSqm(0);
    setHours(0);
    setDrySelections({});
    setAddonValues({});
  };

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const selectedService = services.find((item) => item.id === service) || null;

  const handleServiceSelect = (id) => {
    if (service === id) {
      setService(null);
      setAddonValues({});
      setDrySelections({});
      return;
    }

    setService(id);
    setAddonValues({});
    if (id !== "dry") setDrySelections({});
  };

  const updateDryCount = (id, value) => {
    setDrySelections((current) => {
      const next = { ...current };
      const cleanValue = Math.max(0, Number(value) || 0);
      if (cleanValue === 0) delete next[id];
      else next[id] = cleanValue;
      return next;
    });
  };

  const updateAddon = (id, value) => {
    setAddonValues((current) => ({ ...current, [id]: value }));
  };

  const toggleAddon = (id) => {
    setAddonValues((current) => ({ ...current, [id]: !current[id] }));
  };

  const dryTotalCount = Object.values(drySelections).reduce((sum, value) => sum + Number(value || 0), 0);

  const calculation = useMemo(() => {
    const selectedServiceRate = service ? calculatorRates[service] : null;

    if (!selectedServiceRate) {
      return {
        selectedService: { label: "Ծառայություն ընտրված չէ", range: "Ընտրեք ծառայությունը" },
        base: 0,
        addOnsTotal: 0,
        addOnRows: [],
        total: 0,
      };
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
      : service === "steam" && quantity > 1 && quantity < 10
      ? 20000
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
  }, [service, sqm, hours, drySelections, addonValues]);

  const selectedAddOnsSummary =
    !service
      ? ""
      : service === "dry"
      ? dryCleaningItems
          .map((item) => {
            const count = Number(drySelections[item.id]) || 0;
            return count > 0 ? `${item.title}: ${count} հատ (+${formatAMD(count * item.price)})` : null;
          })
          .filter(Boolean)
          .join("\n")
      : (calculatorAddOns[service] || [])
          .map((item) => {
            const value = addonValues[item.id];
            if (item.type === "checkbox" && value) return `${item.label}: այո (+${formatAMD(item.price)})`;
            if ((item.type === "counter" || item.type === "hours") && Number(value) > 0) {
              const unit = item.type === "hours" ? "ժամ" : item.unit || "հատ";
              return `${item.label}: ${value} ${unit} (+${formatAMD(Number(value) * item.price)})`;
            }
            return null;
          })
          .filter(Boolean)
          .join("\n");

  const orderSummary = `
Ծառայություն: ${calculation.selectedService.label}
${service === "ironing" ? `Ժամեր: ${hours}` : service === "dry" ? `Կահույքի քանակ: ${dryTotalCount} հատ` : `Մակերես: ${sqm} քմ`}
Հավելյալ ծառայություններ:
${selectedAddOnsSummary || "Չկան"}
Հիմնական արժեք: ${formatAMD(calculation.base)}
Հավելյալների արժեք: ${formatAMD(calculation.addOnsTotal)}
Ընդհանուր մոտավոր արժեք: ${formatAMD(calculation.total)}
`;

  const goNext = () => setStep((current) => Math.min(4, current + 1));
  const goBack = () => {
    setStep((current) => {
      const nextStep = Math.max(1, current - 1);

      if (current === 2 && nextStep === 1) {
        resetCalculation();
      }

      return nextStep;
    });
  };

  return (
    <div className="miniapp">
      <header className="mini-header">

        <a href="#top" className="mini-brand">
          <img src={logo} alt="Your Clean Home" />
        </a>

        <nav>
          {steps.map((item) => (
            <button
              key={item.number}
              type="button"
              className={step === item.number ? "active" : ""}
              onClick={() => {
                if (item.number === 1) {
                  resetCalculation();
                }

                setStep(item.number);
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <main id="top" className="mini-main">
        <section className="mini-hero">
          <div className="mini-hero-top">
            <div className="mini-logo-card">
              <img src={logo} alt="Your Clean Home" />
            </div>

            <div>
              <span className="mini-badge"><Star size={15} /> Գնի հաշվիչ</span>
              <h1>Պարզ 4 քայլով ստացեք ծառայության արժեքը</h1>
              <p>Your Clean Home - երբ հարմարավետությունը միաձուլվում է մաքրության հետ։</p>
            </div>
          </div>

          <div className="steps-bar">
            {steps.map((item) => (
              <button
                key={item.number}
                type="button"
                className={step === item.number ? "step-pill active" : step > item.number ? "step-pill done" : "step-pill"}
                onClick={() => {
                  if (item.number === 1) {
                    resetCalculation();
                    setService(null);
                  }

                  setStep(item.number);
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
              <span>Ձեր ընտրությունը</span>
              <h3>{calculation.selectedService.label}</h3>
              <p>{calculation.selectedService.range}</p>

              <div className="summary-lines">
                <div>
                  <span>{service === "ironing" ? "Ժամեր" : service === "dry" ? "Կահույք" : "Մակերես"}</span>
                  <b>{service === "ironing" ? `${hours} ժամ` : service === "dry" ? `${dryTotalCount} հատ` : `${sqm} քմ`}</b>
                </div>
                <div>
                  <span>Հավելյալներ</span>
                  <b>{formatAMD(calculation.addOnsTotal)}</b>
                </div>
                <div className="summary-total">
                  <span>Մոտավոր արժեք</span>
                  <b>{formatAMD(calculation.total)}</b>
                </div>
              </div>
            </div>
          </aside>

          <div className="wizard-card">
            {step === 1 && (
              <div className="step-content">
                <div className="step-title">
                  <span>Քայլ 1</span>
                  <h2>Ընտրեք ծառայությունը</h2>
                  <p>Սեղմեք ծառայության վրա՝ տեսնելու համար, թե ինչ է ներառված։</p>
                </div>

                <div className="service-picker">
                  {services.map((item) => {
                    const Icon = item.icon;
                    const isActive = service === item.id;

                    return (
                      <div key={item.id} className={isActive ? "service-choice-wrap active" : "service-choice-wrap"}>
                        <button
                          type="button"
                          className={isActive ? "service-choice active" : "service-choice"}
                          onClick={() => handleServiceSelect(item.id)}
                        >
                          <Icon size={22} />
                          <div>
                            <strong>{item.title}</strong>
                            <span>{item.subtitle}</span>
                            <small>{serviceRates[item.id]?.range || calculatorRates[item.id]?.range}</small>
                          </div>
                          {isActive ? <CheckCircle2 size={20} /> : <ChevronRight size={20} />}
                        </button>

                        <div className={isActive ? "mobile-included-list open" : "mobile-included-list"}>
                          <h3>Ինչ է ներառված</h3>
                          <ul>
                            {item.items.map((line) => (
                              <li key={line}>
                                <CheckCircle2 size={16} />
                                <span>{line}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {selectedService && (
                  <div className="included-card">
                    <h3>Ինչ է ներառված՝ {selectedService.title}</h3>
                    <ul>
                      {selectedService.items.map((item) => (
                        <li key={item}><CheckCircle2 size={17} /><span>{item}</span></li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="step-content">
                <div className="step-title">
                  <span>Քայլ 2</span>
                  <h2>Հաշվարկ</h2>
                  <p>
                    {service === "dry"
                      ? "Ընտրեք կահույքի տեսակները։"
                      : service === "ironing"
                      ? "Նշեք ժամերի քանակը։"
                      : service === "steam"
                      ? "Նշեք մակերեսը։"
                      : "Նշեք մակերեսը։"}
                  </p>
                </div>

                {!service ? (
                  <div className="empty-addons">
                    <Calculator size={28} />
                    <h3>Նախ ընտրեք ծառայությունը</h3>
                    <p>Վերադարձեք առաջին քայլին և ընտրեք մաքրման տեսակը։</p>
                    <button type="button" className="next-button inline-action" onClick={() => setStep(1)}>
                      Ընտրել ծառայություն
                    </button>
                  </div>
                ) : service === "dry" ? (
                  <div className="dry-area">
                    <div className="label-line">
                      <strong>Ընտրեք կահույքի տեսակները</strong>
                      <b>{dryTotalCount} հատ</b>
                    </div>

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
                  <div className="input-card">
                    <div className="label-line">
                      <strong>Արդուկման ժամեր</strong>
                      <b>{hours} ժամ</b>
                    </div>
                    <input className="number-input" type="number" min="1" value={hours} onChange={(e) => setHours(Number(e.target.value))} />
                  </div>
                ) : (
                  <div className="input-card">
                    <div className="label-line">
                      <strong>Բնակարանի մակերես</strong>
                      <b>{sqm} քմ</b>
                    </div>
                    <input type="range" min="1" max="250" value={sqm} onChange={(e) => setSqm(Number(e.target.value))} />
                    <input className="number-input" type="number" min="1" value={sqm} onChange={(e) => setSqm(Number(e.target.value))} />
                  </div>
                )}

                <div className="total-panel">
                  <span>Մոտավոր արժեք</span>
                  <strong>{formatAMD(calculation.total)}</strong>
                  <small>
                    {service === "steam"
                      ? "Մինչև 10 քմ արժեքը՝ 29,000 դրամ, 10 քմ-ից բարձր՝ 1,000 դրամ / 1 քմ"
                      : `${calculation.selectedService.label} — ${calculation.selectedService.range}`}
                  </small>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="step-content">
                <div className="step-title">
                  <span>Քայլ 3</span>
                  <h2>Կա՞ որևէ բան ավելացնելու</h2>
                  <p>Ընտրեք հավելյալ ծառայությունները, եթե անհրաժեշտ են։</p>
                </div>

                {!service ? (
                  <div className="empty-addons">
                    <CheckCircle2 size={28} />
                    <h3>Նախ ընտրեք ծառայությունը</h3>
                    <p>Հավելյալ ծառայությունները կախված են ընտրված ծառայությունից։</p>
                    <button type="button" className="next-button inline-action" onClick={() => setStep(1)}>
                      Ընտրել ծառայություն
                    </button>
                  </div>
                ) : calculatorAddOns[service]?.length > 0 ? (
                  <div className="addon-grid">
                    {calculatorAddOns[service].map((item) => {
                      if (item.type === "checkbox") {
                        return (
                          <button type="button" key={item.id} className={addonValues[item.id] ? "addon-tile active" : "addon-tile"} onClick={() => toggleAddon(item.id)}>
                            <div>
                              <strong>{item.label}</strong>
                              <span>+ {formatAMD(item.price)}</span>
                            </div>
                            <CheckCircle2 size={20} />
                          </button>
                        );
                      }

                      const value = addonValues[item.id] || 0;
                      const unit = item.type === "hours" ? "ժամ" : item.unit || "հատ";

                      return (
                        <div className={value > 0 ? "addon-tile counter active" : "addon-tile counter"} key={item.id}>
                          <div>
                            <strong>{item.label}</strong>
                            <span>+ {formatAMD(item.price)} / {unit}</span>
                          </div>

                          <div className="tile-counter">
                            <button type="button" onClick={() => updateAddon(item.id, Math.max(0, value - 1))}><Minus size={14} /></button>
                            <b>{value}</b>
                            <button type="button" onClick={() => updateAddon(item.id, value + 1)}><Plus size={14} /></button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="empty-addons">
                    <CheckCircle2 size={28} />
                    <h3>Այս ծառայության համար հավելյալ ընտրանքներ չկան</h3>
                    <p>Կարող եք անցնել հայտի լրացմանը։</p>
                  </div>
                )}

                <div className="total-panel">
                  <span>Ընդհանուր մոտավոր արժեք</span>
                  <strong>{formatAMD(calculation.total)}</strong>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="step-content">
                <div className="step-title">
                  <span>Քայլ 4</span>
                  <h2>Ուղարկել հայտ</h2>
                  <p>Կցեք լուսանկարներ, որպեսզի կարողանանք վերջնական գինը ճիշտ հաստատել։</p>
                </div>

                <div className="photo-note">
                  <Camera size={24} />
                  <div>
                    <strong>Ճշգրիտ գնի համար ուղարկեք նկարներ</strong>
                    <span>Այդպես կարող ենք ճիշտ գնահատել աշխատակիցների քանակը, ժամանակը և աշխատանքի բարդությունը։</span>
                  </div>
                </div>

                {!service && (
                  <div className="empty-addons">
                    <CheckCircle2 size={28} />
                    <h3>Նախ ընտրեք ծառայությունը</h3>
                    <p>Հայտ ուղարկելու համար պետք է ընտրված լինի ծառայության տեսակը։</p>
                    <button type="button" className="next-button inline-action" onClick={() => setStep(1)}>
                      Ընտրել ծառայություն
                    </button>
                  </div>
                )}

                {service && (
                <form
                  id="request-form"
                  className="request-form"
                  action="https://formspree.io/f/xqenojng"
                  method="POST"
                  encType="multipart/form-data"
                >
                  <input type="hidden" name="Ծառայություն" value={calculation.selectedService.label} />
                  <input type="hidden" name={service === "ironing" ? "Ժամեր" : service === "dry" ? "Կահույքի քանակ" : "Մակերես"} value={service === "ironing" ? `${hours} ժամ` : service === "dry" ? `${dryTotalCount} հատ` : `${sqm} քմ`} />
                  <input type="hidden" name="Հավելյալ ծառայություններ" value={selectedAddOnsSummary || "Չկան"} />
                  <input type="hidden" name="Հիմնական արժեք" value={formatAMD(calculation.base)} />
                  <input type="hidden" name="Հավելյալների արժեք" value={formatAMD(calculation.addOnsTotal)} />
                  <input type="hidden" name="Ընդհանուր մոտավոր արժեք" value={formatAMD(calculation.total)} />
                  <textarea name="Հաշվարկի ամբողջական ամփոփում" value={orderSummary} readOnly hidden />

                  <div className="form-row">
                    <div className="form-field">
                      <label>Անուն</label>
                      <input type="text" name="Անուն" placeholder="Ձեր անունը" value={clientName} onChange={(e) => setClientName(e.target.value)} required />
                    </div>

                    <div className="form-field">
                      <label>Հեռախոսահամար</label>
                      <input type="tel" name="Հեռախոսահամար" placeholder="+374 ..." value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} required />
                    </div>
                  </div>

                  <div className="form-field">
                    <label>Հասցե / Թաղամաս</label>
                    <input type="text" name="Հասցե" placeholder="Օրինակ՝ Կենտրոն, Արաբկիր..." value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} />
                  </div>

                  <div className="form-field">
                    <label>Նախընտրելի օր</label>
                    <input type="date" name="Նախընտրելի օր" required />
                  </div>

                  <div className="form-field">
                    <label>Լուսանկարներ</label>
                    <input type="file" name="Լուսանկարներ" accept="image/*" multiple />
                    <small>Կարող եք կցել մի քանի նկար՝ ավելի հստակ գնահատման համար։</small>
                  </div>

                  <div className="form-field">
                    <label>Լրացուցիչ նշումներ</label>
                    <textarea name="Նշումներ" placeholder="Գրեք եթե կան հատուկ հատվածներ, կենդանիներ, շտապ պատվեր և այլն։" value={clientMessage} onChange={(e) => setClientMessage(e.target.value)} rows="5" />
                  </div>
                </form>
                )}
              </div>
            )}

            <div className="wizard-actions">
              <button type="button" className="ghost-button" onClick={goBack} disabled={step === 1}>
                <ChevronLeft size={18} />
                Հետ
              </button>
            {step < 4 ? (
              <button type="button" className="next-button" onClick={goNext} disabled={step === 1 && !service}>
                Շարունակել
                <ChevronRight size={18} />
              </button>
            ) : (
              <button
                type="submit"
                form="request-form"
                className="next-button request-send-bottom"
                disabled={!service}
              >
                <MessageCircle size={22} />
                Ուղարկել հայտ
              </button>
            )}
            </div>
          </div>
        </section>

        <footer className="mini-footer">
          <div className="footer-brand">
            <img src={logo} alt="Your Clean Home" />
            <p>Պրոֆեսիոնալ մաքրման ծառայություններ Երևանում</p>
          </div>

          <div className="footer-links">
            <a href="tel:+37441101143"><Phone size={18} />041 101 143</a>
            <a href="https://wa.me/37441101143" target="_blank" rel="noreferrer"><MessageCircle size={18} />WhatsApp</a>
            <a href="https://t.me/your_clean_home" target="_blank" rel="noreferrer"><Send size={18} />Telegram</a>
            <a href="https://instagram.com/your_clean_home.yerevan" target="_blank" rel="noreferrer"><InstagramIcon size={18} />Instagram</a>
          </div>
        </footer>
      </main>

      {showScrollTop && (
        <button className="scroll-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Go to top">
          ↑
        </button>
      )}
    </div>
  );
}
