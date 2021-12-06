/* eslint-disable react/no-array-index-key, react/no-danger */
import React, { useState, useEffect, useRef } from "react";
import {
  Nav,
  NavItem,
  TabContent,
  TabPane,
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  CardTitle,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import "./home.css";
import Axios from "axios";
import classnames from "classnames";
// import Carousel from "react-spring-3d-carousel";
import { Carousel } from "3d-react-carousal";
import { scroller } from "react-scroll";
import Headroom from "react-headroom";
import { Formik, Form, Field, FieldArray } from "formik";
import PhoneInput from "react-phone-number-input";
import Slider from "react-slick";
import Aos from "aos";
import "aos/dist/aos.css";
import { API_URL } from "../apiUrl";
import "react-phone-number-input/style.css";
/* import GlideComponentThumbs from "../components/carousel/GlideComponentThumbs"; */
import { buyUrl, adminRoot } from "../constants/defaultValues";
import IntlMessages from "../helpers/IntlMessages";
import { sliderData } from "./Data";
import { NotificationManager } from "../components/common/react-notifications";
import Slides from "./Slides";

const settings = {
  // dots: true,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const slideSettings = {
  type: "carousel",
  gap: 30,
  perView: 2,
  hideNav: true,
  /* autoplay:true, */
  speed: 5000,
  peek: { before: 100, after: 100 },
  breakpoints: {
    600: { perView: 1 },
    992: { perView: 3 },
    1200: { perView: 3 },
  },
  /* animationTimingFunc:5000, */
};

const slideItems = [
  {
    icon: "iconsminds-palm-tree",
    title: "Manage your Trips",
    detail: "Managing your Trips is now easy with our management system",
  },
  {
    icon: "iconsminds-administrator",
    title: "Manage Profiles",
    detail: "Easy to create and maintain profile for every trip",
  },
  {
    icon: "iconsminds-check",
    title: "Easy Request",
    detail: "Making Flight request with just one click with us",
  },
  {
    icon: "iconsminds-add-file",
    title: "Managing Documents",
    detail:
      "All your Travel Documents are now easy and safe to manage at one place",
  },
  /* {
    icon: 'iconsminds-deer',
    title: 'Icons Mind',
    detail:
      '1040 icons in 53 different categories, designed pixel perfect and ready for your project.',
  },
  {
    icon: 'iconsminds-palette',
    title: '20 Color Schemes',
    detail:
      'Colors, icons and design harmony that creates excellent themes to cover entire project.',
  },
  {
    icon: 'iconsminds-air-balloon-1',
    title: '3 Applications',
    detail:
      'Applications that mostly made of components are the way to get started to create something similar.',
  },
  {
    icon: 'iconsminds-resize',
    title: 'Extra Responsive',
    detail:
      'Custom Bootstrap 4 xxs & xxl classes delivers better experiences for smaller and larger screens.',
  }, */
];

const features = [
  {
    title: "MAGNIFICENT MALDIVES",
    buttonColor: "",
    img:
      "https://res.cloudinary.com/dx6zgsncl/image/upload/v1638607643/Lucky/Travel%20offer%20-%20compressed-20211204T084653Z-001/maldives_kiadej_ugvdgm.jpg",
    detail:
      "<span>Waldorf Astoria, Ithaafushi</span></br><span>Four Seasons, Landaa Giraavaru</span></br><span>Dusit Thani, Baa Atoll</span></br><span>Taj Exotica, South Male Atoll</span></br><span>Soneva Fushi, Eydhafushi</span></br><span>W Maldives, North Ari Atoll</span>",
  },
  {
    title: "DREAMY DUBAI",
    buttonColor: "#28538C",
    img:
      "https://res.cloudinary.com/dx6zgsncl/image/upload/v1638607643/Lucky/Travel%20offer%20-%20compressed-20211204T084653Z-001/dubai_mpqmj4_vsadhd.jpg",

    detail:
      "<span>Atlantis, The Palm</span></br><span>Mandarin Oriental, Jumeirah</span></br><span>Ritz-Carlton, DIFC</span></br><span>Sofitel, The Palm</span></br><span>Taj Dubai, Business Bay</span></br><span>JW Marriott Marquis, Business Bay</span>",
  },
  {
    title: "SENSATIONAL SRI LANKA",
    buttonColor: "",
    img:
      "https://res.cloudinary.com/dx6zgsncl/image/upload/v1638607643/Lucky/Travel%20offer%20-%20compressed-20211204T084653Z-001/sri_lanka_2_qujrqx_pfmfns.jpg",
    detail:
      "<span>Cape Weligama, Weligama</span></br><span>Anantara Peace Haven, Tangalle</span></br><span>Amanwella, Tangalle</span></br><span>Uga Chena Huts, Tissamarama</span></br><span>Wild Coast Tented Lodge, Yala</span></br><span>Shangri-La, Hambantota</span>",
  },
  {
    title: "AMAZING ASIA",
    buttonColor: "#28538C",
    img:
      "https://res.cloudinary.com/dx6zgsncl/image/upload/v1638607643/Lucky/Travel%20offer%20-%20compressed-20211204T084653Z-001/amazing_asia_u44uaq_j1krfl.jpg",
    detail:
      "<span>Marina Bay Sands, Singapore</span></br><span>Mandarin Oriental, Kuala Lumpur</span></br><span>Padma Resort, Ubud</span></br><span>Mandarin Oriental, Bangkok</span></br><span>The Peninsula, Hong Kong</span></br><span>Halekulani, Okinawa</span>",
  },
  {
    title: "ADVENTUROUS AFRICA",
    buttonColor: "",
    img:
      "https://res.cloudinary.com/dx6zgsncl/image/upload/v1638607643/Lucky/Travel%20offer%20-%20compressed-20211204T084653Z-001/africa_agxjnf_tdnnns.jpg",
    detail:
      "<span>One & Only, Cape Town</span></br><span>Angama Mara, Masai Mara</span></br><span>The Residence, Zanzibar</span></br><span>Royal Mansour, Marrakech</span></br><span>Sausage Tree Camp, Zambia</span></br><span>One & Only Gorilla’s Nest, Rwanda</span>",
  },
  {
    title: "ELEGANT EUROPE",
    buttonColor: "#28538C",
    img:
      "https://res.cloudinary.com/dx6zgsncl/image/upload/v1638607642/Lucky/Travel%20offer%20-%20compressed-20211204T084653Z-001/europe2_jqm4ag_hnevdo.jpg",
    detail:
      "<span>Four Seasons George V, Paris</span></br><span>The St Regis, Rome</span></br><span>The Savoy Hotel, London</span></br><span>Baur Au Lac, Zurich</span></br><span>Mandarin Oriental, Munich</span></br><span>Anantara Vilamoura, Algarve</span>",
  },
];

const panel = [
  {
    title: "ADMIN PANEL",
    img:
      "https://res.cloudinary.com/dx6zgsncl/image/upload/v1634537017/Lucky/Landing%20Page/laptop_edited_fhpgta.png",
    // img:
    //   "https://res.cloudinary.com/dx6zgsncl/image/upload/c_scale,w_2001/v1632842578/Lucky/Laptop_-_combined_2_issysp.png",
    icon: "iconsminds-resize",
  },
  {
    title: "MOBILE VIEW",
    // img:
    //   "https://res.cloudinary.com/dx6zgsncl/image/upload/v1626726426/Combined_mobile_view_compressed_to_under_1MB_cufp0q.png",
    img:
      "https://res.cloudinary.com/dx6zgsncl/image/upload/v1634547914/Lucky/Landing%20Page/MOBILE_EDITED_rxe0we.png",
    // img:
    //   "https://res.cloudinary.com/dx6zgsncl/image/upload/c_scale,w_2963/v1632800422/Lucky/Mobile_-_combined_a0idfi.png",
    icon: "iconsminds-resize",
  },
];
const newletter = [
  {
    img:
      "https://res.cloudinary.com/dx6zgsncl/image/upload/v1620495174/Newsletter-Button-Subscribe_bm5cpt.png",
  },
];

const clientSettings = {
  type: "carousel",
  gap: 30,
  perView: 1,
  hideNav: false,
  /* autoplay:true, */
  speed: 5000,
  peek: { before: 10, after: 10 },
  breakpoints: {
    600: { perView: 1 },
    992: { perView: 2 },
    1200: { perView: 2 },
  },
  /* animationTimingFunc:5000, */
};

const clientItems = [
  {
    icon:
      "https://res.cloudinary.com/uploadfiles/image/upload/v1611829678/t-3_rumikx.png",
    quote: "iconsminds-quotes",
    title: "MR. A",
    subTitle: "Founder of abs",
    detail:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    icon:
      "https://res.cloudinary.com/uploadfiles/image/upload/v1611829678/t-3_rumikx.png",
    quote: "iconsminds-quotes",
    title: "MR. A",
    subTitle: "Founder of abs",
    detail:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    icon:
      "https://res.cloudinary.com/uploadfiles/image/upload/v1611829678/t-3_rumikx.png",
    quote: "iconsminds-quotes",
    title: "MR. A",
    subTitle: "Founder of abs",
    detail:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    icon:
      "https://res.cloudinary.com/uploadfiles/image/upload/v1611829678/t-3_rumikx.png",
    quote: "iconsminds-quotes",
    title: "MR. A",
    subTitle: "Founder of abs",
    detail:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
];
/* const layouts = [
  {
    title: 'Menu Default',
    img: '/assets/img/landing-page/layouts/menu-default.jpg',
  },
  {
    title: 'Menu Subhidden',
    img: '/assets/img/landing-page/layouts/menu-subhidden.jpg',
  },
  {
    title: 'Menu Hidden',
    img: '/assets/img/landing-page/layouts/menu-hidden.jpg',
  },
  {
    title: 'Image List',
    img: '/assets/img/landing-page/layouts/image-list.jpg',
  },
  {
    title: 'Thumb List',
    img: '/assets/img/landing-page/layouts/thumb-list.jpg',
  },
  { title: 'Data List', img: '/assets/img/landing-page/layouts/data-list.jpg' },
  { title: 'Details', img: '/assets/img/landing-page/layouts/details.jpg' },
  {
    title: 'Authentication',
    img: '/assets/img/landing-page/layouts/authentication.jpg',
  },
  {
    title: 'Search Results',
    img: '/assets/img/landing-page/layouts/search-result.jpg',
  },
  {
    title: 'Single Page Application',
    img: '/assets/img/landing-page/layouts/spa.jpg',
  },
  {
    title: 'Data List App Menu Hidden',
    img: '/assets/img/landing-page/layouts/data-list-app-menu-hidden.jpg',
  },
  { title: 'Tabs', img: '/assets/img/landing-page/layouts/tabs.jpg' },
]; */

const applications = [
  {
    title: "Survey",
    path: `${adminRoot}/applications/survey`,
    img: "/assets/img/landing-page/applications/survey.jpg",
  },
  {
    title: "Chat",
    path: `${adminRoot}/applications/chat`,
    img: "/assets/img/landing-page/applications/chat.jpg",
  },
  {
    title: "Todo",
    path: `${adminRoot}/applications/todo`,
    img: "/assets/img/landing-page/applications/todo.jpg",
  },
];

const themes = [
  { title: "Navy Blue", class: "bluenavy" },
  { title: "Olympic Blue", class: "blueolympic" },
  { title: "Yale Blue", class: "blueyale" },
  { title: "Moss Green", class: "greenmoss" },
  { title: "Lime Green", class: "greenlime" },
  { title: "Carrot Orange", class: "carrotorange" },
  { title: "Ruby Red", class: "rubyred" },
  { title: "Monster Purple", class: "monsterpurple" },
  { title: "Steel Grey", class: "steelgrey" },
  { title: "Granola Yellow", class: "granolayellow" },
];

const initialValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
};
console.log("first_name", initialValues.travel_documents);
const onSubmit = (values, { resetForm, setSubmitting }) => {
  const payload = {
    ...values,
  };
  setTimeout(() => {
    alert(JSON.stringify(payload, null, 2));
    resetForm();
    setSubmitting(false);
  }, 1000);
};

const Home = (props) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const refRowHome = useRef(null);
  const refSectionHome = useRef(null);
  const refSectionFooter = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [goToSlide, setGoSlide] = useState(0);
  const [showNavigation] = useState(true);
  const [offsetRadius] = useState(1);
  const [addhover, setAddhover] = useState(0);
  const [addmobilehover, setAddmobilehover] = useState(0);
  const [email, setEmail] = useState("");

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const Newsletter = (e) => {
    e.preventDefault();
    const payload = {
      ...email,
    };
    Axios.post(`${API_URL}/newsletter`, payload).then((result) => {
      console.log("Newletter Subscription Status: ", result.status);
      if (result.status === 200) {
        NotificationManager.success(
          result.data.msg,
          "Thank You for suscribing our Newsletter.",
          3000,
          null,
          null,
          ""
        );
      } else if (result.status === 206) {
        NotificationManager.warning(
          result.data.msg,
          "Something went wrong",
          3000,
          null,
          null,
          ""
        );
      }
    });
    // .catch((error) =>
    //   NotificationManager.warning(error, "Update Error", 3000, null, null, "")
    // );

    setEmail("");
  };

  const onWindowScroll = () => {
    setShowMobileMenu(false);
    console.log("scroll position", window.pageYOffset);
    if (window.pageYOffset > 2140 && window.pageYOffset < 3025) {
      setAddhover(1);
      setAddmobilehover(0);
    } else if (window.pageYOffset > 2856 && window.pageYOffset < 3771) {
      setAddhover(0);
      setAddmobilehover(1);
    } else {
      setAddhover(0);
      setAddmobilehover(0);
    }

    console.log(addhover);
  };

  const slides = [
    <video controls key="1" width="100%" height="auto" track="testimonial">
      <source
        src="https://res.cloudinary.com/dx6zgsncl/video/upload/v1632800863/Lucky/videos/4_ro4l1y.mp4"
        type="video/mp4"
      />
      <track
        default
        kind="captions"
        srcLang="en"
        src="/media/examples/friday.vtt"
      />
    </video>,

    <video controls key="2" width="100%" height="auto" track="testimonial">
      <source
        src="https://res.cloudinary.com/dx6zgsncl/video/upload/v1632800856/Lucky/videos/3_dyy2vh.mp4"
        type="video/mp4"
      />
      <track
        default
        kind="captions"
        srcLang="en"
        src="/media/examples/friday.vtt"
      />
    </video>,
    <video
      controls
      key="3"
      width="100%"
      height="auto"
      track="testimonial"
      style={{ outline: "none" }}
    >
      <source
        src="https://res.cloudinary.com/dx6zgsncl/video/upload/v1632800847/Lucky/videos/2_pdzt1m.mp4"
        type="video/mp4"
      />
      <track
        default
        kind="captions"
        srcLang="en"
        src="/media/examples/friday.vtt"
      />
    </video>,
    <video
      controls
      key="4"
      width="100%"
      height="auto"
      track="testimonial"
      style={{ outline: "none" }}
    >
      <source
        src="https://res.cloudinary.com/dx6zgsncl/video/upload/v1632800841/Lucky/videos/1_qweoaq.mp4"
        type="video/mp4"
      />
      <track
        default
        kind="captions"
        srcLang="en"
        src="/media/examples/friday.vtt"
      />
    </video>,
  ];
  //   const slides = [

  //     {
  //     key:1,
  //     content:  <video controls width="100%" height="auto" track="testimonial" style={{ outline: "none" }}>
  //         <source src="https://res.cloudinary.com/dx6zgsncl/video/upload/v1615446431/WhatsApp_Video_2021-03-10_at_17.10.49_vkgfcf.mp4" type="video/mp4" />
  //         <track default
  //           kind="captions"
  //           srcLang="en"
  //           src="/media/examples/friday.vtt" />
  //       Sorry, your browser doesn't support embedded videos.

  //   </video>
  //     },
  // {
  //   key:2,
  //   content: <video controls width="100%" height="auto" track="testimonial" style={{ outline: "none" }}>
  //        <source src="https://res.cloudinary.com/dx6zgsncl/video/upload/v1615446430/WhatsApp_Video_2021-03-10_at_17.10.17_fm0u66.mp4" type="video/mp4" />
  //        <track default
  //          kind="captions"
  //          srcLang="en"
  //          src="/media/examples/friday.vtt" />
  //      Sorry, your browser doesn't support embedded videos.

  //  </video>
  //  } ,

  // {
  //   key:3,
  //   content:  <video controls width="100%" height="auto" track="testimonial" style={{ outline: "none" }}>
  //       <source src="https://res.cloudinary.com/dx6zgsncl/video/upload/v1615446427/WhatsApp_Video_2021-03-10_at_17.11.17_phk2kv.mp4" type="video/mp4" />
  //       <track default
  //         kind="captions"
  //         srcLang="en"
  //         src="/media/examples/friday.vtt" />
  //     Sorry, your browser doesn't support embedded videos.

  // </video>
  // }
  // //   ,
  // // {
  // //   key:4,
  // //   content: <video controls width="100%" height="auto" track="testimonial" style={{ outline: "none" }}>
  // //   <source src="https://res.cloudinary.com/dx6zgsncl/video/upload/v1615446422/WhatsApp_Video_2021-03-10_at_17.11.04_gyjhvu.mp4" type="video/mp4" />
  // //   <track default
  // //     kind="captions"
  // //     srcLang="en"
  // //     src="/media/examples/friday.vtt" />
  // // Sorry, your browser doesn't support embedded videos.

  // // </video>
  // // }
  // //    ,
  // //   { key:5,
  // //     content:   <video controls width="100%" height="auto" track="testimonial" style={{ outline: "none" }}>
  // //         <source src="https://res.cloudinary.com/dx6zgsncl/video/upload/v1615446422/WhatsApp_Video_2021-03-10_at_17.11.04_gyjhvu.mp4" type="video/mp4" />
  // //         <track default
  // //           kind="captions"
  // //           srcLang="en"
  // //           src="/media/examples/friday.vtt" />
  // //       Sorry, your browser doesn't support embedded videos.

  // //   </video>}
  // //   ,
  // // {
  // //   key:6,
  // //   content: <video controls width="100%" height="auto" track="testimonial" style={{ outline: "none" }}>
  // //     <source src="https://res.cloudinary.com/dx6zgsncl/video/upload/v1615446422/WhatsApp_Video_2021-03-10_at_17.11.04_gyjhvu.mp4" type="video/mp4" />
  // //     <track default
  // //       kind="captions"
  // //       srcLang="en"
  // //       src="/media/examples/friday.vtt" />
  // //   Sorry, your browser doesn't support embedded videos.

  // // </video>
  // // }

  //   ].map((slide, index) => {
  //     return { ...slide, onClick: () =>setGoSlide(index) };
  //   });

  console.log("go", goToSlide);

  const onWindowResize = (event) => {
    // const homeRect = refRowHome.current.getBoundingClientRect();

    const homeSection = refSectionHome.current;
    // homeSection.style.backgroundPositionX = `${homeRect.x - 580}px`;

    // const footerSection = refSectionFooter.current;
    // footerSection.style.backgroundPositionX = `${event.target.innerWidth - homeRect.x - 2000
    //   }px`;

    if (event.target.innerWidth >= 992) {
      setShowMobileMenu(false);
    }
  };

  const onWindowClick = () => {
    setShowMobileMenu(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", onWindowScroll);
    window.addEventListener("resize", onWindowResize);
    window.addEventListener("click", onWindowClick);

    document.body.classList.add("no-footer");
    return () => {
      window.removeEventListener("scroll", onWindowScroll);
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("click", onWindowClick);
      document.body.classList.remove("no-footer");
    };
  }, []);

  const scrollTo = (event, target) => {
    event.preventDefault();
    scroller.scrollTo(target, {
      duration: 500,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -100,
    });
    return false;
  };

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div
      className={classnames("landing-page", {
        "show-mobile-menu": showMobileMenu,
      })}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className="mobile-menu" onClick={(event) => event.stopPropagation()}>
        <a
          className="logo-mobile c-pointer"
          href="#scroll"
          onClick={(event) => scrollTo(event, "home")}
        >
          <img
            src="https://res.cloudinary.com/dx6zgsncl/image/upload/v1638686912/Lucky/logo%20compressed/Full-logo_uu6ra8.png"
            // src="https://res.cloudinary.com/dx6zgsncl/image/upload/v1632773361/Lucky/Full_logo_o4hybm.png"
            alt="logo"
            className="compressed_logo"
          />
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="c-pointer"
              href="#scroll"
              onClick={(event) => scrollTo(event, "features")}
            >
              OFFERS
            </a>
          </li>
          <li className="nav-item">
            <a
              className="c-pointer"
              href="#scroll"
              onClick={(event) => scrollTo(event, "layouts")}
            >
              PLATFORM
            </a>
          </li>
          <li className="nav-item">
            <a
              className="c-pointer"
              href="#scroll"
              onClick={(event) => scrollTo(event, "components")}
            >
              EXPERIENCE
            </a>
          </li>
          {/* <li className="nav-item">
            <a
              className="c-pointer"
              href="#scroll"
              onClick={(event) => scrollTo(event, 'apps')}
            >
              APPS
            </a>
          </li> */}
          <li className="nav-item">
            <a
              className="c-pointer"
              href="#scroll"
              onClick={(event) => scrollTo(event, "themes")}
            >
              CONTACT US
            </a>
          </li>
          <li className="nav-item">
            <div className="separator" />
          </li>
          <li className="nav-item">
            <NavLink
              className="btn btn-outline-primary btn-sm mobile-menu-cta"
              rel="noopener noreferrer"
              to="/user/login"
            >
              SIGN IN
            </NavLink>
          </li>
          <li>
            <NavLink className="offset-2 Enquiryclass" to="/user/enquiry">
              ENQUIRE NOW
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="main-container">
        <Headroom className="landing-page-nav">
          <nav>
            <div className="container d-flex align-items-center justify-content-between">
              <a
                className="navbar-logo pull-left c-pointer"
                href="#scroll"
                onClick={(event) => scrollTo(event, "home")}
              >
                <img
                  src="https://res.cloudinary.com/dx6zgsncl/image/upload/v1638686912/Lucky/logo%20compressed/Full-logo_uu6ra8.png"
                  className="white"
                  alt="Travel Quail"
                />

                <img
                  src="https://res.cloudinary.com/dx6zgsncl/image/upload/v1638686912/Lucky/logo%20compressed/Full-logo_uu6ra8.png"
                  className="dark"
                  alt="Travel Quail"
                />
              </a>
              <ul className="navbar-nav d-none d-lg-flex flex-row">
                <li className="nav-item">
                  <a
                    className="c-pointer"
                    href="#scroll"
                    onClick={(event) => scrollTo(event, "features")}
                  >
                    OFFERS
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="c-pointer"
                    href="#scroll"
                    onClick={(event) => scrollTo(event, "layouts")}
                  >
                    PLATFORM
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="c-pointer"
                    href="#scroll"
                    onClick={(event) => scrollTo(event, "components")}
                  >
                    EXPERIENCE
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="c-pointer"
                    href="#scroll"
                    onClick={(event) => scrollTo(event, "themes")}
                  >
                    CONNECT
                  </a>
                </li>
                <li className="nav-item text-center">
                  <NavLink
                    className="btn btn-outline-primary btn-sm mobile-menu-cta"
                    rel="noopener noreferrer"
                    to="/user/login"
                  >
                    SIGN IN
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="mr-2 mb-2 Enquiryclass"
                    to="/user/enquiry"
                  >
                    ENQUIRE NOW
                  </NavLink>
                </li>
              </ul>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
              <span
                className="mobile-menu-button"
                onClick={(event) => {
                  setShowMobileMenu(!showMobileMenu);
                  event.stopPropagation();
                }}
              >
                <i className="simple-icon-menu" />
              </span>
            </div>
          </nav>
        </Headroom>
        <div className="content-container" id="home">
          <Slider {...settings}>
            {sliderData.map((item) => {
              return (
                <Slides
                  key={item.id}
                  imageURL={item.imageURL}
                  gradientColor={item.gradientColor}
                  textColor={item.textColor}
                  Heading__1={item.Headline__1}
                  Heading__2={item.Headline__2}
                  Heading__3={item.Headline__3}
                  sub1={item.sub1}
                  sub2={item.sub2}
                  sub3={item.sub3}
                  buttonColor={item.buttonColor}
                />
              );
            })}
          </Slider>
          <div className="section">
            <div className="container" id="features">
              <div className="row">
                <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center">
                  <h1>
                    TRAVEL <span className="new-color-scheme">OFFERS</span>
                  </h1>
                  {/*  <p>
                    Managing your travel is easier than ever! Your are just one click away from registering with us
                  </p> */}
                </div>
              </div>
              <div className="container">
                <div className="row">
                  {features.map((f, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div className="col-md-4 my-3" key={`slide_${index}`}>
                      <div
                        className="card zoomhovercard"
                        style={{ minHeight: "100%" }}
                      >
                        <div className="card-body text-center">
                          <div>
                            <img
                              alt={f.title}
                              src={f.img}
                              height={230}
                              width={370}
                              className="card-img-top pointernone "
                              /* className="rounded" */
                              /*  className="feature-image-right feature-image-charts " */
                              style={{
                                borderBottomRightRadius: "0.75rem",
                                borderBottomLeftRadius: "0.75rem",
                              }}
                            />
                            <h5
                              className="mb-3 mt-5 font-weight-semibold"
                              style={{ color: "#28568E" }}
                            >
                              {f.title}
                            </h5>
                          </div>

                          {/* <ul>
                            <li>{f.detail}</li>
                            </ul> */}
                          <div>
                            <div
                              className="mb-5"
                              style={{
                                lineHeight: "30px",
                                // textAlign: "justify",
                                textJustify: "inter-word",
                                color: "#28568E",
                              }}
                              dangerouslySetInnerHTML={{ __html: f.detail }}
                            />
                            <div className="enquiryButton">
                              <NavLink
                                className="offset-2 Enquiryclass"
                                to="/user/enquiry"
                                /*  onClick={(event) => scrollTo(event, 'themes')} */
                                style={{ backgroundColor: `${f.buttonColor}` }}
                              >
                                ENQUIRE NOW{" "}
                                {/* <i className="simple-icon-arrow-right" /> */}
                              </NavLink>
                            </div>
                          </div>

                          {/*  <p className="detail-text">{f.detail}</p> */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="section background">
            <div className="container" id="layouts">
              <div className="row">
                <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center">
                  <h1>
                    TRAVEL <span className="new-color-scheme">PLATFORM</span>
                  </h1>
                </div>
              </div>
              {panel.map((feature, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={`feature_${i}`}>
                  {i % 2 === 0 && (
                    <div className="row feature-row">
                      <div className="feature__text">
                        <div className="feature-text-container">
                          <h2 className="font-weight-bold">{feature.title}</h2>
                          <div className="row">
                            <div className="col-md-12 d-flex">
                              <i className="iconsminds-profile large-icon mr-2" />
                              <h3 className="mt-3" style={{ color: "#F57E32" }}>
                                PROFILES
                                <p>
                                  Create & manage unlimited traveller profiles
                                  complete with travel preferences & documents.
                                </p>
                              </h3>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12 d-flex">
                              <i className="iconsminds-palm-tree large-icon mr-2" />
                              <h3 className="mt-3" style={{ color: "#F57E32" }}>
                                TRIPS
                                <p>
                                  Create & manage upcoming trips for registered
                                  travellers & receive travel reminders.
                                </p>
                              </h3>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12 d-flex">
                              <i className="iconsminds-calendar-4 large-icon mr-2" />
                              <h3 className="mt-3" style={{ color: "#F57E32" }}>
                                TEAM CALENDAR
                                <p>
                                  Track all upcoming and historic trips at
                                  individual, group or team level.
                                </p>
                              </h3>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12 d-flex">
                              <i className="iconsminds-folders large-icon mr-2" />
                              <h3 className="mt-3" style={{ color: "#F57E32" }}>
                                DOCUMENTS
                                <p>
                                  Upload documents directly to trips or profiles
                                  & receive expiry notifications.
                                </p>
                              </h3>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12 d-flex">
                              <i className="iconsminds-line-chart-1 large-icon mr-2" />

                              {/* <i className="iconsminds-check large-icon mr-2" /> */}
                              <h3 className="mt-3" style={{ color: "#F57E32" }}>
                                EXPENSES
                                <p>
                                  Track expenditure at individual, group or trip
                                  level & download expense data.
                                </p>
                              </h3>
                            </div>
                          </div>
                          {/* <div className="row">
                            <div className="col-md-12 d-flex">
                              <i className="iconsminds-line-chart-1 large-icon mr-2" />
                              <h3 className="mt-3" style={{ color: "#F57E32" }}>
                                COST TRACKER
                                <p>
                                  Log expenditure for each trip and view/analyse
                                  expense by individuals teams and/or expense
                                  type
                                </p>
                              </h3>
                            </div>
                          </div> */}
                        </div>
                      </div>

                      <div className="laptop__animation">
                        <img
                          src="https://res.cloudinary.com/dx6zgsncl/image/upload/v1636088907/Lucky/animations/above_left_of_laptop_upys7i.png"
                          alt="laptop__left"
                          className="laptop__left"
                          data-aos="slide-left"
                        />
                        <img
                          src="https://res.cloudinary.com/dx6zgsncl/image/upload/v1636088904/Lucky/animations/bottom_left_of_laptop_sftc9b.png"
                          alt="laptop__right"
                          className="laptop__right"
                          data-aos="slide-right"
                        />

                        <img
                          src="https://res.cloudinary.com/dx6zgsncl/image/upload/v1636088909/Lucky/animations/laptop_hrpmxn.png"
                          alt="laptop"
                          className="laptop"
                          data-aos="zoom-in"
                        />
                      </div>
                    </div>
                  )}
                  {i % 2 === 1 && (
                    <div className="row feature-row feature-row-second mobile-featured-view">
                      <div className="mobile__animation">
                        <img
                          src="https://res.cloudinary.com/dx6zgsncl/image/upload/v1636088904/Lucky/animations/above_left_of_mobile_gu5wmf.png"
                          alt="mobile__left"
                          className="mobile__left"
                          data-aos="slide-right"
                        />
                        <img
                          src="https://res.cloudinary.com/dx6zgsncl/image/upload/v1636088904/Lucky/animations/bottom_left_of_mobile_ylgzpk.png"
                          alt="mobile__right"
                          className="mobile__right"
                          data-aos="slide-left"
                        />
                        <img
                          src="https://res.cloudinary.com/dx6zgsncl/image/upload/v1636088905/Lucky/animations/mobile_mohfop.png"
                          alt="mobile"
                          className="mobile"
                          data-aos="zoom-in"
                        />
                      </div>

                      <div className="feature__text">
                        <div className="feature-text-container">
                          <h2 className="mt-5 font-weight-bold">
                            {feature.title}
                          </h2>

                          <div className="row">
                            <div className="col-md-12 d-flex">
                              <i className="iconsminds-check large-icon" />

                              {/* <i className="iconsminds-bell large-icon" /> */}
                              <h3 className="mt-3" style={{ color: "#F57E32" }}>
                                REQUESTS
                                <p>
                                  Make individual or group requests for all your
                                  travel needs & receive direct status updates.
                                </p>
                              </h3>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12 d-flex">
                              <i className="iconsminds-administrator large-icon" />
                              <h3 className="mt-3" style={{ color: "#F57E32" }}>
                                PREFERENCES
                                <p>
                                  Save & manage personal travel information &
                                  individual travel preferences.
                                </p>
                              </h3>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12 d-flex">
                              <i className="iconsminds-photo large-icon" />
                              <h3 className="mt-3" style={{ color: "#F57E32" }}>
                                ATTACHMENTS
                                <p>
                                  Save & manage travel documents to profiles or
                                  trips for on demand access.
                                </p>
                              </h3>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12 d-flex">
                              <i className="iconsminds-bell large-icon" />
                              {/* <i className="iconsminds-check large-icon" /> */}
                              <h3 className="mt-3" style={{ color: "#F57E32" }}>
                                NOTIFICATIONS
                                <p>
                                  Receive request, trip & document notifications
                                  directly to your device.
                                </p>
                              </h3>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12 d-flex">
                              <i className="iconsminds-calendar-1 large-icon" />
                              <h3 className="mt-3" style={{ color: "#F57E32" }}>
                                PERSONAL CALENDAR
                                <p>
                                  Track all upcoming trips in calendar view and
                                  sync with personal calendars.
                                </p>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* <GlideComponent settings={clientSettings}>
                      {clientItems.map((f, index) => (
                        
                        <div key={`slide_${index}`} >
                          <div className="card-body text-center">
                            <div>
                              <div >
                                <i className={`${f.quote} large-icon`} />
                                <div
                                  dangerouslySetInnerHTML={{ __html: f.detail }}
                                />

                              </div>
                              <img src={f.icon} width="100" height="100" className="my-2 rounded" alt="clients" />
                              <h5 className="font-weight-semibold mt-2">
                                {f.title}
                              </h5>
                              <h6>{f.subTitle}</h6>
                            </div>

                          </div>
                        </div>
                      ))}
                    </GlideComponent> */}
            </div>
          </div>
          <div className="section experciencesection">
            <div className="container" id="components">
              <div className="row">
                <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center">
                  <h1>
                    USER
                    <span className="new-color-scheme"> EXPERIENCE</span>
                  </h1>
                </div>
              </div>
            </div>
            <div style={{ width: "100%", height: "auto", margin: "0 auto" }}>
              <Carousel slides={slides} />
            </div>
          </div>
          <div className="section background">
            <div className="container" id="themes">
              <div className="row">
                <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center">
                  <h1 className="marginbottomcont">
                    CONNECT
                    <span className="new-color-scheme"> WITH US</span>
                  </h1>
                  <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center">
                    <p>
                      Please follow us on your preferred platform for live
                      travel updates
                    </p>
                    <div className="row">
                      <p className="followlogoclass mx-auto">
                        <a
                          href="https://www.facebook.com/travelquail"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="simple-icon-social-facebook followiconclass" />
                        </a>
                      </p>
                      <p className="followlogoclass mx-auto">
                        <a
                          href="https://twitter.com/travelquail"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="simple-icon-social-twitter followiconclass"></i>
                        </a>
                      </p>
                      {/* <p className="followlogoclass mx-auto"><a href="https://facebook.com" target="_blank" rel="noreferrer" ><i className='simple-icon-social-youtube followiconclass' /></a></p> */}
                      <p className="followlogoclass mx-auto">
                        <a
                          href="https://www.instagram.com/travelquail/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="simple-icon-social-instagram followiconclass" />
                        </a>
                      </p>
                      {/* <p className="followlogoclass mx-auto"><a href="https://facebook.com" target="_blank" rel="noreferrer"  ><i className='simple-icon-social-linkedin followiconclass' /></a></p> */}
                      {/* <p className="followlogoclass mx-auto"> <a href="https://facebook.com" target="_blank" rel="noreferrer"  ><i className='simple-icon-social-google followiconclass' /></a></p> */}
                      {/* <p className="followlogoclass mx-auto"> <a href="https://facebook.com" target="_blank" rel="noreferrer"  ><i className='iconsminds-sharethis followiconclass' /></a></p> */}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {/* <div className="col-md-6 offset-0 col-lg-6 col-sm-12 col-xs-12 mb-5">
                  <p>For General enquiries please email us on y <a href="mailto:info@arkpass.com">info@arkpass.com </a> or alternatively fill out the below enquiry form for a free consultation.</p>
                  <h3>Travel Analyst LLP</h3>
                  <h4>Address :</h4> <span>HTD Building, Kennedy Bridge, Opera House, Mumbai-400 008</span>
                  <h4>Phone No : </h4><a href="tel:+9102235631902">022 3563 1902</a>
                  <h4>Email Id : </h4><a href="mailto:info@arkpass.com">info@arkpass.com</a> */}

                {/* <h3 className="mt-5">General Enquiries</h3>

                  <h4>Phone No : </h4><a href="tel:+91326838383">022 6287339397</a>
                  <h4>Email Id : </h4><a href="mailto:info@arkpass.com">info@arkpass.com</a>

                  <h3 className="mt-5">Investor Relations</h3>
                  <h4>Phone No : </h4><a href="tel:+91326838383">022 6287339397</a>
                  <h4 >Email Id : </h4><a href="mailto:info@arkpass.com">management@arkpass.com</a>

                  <h3 className="mt-5">Careers</h3>
                  <h4>Phone No : </h4><a href="tel:+91326838383">022 6287339397</a>
                  <h4>Email Id : </h4><a href="mailto:info@arkpass.com">careers@arkpass.com</a> */}

                {/* </div> */}
                {/*  <div className="col-ms-6 offset-0 col-lg-6 col-sm-12 col-xs-12">

                  <div className="card card-shadow">
                    <div className="card-body">
                      <h3>Enquiry Now</h3>
                      <Formik
                        initialValues={initialValues}
                       
                        onSubmit={onSubmit}
                      >
                        {({
                          handleSubmit,
                          setFieldValue,
                          setFieldTouched,
                          handleChange,
                          handleBlur,
                          values,
                          errors,
                          touched,
                          isSubmitting,
                          onValueChange

                        }) => (
                          <Form className="av-tooltip tooltip-label-bottom">
                            <FormGroup className="form-group has-float-label">
                              <Label>
                                <IntlMessages id="Name" />
                              </Label>
                              <Field className="form-control" name="name" />

                            </FormGroup>
                            <FormGroup className="form-group has-float-label">
                              <Label>
                                <IntlMessages id="Company" />
                              </Label>
                              <Field className="form-control" name="company" />

                            </FormGroup>
                            <FormGroup className="form-group has-float-label">
                              <Label>
                                <IntlMessages id="Email" />
                              </Label>
                              <Field className="form-control" type="email" name="email" />

                            </FormGroup>
                            <FormGroup className="form-group has-float-label">
                              <Label>
                                <IntlMessages id="Phone" />
                              </Label>
                              <PhoneInput
                                className="form-control"
                                name="phone"
                                onChange={e => setFieldValue("phone", e)}
                              />

                            </FormGroup>

                            <Button color="primary" type="submit">
                              {isSubmitting ? "loading..." : "Save Changes"}
                            </Button>
                          </Form>
                        )}
                      </Formik>
                    </div>

                  </div>

                </div> */}
              </div>
            </div>
          </div>
          <div
            className="row mb-2"
            style={{ width: "100%", marginTop: "-75px" }}
          >
            <div className="text-center col-12 col-md-4 ">
              <h2 style={{ marginLeft: "18px" }}>NEWSLETTER </h2>
              <form
                className="form-inline"
                style={{ marginLeft: "-10px", marginTop: "-20px" }}
              >
                <div class="form-group">
                  <input
                    className="form-control text-center newlettercss"
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Enter Your Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div class="form-group">
                  <button
                    className="btn btn-primary newletterbutton"
                    type="button"
                    onClick={Newsletter}
                  >
                    Subscribe{" "}
                  </button>
                </div>
              </form>
            </div>
            <div
              className="text-center col-12 col-md-4 mb-4"
              style={{ fontWeight: "bold" }}
            >
              <p
                className="black font-weight-bold"
                style={{
                  marginBottom: "0",
                  marginLeft: "12px",
                  color: "rgb(0, 54, 90)",
                  fontStyle: "italic",
                }}
              >
                General enquiries
              </p>
              <p style={{ marginBottom: "0", color: "rgb(0, 54, 90)" }}>
                Email :
                <a
                  href="mailto:contact@travelquail.com"
                  style={{ color: "#f57e32" }}
                >
                  {" "}
                  contact@travelquail.com
                </a>
              </p>
              <p style={{ marginBottom: "0", color: "rgb(0, 54, 90)" }}>
                Mobile:
                <a href="tel:+919702955590" style={{ color: "#f57e32" }}>
                  {" "}
                  +91 (0) 9702955590
                </a>
              </p>
            </div>
            <div className="text-center col-12 col-md-4 ">
              <h2 className="mb-0" style={{ marginLeft: "42px" }}>
                APP (COMING SOON)
              </h2>
              <div className="row mb-2 mt-1">
                <div className="col-6 col-md=6">
                  <img
                    className="playstoreimg"
                    src="https://res.cloudinary.com/dx6zgsncl/image/upload/v1620908161/googleplay_g9o7n6.png"
                    alt="Google Play store"
                  />
                </div>
                <div className="col-6 col-md=6">
                  <img
                    className="appstoreimg"
                    src="https://res.cloudinary.com/dx6zgsncl/image/upload/v1620908533/appstore_mqovkd.png"
                    alt="apple store"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="foot" style={{ background: "#00365a" }}>
            <div className="container copyright pt-5 pb-5">
              <div className="row">
                <div className="col-12" />
                <div className="col-12 text-center">
                  <p className="mb-0 white">
                    TravelQuail Private Limited ©2021
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="section footer mb-0" ref={refSectionFooter}>
            <div className="container">
              <div className="row footer-row">
                <div className="col-12 text-right">
                  <a
                    className="btn btn-circle btn-outline-semi-light footer-circle-button c-pointer"
                    href="#scroll"
                    onClick={(event) => scrollTo(event, 'home')}
                  >
                    <i className="simple-icon-arrow-up" />
                  </a>
                </div>
                <div className="col-12 text-center footer-content">
                  <a
                    className="c-pointer"
                    href="#scroll"
                    onClick={(event) => scrollTo(event, 'home')}
                  >
                    <img
                      className="footer-logo"
                      alt="footer logo"
                      src="/assets/logos/white-full.svg"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="container copyright pt-5 pb-5">
              <div className="row">
                <div className="col-12" />
                <div className="col-12 text-center">
                  <p className="mb-0">2021 © Powered By ProApp IT Solutions</p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
