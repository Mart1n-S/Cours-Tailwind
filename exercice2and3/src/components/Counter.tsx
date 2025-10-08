import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../stores/store'
import { increment, decrement } from '../stores/actions/counterSlice'

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">
        Compteur Redux Toolkit
      </h2>

      <div className="flex items-center gap-6 px-6 py-4 bg-gray-100 shadow-md rounded-2xl">
        <button
          onClick={() => dispatch(decrement())}
          className="w-10 h-10 text-xl text-white transition-colors duration-200 bg-red-500 rounded-full hover:bg-red-600"
        >
          -
        </button>

        <span className="text-3xl font-bold text-gray-700 min-w-[60px] text-center">
          {count}
        </span>

        <button
          onClick={() => dispatch(increment())}
          className="w-10 h-10 text-xl text-white transition-colors duration-200 bg-green-500 rounded-full hover:bg-green-600"
        >
          +
        </button>
      </div>
    </div>
  )
}

export default Counter
