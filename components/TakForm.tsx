import { useForm } from "react-hook-form";

const TaskForm = ({ onCancel, submitForm }: any) =>{

    const { register, handleSubmit, reset, } = useForm();

  const onSubmit = (data: any) => {
    // Handle form submission logic here
    console.log(data);
    submitForm(data)
    reset()
  };

  return (
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3" onSubmit={handleSubmit(onSubmit)}>

<div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlin`}
            id="name"
            type="text"
            placeholder="Enter your name"
            {...register('name', { required: 'Name is required' })}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none `}
            id="description"
            placeholder="Enter your description"
            rows={1}
            {...register('description', { required: 'Description is required' })}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
</div>

      </form>

  )
}

export default TaskForm;