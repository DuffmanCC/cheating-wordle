interface PropsInterface {
  message: string;
}

const Message = ({ message }: PropsInterface) => {
  return (
    <div className="fixed inset-x-0 bottom-6 flex justify-center">
      <div className="w-64 px-4 py-2 | border rounded-lg | bg-gray-700 text-white text-center | whitespace-pre-line">
        {message}
      </div>
    </div>
  );
};

export default Message;
