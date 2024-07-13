
import loader from './assets/loadingImg.gif';

const Loader = () => (
    <div className='w-full h-dvh'>
        <img src={loader} alt="Loading..." className='w-full h-full object-cover' />
    </div>
);

export default Loader;