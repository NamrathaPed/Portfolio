// src/components/Contact.jsx
export default function Contact() {
  const handleClick = () => {
    alert("Contact button clicked!"); // You can replace this with your contact action
  };

  return (
    <button
      onClick={handleClick}
      className="fixed top-4 right-10 bg-teal-300 hover:bg-teal-500 text-black font-bold py-2 px-4 rounded"
    >
      Contact Me
    </button>
  );
}
