import imgTop from "../assets/img/work-top.png";
import BodySection from "../components/BodySection";

import careerRapidity from "../assets/icons/career-rapidity.svg";
import internationalOpportunities from "../assets/icons/international-opportunities.svg";
import teamSpirit from "../assets/icons/team-spirit.svg";

import retail from "../assets/img/retail.png";
import contacts from "../assets/img/contacts.png";
import mainOffice from "../assets/img/main-office.png";

import workInRetail from "../assets/img/work-in-retail.png";
import workInMainOffice from "../assets/img/work-in-the-main-office.png";
import workInCustomerDepartment from "../assets/img/work-in-the-customer-department.png";

import telegram from "../assets/icons/telegram-black.svg";
import instagram from "../assets/icons/instagram-black.svg";
import facebook from "../assets/icons/facebook-black.svg";
import youtube from "../assets/icons/youtube-black.svg";

import "../styles/pages/Work.scss"

export default function Work() {
    return (
        <div className="work-page">
            <BodySection>
                <img src={imgTop} className="img-top" />

                <div className="work-with-us">
                    <h3>Work with us</h3>
                    <p>Ми – сучасний і динамічний інтернет-магазин, який активно зростає та шукає талановитих і мотивованих людей. Якщо ти готовий долучитися до команди, що рухає інновації та обслуговує клієнтів на найвищому рівні, ми будемо раді вітати тебе серед нас! Ми цінуємо професійний розвиток наших співробітників. Пропонуємо навчання, тренінги та можливість кар'єрного зростання у різних напрямках – від обслуговування клієнтів до IT і маркетингу. Ми цінуємо внесок кожного члена нашої команди, тому пропонуємо конкурентну оплату праці та систему бонусів за результативну роботу.</p>
                    <p>Наш інтернет-магазин спеціалізується на продажі товарів для дому, меблів та декору. Ми прагнемо надавати нашим клієнтам широкий вибір високоякісної продукції за доступними цінами. Завдяки постійній орієнтації на потреби споживачів та впровадженню новітніх технологій, ми стали одним із лідерів ринку. Наші головні цінності – це довіра, інновації та сервіс, орієнтований на клієнта. Ми працюємо для того, щоб кожен покупець отримував найкращий досвід покупок, а кожен працівник – можливість для особистого та професійного розвитку.</p>
                </div>
            </BodySection >
            <BodySection bgWhite>
                <div className="overview">
                    <div className="benefits overview-container row flex-wrap justify-content-center">
                        <div className="overview-box col-6 col-md-4 mb-4 text-center">
                            <img src={internationalOpportunities} alt="International Opportunities" />
                            <span>INTERNATIONAL OPPORTUNITIES</span>
                        </div>
                        <div className="overview-box col-6 col-md-4 mb-4 text-center">
                            <img src={careerRapidity} alt="Career Rapidity" />
                            <span>CAREER RAPIDITY</span>
                        </div>
                        <div className="overview-box col-6 col-md-4 mb-4 text-center">
                            <img src={teamSpirit} alt="Team Spirit" />
                            <span>TEAM SPIRIT</span>
                        </div>
                    </div>
                </div>
            </BodySection>
            <BodySection>
                <div className="images-section ">
                    <div className="row flex-wrap justify-content-center">
                        <div className="col-6 col-sm-4  text-center">
                            <img src={retail} />
                            <span>RETAIL</span>
                        </div>
                        <div className="col-6 col-sm-4 text-center">
                            <img src={contacts} />
                            <span>CONTACTS</span>
                        </div>
                        <div className="col-6 col-sm-4 text-center">
                            <img src={mainOffice} />
                            <span>MAIN OFFICE</span>
                        </div>
                    </div>
                </div>

                <div className="job-details">
                    <div className="job-details-top">
                        <h3>ЗНАЙДИ РОБОТУ, ЯКУ ТИ ШУКАЄШ</h3>
                        <p>Ми віримо в потенціал кожного члена нашої команди. У нас ти зможеш постійно вдосконалювати свої навички, відвідувати тренінги, брати участь у внутрішніх програмах навчання та розвивати свою кар’єру. Ми підтримуємо ініціативи та заохочуємо досягнення. Розвивайся в напрямках, які тобі цікаві – від клієнтського сервісу до логістики, від маркетингу до IT-рішень. Ми розуміємо, наскільки важливо підтримувати баланс між роботою та особистим життям. Тому пропонуємо гнучкий графік роботи, що дозволяє поєднувати роботу з іншими ва</p>
                    </div>

                    <div className="job-details-middle" >
                        <div>
                            <h3>РОБОТА В РІТЕЙЛІ</h3>
                            <p>жливими справами. Окрім того, ти зможеш працювати віддалено з будь-якої точки світу, використовуючи сучасні технології для ефективної комунікації з командою. Ми цінуємо талант і наполегливість наших співробітників, тому пропонуємо гідну оплату праці та систему бонусів, яка мотивує досягати нових висот. Твоя праця буде винагороджена відповідно до твоїх зусиль і результатів. Наш інтернет-магазин постійно впроваджує новітні технології, щоб залишатися на піку ринку електронної комерції. В нашій компанії ти знайдеш колектив однодумців, які підтримують одне одного та прагнуть досягати спільних цілей. </p>
                        </div>
                        <img src={workInRetail} alt="" />

                        <img src={workInMainOffice} alt="" />
                        <div>
                            <h3>РОБОТА В ГОЛОВНОМУ ОФІСІ</h3>
                            <p>Ми віримо, що успіх – це результат командної роботи, де кожен співробітник відіграє важливу роль. У нас ти знайдеш не тільки колег, але й друзів, які завжди готові допомогти та підтримати. У нас кожен співробітник може впливати на майбутнє компанії. Твої ідеї, ініціативи та пропозиції не залишаться непоміченими. Ми заохочуємо творчий підхід до роботи та надаємо можливість втілювати нові ідеї в життя. Ти зможеш робити реальний внесок у розвиток бізнесу, бачивши результати своєї праці. Ми віримо в чесність, відповідальність та взаємодопомогу.</p>
                        </div>

                        <div>
                            <h3>РОБОТА В ВІДДІЛІ ПО РОБОТІ З КЛІЄНТАМИ</h3>
                            <p>жливими справами. Окрім того, ти зможеш працювати віддалено з будь-якої точки світу, використовуючи сучасні технології для ефективної комунікації з командою. Ми цінуємо талант і наполегливість наших співробітників, тому пропонуємо гідну оплату праці та систему бонусів, яка мотивує досягати нових висот. Твоя праця буде винагороджена відповідно до твоїх зусиль і результатів. Наш інтернет-магазин постійно впроваджує новітні технології, щоб залишатися на піку ринку електронної комерції. В нашій компанії ти знайдеш колектив однодумців, які підтримують одне одного та прагнуть досягати спільних цілей. </p>
                        </div>
                        <img src={workInCustomerDepartment} alt="" />
                    </div>

                    <div className="job-details-bottom">
                        <h3>ПРИЄДНУЙСЯ ДО НАШОЇ КОМАНДИ І ПРАЦЮЙ З НАМИ</h3>
                        <p>Ми віримо в потенціал кожного члена нашої команди. У нас ти зможеш постійно вдосконалювати свої навички, відвідувати тренінги, брати участь у внутрішніх програмах навчання та розвивати свою кар’єру. Ми підтримуємо ініціативи та заохочуємо досягнення. Розвивайся в напрямках, які тобі цікаві – від клієнтського сервісу до логістики, від маркетингу до IT-рішень. Ми розуміємо, наскільки важливо підтримувати баланс між роботою та особистим життям. Тому пропонуємо гнучкий графік роботи, що дозволяє поєднувати роботу з іншими ва</p>
                    </div>
                </div>

                <div className="social-media-links">
                    <img src={telegram} alt="Telegram" />
                    <img src={instagram} alt="Instagram" />
                    <img src={facebook} alt="Facebook" />
                    <img src={youtube} alt="Youtube" />
                </div>
            </BodySection>
        </div>
    );
}