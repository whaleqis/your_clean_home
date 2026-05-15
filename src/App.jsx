import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  Camera,
  CheckCircle2,
  ChevronRight,
  Clock,
  Home,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Star,
  Wind,
  Hammer,
  Shirt,
  Sofa,
  Send,
  X,
} from "lucide-react";

const logo = "/assets/ych-logo.png";

const serviceRates = {
  regular: {
    label: "Ընթացիկ մաքրում",
    short: "Ընթացիկ",
    rate: 400,
    minRate: 300,
    maxRate: 500,
    range: "300–500 դրամ / 1 քմ",
  },
  deep: {
    label: "Համալիր մաքրում",
    short: "Համալիր",
    rate: 700,
    minRate: 600,
    maxRate: 800,
    range: "600–800 դրամ / 1 քմ",
  },
  post: {
    label: "Հետշինարարական մաքրում",
    short: "Հետշինարարական",
    rate: 1000,
    minRate: 800,
    maxRate: 1200,
    range: "800–1200 դրամ / 1 քմ",
  },
  steam: {
    label: "Գոլորշիով մաքրում",
    short: "Գոլորշիով",
    rate: 1250,
    minRate: 1000,
    maxRate: 1500,
    range: "1000–1500 դրամ / 1 քմ",
  },
  dry: {
    label: "Փափուկ կահույքի քիմմաքրում",
    short: "Քիմմաքրում",
    rate: 0,
    unit: "հատ",
    range: "սկսած 3000 դրամ",
  },
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
const dryCleaningItems = [
  {
    id: "armchair",
    title: "Բազկաթոռ",
    price: 2500,
    image: "/assets/furniture/armchair.png",
  },
  {
    id: "sofa_2",
    title: "Բազմոց 2 տեղանոց",
    price: 8000,
    image: "/assets/furniture/sofa-2.png",
  },
  {
    id: "sofa_3",
    title: "Բազմոց 3 տեղանոց",
    price: 10000,
    image: "/assets/furniture/sofa-3.png",
  },
  {
    id: "sofa_2_armchairs",
    title: "2 տեղանոց բազմոց + 2 բազկաթոռ",
    price: 10000,
    image: "/assets/furniture/sofa-2-armchairs.png",
  },
  {
    id: "sofa_3_armchairs",
    title: "3 տեղանոց բազմոց + 2 բազկաթոռ",
    price: 12000,
    image: "/assets/furniture/sofa-3-armchairs.png",
  },
  {
    id: "sofa_corner",
    title: "Անկյունային բազմոց",
    price: 15000,
    image: "/assets/furniture/sofa-l.png",
  },
  {
    id: "chair_soft",
    title: "Փափուկ աթոռ",
    price: 2000,
    image: "/assets/furniture/chair-soft.png",
  },
  {
    id: "chair_wood",
    title: "Փայտե աթոռ",
    price: 1000,
    image: "/assets/furniture/chair-wood.png",
  },
  {
    id: "mattress_single",
    title: "Ներքնակ 1 անձի",
    price: 8000,
    image: "/assets/furniture/mattress-single.png",
  },
  {
    id: "mattress_double",
    title: "Ներքնակ 2 անձի",
    price: 12000,
    image: "/assets/furniture/mattress-double.png",
  },
  {
    id: "mattress_kid",
    title: "Մանկական ներքնակ",
    price: 6000,
    image: "/assets/furniture/mattress-kid.png",
  },
];



const calculatorAddOns = {
  regular: [
    { id: "bathroom", label: "Սանհանգույց", price: 3000, type: "counter", unit: "հատ" },
    { id: "fridge", label: "Սառնարանի մաքրում", price: 3000, type: "counter" },
    { id: "balcony", label: "Պատշգամբի մաքրում", price: 3000, type: "counter" },
    { id: "pets", label: "Կենդանիների առկայություն", price: 3000, type: "checkbox" },
    { id: "ironing", label: "Արդուկում", price: 4000, type: "hours", unit: "ժամ" },
  ],
  deep: [
    { id: "bathroom", label: "Սանհանգույց", price: 5000, type: "counter", unit: "հատ" },
    { id: "fridge", label: "Սառնարանի մաքրում", price: 3000, type: "counter" },
    { id: "balcony", label: "Պատշգամբի մաքրում", price: 5000, type: "counter" },
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
};

const addOns = [
  { id: "windows", label: "Պատուհանների լվացում", price: 8000 },
  { id: "fridge", label: "Սառնարանի ներսի մաքրում", price: 5000 },
  { id: "oven", label: "Ջեռոցի / գազօջախի խորը մաքրում", price: 7000 },
  { id: "balcony", label: "Պատշգամբի մաքրում", price: 6000 },
  { id: "ironing", label: "Արդուկում", price: 5000 },
  { id: "steamExtra", label: "Լրացուցիչ գոլորշիով մշակում", price: 10000 },
];

const heroServices = [
  { icon: Home, title: "Ընթացիկ մաքրում", text: "Պարբերական մաքրություն" },
  { icon: Sparkles, title: "Համալիր մաքրում", text: "Խորը և մանրակրկիտ մաքրում" },
  { icon: Hammer, title: "Հետշինարարական", text: "Վերանորոգումից հետո" },
  { icon: Wind, title: "Գոլորշիով մաքրում", text: "Ախտահանում" },
  { icon: Shirt, title: "Արդուկում", text: "Հավելյալ ծառայություն" },
  { icon: Sofa, title: "Քիմմաքրում", text: "Փափուկ կահույքի քիմմաքրում" },
];

const services = [
  {
    id: "regular",
    icon: Home,
    title: "Ընթացիկ մաքրում",
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
    id: "dry",
    icon: Sofa,
    title: "Փափուկ կահույքի քիմմաքրում",
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

function formatAMD(value) {
  return `${new Intl.NumberFormat("hy-AM").format(Math.round(value))} դրամ`;
}

function ServiceCard({ service, onOpen }) {
  const Icon = service.icon;

  const maxVisible =
    service.id === "deep" ? 10 :
    service.id === "post" ? 6 :
    service.id === "steam" ? 8 :
    7;

  const visibleItems = service.items.slice(0, maxVisible);
  const hiddenCount = service.items.length - visibleItems.length;

  return (
    <article className="service-card">
      <div className="service-card-glow" />

      <div className="service-top">
        <div className="service-icon">
          <Icon size={24} />
        </div>

        <div className="service-title-wrap">
          <h3>{service.title}</h3>
          <small>{serviceRates[service.id]?.range}</small>
        </div>
      </div>

      <ul className="service-list">
        {visibleItems.map((line) => (
          <li key={line}>
            <CheckCircle2 size={16} />
            <span>{line}</span>
          </li>
        ))}
      </ul>

      {hiddenCount > 0 && (
        <button className="service-more" type="button" onClick={() => onOpen(service)}>
          <span>{`Տեսնել ամբողջ ցանկը +${hiddenCount}`}</span>
          <ChevronRight size={17} />
        </button>
      )}
    </article>
  );
}

function ServiceModal({ service, onClose }) {
  if (!service) return null;
  const Icon = service.icon;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" type="button" onClick={onClose}><X size={20} /></button>
        <div className="modal-head">
          <div className="service-icon"><Icon size={25} /></div>
          <div>
            <h3>{service.title}</h3>
            <span>{serviceRates[service.id]?.range}</span>
          </div>
        </div>
        <ul className="modal-list">
          {service.items.map((line) => (
            <li key={line}><CheckCircle2 size={17} />{line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function InstagramIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function App() {
  const [service, setService] = useState("deep");
  const [sqm, setSqm] = useState(60);
  const [hours, setHours] = useState(1);
  const [drySelections, setDrySelections] = useState({});
  const [dryActiveItem, setDryActiveItem] = useState("sofa_3");
  const [dryCount, setDryCount] = useState(1);
  const [addonValues, setAddonValues] = useState({});
  const [modalService, setModalService] = useState(null);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientMessage, setClientMessage] = useState("");

  const calculation = useMemo(() => {
    const selectedService = calculatorRates[service];

    if (service === "dry") {
      const dryRows = dryCleaningItems
        .map((item) => {
          const quantity = Number(drySelections[item.id]) || 0;
          return {
            id: item.id,
            label: item.title,
            quantity,
            price: item.price,
            total: quantity * item.price,
          };
        })
        .filter((item) => item.quantity > 0);

      const base = dryRows.reduce((sum, item) => sum + item.total, 0);

      return {
        selectedService,
        base,
        addOnsTotal: 0,
        addOnRows: dryRows,
        total: base,
      };
    }

    const isIroning = service === "ironing";
    const quantity = isIroning ? Number(hours || 0) : Number(sqm || 0);
    const base = quantity * selectedService.rate;
    const activeAddOns = calculatorAddOns[service] || [];

    const addOnRows = activeAddOns
      .map((item) => {
        const value = addonValues[item.id];
        let quantity = 0;

        if (item.type === "checkbox") {
          quantity = value ? 1 : 0;
        } else {
          quantity = Number(value) || 0;
        }

        return {
          ...item,
          quantity,
          total: quantity * item.price,
        };
      })
      .filter((item) => item.total > 0);

    const addOnsTotal = addOnRows.reduce((sum, item) => sum + item.total, 0);

    return {
      selectedService,
      base,
      addOnsTotal,
      addOnRows,
      total: base + addOnsTotal,
    };
  }, [service, sqm, hours, addonValues, drySelections]);

  const updateAddon = (id, value) => {
    setAddonValues((current) => ({
      ...current,
      [id]: value,
    }));
  };

  const toggleAddon = (id) => {
    setAddonValues((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

    const updateDryCount = (id, value) => {
    setDrySelections((current) => {
      const next = { ...current };
      const cleanValue = Math.max(0, Number(value) || 0);

      if (cleanValue === 0) {
        delete next[id];
      } else {
        next[id] = cleanValue;
      }

      return next;
    });
  };

const handleServiceChange = (value) => {
    setService(value);
    setAddonValues({});
    if (value !== "dry") {
      setDrySelections({});
    }
  };


  const selectedAddOnsSummary =
    service === "dry"
      ? dryCleaningItems
          .map((item) => {
            const count = Number(drySelections[item.id]) || 0;
            return count > 0
              ? `${item.title}: ${count} հատ (+${formatAMD(count * item.price)})`
              : null;
          })
          .filter(Boolean)
          .join("\n")
      : (calculatorAddOns[service] || [])
          .map((item) => {
            const value = addonValues[item.id];

            if (item.type === "checkbox" && value) {
              return `${item.label}: այո (+${formatAMD(item.price)})`;
            }

            if ((item.type === "counter" || item.type === "hours") && Number(value) > 0) {
              const unit = item.type === "hours" ? "ժամ" : "հատ";
              return `${item.label}: ${value} ${unit} (+${formatAMD(Number(value) * item.price)})`;
            }

            return null;
          })
          .filter(Boolean)
          .join("\n");

  const orderSummary = `
Ծառայություն: ${calculation.selectedService.label}
${service === "ironing" ? `Ժամեր: ${hours}` : service === "dry" ? `Կահույքի քանակ: ${dryCount} հատ` : `Մակերես: ${sqm} քմ`}
Հավելյալ ծառայություններ:
${selectedAddOnsSummary || "Չկան"}
Հիմնական արժեք: ${formatAMD(calculation.base)}
Հավելյալների արժեք: ${formatAMD(calculation.addOnsTotal)}
Ընդհանուր մոտավոր արժեք: ${formatAMD(calculation.total)}
`;

  return (
    <div className="page">
      <header className="topbar">
        <div className="container nav">
          <a href="#home" className="brand"><img src={logo} alt="Your Clean Home logo" /></a>
          <nav className="desktop-nav">
            <a href="#services">Ծառայություններ</a>
            <a href="#calculator">Հաշվիչ</a>
            <a href="#prices">Գներ</a>
            <a href="#contact">Կապ</a>
          </nav>
          <a className="nav-button" href="#calculator">Հաշվել արժեքը</a>
        </div>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-bg hero-bg-1" />
          <div className="hero-bg hero-bg-2" />

          <div className="container hero-grid">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="hero-content">
              <div className="badge"><Star size={16} />Your Clean Home</div>
              <h1>Երբ հարմարավետությունը միաձուլվում է մաքրության հետ</h1>
              <p>Ընտրեք ծառայությունը, նշեք բնակարանի մակերեսը և ստացեք մոտավոր արժեքը՝ մինչև վերջնական հաստատումը։</p>
              <div className="hero-actions">
                <a href="#calculator" className="primary-button">Հաշվել արժեքը <ChevronRight size={18} /></a>
                <a href="#services" className="secondary-button">Տեսնել ծառայությունները</a>
              </div>
              <div className="hero-steps">
                <div><span>01</span><p>Ընտրեք ծառայությունը</p></div>
                <div><span>02</span><p>Հաշվեք մոտավոր արժեքը</p></div>
                <div><span>03</span><p>Ուղարկեք նկարներ վերջնական գնի համար</p></div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="hero-panel">
              <div className="hero-logo-box"><img src={logo} alt="" /></div>
              <div className="hero-service-grid">
                {heroServices.map((item) => {
                  const Icon = item.icon;
                  return <div className="hero-service" key={item.title}><Icon size={20} /><div><strong>{item.title}</strong><span>{item.text}</span></div></div>;
                })}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="services" className="section services-section">
          <div className="container">
            <div className="section-head">
              <h2>Ծառայություններ</h2>
            </div>
            <div className="services-grid">
              {services.map((item) => <ServiceCard key={item.id} service={item} onOpen={setModalService} />)}
            </div>
          </div>
        </section>

        <section id="calculator" className="section calculator-section">
          <div className="container calculator-grid">
            <div className="calculator-copy">
              <div className="badge dark">
                <Calculator size={16} />
                Գնի հաշվիչ
              </div>
              <h2>Հաշվեք մոտավոր արժեքը մի քանի քայլով</h2>
              <p>
                Հաշվիչը տալիս է նախնական արժեք։ Վերջնական գինը կարող է փոխվել՝
                կախված բնակարանի վիճակից, կահույքի քանակից, կուտակված փոշուց և
                աշխատանքի իրական ծավալից։
              </p>

              <a href="#contact" className="notice-card notice-card-link">
                <Camera />
                <div>
                  <strong>Ճշգրիտ գնի համար ուղարկեք նկարներ</strong>
                  <span>
                    Այդպես կարող ենք ճիշտ գնահատել աշխատակիցների քանակը,
                    ժամանակը և աշխատանքի բարդությունը։
                  </span>
                </div>
              </a>
            </div>

            <div className="calculator-card">
              <div className="field">
                <label>Ծառայության տեսակ</label>
                <select value={service} onChange={(e) => handleServiceChange(e.target.value)}>
                  {Object.entries(calculatorRates).map(([key, item]) => (
                    <option key={key} value={key}>
                      {item.label} — {item.range}
                    </option>
                  ))}
                </select>
              </div>

              {service === "dry" ? (
                <div className="field">
                  <div className="label-row">
                    <label>Ընտրեք կահույքի տեսակը և քանակը</label>
                    <strong>
                      {Object.values(drySelections).reduce((sum, value) => sum + Number(value || 0), 0)} հատ
                    </strong>
                  </div>

                  <div className="dry-options">
                    {dryCleaningItems.map((item) => {
                      const count = drySelections[item.id] || 0;

                      return (
                        <button
                          type="button"
                          key={item.id}
                          className={count > 0 ? "dry-option active" : "dry-option"}
                          onClick={() => {
                            updateDryCount(item.id, count > 0 ? 0 : 1);
                          }}
                        >
                          <img src={item.image} alt={item.title} />
                          <span>{item.title}</span>
                          <small>{formatAMD(item.price)}</small>

                          <div className="mini-counter dry-card-counter" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              onClick={() => updateDryCount(item.id, count - 1)}
                            >
                              <Minus size={14} />
                            </button>
                            <b>{count}</b>
                            <button
                              type="button"
                              onClick={() => updateDryCount(item.id, count + 1)}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : service === "ironing" ? (
                <div className="field">
                  <div className="label-row">
                    <label>Արդուկման ժամեր</label>
                    <strong>{hours} ժամ</strong>
                  </div>
                  <input
                    className="number-input"
                    type="number"
                    min="1"
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                  />
                </div>
              ) : (
                <div className="field">
                  <div className="label-row">
                    <label>Բնակարանի մակերես</label>
                    <strong>{sqm} քմ</strong>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="250"
                    value={sqm}
                    onChange={(e) => setSqm(Number(e.target.value))}
                  />
                  <input
                    className="number-input"
                    type="number"
                    min="1"
                    value={sqm}
                    onChange={(e) => setSqm(Number(e.target.value))}
                  />
                </div>
              )}

              {calculatorAddOns[service]?.length > 0 && (
                <div className="field">
                  <label>Հավելյալ ծառայություններ</label>
                  <div className="addons">
                    {calculatorAddOns[service].map((item) => {
                      if (item.type === "checkbox") {
                        return (
                          <button
                            type="button"
                            key={item.id}
                            onClick={() => toggleAddon(item.id)}
                            className={addonValues[item.id] ? "addon active" : "addon"}
                          >
                            <span>{item.label}</span>
                            <small>+ {formatAMD(item.price)}</small>
                          </button>
                        );
                      }

                      const value = addonValues[item.id] || 0;
                      const unit = item.type === "hours" ? "ժամ" : item.unit || "հատ";

                      return (
                        <div className="addon counter-addon" key={item.id}>
                          <span>{item.label}</span>
                          <small>+ {formatAMD(item.price)} / {unit}</small>

                          <div className="mini-counter">
                            <button
                              type="button"
                              onClick={() => updateAddon(item.id, Math.max(0, value - 1))}
                            >
                              <Minus size={14} />
                            </button>
                            <b>{value}</b>
                            <button
                              type="button"
                              onClick={() => updateAddon(item.id, value + 1)}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="total-box">
                <div>
                  <span>Մոտավոր արժեք</span>
                  <strong>{formatAMD(calculation.total)}</strong>
                  <small>
                    {calculation.selectedService.label} — {calculation.selectedService.range}
                  </small>
                </div>

                <div className="breakdown">
                  <p>
                    <span>{service === "ironing" ? "Արդուկում" : service === "dry" ? "Քիմմաքրում" : "Հիմնական մաքրում"}</span>
                    <b>{formatAMD(calculation.base)}</b>
                  </p>
                  {calculation.addOnRows.map((item) => (
                    <p key={item.id}>
                      <span>{item.label}{item.quantity > 1 ? ` × ${item.quantity}` : ""}</span>
                      <b>{formatAMD(item.total)}</b>
                    </p>
                  ))}
                  {calculation.addOnsTotal > 0 && (
                    <p>
                      <span>Հավելյալների ընդհանուր արժեք</span>
                      <b>{formatAMD(calculation.addOnsTotal)}</b>
                    </p>
                  )}
                </div>

                <a href="#contact" className="total-button">
                  Ստանալ վերջնական հաշվարկ
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="prices" className="section prices-section">
          <div className="container">
            <div className="section-head price-head">
              <h2>Գնացուցակ</h2>
              <p>Վերջնական արժեքը կախված է ծառայության տեսակից, մակերեսից և աշխատանքի ծավալից։</p>
            </div>

            <div className="price-grid">
              {Object.values(serviceRates).map((item) => (
                <div className="price-card" key={item.label}>
                  <div className="price-card-top">
                    <span>{item.label}</span>
                    <b>{item.short}</b>
                  </div>

                  <strong>{item.range}</strong>

                  <p>
                    {item.unit === "հատ"
                      ? "Գինը հաշվարկվում է ըստ կահույքի տեսակի և քանակի։"
                      : "Գինը հաշվարկվում է ըստ տարածքի մակերեսի և աշխատանքի ծավալի։"}
                  </p>
                </div>
              ))}
            </div>

            <div className="price-note-card">
              <div>
                <CheckCircle2 size={20} />
                <span>Ճշգրիտ արժեքի համար ուղարկեք լուսանկարներ կամ օգտվեք հաշվիչից։</span>
              </div>
              <a href="#calculator">Հաշվել արժեքը</a>
            </div>
          </div>
        </section>

        <section className="section process-section">
          <div className="container process-grid">
            {[
              [Camera, "Նկարներ", "Ուղարկում եք տարածքի լուսանկարները"],
              [Calculator, "Հաշվարկ", "Ստանում եք մոտավոր արժեք և ժամանակ"],
              [Clock, "Ամրագրում", "Համաձայնեցնում ենք օրն ու ժամը"],
              [ShieldCheck, "Մաքրում", "Աշխատում ենք մանրակրկիտ և պատասխանատու"],
            ].map(([Icon, title, text]) => <div className="process-card" key={title}><Icon /><h3>{title}</h3><p>{text}</p></div>)}
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="container contact-layout">
            <div className="contact-card contact-info">
              <img src={logo} alt="" />
              <h2>Ուղարկել հայտ</h2>
              <p>
                Լրացրեք Ձեր տվյալները, կցեք բնակարանի լուսանկարները, և մենք կկապվենք Ձեզ հետ վերջնական արժեքը հաստատելու համար։
              </p>

              <div className="contact-summary">
                <h3>Ձեր ընտրած հաշվարկը</h3>
                <p><span>Ծառայություն</span><b>{calculation.selectedService.label}</b></p>
                <p>
                  <span>{service === "ironing" ? "Ժամեր" : service === "dry" ? "Կահույքի քանակ" : "Մակերես"}</span>
                  <b>{service === "ironing" ? `${hours} ժամ` : service === "dry" ? `${dryCount} հատ` : `${sqm} քմ`}</b>
                </p>
                <p><span>Հավելյալներ</span><b>{formatAMD(calculation.addOnsTotal)}</b></p>
                <p className="summary-total"><span>Մոտավոր արժեք</span><b>{formatAMD(calculation.total)}</b></p>
              </div>
            </div>

            <form
              className="request-form"
              action="https://formspree.io/f/xqenojng"
              method="POST"
              encType="multipart/form-data"
            >
              <input type="hidden" name="Ծառայություն" value={calculation.selectedService.label} />
              <input type="hidden" name={service === "ironing" ? "Ժամեր" : service === "dry" ? "Կահույքի քանակ" : "Մակերես"} value={service === "ironing" ? `${hours} ժամ` : service === "dry" ? `${dryCount} հատ` : `${sqm} քմ`} />
              <input type="hidden" name="Հավելյալ ծառայություններ" value={selectedAddOnsSummary || "Չկան"} />
              <input type="hidden" name="Հիմնական արժեք" value={formatAMD(calculation.base)} />
              <input type="hidden" name="Հավելյալների արժեք" value={formatAMD(calculation.addOnsTotal)} />
              <input type="hidden" name="Ընդհանուր մոտավոր արժեք" value={formatAMD(calculation.total)} />
              <textarea name="Հաշվարկի ամբողջական ամփոփում" value={orderSummary} readOnly hidden />

              <div className="form-row">
                <div className="form-field">
                  <label>Անուն</label>
                  <input
                    type="text"
                    name="Անուն"
                    placeholder="Ձեր անունը"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Հեռախոսահամար</label>
                  <input
                    type="tel"
                    name="Հեռախոսահամար"
                    placeholder="+374 ..."
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label>Հասցե / Թաղամաս</label>
                <input
                  type="text"
                  name="Հասցե"
                  placeholder="Օրինակ՝ Կենտրոն, Արաբկիր..."
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label>Նախընտրելի օր</label>
                <input
                  type="date"
                  name="Նախընտրելի օր"
                  required
                />
              </div>

              <div className="form-field">
                <label>Լուսանկարներ</label>
                <input
                  type="file"
                  name="Լուսանկարներ"
                  accept="image/*"
                  multiple
                />
                <small>Կարող եք կցել մի քանի նկար՝ ավելի հստակ գնահատման համար։</small>
              </div>

              <div className="form-field">
                <label>Լրացուցիչ նշումներ</label>
                <textarea
                  name="Նշումներ"
                  placeholder="Գրեք եթե կան հատուկ հատվածներ, կենդանիներ, շտապ պատվեր և այլն։"
                  value={clientMessage}
                  onChange={(e) => setClientMessage(e.target.value)}
                  rows="5"
                />
              </div>

              <button className="primary-button form-submit" type="submit">
                <MessageCircle size={18} />
                Ուղարկել հայտ
              </button>
            </form>
          </div>
        </section>
        <footer className="footer">
          <div className="container footer-grid">
            <div className="footer-brand">
              <img src={logo} alt="Your Clean Home" />
              <p>Պրոֆեսիոնալ մաքրման ծառայություններ Երևանում</p>
            </div>

            <div className="footer-col">
              <h4>Կապ մեզ հետ</h4>
              <a href="tel:+37441011043"><Phone size={18} />041 011 043</a>
              <a href="https://wa.me/37441011043" target="_blank"><MessageCircle size={18} />WhatsApp</a>
              <a href="https://t.me/your_clean_home" target="_blank"><Send size={18} />Telegram</a>
              <a href="https://instagram.com/your_clean_home.yerevan" target="_blank"><InstagramIcon size={18} />@your_clean_home.yerevan</a>
            </div>

            <div className="footer-col">
              <h4>Ծառայություններ</h4>
              <a href="#services">Ընթացիկ մաքրում</a>
              <a href="#services">Համալիր մաքրում</a>
              <a href="#services">Հետշինարարական մաքրում</a>
              <a href="#services">Գոլորշիով մաքրում</a>
              <a href="#services">Քիմմաքրում</a>
              <a href="#calculator">Գնի հաշվիչ</a>
            </div>
          </div>

          <div className="footer-bottom">
            © 2026 Your Clean Home. Բոլոր իրավունքները պաշտպանված են։
          </div>
        </footer>
        <button
          className="scroll-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Go to top"
        >
          ↑
        </button>
      </main>

      <ServiceModal service={modalService} onClose={() => setModalService(null)} />
    </div>
  );
}
