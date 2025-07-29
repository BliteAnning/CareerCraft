import crop from '../assets/crop.jpg';

const Contact = () => {
    return (
        <div className='flex flex-col items-center justify-center p-4'>
            <h1 className="text-2xl font-bold mb-4">Meet our Developer</h1>
            <div className='flex items-center gap-4 mb-8'> 
                <img src={crop} alt="" className='object-cover h-64 w-32' />
                <div>
                    <p>Bright Anning</p>
                    <p>Snr. Full Stack Developer & Founder, BliteQood Services</p>
                </div>
            </div>

            <h1 className='font-bold'>Need an enquiry about Career<span className='text-purple-600'>Craft</span> or a mobile or web application for your business? Contact me via the links below</h1>
            <ul>
                <li><a href="mailto:anningbright578@gmail.com"><span className='font-extrabold text-purple-500'>Email</span> :anningbright578@gmail.com</a></li>
                <li><a href="https://www.linkedin.com/in/bright-anning-3779a9262" target="_blank" rel="noopener noreferrer" className='hover:text-purple-600 hover:underline'>LinkedIn</a></li>
                <li></li>
            </ul>
            <p>Or visit my <a href="" className='hover:font-light text-purple-600 hover:underline'>personal site</a> for more information and enquiries </p>
          
        </div>
    );
}
export default Contact;