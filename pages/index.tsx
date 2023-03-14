import type { NextPage } from 'next'
import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, selectValue } from '../slices/counterSlices'


const Home: NextPage = () => {
  const count = useSelector(selectValue)
  const dispatch = useDispatch();


  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Hospitals & Groceries</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1>The counter is {count}</h1>
        <button onClick={() => dispatch(increment())} className='w-full h-10 bg-green-400/50'>Increament Value</button>
        <button onClick={() => dispatch(decrement())} className='w-full h-10 bg-red-400/50'>Decrement Value</button>
      </main>

    </div>
  )
}

export default Home
