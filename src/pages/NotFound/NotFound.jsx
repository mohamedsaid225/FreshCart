import NotFoundImg from '../../assets/images/error.svg'

export default function NotFound() {
  return (
    <div className='flex justify-center items-center'>
        <img className='w-1/2' src={NotFoundImg} alt="" />
    </div>
  )
}
