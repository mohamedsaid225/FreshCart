import amazonPayLogo from '../../assets/images/amazon-pay.png'
import americanExpressLogo from '../../assets/images/American-Express-Color.png'
import masterCardLogo from '../../assets/images/mastercard.webp'
import paypalLogo from '../../assets/images/paypal.png'

import appStoreLogo from '../../assets/images/get-apple-store.png'
import googlePlayLogo from '../../assets/images/get-google-play.png'


export default function Footer() {
  return <>
    <footer className='bg-slate-100 py-8'>
      <div className="container space-y-4">
        <header>
          <h2 className='text-xl font-semibold text-slate-800'>Get the FreshCart App</h2>
          <p className='text-slate-400'>We will send you a link, open it on your phone to download the app</p>
        </header>

        <div className='flex gap-2'>
          <input className='form-control grow' type="email" placeholder="Email Address..." />
          <button className='btn uppercase bg-primary-800 hover:bg-primary-900 text-white font-semibold text-sm'>Share App Link</button>
        </div>

        <div className='flex justify-between items-center py-4 border-y-2 border-slate-300 border-opacity-50'>
          <div className="payment-partners flex gap-3 items-center">
            <h3>Payment Partners</h3>
            <img className='w-24' src={amazonPayLogo} alt="" />
            <img className='w-24' src={americanExpressLogo} alt="" />
            <img className='w-20' src={masterCardLogo} alt="" />
            <img className='w-24' src={paypalLogo} alt="" />
          </div>
          <div className="download flex items-center gap-3">
            <h3>Get deliveries with FreshCart</h3>
            <img className='w-24' src={appStoreLogo} alt="" />
            <img className='w-[110px]' src={googlePlayLogo} alt="" />
          </div>
        </div>
      </div>
    </footer>
  </>
}
