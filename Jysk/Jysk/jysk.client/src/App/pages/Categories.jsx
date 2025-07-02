import BodySection from "../components/BodySection"
import "../styles/pages/Categories.scss"

import bedroom from '../assets/img/bedroom.png';
import bathroom from '../assets/img/bathroom.png';
import livingRoom from '../assets/img/living-room.png';
import office from '../assets/img/office.png';
import kitchen from '../assets/img/kitchen.png';
import garden from '../assets/img/garden.png';

import nursery from '../assets/img/nursery.png';
import diningRoom from '../assets/img/dining-room.png';
import corridor from '../assets/img/corridor.png';
import laundry from '../assets/img/laundry.png';
import storage from '../assets/img/storage.png';
import forSleep from '../assets/img/for-sleep.png';

export default function Categories() {
    return (
        <BodySection>
            <div className="heading">
                <span>Categories</span>
            </div>
            <div className="categories-page">
                <div className='category'>
                    <p>Bedroom</p>
                    <img src={bedroom} alt="Bedroom" />
                </div>
                <div className='category'>
                    <p>Bathroom</p>
                    <img src={bathroom} alt="Bathroom" />
                </div>
                <div className='category'>
                    <p>Office</p>
                    <img src={office} alt="Office" />
                </div>
                <div className='category'>
                    <p>Living Room</p>
                    <img src={livingRoom} alt="Living Room" />
                </div>
                <div className='category'>
                    <p>Kitchen</p>
                    <img src={kitchen} alt="Kitchen" />
                </div>
                <div className='category'>
                    <p>Garden</p>
                    <img src={garden} alt="Garden" />
                </div>
                <div className='category'>
                    <p>Nursery</p>
                    <img src={nursery} alt="Nursery" />
                </div>
                <div className='category'>
                    <p>Dining room</p>
                    <img src={diningRoom} alt="Dining room" />
                </div>
                <div className='category'>
                    <p>Corridor</p>
                    <img src={corridor} alt="Corridor" />
                </div>
                <div className='category'>
                    <p>Laundry</p>
                    <img src={laundry} alt="Laundry" />
                </div>
                <div className='category'>
                    <p>Storage</p>
                    <img src={storage} alt="Storage" />
                </div>
                <div className='category'>
                    <p>For sleep</p>
                    <img src={forSleep} alt="For sleep" />
                </div>
            </div>
        </BodySection>
    );
}